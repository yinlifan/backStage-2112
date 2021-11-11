//  封装的axios
import axios from "axios";

//  设置拦截器
axios.interceptors.request.use((config) => {
  let token = sessionStorage.getItem('jwt')
  if (token) {
    config.headers.Authorization = token

  }
  return config
})

axios.interceptors.response.use((config) => {
  let jwt = config.data.context ? config.data.context.jwt : false
  if (jwt) {
    sessionStorage.setItem('jwt', jwt)
  }
  return config.data
})

export default axios