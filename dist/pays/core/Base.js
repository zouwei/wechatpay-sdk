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
const fetch_1 = require("../../fetch");
const utils_1 = require("../../utils");
const GET_SIGN_KEY_BASE = "/pay/getsignkey";
const URL_MCH = "https://api.mch.weixin.qq.com";
const URL_SANBOX = URL_MCH + "/sandboxnew";
/**
 * 基类
 */
class Base {
    constructor(options) {
        /**
         * 仿真模式开关
         */
        this.debug = false;
        const { appId, mchId, key, pfx } = options;
        this.appId = appId;
        this.mchId = mchId;
        this.key = key;
        this.pfx = pfx;
    }
    /**
     * 仿真模式开关
     * @see {@link https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=23_1}
     */
    setDebug(useDebug) {
        return __awaiter(this, void 0, void 0, function* () {
            if (useDebug && !this.keyForDebug) {
                const url = URL_SANBOX + GET_SIGN_KEY_BASE;
                const extra = {
                    appid: this.appId,
                    mch_id: this.mchId,
                    key: this.key,
                    url,
                    nonce_str: utils_1.nonceStr(),
                    mapAppId: "-"
                };
                return fetch_1.fetch({}, extra).then(result => {
                    this.keyForDebug = result.sandbox_signkey;
                    this.debug = useDebug;
                });
            }
            this.debug = useDebug;
        });
    }
    /**
     * 校验 sign
     */
    verifySign(data, signType = "MD5" /* MD5 */) {
        const signData = utils_1.sign(signType, data, this.getKey());
        return signData === data.sign;
    }
    /**
     * 生成 FetchOptions 数据
     */
    createFetchOptions(url, usePfx = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = this.getKey();
            let ret = {
                appid: this.appId,
                mch_id: this.mchId,
                key,
                url,
                nonce_str: utils_1.nonceStr()
            };
            if (usePfx) {
                ret.pfx = this.pfx;
            }
            return ret;
        });
    }
    /**
     * 拼接路径
     */
    completeURL(base) {
        if (this.debug) {
            return URL_SANBOX + base;
        }
        return URL_MCH + base;
    }
    /**
     * 获取私钥
     */
    getKey() {
        return this.debug ? this.keyForDebug : this.key;
    }
}
exports.default = Base;
