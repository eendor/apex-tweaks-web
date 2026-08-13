import type { Handler } from '@netlify/functions';
import { neon } from '@neondatabase/serverless';
import Stripe from 'stripe';

export const handler: Handler = async event => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method not allowed' };
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const key = process.env.STRIPE_SECRET_KEY;
  const databaseUrl = process.env.DATABASE_URL;
  if (!secret || !key || !databaseUrl) return { statusCode: 503, body: 'Webhook is not configured' };
  try {
    const stripe = new Stripe(key);
    const signature = event.headers['stripe-signature'];
    if (!signature) return { statusCode: 400, body: 'Missing signature' };
    const stripeEvent = stripe.webhooks.constructEvent(event.body || '', signature, secret);
    const sql = neon(databaseUrl);
    const seen = await sql`SELECT event_id FROM stripe_events WHERE event_id=${stripeEvent.id}`;
    if (seen.length) return { statusCode: 200, body: 'Already processed' };
    if (stripeEvent.type === 'checkout.session.completed') {
      const session = stripeEvent.data.object as Stripe.Checkout.Session;
      if (session.customer && session.customer_details?.email) await sql`
        INSERT INTO stripe_customers(email,stripe_customer_id,subscription_status)
        VALUES (${session.customer_details.email.toLowerCase()},${String(session.customer)},'active')
        ON CONFLICT (email) DO UPDATE SET stripe_customer_id=EXCLUDED.stripe_customer_id,subscription_status='active',updated_at=NOW()`;
    }
    if (stripeEvent.type === 'customer.subscription.updated' || stripeEvent.type === 'customer.subscription.deleted') {
      const subscription = stripeEvent.data.object as Stripe.Subscription;
      await sql`UPDATE stripe_customers SET subscription_status=${subscription.status},updated_at=NOW() WHERE stripe_customer_id=${String(subscription.customer)}`;
    }
    await sql`INSERT INTO stripe_events(event_id,event_type) VALUES (${stripeEvent.id},${stripeEvent.type})`;
    return { statusCode: 200, body: 'ok' };
  } catch (error) {
    console.error(error);
    return { statusCode: 400, body: 'Invalid webhook request' };
  }
};
