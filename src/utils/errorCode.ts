export enum ERROR_CODE {
  /** token 过期 */
  TOKEN_ERROR = 20010003,
  /** 绑定失败，手机无权限 */
  USER_BIND_FIAL = 20010006,
  /** 用户未绑定 */
  USER_UNBIND = 20010007,
  /** 用户被禁用 */
  USER_FORBIDDEN = 20010008,
}
