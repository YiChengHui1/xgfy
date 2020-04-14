import axios from 'axios'
import Vue from 'vue'
import https from 'https'

axios.defaults.timeout = 15000

export const base = 'https://wuliang.art/ncov'// https

// 在request拦截器实现
axios.interceptors.request.use(
  config => {
    config.httpsAgent = new https.Agent({
      rejectUnauthorized: false, // 针对单个请求忽略证书检查
      ca: 'localhost'
    })
    Vue.prototype.$Spin.show()
    return config
  },
  error => {
    setTimeout(() => {
      Vue.prototype.$Spin.hide()
      Vue.prototype.$Message.warning('加载超时')
    }, 3000)
    return Promise.reject(error)
  }
)
// 在response拦截器实现
axios.interceptors.response.use(

  response => {
    if (response.status === 200) {
      setTimeout(() => {
        Vue.prototype.$Spin.hide()
      }, 1000)
      return response
    } else {
      Vue.prototype.$Spin.hide()

      Vue.prototype.$Message.error('请求失败')
    }
  },
  error => {
    console.log(error)
    // let msg = error.response.error.message
    // if (error.response.status === 500) {
    //   msg = '网络异常'
    // }
    Vue.prototype.$Spin.hide()
    Vue.prototype.$Message.error('网络异常')
    return Promise.reject(error)
  }
)
export const POST = (url, params) => {
  return axios.post(`${base}/${url}`, params).then(res =>
    res
  )
}

export const PUT = (url, params) => {
  return axios.put(`${base}/${url}`, params).then(res => res)
}

export const GET = (url, params) => {
  return axios
    .get(`${base}/${url}`, {
      params: params
    })
    .then(res => {
      return res
    })
}
