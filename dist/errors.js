"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 微信调用返回值 `return_code` 为 FAIL 时抛出
 */
class CommunicationError extends Error {
    constructor(code, msg) {
        super(`${code}: ${msg}`);
        this.returnCode = code;
        this.returnMsg = msg;
    }
}
exports.CommunicationError = CommunicationError;
/**
 * 远程调用微信 API 失败
 */
class RequestError extends Error {
    constructor(err) {
        super(err.message ? err.message : "请求失败");
        this.err = err;
    }
}
exports.RequestError = RequestError;
/**
 * 签名错误
 */
class ValidateSignError extends Error {
    constructor(data) {
        super(`签名不匹配`);
        this.data = data;
    }
}
exports.ValidateSignError = ValidateSignError;
/**
 * 业务错误
 */
class BusinessError extends Error {
    constructor(ret) {
        super(`业务失败，err_code:${ret.err_code},err_code_des:${ret.err_code_des}`);
        this.code = ret.err_code;
        this.codeDes = ret.err_code_des;
    }
}
exports.BusinessError = BusinessError;
