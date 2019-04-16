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
const PayBaseX_1 = require("./core/PayBaseX");
/**
 * APP支付
 *
 * ```
 * const pay = new AppPay({
 *   appId: "wxb80e5bddb2d804f3",
 *   key: "6Q9VX4N3WTBM9G9XBL7H1L9PB9ANHLY7",
 *   mchId: "1434712502",
 *   pfx: fs.readFileSync(path.resolve(__dirname, "cert.p12"))
 * });
 * ```
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/app/app.php?chapter=8_1}
 */
class AppPay extends PayBaseX_1.default {
    /**
     * 统一下单
     *
     * ```
     * pay.unifiedOrder({
     *   body: "腾讯充值中心-QQ会员充值",
     *   out_trade_no: "1217752501201407033233368018",
     *   total_fee: 888,
     *   spbill_create_ip: "8.8.8.8",
     *   notify_url: "https://example.com/wechatpay/notify"
     * });
     * ```
     * @see {@link https://pay.weixin.qq.com/wiki/doc/api/app/app.php?chapter=9_1}
     */
    unifiedOrder(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.unifiedOrderBase(Object.assign({ trade_type: "APP" }, options));
        });
    }
}
exports.AppPay = AppPay;
