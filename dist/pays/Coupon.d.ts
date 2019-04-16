import * as types from "../types";
import Base from "./core/Base";
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
export declare class Coupon extends Base {
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
}
