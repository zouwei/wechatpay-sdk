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
const fetch_1 = require("../../../fetch");
const utils_1 = require("../../../utils");
const Base_1 = require("../../core/Base");
const REFUND_BASE = "/secapi/pay/refund";
const REFUND_QUERY_BASE = "/pay/refundquery";
const CONTRACT_ORDER_BASE = "/pay/contractorder";     // 修改了这
const QUERY_CONTRACT_BASE = "/papay/querycontract";
const PAP_PAY_APPLY_BASE = "/pay/pappayapply";
const DELETE_CONTRACT_BASE = "/papay/deletecontract";
const PAP_ORDER_QUERY_BASE = "/pay/paporderquery";
const DOWNLOAD_BILL_BASE = "/pay/downloadbill";
/**
 * 微信代扣基类
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=17_2}
 */
class EntrustBase extends Base_1.default {
    /**
     * 签约，解约结果通知
     *
     * ```
     * router.post("/wechatpay/notify/contract", (req, res) => {
     *   getXMLBody(req, options).then(data => {
     *     pay
     *       .contractNotify(data, async parsedData => {
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
     * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_17&index=5}
     */
    contractNotify(info, handler) {
        return __awaiter(this, void 0, void 0, function* () {
            if (info.return_code === "FAIL" || info.result_code === "FAIL") {
                return utils_1.toXML({
                    return_code: info.return_code,
                    return_msg: info.return_msg
                });
            }
            const result = handler(info);
            return utils_1.toXML(result);
        });
    }
    /**
     * 查询签约关系
     *
     * ```
     * pay.queryContract({
     *   contract_id: "120061098828009406"
     * });
     *
     * pay.queryContract({
     *   plan_id: 123,
     *   contract_code: "1023658866"
     * });
     * ```
     * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_2&index=6}
     */
    queryContract(options) {
        console.log("入参>>>>", options)// "https://api.mch.weixin.qq.com" + 
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.completeURL(QUERY_CONTRACT_BASE);

            let extra = yield this.createFetchOptions(url);
            // 删除 
            delete extra.nonce_str;     // 没有这个参数
            console.log("extra>>>", options, extra)
            extra.consts = { version: "1.0" };

            return fetch_1.fetch(options, extra);
        });
    }
    /**
     * 申请扣款
     *
     * ```
     * pay.papPayApply({
     *   body: "水电代扣",
     *   out_trade_no: "1217752501201407033233368018",
     *   total_fee: 888,
     *   spbill_create_ip: "8.8.8.8",
     *   notify_url: "https://example.com/wechatpay/pap/notify",
     *   contract_id: "Wx15463511252015071056489715"
     * });
     * ```
     * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_3&index=7}
     */
    papPayApply(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.completeURL(PAP_PAY_APPLY_BASE);
            const extra = yield this.createFetchOptions(url);
            extra.consts = { trade_type: "PAP" };
            return fetch_1.fetch(options, extra);
        });
    }
    /**
     * 申请解约
     *
     * ```
     * pay.deleteContract({
     *   contract_id: "120061098828009406",
     *   contract_termination_remark: "解约原因"
     * });
     *
     * pay.deleteContract({
     *   plan_id: "123",
     *   contract_code: "1023658866",
     *   contract_termination_remark: "解约原因"
     * });
     * ```
     * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_4&index=8}
     */
    deleteContract(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.completeURL(DELETE_CONTRACT_BASE);
            const extra = yield this.createFetchOptions(url);
            delete extra.nonce_str;     // 没有这个参数
            extra.consts = { version: "1.0" };
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
     * })
     * ```
     * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_6&index=9}
     */
    downloadBill(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.completeURL(DOWNLOAD_BILL_BASE);
            const extra = yield this.createFetchOptions(url);
            return fetch_1.download(options, extra);
        });
    }
    /**
     * 扣款结果通知
     *
     * ```
     * router.post("/wechatpay/notify/refund", (req, res) => {
     *   getXMLBody(req, options).then(data => {
     *     pay
     *       .papPayNotify(data, async parsedData => {
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
     * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_7&index=10}
     */
    papPayNotify(info, handler) {
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
     * 申请退款
     *
     * ```
     * pay.refund({
     *  out_trade_no: '1217752501201407033233368018',
     *  out_refund_no: '1217752501201407033233368019',
     *  total_fee: 100,
     *  refund_fee: 80
     * })
     * ```
     * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_8&index=11}
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
     * })
     *
     * pay.refundQuery({
     *   out_trade_no: '120061098828009406'
     * })
     * ```
     * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_9&index=12}
     */
    refundQuery(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.completeURL(REFUND_QUERY_BASE);
            const extra = yield this.createFetchOptions(url);
            return fetch_1.fetch(options, extra);
        });
    }
    /**
     * 查询订单
     *
     * ```
     * pay.papOrderQuery({
     *   transaction_id: '1009660380201506130728806387'
     * })
     *
     * pay.papOrderQuery({
     *   out_trade_no: '120061098828009406'
     * })
     * ```
     * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=18_9&index=12}
     */
    papOrderQuery(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.completeURL(PAP_ORDER_QUERY_BASE);
            const extra = yield this.createFetchOptions(url);
            return fetch_1.fetch(options, extra);
        });
    }
    contractOrderBase(options, tradeType) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.completeURL(CONTRACT_ORDER_BASE);
            const extra = yield this.createFetchOptions(url);
            extra.consts = { trade_type: tradeType };
            return fetch_1.fetch(options, extra);
        });
    }

    // 基础方法
    entrustBase(options, signType) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = Object.assign({
                appid: this.appId,
                mch_id: this.mchId
            }, options);
            const key = this.getKey();
            // 必须提取到前面
            data.timestamp = Math.ceil(Date.now() / 1000);
            data.version = "1.0";
            const signData = utils_1.sign(signType || "MD5", data, key);         // HMAC-SHA256
            data.sign = signData;
            
            return data;
        });
    }
}
exports.default = EntrustBase;
