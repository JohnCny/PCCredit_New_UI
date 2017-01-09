/**
 * Created by zhangzhan on 2017/1/3.
 */
/************************
 * 测试
 * ***********************/
import Test from './components/user/index.vue'
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
import CusTransfer from './components/customer/cusTransfer.vue'//客户移交
import CusAccpet from './components/customer/accept.vue'//客户接收
import CusShow from './components/customer/show.vue'//客户信息展示

/************************
 * 客户经理管理
 * ***********************/

/************************
 * 系统管理
 * ***********************/
import UserChangePass from './components/user/changePass.vue'//修改密码
import ForgetPass from './components/user/forgetPass.vue'//忘记密码


/************************
 * 用户管理
 * ***********************/
import User from './components/user/index.vue'//用户列表
import UserNew from './components/user/new.vue'//新建用户
import UserEdit from './components/user/edit.vue'//新建用户

/************************
 * 权限管理
 * ***********************/
import Permission from './components/role/index.vue'//权限列表
import PerEdit from './components/role/edit.vue'//权限编辑

/************************
 * 数据字典管理
 * ***********************/
import Dictionary from './components/dictionary/index.vue'//数据字典列表
import DictionaryEdit from './components/dictionary/edit.vue'//编辑数据字典
/************************
 *
 * 系统参数
 * ***********************/
import Parameter from './components/system/index.vue'//系统参数列表


/************************
 * 角色权限管理
 * ***********************/
import UserPer from './components/user/permission.vue'//角色权限管理
import UserPerEdit from './components/user/perEdit.vue'//角色权限编辑


/************************
 * 日志管理
 * ***********************/

/************************
 * 机构管理
 * ***********************/
import OrgList from './components/organization/index.vue'//机构列表
import OrgEdit from './components/organization/edit.vue'//编辑机构
import OrgNew from './components/organization/new.vue'//新建机构

export default {
  // '/index': {
  //   component: Login
  // },
  '/login': {
    component: Login
  },
  '/forgetPass': { //忘记密码
    component: ForgetPass
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
      '/user/changePass': { //修改密码
        component: UserChangePass
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

      /*start---客户---start*/
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
      },
      '/customer/transfer': {//移交客户
        component: CusTransfer
      },
      '/customer/accept': {//客户接收
        component: CusAccpet
      },
      '/customer/show': {//客户信息展示
        component: CusShow
      },
      /*end---客户---end*/


      /*start---机构---start*/
      '/organization/list': {//机构列表
        component: OrgList
      },
      '/organization/edit/:id': {//编辑机构
        component: OrgEdit
      },
      '/organization/new': {//新建机构
        component: OrgNew
      },
      /*end---机构---end*/


      /*start---权限---start*/
      '/role/list': {//权限列表
        component: Permission
      },
      '/role/edit/:id': {//权限编辑
        component: PerEdit
      },
      /*end---权限---end*/


      /*start---角色权限管理---start*/
      '/user/perList': {//角色权限管理
        component: UserPer
      },
      '/user/perEdit/:id': {//角色权限编辑
        component: UserPerEdit
      },
      /*end---角色权限管理---end*/

      /*start---系统参数---start*/
      '/parameter/list': {//系统参数列表
        component: Parameter
      },
      /*end---系统参数---end*/

      /*start---数据字典---start*/
       '/dictionary/list': {//数据字典列表
         component: Dictionary
       },
       '/dictionary/edit/:id': {
         component: DictionaryEdit
       },
      /*end---数据字典---end*/


    }
  }
}
