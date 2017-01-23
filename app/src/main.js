import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import * as filter from './filter' //自定义过滤器
import route from './route' //路由配置
import $ from 'jquery'

Vue.use(VueResource)
Vue.use(VueRouter)
Object.keys(filter).forEach(k => Vue.filter(k, filter[k]))//增加自定义过滤器
//如果Web服务器无法处理编码为application/json的请求，你可以启用emulateJSON选项。启用该选项后，请求会以application/x-www-form-urlencoded作为MIME type，就像普通的HTML表单一样。
Vue.http.options.emulateJSON = true
//如果Web服务器无法处理PUT, PATCH和DELETE这种REST风格的请求，你可以启用enulateHTTP现象。启用该选项后，请求会以普通的POST方法发出，并且HTTP头信息的X-HTTP-Method-Override属性会设置为实际的HTTP方法。
// Vue.http.options.emulateHTTP = true
//Vue.http.options.xhr = {withCredentials: true}

// Vue.http.headers = {'Content-Type': 'application/x-www-form-urlencoded',"X-Requested-With": null} //

Vue.config.debug = true
// 把默认的{{ }} 改成ES6的模板字符串 ${ }

Vue.config.delimiters = ['${', '}']
Vue.config.devtools = true
Vue.prototype.show = function (){
  return '这是一个公用的函数！0000000'
}
//拦截器
Vue.http.interceptors.push((request, next) => {
  request.credentials = true
  next()
})

// 实例化VueRouter
var router = new VueRouter({
  // 当hashbang的值为true时，所有的路径都会被格式化已#!开头，
  hashbang: false,
  history: false,
  saveScrollPosition: true,
  transitionOnLoad: true
})

router.map(route)
router.beforeEach(({to, next}) => {
  if (to.auth && !app.store.state.user.id) { //验证用户是否登录，用户没有登录则强制跳转到登录页面
    router.replace('/login')
  } else {
    //跳转处理
    next()
  }
})
router.redirect({
  '/': '/login'
})
router.start(App, 'app')
