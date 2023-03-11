import axios from "axios";

//创建一个axios实例
const instance = axios.create({});

//中间件，每次请求都会走到这里
instance.interceptors.response.use(
    function (response) {
        return response
    },
    function (error) {
        return Promise.reject(error)
    }
);

export default instance