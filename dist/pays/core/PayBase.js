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
const Base_1 = require("./Base");
const ORDER_QUERY_BASE = "/pay/orderquery";
const REFUND_BASE = "/secapi/pay/refund";
const REFUND_QUERY_BASE = "/pay/refundquery";
const DOWNLOAD_BILL_BASE = "/pay/downloadbill";
const DOWNLOAD_FUND_FLOW_BASE = "/pay/downloadfundflow";
const BATCH_QUERY_COMMENT_BASE = "/billcommentsp/batchquerycomment";
/**
 * 支付基类
 */
class PayBase extends Base_1.default {
    /**
     * 查询订单
     *
     * ```
     * pay.orderQuery({
     *   transaction_id: '1009660380201506130728806387'
     * })
     *
     * pay.orderQuery({
     *   out_trade_no: '120061098828009406'
     * });
     * ```
     * @see {@link https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_2}
     */
    orderQuery(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.completeURL(ORDER_QUERY_BASE);
            const extra = yield this.createFetchOptions(url);
            return fetch_1.fetch(options, extra);
        });
    }
    /**
     * 申请退款
     *
     * ```
     * pay.refund({
     *  out_trade_no: '1217752501201407033233368018',
     *  out_refund_no: '1217752501201407033233368019',
     *  total_fee: 100,
     *  refund_fee: 80
     * });
     * ```
     * @see {@link https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_4}
     */
    refund(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.completeURL(REFUND_BASE);
            const extra = yield this.createFetchOptions(url, true);
            return fetch_1.fetch(options, extra);
        });
    }
    /**
     * 查询退款
     *
     * ```
     * pay.refundQuery({
     *   transaction_id: '1009660380201506130728806387'
     * });
     *
     * pay.refundQuery({
     *   out_trade_no: '120061098828009406'
     * });
     * ```
     * @see {@link https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_5}
     */
    refundQuery(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.completeURL(REFUND_QUERY_BASE);
            const extra = yield this.createFetchOptions(url);
            return fetch_1.fetch(options, extra);
        });
    }
    /**
     * 下载对账单
     *
     * ```
     * pay.downloadBill({
     *   bill_date: "20140603",
     *   bill_type: "ALL"
     * });
     * ```
     * @see {@link https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_6}
     */
    downloadBill(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.completeURL(DOWNLOAD_BILL_BASE);
            const extra = yield this.createFetchOptions(url);
            return fetch_1.download(options, extra);
        });
    }
    /**
     * 下载资金账单
     *
     * ```
     * pay.downloadFundFlow({
     *   bill_date: "20140603",
     *   account_type: "Basic",
     *   tar_type: "GZIP"
     * });
     * ```
     * @see {@link https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_18&index=7}
     */
    downloadFundFlow(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.completeURL(DOWNLOAD_FUND_FLOW_BASE);
            const extra = yield this.createFetchOptions(url);
            return fetch_1.download(options, extra);
        });
    }
    /**
     * 拉取订单评价数据
     *
     * ```
     * pay.batchQueryComment({
     *   begin_time: "20170724000000",
     *   end_time: "20170725000000",
     *   offset: 0
     * });
     * ```
     * @see {@link https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_17&index=12}
     */
    batchQueryComment(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.completeURL(BATCH_QUERY_COMMENT_BASE);
            const extra = yield this.createFetchOptions(url);
            return fetch_1.fetch(options, extra);
        });
    }
    /**
     * 退款结果通知处理
     *
     * ```
     * router.post("/wechatpay/notify/refund", (req, res) => {
     *   getXMLBody(req, options).then(data => {
     *     pay
     *       .refundNotify(data, async parsedData => {
     *         if (!pay.verifySign(parsedData)) {
     *           // 签名校验失败
     *         }
     *         if (parsedData.result_code === "FAIL") {
     *           // 业务逻辑失败
     *         }
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
     * @see {@link https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_16&index=11}
     */
    refundNotify(baseData, handler) {
        return __awaiter(this, void 0, void 0, function* () {
            if (baseData.return_code === "FAIL") {
                return utils_1.toXML({
                    return_code: baseData.return_code,
                    return_msg: baseData.return_msg
                });
            }
            const key = this.getKey();
            const decodeRawData = utils_1.decode(key, baseData.req_info);
            const decodeData = JSON.parse(decodeRawData);
            const result = yield handler(Object.assign(baseData, decodeData));
            return utils_1.toXML(result);
        });
    }
}
exports.default = PayBase;
