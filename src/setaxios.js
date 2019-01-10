import axios from 'axios'
import store from './store'
import router from './router'

export default function setAxios() {
    // http请求前将token设置到http请求header上
    axios.interceptors.request.use(config => {
        if (store.state.token) {
            config.headers.token = store.state.token
        }
        return config
    })
    // http每一次返回数据拦截-1退出到登录，成功返回数据
    axios.interceptors.response.use(response => {
        if (response.status === 200) {
            const data = response.data
            if (data.code === -1) {
                // 退出登录清空store，localstorage
                localStorage.removeItem('token')
                store.commit('setToken', '')
                router.replace({ path: 'login' })
            }
            return data
        }
        return response
    })

}