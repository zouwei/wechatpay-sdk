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
const buffer = require("buffer");
const crypto = require("crypto");
const getRawBody = require("raw-body");
const xml2js = require("xml2js");
/**
 * 生成随机字符串
 */
function nonceStr(length = 32) {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const len = chars.length;
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * len));
    }
    return result;
}
exports.nonceStr = nonceStr;
/**
 * 转换成 XML 格式
 */
function toXML(data) {
    const builder = new xml2js.Builder({
        rootName: "xml",
        headless: true
    });
    return builder.buildObject(data);
}
exports.toXML = toXML;
/**
 * 从 XML 格式字符串生成对象
 */
function fromXML(data) {
    const parser = new xml2js.Parser({
        trim: true,
        explicitArray: false,
        explicitRoot: false
    });
    return new Promise((resolve, reject) => {
        parser.parseString(data, (err, ret) => {
            if (err) {
                return reject(err);
            }
            resolve(ret);
        });
    });
}
exports.fromXML = fromXML;
/**
 * 签名
 */
function sign(signType, data, secret) {
    console.log('签名入参>>>>>>>>>>', data)
    const combined = Object.keys(data)
        .filter(key => key !== "sign" &&
            data.hasOwnProperty(key) &&
            data[key] !== undefined &&
            data[key] !== null &&
            data[key] !== "")
        .sort()
        .map(key => key + "=" + data[key])
        .join("&") +
        "&key=" +
        secret;

    console.log("签名结果11>>", signType, combined)
    if (signType === "MD5" /* MD5 */) {
        return md5(combined).toUpperCase();
    }
    else {
        return hmacSha256(secret, combined).toUpperCase();
    }
}
exports.sign = sign;
/**
 * md5 加密
 */
function md5(data) {
    return crypto
        .createHash("md5")
        .update(data)
        .digest("hex");
}
exports.md5 = md5;
/**
 * HMAC-SHA256 加密
 */
function hmacSha256(secret, data) {
    return crypto
        .createHmac("sha256", secret)
        .update(data)
        .digest("hex");
}
exports.hmacSha256 = hmacSha256;
/**
 * RSA 加密
 */
function rsa(pemKey, data) {
    return crypto
        .publicEncrypt(pemKey, buffer.Buffer.from(data))
        .toString("base64");
}
exports.rsa = rsa;
/**
 * 解密
 */
function decode(key, data) {
    const secret = md5(key).toLowerCase();
    const decipher = crypto.createDecipheriv("aes-256-ecb", secret, "");
    decipher.setAutoPadding(true);
    const decipherChunks = [];
    decipherChunks.push(decipher.update(data, "base64", "utf8"));
    decipherChunks.push(decipher.final("utf8"));
    return decipherChunks.join("");
}
exports.decode = decode;
/**
 * 从请求中获取 xml 数据并解析
 */
function getXMLBody(req, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const rawData = yield getRawBody(req, options);
        return fromXML(rawData.toString("utf8"));
    });
}
exports.getXMLBody = getXMLBody;
