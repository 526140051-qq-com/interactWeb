import Vue from 'vue'
import VueRouter from 'vue-router'
import {getUser} from 'common/js/cache'

const Layout = () => import('components/layout/layout')
const Error = () => import('components/error/error')
const Login = () => import('components/login/login')

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    component: Error,
    meta: {
      noAuth: true
    }
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login,
    meta: {
      noAuth: true
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
