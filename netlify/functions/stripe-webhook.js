var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { neon } from '@neondatabase/serverless';
import Stripe from 'stripe';
export var handler = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var secret, key, databaseUrl, stripe, signature, stripeEvent, sql, seen, session, subscription, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (event.httpMethod !== 'POST')
                    return [2 /*return*/, { statusCode: 405, body: 'Method not allowed' }];
                secret = process.env.STRIPE_WEBHOOK_SECRET;
                key = process.env.STRIPE_SECRET_KEY;
                databaseUrl = process.env.DATABASE_URL;
                if (!secret || !key || !databaseUrl)
                    return [2 /*return*/, { statusCode: 503, body: 'Webhook is not configured' }];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 8, , 9]);
                stripe = new Stripe(key);
                signature = event.headers['stripe-signature'];
                if (!signature)
                    return [2 /*return*/, { statusCode: 400, body: 'Missing signature' }];
                stripeEvent = stripe.webhooks.constructEvent(event.body || '', signature, secret);
                sql = neon(databaseUrl);
                return [4 /*yield*/, sql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["SELECT event_id FROM stripe_events WHERE event_id=", ""], ["SELECT event_id FROM stripe_events WHERE event_id=", ""])), stripeEvent.id)];
            case 2:
                seen = _b.sent();
                if (seen.length)
                    return [2 /*return*/, { statusCode: 200, body: 'Already processed' }];
                if (!(stripeEvent.type === 'checkout.session.completed')) return [3 /*break*/, 4];
                session = stripeEvent.data.object;
                if (!(session.customer && ((_a = session.customer_details) === null || _a === void 0 ? void 0 : _a.email))) return [3 /*break*/, 4];
                return [4 /*yield*/, sql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n        INSERT INTO stripe_customers(email,stripe_customer_id,subscription_status)\n        VALUES (", ",", ",'active')\n        ON CONFLICT (email) DO UPDATE SET stripe_customer_id=EXCLUDED.stripe_customer_id,subscription_status='active',updated_at=NOW()"], ["\n        INSERT INTO stripe_customers(email,stripe_customer_id,subscription_status)\n        VALUES (", ",", ",'active')\n        ON CONFLICT (email) DO UPDATE SET stripe_customer_id=EXCLUDED.stripe_customer_id,subscription_status='active',updated_at=NOW()"])), session.customer_details.email.toLowerCase(), String(session.customer))];
            case 3:
                _b.sent();
                _b.label = 4;
            case 4:
                if (!(stripeEvent.type === 'customer.subscription.updated' || stripeEvent.type === 'customer.subscription.deleted')) return [3 /*break*/, 6];
                subscription = stripeEvent.data.object;
                return [4 /*yield*/, sql(templateObject_3 || (templateObject_3 = __makeTemplateObject(["UPDATE stripe_customers SET subscription_status=", ",updated_at=NOW() WHERE stripe_customer_id=", ""], ["UPDATE stripe_customers SET subscription_status=", ",updated_at=NOW() WHERE stripe_customer_id=", ""])), subscription.status, String(subscription.customer))];
            case 5:
                _b.sent();
                _b.label = 6;
            case 6: return [4 /*yield*/, sql(templateObject_4 || (templateObject_4 = __makeTemplateObject(["INSERT INTO stripe_events(event_id,event_type) VALUES (", ",", ")"], ["INSERT INTO stripe_events(event_id,event_type) VALUES (", ",", ")"])), stripeEvent.id, stripeEvent.type)];
            case 7:
                _b.sent();
                return [2 /*return*/, { statusCode: 200, body: 'ok' }];
            case 8:
                error_1 = _b.sent();
                console.error(error_1);
                return [2 /*return*/, { statusCode: 400, body: 'Invalid webhook request' }];
            case 9: return [2 /*return*/];
        }
    });
}); };
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
