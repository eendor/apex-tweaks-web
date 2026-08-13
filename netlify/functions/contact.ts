import type { Handler } from '@netlify/functions';
import { neon } from '@neondatabase/serverless';
export const handler: Handler = async event => {
 if(event.httpMethod!=='POST') return {statusCode:405,body:JSON.stringify({error:'Method not allowed'})};
 try{const {name,email,topic,message}=JSON.parse(event.body||'{}'); if(!name||!/^\S+@\S+\.\S+$/.test(email)||!message||message.length<20) return {statusCode:400,body:JSON.stringify({error:'Please complete all fields with a valid email.'})};
 const url=process.env.DATABASE_URL; if(!url) throw new Error('Database is not configured'); const sql=neon(url); await sql`INSERT INTO support_requests (name,email,topic,message) VALUES (${String(name).slice(0,100)},${String(email).toLowerCase().slice(0,254)},${String(topic||'Other').slice(0,50)},${String(message).slice(0,5000)})`;
 return {statusCode:201,headers:{'content-type':'application/json'},body:JSON.stringify({ok:true})};}catch(e){console.error(e);return {statusCode:500,body:JSON.stringify({error:'Support is temporarily unavailable. Please try again.'})}}
};
