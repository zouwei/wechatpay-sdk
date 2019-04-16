/**
 * 微信调用返回值 `return_code` 为 FAIL 时抛出
 */
export declare class CommunicationError extends Error {
    /**
     * 状态码
     */
    readonly returnCode: string;
    /**
     * 信息
     */
    readonly returnMsg: string;
    constructor(code: string, msg: string);
}
/**
 * 远程调用微信 API 失败
 */
export declare class RequestError extends Error {
    readonly err: any;
    constructor(err: any);
}
/**
 * 签名错误
 */
export declare class ValidateSignError extends Error {
    data: any;
    constructor(data: any);
}
/**
 * 业务错误
 */
export declare class BusinessError extends Error {
    code: string;
    codeDes: string;
    constructor(ret: {
        err_code?: string;
        err_code_des?: string;
    });
}
