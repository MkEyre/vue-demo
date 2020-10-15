import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import User from '../pages/User.vue'
import Edit from '../pages/Edit.vue'
import Myfollow from '../pages/Myfollow.vue'
import Comments from '../pages/Comments.vue'
import MyStar from '../pages/MyStar.vue'

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', name: '/login', component: Login },
    { path: '/register', name: '/register', component: Register },
    { path: '/user', name: '/user', component: User },
    { path: '/edit', name: '/edit', component: Edit },
    { path: '/myfollow', name: '/myfollow', component: Myfollow },
    { path: '/comments', name: '/comments', component: Comments },
    { path: '/my-star', name: '/my-star', component: MyStar },
  ],
})
// 设置全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/user' || to.path === '/edit') {
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
export default router
