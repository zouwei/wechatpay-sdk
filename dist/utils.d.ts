/// <reference types="node" />
import * as getRawBody from "raw-body";
import * as stream from "stream";
import * as types from "./types";
/**
 * 生成随机字符串
 */
export declare function nonceStr(length?: number): string;
/**
 * 转换成 XML 格式
 */
export declare function toXML(data: any): string;
/**
 * 从 XML 格式字符串生成对象
 */
export declare function fromXML<T>(data: string): Promise<T>;
/**
 * 签名
 */
export declare function sign(signType: types.SignType, data: object, secret: string): string;
/**
 * md5 加密
 */
export declare function md5(data: string): string;
/**
 * HMAC-SHA256 加密
 */
export declare function hmacSha256(secret: string, data: string): string;
/**
 * RSA 加密
 */
export declare function rsa(pemKey: string, data: string): string;
/**
 * 解密
 */
export declare function decode(key: string, data: string): string;
/**
 * 从请求中获取 xml 数据并解析
 */
export declare function getXMLBody(req: stream.Readable, options: getRawBody.Options): Promise<{}>;
