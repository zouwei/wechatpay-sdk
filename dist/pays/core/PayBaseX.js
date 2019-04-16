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
const fetch_1 = require("../../fetch");
const utils_1 = require("../../utils");
const PayBase_1 = require("./PayBase");
const REPORT_BASE = "/payitil/report";
const CLOSE_ORDER_BASE = "/pay/closeorder";
const UNIFIED_ORDER_BASE = "/pay/unifiedorder";
/**
 * `PayBase` 基础上添加方法 `closeOrder`, `payNotify`，是公众号支付，扫码支付，APP支付，H5支付，和小程序支付的基类
 */
class PayBaseX extends PayBase_1.default {
    /**
     * 关闭订单
     *
     * ```
     * pay.closeOrder({
     *   out_trade_no: '120061098828009406'
     * })
     * ```
     * @see {@link https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_3}
     */
    closeOrder(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.completeURL(CLOSE_ORDER_BASE);
            const extra = yield this.createFetchOptions(url);
            return fetch_1.fetch(options, extra);
        });
    }
    /**
     * 交易保障
     *
     * ```
     * pay.report({
     *   interface_url: "https://api.mch.weixin.qq.com/pay/unifiedorder",
     *   execute_time: 1000,
     *   return_code: "SUCCESS",
     *   return_msg: "OK",
     *   result_code: "SUCCESS",
     *   user_ip: "8.8.8.8"
     * });
     * ```
     * @see {@link https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_8&index=9}
     */
    report(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.completeURL(REPORT_BASE);
            const extra = yield this.createFetchOptions(url);
            return fetch_1.fetch(options, extra);
        });
    }
    /**
     * 支付结果通知
     *
     * ```
     * router.post("/wechatpay/notify/refund", (req, res) => {
     *   getXMLBody(req, options).then(data => {
     *     pay
     *       .payNotify(data, async parsedData => {
     *         // ...
     *         return {
     *           return_code: "SUCCESS",
     *           return_msg: "OK"
     *         };
     *       })
     *       .then(returnData => {
     *         res.set("Content-Type", "application/xml; charset=utf-8");
     *         res.end(returnData);
     *       });
     *   });
     * });
     * ```
     * @see {@link https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_7&index=8}
     */
    payNotify(info, handler) {
        return __awaiter(this, void 0, void 0, function* () {
            if (info.return_code === "FAIL") {
                return utils_1.toXML({
                    return_code: info.return_code,
                    return_msg: info.return_msg
                });
            }
            const result = yield handler(info);
            return utils_1.toXML(result);
        });
    }
    /**
     * 统一下单
     */
    unifiedOrderBase(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.completeURL(UNIFIED_ORDER_BASE);
            const extra = yield this.createFetchOptions(url);
            return fetch_1.fetch(options, extra);
        });
    }
}
exports.default = PayBaseX;
