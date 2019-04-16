import * as types from "../types";
import Base from "./core/Base";
/**
 * 企业付款
 *
 * ```
 * const pay = new Bank({
 *   appId: "wxb80e5bddb2d804f3",
 *   key: "6Q9VX4N3WTBM9G9XBL7H1L9PB9ANHLY7",
 *   mchId: "1434712502",
 *   pfx: fs.readFileSync(path.resolve(__dirname, "cert.p12"))
 * });
 * ```
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=14_1}
 */
export declare class Bank extends Base {
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
}
