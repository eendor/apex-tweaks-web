import Stripe from 'stripe';
if (!process.env.STRIPE_SECRET_KEY) throw new Error('STRIPE_SECRET_KEY is missing');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const products = await stripe.products.search({query:"metadata['app']:'apex-tweaks'"});
const product = products.data[0] || await stripe.products.create({name:'Apex Tweaks Pro',description:'Monthly access to advanced Apex Tweaks web features.',metadata:{app:'apex-tweaks'}});
const prices = await stripe.prices.list({product:product.id,active:true,type:'recurring'});
const price = prices.data.find(item=>item.unit_amount===600&&item.currency==='usd'&&item.recurring?.interval==='month') || await stripe.prices.create({product:product.id,unit_amount:600,currency:'usd',recurring:{interval:'month'},metadata:{app:'apex-tweaks'}});
console.log(`Stripe test billing ready\nProduct: ${product.id}\nPrice: ${price.id}`);
