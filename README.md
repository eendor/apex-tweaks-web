# Apex Tweaks web

Responsive website and browser-based Windows plan builder for Apex Tweaks. Built with React, TypeScript, Vite, Netlify Functions, Neon Postgres, and Stripe Checkout.

## Local development

1. Run `npm install`.
2. Copy `.env.example` to `.env` and fill in test credentials.
3. Apply `database/schema.sql` in the Neon SQL editor.
4. Run `npx netlify dev` to serve the app and functions together.

`npm run dev` serves only the frontend, so API-backed support and checkout require Netlify Dev.

## Production setup

- In Neon, create a project/database and run `database/schema.sql`.
- In Stripe test mode, create the Pro recurring product and copy its price ID.
- In Netlify, import this folder/repository. The build configuration is in `netlify.toml`.
- Add `DATABASE_URL`, `STRIPE_SECRET_KEY`, `STRIPE_PRICE_PRO_MONTHLY`, `STRIPE_WEBHOOK_SECRET`, and `SITE_URL` as Netlify environment variables.
- In Stripe, register `https://YOUR-SITE.netlify.app/api/stripe-webhook` for `checkout.session.completed`, `customer.subscription.updated`, and `customer.subscription.deleted`.
- Deploy, then set `SITE_URL` to the final HTTPS origin and redeploy.

Never commit `.env` or expose database/Stripe secret keys through `VITE_` variables.
