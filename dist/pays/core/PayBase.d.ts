import * as types from "../../types";
import Base from "./Base";
/**
 * 支付基类
 */
declare class PayBase extends Base {
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
    orderQuery(options: types.OrderQueryOptions): Promise<types.SuccessT<types.OrderQueryResponseSuccess> | types.FailT<types.OrderQueryResponseFail>>;
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
    refund(options: types.RefundOptions): Promise<types.SuccessT<types.RefundResponseSuccess> | types.FailT<types.RefundResponseFail>>;
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
    refundQuery(options: types.RefundQueryOptions): Promise<types.SuccessT<types.RefundQueryResponseSuccess> | types.FailT<types.RefundQueryResponseFail>>;
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
    downloadBill(options: types.DownloadBillOptions): Promise<string | types.DownloadBillReturn>;
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
    downloadFundFlow(options: types.DownloadFundFlowOptions): Promise<string | types.DownloadFundFlowReturn>;
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
    batchQueryComment(options: types.BatchQueryCommentOptions): Promise<types.SuccessT<types.BatchQueryCommentResponseSuccess> | types.FailT<types.BatchQueryCommentResponseFail>>;
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
    refundNotify(baseData: types.RefundNotifyBase, handler: types.RefundNotifyHandler): Promise<string>;
}
export default PayBase;
