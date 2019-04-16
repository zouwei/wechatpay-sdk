"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fetch_1 = require("../fetch");
const PayBase_1 = require("./core/PayBase");
const REVERSE_BASE = "/secapi/pay/reverse";
const MICRO_PAY_BASE = "/pay/micropay";
const REPORT_BASE = "/payitil/report";
const SHORT_URL_BASE = "/tools/shorturl";
const AUTH_CODE_TO_OPENID_BASE = "/tools/authcodetoopenid";
/**
 * 刷卡支付
 *
 * ```
 * const pay = new PubScanPay({
 *   appId: "wxb80e5bddb2d804f3",
 *   key: "6Q9VX4N3WTBM9G9XBL7H1L9PB9ANHLY7",
 *   mchId: "1434712502",
 *   pfx: fs.readFileSync(path.resolve(__dirname, "cert.p12"))
 * });
 * ```
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=5_1}
 */
class PubScanPay extends PayBase_1.default {
    /**
     * 提交刷卡支付
     *
     * ```
     * pay.microPay({
     *   body: "深圳腾大- QQ公仔",
     *   out_trade_no: "1217752501201407033233368018",
     *   total_fee: 888,
     *   spbill_create_ip: "8.8.8.8",
     *   auth_code: "120061098828009406"
     * });
     * ```
     * @see {@link https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_10&index=1}
     */
    microPay(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.completeURL(MICRO_PAY_BASE);
            const extra = yield this.createFetchOptions(url);
            return fetch_1.fetch(options, extra);
        });
    }
    /**
     * 撤销订单
     *
     * ```
     * pay.reverse({
     *   transaction_id: '1009660380201506130728806387'
     * })
     *
     * pay.reverse({
     *   out_trade_no: '120061098828009406'
     * })
     * ```
     * @see {@link https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_11&index=3}
     */
    reverse(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.completeURL(REVERSE_BASE);
            const extra = yield this.createFetchOptions(url, true);
            return fetch_1.fetch(options, extra);
        });
    }
    /**
     * 交易保障
     *
     * ```
     * pay.report({
     *   interface_url: "https://api.mch.weixin.qq.com/pay/unifiedorder",
     *   user_ip: "8.8.8.8",
     *   trades: `!CDATA[
     *   [
     *     {
     *       out_trade_no: "out_trade_no_test_1",
     *       begin_time: "20160602203256",
     *       end_time: "20160602203257",
     *       state: "OK",
     *       err_msg: ""
     *     },
     *     {
     *       out_trade_no: "out_trade_no_test_2",
     *       begin_time: "20160602203260",
     *       end_time: "20160602203262",
     *       state: "FAIL",
     *       err_msg: "SYSTEMERROR"
     *     }
     *   ]
     * ];`
     * });
     * ```
     * @see {@link https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_14&index=8}
     */
    report(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.completeURL(REPORT_BASE);
            const extra = yield this.createFetchOptions(url);
            return fetch_1.fetch(options, extra);
        });
    }
    /**
     * 短链接转换
     *
     * ```
     * pay.shortURL({
     *   long_url:
     *     "weixin://wxpay/bizpayurl?sign=XXX&appid=XX&mch_id=XX&product_id=XX&time_stamp=XX&nonce_str=XX"
     * });
     * ```
     * @see {@link https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_9&index=9}
     */
    shortURL(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.completeURL(SHORT_URL_BASE);
            const extra = yield this.createFetchOptions(url);
            options.sign_type = "HMAC-SHA256" /* "HMAC-SHA256" */;
            return fetch_1.fetch(options, extra);
        });
    }
    /**
     * 授权码查询 OpenId
     *
     * ```
     * pay.authCodeToOpenId({
     *   auth_code: "120061098828009406"
     * });
     * ```
     * @see {@link https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_13&index=10}
     */
    authCodeToOpenId(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.completeURL(AUTH_CODE_TO_OPENID_BASE);
            const extra = yield this.createFetchOptions(url);
            return fetch_1.fetch(options, extra);
        });
    }
}
exports.PubScanPay = PubScanPay;
