//  请求地址的集合，方便以后做请求
//  目的：方便日后的升级与维护，

//  声明公供地址
const prefix = 'https://reactapi.iynn.cn'
const obj = {
  //  密码验证接口
  PWdLg : prefix + '/api/common/auth/login',
  //  短信验证相关
  MobileVerifyCap : prefix + '/api/common/captcha/verify',
  MobileSendCode : prefix + '/api/common/sms/send',
  MobileLg : prefix + '/api/common/auth/mobile',
}

export default obj