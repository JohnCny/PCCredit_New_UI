/**
 * Created by zhangzhan on 2017/1/3.
 */
/************************
 * 单独页面
 * ***********************/
import Login from './components/Login.vue'
import System from './components/System.vue'
import Error from './components/error.vue'

/************************
 * 页面布局
 * ***********************/

/************************
* 客户管理
* ***********************/
import Customer from './components/customer/index.vue'//客户列表
import CustomerNew from './components/customer/new.vue'//新建客户
import CustomerEdit from './components/customer/edit.vue'//编辑客户
import Maintenance from './components/customer/maintenance.vue'//客户维护列表
import MainNew from './components/customer/mainNew.vue'//新增客户维护
import MainRecord from './components/customer/mainRecord.vue'//客户维护记录

/************************
 * 客户经理管理
 * ***********************/

/************************
 * 系统管理
 * ***********************/

/************************
 * 用户管理
 * ***********************/
import User from './components/user/index.vue'//用户列表
import UserNew from './components/user/new.vue'//新建用户
import UserEdit from './components/user/edit.vue'//新建用户

/************************
 * 角色管理
 * ***********************/

/************************
 * 数据字典管理
 * ***********************/

/************************
 * 日志管理
 * ***********************/

/************************
 * 机构管理
 * ***********************/


export default {
  // '/index': {
  //   component: Login
  // },
  '/login': {
    component: Login
  },
  '/error/:errcode':{
    component: Error
  },
  '/system': {
    component: System,
    subRoutes: {
      '/admin': {
        component: System
      },
      /*start---用户---start*/
      '/user/list': { //用户列表
        component: User
      },
      '/user/new': { //新建用户
        component: UserNew
      },
      '/user/edit/:id': { //编辑用户
        component: UserEdit
      },
      /*end---用户---end*/
      '/customer/list': {//客户列表
        component: Customer
      },
      '/customer/new': {//新建客户
        component: CustomerNew
      },
      '/customer/edit': {//编辑客户
        component: CustomerEdit
      },
      '/customer/mainList':{//客户维护列表
        component: Maintenance
      },
      '/customer/mainNew': {//新增客户维护
        component: MainNew
      },
      '/customer/mainRecord': {//客户维护记录
        component: MainRecord
      }
    }
  }
}
