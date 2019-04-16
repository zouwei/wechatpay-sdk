import * as types from "../types";
import PayBase from "./core/PayBase";
/**
 * 总和类，糅合所有接口
 *
 * ```
 * const pay = new Pay({
 *   appId: "wxb80e5bddb2d804f3",
 *   key: "6Q9VX4N3WTBM9G9XBL7H1L9PB9ANHLY7",
 *   mchId: "1434712502",
 *   pfx: fs.readFileSync(path.resolve(__dirname, "cert.p12"))
 * });
 * ```
 */
export declare class Pay extends PayBase {
    private readonly payBaseX;
    private readonly pubScanPay;
    private readonly bank;
    private readonly coupon;
    private readonly redPack;
    constructor(options: types.ConstructorOptions);
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
     * @see {@link https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_8&index=9} or
     *   {@link https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_10&index=1}
     */
    report(options: types.ReportOptionsGeneral | types.ReportOptionsPubScan): Promise<types.SuccessT<types.ReportResponseSuccess> | types.FailT<types.ReportResponseFail>>;
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
     *
     * ```
     * pay.unifiedOrder({
     *   trade_type: "APP",
     *   body: "腾讯充值中心-QQ会员充值",
     *   out_trade_no: "1217752501201407033233368018",
     *   total_fee: 888,
     *   spbill_create_ip: "8.8.8.8",
     *   notify_url: "https://example.com/wechatpay/notify"
     * });
     * ```
     */
    unifiedOrder(options: types.UnifiedOrderOptionsGeneral): Promise<types.SuccessT<types.UnifiedOrderResponseSuccess> | types.FailT<types.UnifiedOrderResponseFail>>;
    /**
     * 提交刷卡支付
     *
     * ```
     * pay.microPay({
     *   device_info: "013467007045764",
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
    /**
     * 企业付款到零钱
     *
     * ```
     * pay.transfers({
     *   partner_trade_no: "10000098201411111234567890",
     *   openid: "oxTWIuGaIt6gTKsQRLau2M0yL16E",
     *   check_name: "FORCE_CHECK",
     *   amount: 10099,
     *   desc: "理赔",
     *   spbill_create_ip: "192.168.0.1"
     * });
     * ```
     * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=14_2}
     */
    transfers(options: types.TransfersOptions): Promise<types.SuccessT<types.TransfersResponseSuccess> | types.FailT<types.TransfersResponseFail>>;
    /**
     * 查询企业付款到零钱
     *
     * ```
     * pay.getTransferInfo({
     *   partner_trade_no: "10000098201411111234567890"
     * });
     * ```
     * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=14_3}
     */
    getTransferInfo(options: types.GetTransferInfoOptions): Promise<types.SuccessT<types.GetTransferInfoResponseSuccess> | types.FailT<types.GetTransferInfoResponseFail>>;
    /**
     * 企业付款到银行卡
     *
     * ```
     * pay.payBank({
     *   partner_trade_no: "1212121221227",
     *   enc_bank_no: utils.rsa(pemKey, "6225760017946512"),
     *   enc_true_name: utils.rsa(pemKey, "王小王"),
     *   bank_code: "1001",
     *   amount: 100,
     *   desc: "理财"
     * });
     * // pemKey 通过 `pay.getPublicKey` 获取
     * ```
     * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=24_2}
     */
    payBank(options: types.PayBankOptions): Promise<types.SuccessT<types.PayBankResponseSuccess> | types.FailT<types.PayBankResponseFail>>;
    /**
     * 查询企业付款到银行卡
     *
     * ```
     * pay.queryBank({
     *   partner_trade_no: "1212121221227"
     * });
     * ```
     * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=24_3}
     */
    queryBank(options: types.QueryBankOptions): Promise<types.SuccessT<types.QueryBankResponseSuccess> | types.FailT<types.QueryBankResponseFail>>;
    /**
     * 获取RSA加密公钥
     *
     * ```
     * pay.getPublicKey({
     *  sign_type: SignType.MD5
     * });
     * ```
     */
    getPublicKey(options: types.GetPublicKeyOptions): Promise<types.SuccessT<types.GetPublicKeyResponseSuccess> | types.FailT<types.GetPublicKeyResponseFail>>;
    /**
     * 发放代金券
     *
     * ```
     * pay.sendCoupon({
     *   coupon_stock_id: "1757",
     *   openid_count: 1,
     *   partner_trade_no: "1000009820141203515766",
     *   openid: "onqOjjrXT-776SpHnfexGm1_P7iE"
     * });
     * ```
     * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/sp_coupon.php?chapter=12_3&index=4}
     */
    sendCoupon(options: types.SendCouponOptions): Promise<types.SuccessT<types.SendCouponResponseSuccess> | types.FailT<types.SendCouponResponseFail>>;
    /**
     * 查询代金券批次
     *
     * ```
     * pay.queryCouponStock({
     *   coupon_stock_id: "1757"
     * });
     * ```
     * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/sp_coupon.php?chapter=12_4&index=5}
     */
    queryCouponStock(options: types.QueryCouponStockOptions): Promise<types.SuccessT<types.QueryCouponStockResponseSuccess> | types.FailT<types.QueryCouponStockResponseFail>>;
    /**
     * 查询代金券信息
     *
     * ```
     * pay.queryCouponsInfo({
     *   coupon_id: "1565",
     *   openid: "onqOjjrXT-776SpHnfexGm1_P7iE",
     *   stock_id: "58818"
     * });
     * ```
     * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/sp_coupon.php?chapter=12_5&index=6}
     */
    queryCouponsInfo(options: types.QueryCouponsInfoOptions): Promise<types.SuccessT<types.QueryCouponsInfoResponseSuccess> | types.FailT<types.QueryCouponsInfoResponseFail>>;
    /**
     * 发放普通红包
     *
     * ```
     * pay.sendRedPack({
     *   mch_billno: "10000098201411111234567890",
     *   send_name: "天虹百货",
     *   re_openid: "oxTWIuGaIt6gTKsQRLau2M0yL16E",
     *   total_amount: 1000,
     *   total_num: 1,
     *   wishing: "红包祝福语",
     *   client_ip: "192.168.0.1",
     *   act_name: "猜灯谜抢红包活动",
     *   remark: "猜越多得越多，快来抢！"
     * });
     * ```
     * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/cash_coupon.php?chapter=13_4&index=3}
     */
    sendRedPack(options: types.SendRedPackOptions): Promise<types.SuccessT<types.SendRedPackResponseSuccess> | types.FailT<types.SendRedPackResponseFail>>;
    /**
     * 发放裂变红包
     *
     * ```
     * pay.sendGroupGroupRedPack({
     *   mch_billno: "10000098201411111234567890",
     *   send_name: "天虹百货",
     *   re_openid: "oxTWIuGaIt6gTKsQRLau2M0yL16E",
     *   total_amount: 1000,
     *   total_num: 1,
     *   wishing: "红包祝福语",
     *   act_name: "猜灯谜抢红包活动",
     *   remark: "猜越多得越多，快来抢！"
     * });
     * ```
     * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/cash_coupon.php?chapter=13_5&index=4}
     */
    sendGroupGroupRedPack(options: types.SendGroupRedPackOptions): Promise<types.SuccessT<types.SendGroupRedPackResponseSuccess> | types.FailT<types.SendGroupRedPackResponseFail>>;
    /**
     * 查询红包记录
     *
     * ```
     * pay.getHbInfo({
     *   mch_billno: "10000098201411111234567890"
     * });
     * ```
     * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/cash_coupon.php?chapter=13_6&index=5}
     */
    getHbInfo(options: types.GetHbInfoOptions): Promise<types.SuccessT<types.GetHbInfoResponseSuccess> | types.FailT<types.GetHbInfoResponseFail>>;
}
