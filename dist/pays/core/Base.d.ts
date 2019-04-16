/// <reference types="node" />
import * as types from "../../types";
/**
 * 基类
 */
declare class Base {
    /**
     * 公众账号ID
     */
    readonly appId: string;
    /**
     * 商户号
     */
    readonly mchId: string;
    /**
     * 密钥
     */
    readonly key: string;
    /**
     * 证书
     */
    readonly pfx: Buffer;
    /**
     * 测试用验签密钥
     */
    keyForDebug: string;
    /**
     * 仿真模式开关
     */
    debug: boolean;
    constructor(options: types.ConstructorOptions);
    /**
     * 仿真模式开关
     * @see {@link https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=23_1}
     */
    setDebug(useDebug: boolean): Promise<void>;
    /**
     * 校验 sign
     */
    verifySign(data: {
        sign: string;
    }, signType?: types.SignType): boolean;
    /**
     * 生成 FetchOptions 数据
     */
    protected createFetchOptions(url: string, usePfx?: boolean): Promise<types.FetchOptions>;
    /**
     * 拼接路径
     */
    protected completeURL(base: string): string;
    /**
     * 获取私钥
     */
    protected getKey(): string;
}
export default Base;
