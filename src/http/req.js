//  封装的axios
import axios from "axios";

//  设置请求拦截器
axios.interceptors.request.use((config) => {
  let token = sessionStorage.getItem('jwt')
  if (token) {
    config.headers.Authorization = token

  }
  return config
})
//  设置响应拦截器
axios.interceptors.response.use((config) => {
  //  存贮jwt令牌
  let jwt = config.data.context ? config.data.context.jwt : null
  if (jwt) {
    sessionStorage.setItem('jwt', jwt)
  }
  //  存储ACL - access control list 访问控制列表
  let acl  = config.data.context ? config.data.context.acl : null
  if (acl) {
    sessionStorage.setItem('acl', JSON.stringify(acl))
    //  面包屑数据预处理（将二维数组转为一维数据）
    let arr = []
    acl.forEach(el => {
      if(el.children.length > 0 ) {
        //  展开arr ，将上次得到的arr进行合并
        arr = [...arr, ...el.children]
      }
    })
    sessionStorage.setItem('bread', JSON.stringify(arr))
  }
  return config
})

export default axios