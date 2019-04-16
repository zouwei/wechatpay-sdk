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
const SEND_COUPON_BASE = "/mmpaymkttransfers/send_coupon";
const QUERY_COUPON_STOCK_BASE = "/mmpaymkttransfers/query_coupon_stock";
const QUERY_COUPONS_INFO_BASE = "/mmpaymkttransfers/querycouponsinfo";
/**
 * 代金券
 *
 * ```
 * const pay = new Coupon({
 *   appId: "wxb80e5bddb2d804f3",
 *   key: "6Q9VX4N3WTBM9G9XBL7H1L9PB9ANHLY7",
 *   mchId: "1434712502",
 *   pfx: fs.readFileSync(path.resolve(__dirname, "cert.p12"))
 * });
 * ```
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/sp_coupon.php?chapter=12_1}
 */
class Coupon extends Base_1.default {
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
    sendCoupon(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.completeURL(SEND_COUPON_BASE);
            const extra = yield this.createFetchOptions(url, true);
            return fetch_1.fetch(options, extra);
        });
    }
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
    queryCouponStock(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.completeURL(QUERY_COUPON_STOCK_BASE);
            const extra = yield this.createFetchOptions(url);
            return fetch_1.fetch(options, extra);
        });
    }
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
    queryCouponsInfo(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.completeURL(QUERY_COUPONS_INFO_BASE);
            const extra = yield this.createFetchOptions(url);
            return fetch_1.fetch(options, extra);
        });
    }
}
exports.Coupon = Coupon;
