import * as types from "../../types";
import PayBase from "./PayBase";
/**
 * `PayBase` 基础上添加方法 `closeOrder`, `payNotify`，是公众号支付，扫码支付，APP支付，H5支付，和小程序支付的基类
 */
export default class PayBaseX extends PayBase {
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
    closeOrder(options: types.CloseOrderOptions): Promise<types.SuccessT<types.CloseOrderResponseSuccess> | types.FailT<types.CloseOrderResponseFail>>;
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
    report(options: types.ReportOptionsGeneral): Promise<types.SuccessT<types.ReportResponseSuccess> | types.FailT<types.ReportResponseFail>>;
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
    payNotify(info: types.PayNotifySuccess | types.PayNotifyFail, handler: types.PayNotifyHandler): Promise<string>;
    /**
     * 统一下单
     */
    protected unifiedOrderBase(options: types.UnifiedOrderOptionsGeneral): Promise<types.SuccessT<types.UnifiedOrderResponseSuccess> | types.FailT<types.UnifiedOrderResponseFail>>;
}
