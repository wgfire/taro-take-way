import Taro from "@tarojs/taro";
import type { GlobalException } from ".";

export type ExceptionHandler = (exception: GlobalException) => void;

export const createExceptionCollector = (exceptionHandler: ExceptionHandler) => {
  Taro.onUnhandledRejection(error => exceptionHandler(error.reason));
  Taro.onError(exceptionHandler);
};
