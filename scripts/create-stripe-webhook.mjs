import Stripe from 'stripe';
if (!process.env.STRIPE_SECRET_KEY || !process.env.SITE_URL) throw new Error('Stripe key or SITE_URL is missing');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const url = `${process.env.SITE_URL}/api/stripe-webhook`;
const existing = (await stripe.webhookEndpoints.list({limit:100})).data.find(item=>item.url===url);
if (existing) throw new Error('Webhook already exists; keep its existing signing secret configured in Netlify');
const endpoint = await stripe.webhookEndpoints.create({url,enabled_events:['checkout.session.completed','customer.subscription.updated','customer.subscription.deleted'],description:'Apex Tweaks subscription sync'});
process.stdout.write(endpoint.secret || '');
