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
export var handler = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, email, topic, message, url, sql, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (event.httpMethod !== 'POST')
                    return [2 /*return*/, { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) }];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                _a = JSON.parse(event.body || '{}'), name_1 = _a.name, email = _a.email, topic = _a.topic, message = _a.message;
                if (!name_1 || !/^\S+@\S+\.\S+$/.test(email) || !message || message.length < 20)
                    return [2 /*return*/, { statusCode: 400, body: JSON.stringify({ error: 'Please complete all fields with a valid email.' }) }];
                url = process.env.DATABASE_URL;
                if (!url)
                    throw new Error('Database is not configured');
                sql = neon(url);
                return [4 /*yield*/, sql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["INSERT INTO support_requests (name,email,topic,message) VALUES (", ",", ",", ",", ")"], ["INSERT INTO support_requests (name,email,topic,message) VALUES (", ",", ",", ",", ")"])), String(name_1).slice(0, 100), String(email).toLowerCase().slice(0, 254), String(topic || 'Other').slice(0, 50), String(message).slice(0, 5000))];
            case 2:
                _b.sent();
                return [2 /*return*/, { statusCode: 201, headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ok: true }) }];
            case 3:
                e_1 = _b.sent();
                console.error(e_1);
                return [2 /*return*/, { statusCode: 500, body: JSON.stringify({ error: 'Support is temporarily unavailable. Please try again.' }) }];
            case 4: return [2 /*return*/];
        }
    });
}); };
var templateObject_1;
