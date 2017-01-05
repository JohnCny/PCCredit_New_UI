/**
 * Created by zhangzhan on 2017/1/3.
 */
/************************
 * 单独页面
 * ***********************/
import Login from './components/Login.vue'
import System from './components/System.vue'

/************************
 * 页面布局
 * ***********************/

/************************
* 客户管理
* ***********************/
import Customer from './components/customer/index.vue'//客户列表
import CustomerNew from './components/customer/new.vue'//新建客户
import CustomerEdit from './components/customer/edit.vue'//编辑客户

/************************
 * 客户经理管理
 * ***********************/

/************************
 * 系统管理
 * ***********************/

/************************
 * 用户管理
 * ***********************/
import UsersNew from './components/user/new.vue'//新建用户

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
  '/system': {
    component: System,
    subRoutes: {
      '/admin': {
        component: System
      },
      '/users/new': { //新建用户
        component: UsersNew
      },
      '/customer/index': {//客户列表
        component: Customer
      },
      '/customer/new': {
        component: CustomerNew
      },
      '/customer/edit': {
        component: CustomerEdit
      },



    }
  }
}
