export enum ApiErrorCode {
  TIMEOUT = -1, // 系统繁忙
  SUCCESS = '00000', // 成功
  USER_PHONE_EXIST = 'A0111', // 手机号已存在
  USER_EMAIL_EXIST = 'A0112', // 邮箱已存在

  USER_LOGIN_INVALID = 'A0200', // 用户登陆失败
  USER_NO_EXIST = 'A0201', // 用户不存在

  BLOG_INFO_ERROR = 'B0100', // 查询博客分类标签出错
  BLOG_CREATE_ERROR = 'B0101', // 博客创建失败
  BLOG_LIST_GET_ERROR = 'B0102', // 博客列表获取失败
  BLOG_LIST_QUERY_BY_CONDITION_ERROR = 'B0103',
  BLOG_CONTENT_ERROR = 'B0104',
  BLOG_UPDATE_ERROR = 'B0105',
  BLOG_DELETE_ERROR = 'B0106',
  BLOG_INFO_AUTHOR_ERROR = 'B0107',
  BLOG_LIST_HOT_ERROR = 'B0108',

  QUOTATION_CREATE_ERROR = 'B0201', // 语录传创建失败
  QUOTATION_GET_ERROR = 'B0202', // 语录获取失败

  REPORT_CREATE_ERROR = 'C0100', // 上报失败
  REPORT_ACTION_TYPE_INVALID = 'C0101', // 行为无效
  REPORT_USER_ID_INVALID = 'C0102', // 用户ID无效
  REPORT_BLOG_ID_INVALID = 'C0103', // 博文ID无效
}

export enum ApiErrorMessage {
  TIMEOUT = '系统繁忙',
  SUCCESS = '请求成功',
  USER_PHONE_EXIST = '手机号已存在',
  USER_EMAIL_EXIST = '邮箱已存在',

  USER_LOGIN_INVALID = '用户登陆失败',
  USER_NO_EXIST = '用户不存在',

  BLOG_INFO_ERROR = '查询博客分类标签出错',
  BLOG_CREATE_ERROR = '博客创建失败',
  BLOG_LIST_GET_ERROR = '博客列表获取失败',
  BLOG_LIST_QUERY_BY_CONDITION_ERROR = '博客按条件查找失败',
  BLOG_CONTENT_ERROR = '博客内容获取失败',
  BLOG_UPDATE_ERROR = '博客更新失败',
  BLOG_DELETE_ERROR = '博客删除失败',
  BLOG_INFO_AUTHOR_ERROR = '查询博主信息失败',
  BLOG_LIST_HOT_ERROR = '最火博客列表获取失败',

  QUOTATION_CREATE_ERROR = '语录传创建失败',
  QUOTATION_GET_ERROR = '语录获取失败',

  REPORT_CREATE_ERROR = '上报失败',
  REPORT_ACTION_TYPE_INVALID = '行为无效',
  REPORT_USER_ID_INVALID = '用户ID无效',
  REPORT_BLOG_ID_INVALID = '博文ID无效',
}
