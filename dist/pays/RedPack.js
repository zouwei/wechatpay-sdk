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
const SEND_RED_PACK_BASE = "/mmpaymkttransfers/sendredpack";
const SEND_GROUP_RED_PACK_BASE = "/mmpaymkttransfers/sendgroupredpack";
const GET_HB_INFO_BASE = "/mmpaymkttransfers/gethbinfo";
/**
 * 现金红包
 *
 * ```
 * const pay = new RedPack({
 *   appId: "wxb80e5bddb2d804f3",
 *   key: "6Q9VX4N3WTBM9G9XBL7H1L9PB9ANHLY7",
 *   mchId: "1434712502",
 *   pfx: fs.readFileSync(path.resolve(__dirname, "cert.p12"))
 * });
 * ```
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/cash_coupon.php?chapter=13_1}
 */
class RedPack extends Base_1.default {
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
    sendRedPack(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.completeURL(SEND_RED_PACK_BASE);
            const extra = yield this.createFetchOptions(url, true);
            extra.mapAppId = "wxappid";
            return fetch_1.fetch(options, extra);
        });
    }
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
    sendGroupGroupRedPack(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.completeURL(SEND_GROUP_RED_PACK_BASE);
            const extra = yield this.createFetchOptions(url, true);
            extra.mapAppId = "wxappid";
            extra.consts = { amt_type: "ALL_RAND" };
            return fetch_1.fetch(options, extra);
        });
    }
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
    getHbInfo(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.completeURL(GET_HB_INFO_BASE);
            const extra = yield this.createFetchOptions(url, true);
            extra.consts = { bill_type: "MCHT" };
            return fetch_1.fetch(options, extra);
        });
    }
}
exports.RedPack = RedPack;
