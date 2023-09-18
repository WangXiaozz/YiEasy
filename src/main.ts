import { createApp } from 'vue'
import App from '@/App.vue'
//引入清除默认样式
import '@/style/reset.scss'
//引入全局组件 --顶部、底部
import HospitalTop from '@/components/hospital_top/index.vue'
import HospitalBottom from '@/components/hospital_bottom/index.vue'
//引入登录组件
import Login from '@/components/Login/index.vue'
//引入就诊人组件
import Visitor from '@/components/visitor/visitor.vue'
//引入计时器组件
import CountDown from '@/components/countdown/index.vue'
//引入路由
import router from '@/router'
//引入路由鉴权文件
import "./permisstion"
//引入element-plus插件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css' 
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
//引入pinia仓库
import pinia from '@/store'
const app = createApp(App)
app.component('HospitalTop', HospitalTop);
app.component('HosiptalBottom', HospitalBottom);
app.component('Login', Login);
app.component('CountDown', CountDown);
app.component('Visitor', Visitor);

//安装element-plus插件
app.use(ElementPlus, {
    locale: zhCn,
});
app.use(router);
//安装pinia仓库
app.use(pinia);
app.mount('#app')
