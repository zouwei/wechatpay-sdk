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
const qs = require("querystring");
const EntrustBase_1 = require("./core/EntrustBase");
const ENTRUST_BASE = "https://api.mch.weixin.qq.com/papay/h5entrustweb";
/**
 * H5签约
 *
 * ```
 * const pay = new WapEntrust({
 *   appId: "wxb80e5bddb2d804f3",
 *   key: "6Q9VX4N3WTBM9G9XBL7H1L9PB9ANHLY7",
 *   mchId: "1434712502",
 *   pfx: fs.readFileSync(path.resolve(__dirname, "cert.p12"))
 * });
 * ```
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_16&index=3}
 */
class WapEntrust extends EntrustBase_1.default {
    /**
     * 支付中签约
     *
     * ```
     * pay.contractOrder({
     *   contract_mchid: "1223816102",
     *   contract_appid: "wx426a3015555a46be",
     *   out_trade_no: "1217752501201407033233368018",
     *   body: "腾讯充值中心-QQ会员充值",
     *   notify_url: "https://example.com/wechatpay/notify",
     *   total_fee: 888,
     *   spbill_create_ip: "8.8.8.8",
     *   plan_id: 12535,
     *   contract_code: "100000",
     *   request_serial: 1000,
     *   contract_display_account: "微信代扣",
     *   contract_notify_url: "https://example.com/wechatpay/pap/notify"
     * });
     * ```
     * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_13&index=4}
     */
    contractOrder(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.contractOrderBase(options, "MWEB");
        });
    }
    /**
     * 纯签约
     *
     * ```
     * pay.entrust({
     *   plan_id: "12535",
     *   contract_code: "100000",
     *   request_serial: 1000,
     *   contract_display_account: "微信代扣",
     *   notify_url: "https://example.com/wechatpay/notify/contract",
     *   clientip: "119.145.83.6",
     * });
     * ```
     * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_16&index=3}
     */
    entrust(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.entrustBase(options, "HMAC-SHA256");
            return ENTRUST_BASE + "?" + qs.stringify(data);
        });
    }
}
exports.WapEntrust = WapEntrust;
