import * as types from "../types";
import PayBase from "./core/PayBase";
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
export declare class PubScanPay extends PayBase {
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
    microPay(options: types.MicroPayOptions): Promise<types.SuccessT<types.MicroPayResponseSuccess> | types.FailT<types.MicroPayResponseFail>>;
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
    reverse(options: types.ReverseOptions): Promise<types.SuccessT<types.ReverseResponseSuccess> | types.FailT<types.ReverseResponseFail>>;
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
    report(options: types.ReportOptionsPubScan): Promise<types.SuccessT<types.ReportResponseSuccess> | types.FailT<types.ReportResponseFail>>;
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
    shortURL(options: types.ShortURLOptions): Promise<types.SuccessT<types.ShortURLResponseSuccess> | types.FailT<types.ShortURLResponseFail>>;
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
    authCodeToOpenId(options: types.AuthCodeToOpenIdOptions): Promise<types.SuccessT<types.AuthCodeToOpenIdResponseSuccess> | types.FailT<types.AuthCodeToOpenIdResponseFail>>;
}
