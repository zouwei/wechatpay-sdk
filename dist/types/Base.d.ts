/// <reference types="node" />
/**
 * 基础返回数据
 */
export interface BaseReturn {
    /**
     * 返回状态码
     * @description SUCCESS/FAIL 此字段是通信标识，非交易标识，交易是否成功需要查看trade_state来判断
     * @example SUCCESS
     * @typedef String(16)
     */
    return_code: string;
    /**
     * 返回信息
     * @description 当return_code为FAIL时返回信息为错误原因 ，例如 签名失败 参数格式校验错误
     * @example OK
     * @typedef String(128)
     */
    return_msg?: string;
}
export interface SuccessReturn extends BaseReturn {
    /**
     * 业务结果
     * @description success/fail
     * @example success
     * @typedef string(16)
     */
    result_code: "SUCCESS";
}
/**
 * 业务逻辑成功返回数据
 */
export declare type SuccessT<T> = T & SuccessReturn;
export interface FailReturn extends BaseReturn {
    /**
     * 业务结果
     * @description success/fail
     * @example success
     * @typedef string(16)
     */
    result_code: "FAIL";
    /**
     * 错误代码
     * @description 详细参见错误列表
     * @example systemerror
     * @typedef string(32)
     */
    err_code?: string;
    /**
     * 错误代码描述
     * @description 错误返回的信息描述
     * @example 系统错误
     * @typedef string(128)
     */
    err_code_des?: string;
}
/**
 * 业务逻辑失败返回数据
 */
export declare type FailT<T> = T & FailReturn;
/**
 * 支付类构造函数选项
 */
export interface ConstructorOptions {
    appId: string;
    mchId: string;
    key: string;
    pfx: Buffer;
}
export declare const enum SignType {
    MD5 = "MD5",
    "HMAC-SHA256" = "HMAC-SHA256"
}
/**
 * 额外请求参数，支付实例自带或自动生成，不需要随 options 传递
 */
export interface FetchOptions {
    appid: string;
    mch_id: string;
    key: string;
    nonce_str: string;
    url: string;
    pfx?: Buffer;
    /**
     * appid 键名映射， 比如有些接口使用 app_id, wxappid
     */
    mapAppId?: string;
    /**
     * mch_id 键名映射
     */
    mapMchId?: string;
    /**
     * 固定值，将会直接合并到请求体中
     */
    consts?: {
        [k: string]: any;
    };
}
