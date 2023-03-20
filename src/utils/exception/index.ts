export abstract class Exception {
  /** 发生异常的时间 */
  abstract readonly date: string;

  /** 异常信息 */
  abstract readonly message: string;
}

/** 接口返回的异常提示信息 */
export class MessageException extends Exception {
  readonly date = new Date().toISOString();

  readonly message;

  readonly code;

  constructor(code: number, message: string) {
    super();
    this.code = code;
    this.message = message;
  }
}

/** 接口请求报错异常, status 为 [400, 500) */
export class BadRequestException extends Exception {
  readonly date = new Date().toISOString();

  readonly message;

  readonly url;

  readonly body;

  readonly query;

  constructor(url: string, body: any, query: any, message: any) {
    super();
    this.url = url;
    this.body = body;
    this.query = query;
    this.message = message;
  }
}

/** 接口返回服务器错误的异常，通常 status 为 500+ */
export class ServerErrorException extends Exception {
  readonly date = new Date().toISOString();

  readonly message;

  readonly url;

  readonly data;

  /** http 状态码 */
  readonly status;

  constructor(url: string, data: any, status: number, message: any) {
    super();
    this.url = url;
    this.data = data;
    this.status = status;
    this.message = message;
  }
}

/** 网络异常 */
export class NetworkException extends Exception {
  readonly date = new Date().toISOString();

  readonly message: string;

  constructor(message = "请查看网络是否连接") {
    super();
    this.message = message;
  }
}

/** 组件异常 */
export class ReactLifecycleException extends Exception {
  readonly date = new Date().toISOString();

  readonly message;

  readonly stack;

  readonly componentStack;

  constructor(message: string, stack: string, componentStack: string) {
    super();
    this.message = message;
    this.stack = stack;
    this.componentStack = componentStack;
  }
}
// TODO: ReactLifecycleException 错误边界，待实现，ref: https://docs.taro.zone/docs/react-error-handling
/**
 * 引用中所有的异常
 * - Error 运行时异常
 * - string Taro.onError 获取到的异常数据类型
 */
export type GlobalException = MessageException | BadRequestException | ServerErrorException | NetworkException | ReactLifecycleException | Error | string;
