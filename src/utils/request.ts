import Taro, { eventCenter } from "@tarojs/taro";
import { storageUtil } from "./storageUtil";
import { paths } from "@src/config/env.config";
import { MessageException, ServerErrorException } from "./exception";
import { usePresenter } from "../moduels/user/usePresenter";
/** 接口返回的数据定义，业务数据在 data 中 */
export interface ResponseData<T> {
  /** 值为 false 代表请求出现异常 */
  success: boolean;
  code: number;
  message: string;
  // FIXME: 后端遗留问题
  data: T; // 登录接口没有 result
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
    Authorization: `${token}`,
  };
  return chain.proceed(requestParams);
};

/** 异常定义 */
const exceptionInterceptor = (chain: Taro.Chain) => {
  return chain.proceed(chain.requestParams).then((response: Taro.request.SuccessCallbackResult<ResponseData<unknown>>) => {
    const { data, statusCode } = response;
    const { success, code, message } = data;
    if (statusCode >= 400 && statusCode < 600) {
      throw new ServerErrorException(chain.requestParams.url, chain.requestParams.data, statusCode, response.errMsg);
    }
    if (statusCode >= 200 && statusCode < 300) {
      if (success === false) {
        throw new MessageException(code, message);
      } else if (code !== 1000) {
        Taro.showToast({
          title: message,
          icon: "error",
        });
        if (code === 2015) {
          eventCenter.trigger("login");
        }
        throw new Error(message);
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
  Taro.showLoading({ title: "加载中" });
  const result = await Taro.request<ResponseData<Res>>(option);
  Taro.hideLoading();
  /** 提取业务数据 */
  return result.data;
};
