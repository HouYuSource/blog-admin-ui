import axios from 'axios'
import * as config from '@/js/config.js'
import {MessageBox, Message} from 'element-ui'

const request = axios.create({
  baseURL: config.BASE_URL,       // api的base_url
  timeout: 5000,                  // 设置默认的请求超时时间
  // withCredentials: true,       // 支持跨域cookies
  // headers: { 'Authorization':  "Bearer "+getUser().token }
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    // config.headers.post = {
    //   'content-Type': 'application/json;'
    // },
    if (localStorage.getItem('token')) {
      config.headers = {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    // console.log("响应时拦截到:" + JSON.stringify(response));
    //console.log(response);
    response = response.data
    if (response.code == '401') {
      //console.log('tonken过时');
      MessageBox.alert('登录信息过时，请重新登录！', '登录超时', {
        confirmButtonText: '返回登录页',
        callback: () => {
          window.location.href = '/login'
        }
      })
    } else if (response.code != '200') {
      Message({
        message: response.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
    } else {
      return response
    }
  }, error => {
    console.log('error:' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  })

export default request
