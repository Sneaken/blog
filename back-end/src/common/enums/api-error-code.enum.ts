export enum ApiErrorCode {
  TIMEOUT = -1, // 系统繁忙
  SUCCESS = '00000', // 成功
  USER_PHONE_EXIST = 'A0111', // 手机号已存在
  USER_EMAIL_EXIST = 'A0112', // 邮箱已存在
  USER_LOGIN_INVALID = 'A0200', // 用户登陆失败
}
