const __DEV__ = process.env.NODE_ENV === "development";
const RUN_ENV = process.env.RUN_ENV;

const baseModule = "micro-gfyx-mp-api";

export const ENV_CONFIG = {
  test: {
    domain: "b2btst.com",
  },
  beta: {
    domain: "b2bmir.com",
  },
  prod: {
    domain: "mycaigou.com",
  },
};

// （开发环境）若设置环境变量RUN_ENV(test/prod)，则使用配置，
// 否则根据默认，开发用test，正式用prod
function initEnv(env?: string) {
  if (!env) {
    return __DEV__ ? ENV_CONFIG.test : ENV_CONFIG.prod;
  }

  return ENV_CONFIG[env] || ENV_CONFIG.prod;
}

export const env = initEnv(RUN_ENV);

export const paths = {
  /**
   * 构建url
   * @param {String} url 路径地址
   * @param {String} modules 二级域名
   * @param {String} protocol 协议
   * @return 全路径地址
   */
  url(url = "", modules = baseModule, domain = env.domain, protocol = "https") {
    // 非 / 开头的请求（第三方）则直接输出
    if (url && url.indexOf("/") !== 0) {
      return url;
    }

    protocol = protocol ? `${protocol}:` : "";

    return `${protocol}//${modules ? `${modules}.` : ""}${domain}${url}`;
  },

  /**
   * 请求地址
   * @param {String} url 路径地址
   * @param {String} modules 二级域名
   */
  api(url: string, modules = baseModule) {
    return this.url(url, modules);
  },
};
