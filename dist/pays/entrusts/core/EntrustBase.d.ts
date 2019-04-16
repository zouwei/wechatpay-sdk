import * as types from "../../../types";
import Base from "../../core/Base";
/**
 * 微信代扣基类
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/pap.php?chapter=17_2}
 */
declare class EntrustBase extends Base {
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
    contractNotify(info: types.ContractNotifySuccess | types.ContractNotifyFail, handler: types.ContractNotifyHandler): Promise<string>;
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
    queryContract(options: types.QueryContractOptions): Promise<types.SuccessT<types.QueryContractResponseSuccess> | types.FailT<types.QueryContractResponseFail>>;
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
    papPayApply(options: types.PapPayApplyOptions): Promise<types.SuccessT<types.PapPayApplyResponseSuccess> | types.FailT<types.PapPayApplyResponseFail>>;
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
    deleteContract(options: types.DeleteContractOptions): Promise<types.SuccessT<types.DeleteContractResponseSuccess> | types.FailT<types.DeleteContractResponseFail>>;
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
    downloadBill(options: types.DownloadBillOptions): Promise<string | types.BaseReturn>;
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
    papPayNotify(info: types.PapPayNotifySuccess | types.PapPayNotifyFail, handler: types.PapPayNotifyHandler): Promise<string>;
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
    refund(options: types.RefundOptions): Promise<types.SuccessT<types.RefundResponseSuccess> | types.FailT<types.RefundResponseFail>>;
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
    refundQuery(options: types.RefundQueryOptions): Promise<types.SuccessT<types.RefundQueryResponseSuccess> | types.FailT<types.RefundQueryResponseFail>>;
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
    papOrderQuery(options: types.PapOrderQueryOptions): Promise<types.SuccessT<types.PapOrderQueryResponseSuccess> | types.FailT<types.PapOrderQueryResponseFail>>;
    protected contractOrderBase(options: types.ContractOrderOptions, tradeType: string): Promise<types.SuccessT<types.ContractOrderResponseSuccess> | types.FailT<types.ContractOrderResponseFail>>;
    protected entrustBase(options: any): Promise<any>;
}
export default EntrustBase;
