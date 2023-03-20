import Taro from "@tarojs/taro";
import { storageUtil } from "./storageUtil";
import { paths } from "@src/config/env.config";
import { MessageException, ServerErrorException } from "./exception";

/** 接口返回的数据定义，业务数据在 data 中 */
export interface ResponseData<T> {
  /** 值为 false 代表请求出现异常 */
  success: boolean;
  error_code: number;
  message: string;
  // FIXME: 后端遗留问题
  data:
    | T // 登录接口没有 result
    | {
        // 建模接口有 result
        result: T;
      };
}

const domainInterceptor = (chain: Taro.Chain) => {
  const requestParams = chain.requestParams;
  requestParams.url = `${paths.api("")}${requestParams.url}`;
  return chain.proceed(requestParams);
};

const headerInterceptor = (chain: Taro.Chain) => {
  const requestParams = chain.requestParams;
  const token = storageUtil.get("token");
  requestParams.header = {
    ...requestParams.header,
    Authorization: `bearer ${token}`,
  };
  return chain.proceed(requestParams);
};

/** 异常定义 */
const exceptionInterceptor = (chain: Taro.Chain) => {
  return chain.proceed(chain.requestParams).then((response: Taro.request.SuccessCallbackResult<ResponseData<unknown>>) => {
    const { data, statusCode } = response;
    const { success, error_code, message } = data;

    // TODO: 根据网络未连接时的信息，更新条件语句
    // if ("网络断开") {
    // 	throw new NetworkException();
    // }
    if (statusCode >= 400 && statusCode < 600) {
      throw new ServerErrorException(chain.requestParams.url, chain.requestParams.data, statusCode, response.errMsg);
    }
    if (statusCode >= 200 && statusCode < 300) {
      if (success === false) {
        throw new MessageException(error_code, message);
      }
    }
    return response;
  });
};

const logInterceptor = (chain: Taro.Chain) => {
  const requestParams = chain.requestParams;
  return chain
    .proceed(chain.requestParams)
    .then((response: Taro.request.SuccessCallbackResult<ResponseData<unknown>>) => {
      console.log("【API】", requestParams.url, requestParams, response.data);
      return response;
    })
    .catch((error: any) => {
      console.error("【API】异常", requestParams.url, error);
      throw error;
    });
};

if (process.env.RUN_ENV !== "prod") {
  Taro.addInterceptor(logInterceptor);
}
Taro.addInterceptor(domainInterceptor);
Taro.addInterceptor(headerInterceptor);
Taro.addInterceptor(exceptionInterceptor);

// const _preflight

// export const preflight = () => {
//   if (_preflight) {
//     return _preflight;
//   }

//   return new Promise((resolve, reject) => {
//     resolve();
//   })
// }

/**
 * - 当 method 为 get 时，data 会自动做 url encode 生成 querystring
 * @see https://docs.taro.zone/docs/apis/network/request/
 * @example
 * ```ts
 * request<Response, Body | Query>({url: 'x', data: body | query})
 * ```
 */
export const request = async <Res = any, Data extends string | TaroGeneral.IAnyObject | ArrayBuffer = any>(option: Taro.request.Option<ResponseData<Res>, Data>) => {
  // const result = await preflight().then(() => Taro.request<ResponseData<Res>>(option));
  const result = await Taro.request<ResponseData<Res>>(option);

  // FIXME: 后端遗留问题
  if (result.data.data !== null && typeof result.data.data === "object" && "result" in result.data.data) {
    return result.data.data.result;
  }
  /** 提取业务数据 */
  return result.data.data;
};
