import * as types from "./types";
/**
 * 远程调用
 */
export declare function fetch<U, S extends types.BaseReturn, F extends types.BaseReturn>(data: U, extra: types.FetchOptions): Promise<S | F>;
/**
 * 远程下载
 */
export declare function download<U, F extends types.BaseReturn>(data: U, extra: types.FetchOptions): Promise<string | F>;
