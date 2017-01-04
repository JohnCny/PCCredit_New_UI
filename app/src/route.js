/**
 * Created by zhangzhan on 2017/1/3.
 */

import Login from './components/Login.vue'
import System from './components/System.vue'

export default {
  '/index': {
    component: Login
  },
  '/login': {
    component: Login
  },
  '/system': {
    component: System,
    subRoutes: {
      '': {
        component: System
      },
      '/admin': {
        component: System
      }
    }
  }
}
