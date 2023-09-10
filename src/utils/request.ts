//axios二次封装
import axios from 'axios'
import { ElMessage } from 'element-plus';
//引入用户相关的仓库
import useUserStore from '@/store/modules/user';
const request = axios.create({
    baseURL: '/api',
    timeout: 5000
});

//请求拦截器
request.interceptors.request.use((config) => {
    //获取用户仓库
    let userStore = useUserStore();
    //token:公共参数,如果用户登录了需要携带
    if (userStore.userInfo.token) {
        config.headers.token = userStore.userInfo.token;
    }
    //config:请求拦截器回调注入的对象(配置对象),配置对象的身上最终要的一件事情headers属性
    //可以通过请求头携带公共参数-token
    return config;
});

//响应拦截器
request.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    let status = error.response.status;
    switch (status) {
        case 404:
            ElMessage({
                type: 'error',
                message: '找不到资源！'
            })
            break
    }
    return Promise.reject(new Error(error.message));
});

export default request;