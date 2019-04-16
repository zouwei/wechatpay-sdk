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
const fetch_1 = require("../fetch");
const Base_1 = require("./core/Base");
const PAY_BANK_BASE = "/mmpaysptrans/pay_bank";
const QUERY_BANK_BASE = "/mmpaysptrans/query_bank";
const GET_PUBLIC_URL = "https://fraud.mch.weixin.qq.com/risk/getpublickey";
const TRANSFERS_BASE = "/mmpaymkttransfers/promotion/transfers";
const GET_TRANSFER_INFO_BASE = "/mmpaymkttransfers/gettransferinfo";
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
class Bank extends Base_1.default {
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
    transfers(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.completeURL(TRANSFERS_BASE);
            const extra = yield this.createFetchOptions(url, true);
            extra.mapAppId = "mch_appid";
            extra.mapMchId = "mchid";
            return fetch_1.fetch(options, extra);
        });
    }
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
    getTransferInfo(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.completeURL(GET_TRANSFER_INFO_BASE);
            const extra = yield this.createFetchOptions(url, true);
            return fetch_1.fetch(options, extra);
        });
    }
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
    payBank(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.completeURL(PAY_BANK_BASE);
            const extra = yield this.createFetchOptions(url, true);
            extra.mapAppId = "-";
            return fetch_1.fetch(options, extra);
        });
    }
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
    queryBank(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.completeURL(QUERY_BANK_BASE);
            const extra = yield this.createFetchOptions(url, true);
            extra.mapAppId = "-";
            return fetch_1.fetch(options, extra);
        });
    }
    /**
     * 获取RSA加密公钥
     *
     * ```
     * pay.getPublicKey({
     *  sign_type: SignType.MD5
     * });
     * ```
     */
    getPublicKey(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const extra = yield this.createFetchOptions(GET_PUBLIC_URL, true);
            extra.mapAppId = "-";
            return fetch_1.fetch(options, extra);
        });
    }
}
exports.Bank = Bank;
