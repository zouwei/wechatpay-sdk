"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
const errors_1 = require("./errors");
const utils_1 = require("./utils");
/**
 * 远程调用
 */
function fetch(data, extra) {
    const options = createRequestOptions(data, extra);
    options.method = "POST";
    return new Promise((resolve, reject) => {
        console.log("options>>>>", options)
        request(options, (err, _, rawBody) => {
            if (err) {
                return reject(new errors_1.RequestError(err));
            }
            utils_1.fromXML(rawBody)
                .then(resBody => {
                    console.log("结果。。。。", resBody)
                    if (resBody.return_code === "FAIL") {
                        return reject(new errors_1.CommunicationError(resBody.return_code, resBody.return_msg));
                    }

                    resolve(resBody);
                })
                .catch(parseErr => {
                    reject(new errors_1.RequestError("解析失败: " + rawBody));
                });
        });
    });
}
exports.fetch = fetch;

exports.getFetch = (url, extra) => {
    const options = {
        method: "GET",
        uri: url,
        qs: extra || {}
    }
    return new Promise((resolve, reject) => {
        console.log("options>>>>", options)
        request(options, (err, _, rawBody) => {
            if (err) {
                return reject(new errors_1.RequestError(err));
            }
            utils_1.fromXML(rawBody)
                .then(resBody => {
                    console.log("结果。。。。", resBody)
                    if (resBody.return_code === "FAIL") {
                        return reject(new errors_1.CommunicationError(resBody.return_code, resBody.return_msg));
                    }

                    resolve(resBody);
                })
                .catch(parseErr => {
                    reject(new errors_1.RequestError("解析失败: " + rawBody));
                });
        });
    });
}


/**
 * 远程下载
 */
function download(data, extra) {
    const options = createRequestOptions(data, extra);
    options.method = "POST";
    return new Promise((resolve, reject) => {
        request(options, (err, _, rawBody) => {
            if (err) {
                return reject(new errors_1.RequestError(err));
            }
            utils_1.fromXML(rawBody)
                .then(resBody => {
                    if (resBody.return_code === "FAIL") {
                        return reject(new errors_1.CommunicationError(resBody.return_code, resBody.return_msg));
                    }
                    resolve(resBody);
                })
                .catch(parseErr => {
                    resolve(rawBody);
                });
        });
    });
}
exports.download = download;
function createRequestOptions(data, extra) {
    let body = Object.assign(extra.consts || {}, data, {
        nonce_str: extra.nonce_str
    });
    setBodyAppIdAndMchId(body, extra);
    body.sign = utils_1.sign(getSignType(data), body, extra.key);
    const options = {
        url: extra.url,
        body: utils_1.toXML(body)
    };
    if (extra.pfx) {
        options.agentOptions = {
            pfx: extra.pfx,
            passphrase: extra.mch_id
        };
    }
    return options;
}
function getSignType(data) {
    if (data.sign_type) {
        return data.sign_type;
    }
    return "MD5" /* MD5 */;
}
function setBodyAppIdAndMchId(body, extra) {
    if (extra.mapAppId) {
        if (extra.mapAppId !== "-") {
            body[extra.mapAppId] = extra.appid;
        }
    }
    else {
        body.appid = extra.appid;
    }
    if (extra.mapMchId) {
        if (extra.mapMchId !== "-") {
            body[extra.mapMchId] = extra.mch_id;
        }
    }
    else {
        body.mch_id = extra.mch_id;
    }
}
