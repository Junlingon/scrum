import axios from "axios";
import EventBus from './event'

const instance = axios.create({});

// 中间件
instance.interceptors.response.use(function (response) {
    if (response.status === 200) {
        if (response.data.code === 401) {
            // 将页面直接跳转到  /login
            //events发布事件
            EventBus.emit('global_not_login', response.data.msg)
            return Promise.reject('没有登录状态')
        }
        // 全局的错误处理
        if (response.data.code !== 0 && response.data.code !== 401) {
            EventBus.emit('global_error_tips', response.data.msg)
        }
    } else {
        EventBus.emit('global_error_tips', response.data.message)
    }
    return response;
}, function (error) {
    // console.log('发生错误',error)
    EventBus.emit('global_error_tips', error.response.data.message)
    return Promise.reject(error);
});

export default instance