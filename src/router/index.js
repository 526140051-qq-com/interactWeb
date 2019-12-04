import Vue from 'vue'
import Router from 'vue-router'
import {getUser} from 'common/js/cache'

const Layout = () => import('components/layout/layout')
const Error = () => import('components/error/error')
const Login = () => import('components/login/login')
const Ads = () => import('components/ads/ads')
const AdsAdd = () => import('components/ads/ads-add')
const AdsEdit = () => import('components/ads/ads-edit')
const Ticket = () => import('components/ticket/ticket')
const Gift = () => import('components/gift/gift')
const GiftAdd = () => import('components/gift/gift-add')
const GiftEdit = () => import('components/gift/gift-edit')
const OrderPay = () => import('components/order/pay')
const OrderGiftIncome = () => import('components/order/gift-income')
const OrderRoomIncome = () => import('components/order/room-income')
const Home = () => import('components/home/home')
const HomeAdd = () => import('components/home/home-add')
const HomeEdit = () => import('components/home/home-edit')
const Setting = () => import('components/setting/setting')
const Withdraw = () => import('components/withdraw/withdraw')
const Account = () => import('components/account/account')

Vue.use(Router)

const router = new Router({
  routes: [
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
    },
    {
      path: '/ads',
      component: Layout,
      children: [
        {
          path: '',
          component: Ads
        }
      ]
    },
    {
      path: '/ads/add',
      component: Layout,
      children: [
        {
          path: '',
          component: AdsAdd
        }
      ]
    },
    {
      path: '/ads/edit/:id',
      component: Layout,
      children: [
        {
          path: '',
          component: AdsEdit
        }
      ]
    },
    {
      path: '/ticket',
      component: Layout,
      children: [
        {
          path: '',
          component: Ticket
        }
      ]
    },
    {
      path: '/gift',
      component: Layout,
      children: [
        {
          path: '',
          component: Gift
        }
      ]
    },
    {
      path: '/gift/add',
      component: Layout,
      children: [
        {
          path: '',
          component: GiftAdd
        }
      ]
    },
    {
      path: '/gift/edit/:id',
      component: Layout,
      children: [
        {
          path: '',
          component: GiftEdit
        }
      ]
    },
    {
      path: '/order/pay',
      component: Layout,
      children: [
        {
          path: '',
          component: OrderPay
        }
      ]
    },
    {
      path: '/order/gift-income',
      component: Layout,
      children: [
        {
          path: '',
          component: OrderGiftIncome
        }
      ]
    },
    {
      path: '/order/room-income',
      component: Layout,
      children: [
        {
          path: '',
          component: OrderRoomIncome
        }
      ]
    },
    {
      path: '/home',
      component: Layout,
      children: [
        {
          path: '',
          component: Home
        }
      ]
    },
    {
      path: '/home/add',
      component: Layout,
      children: [
        {
          path: '',
          component: HomeAdd
        }
      ]
    },
    {
      path: '/home/edit/:id',
      component: Layout,
      children: [
        {
          path: '',
          component: HomeEdit
        }
      ]
    },
    {
      path: '/setting',
      component: Layout,
      children: [
        {
          path: '',
          component: Setting
        }
      ]
    },
    {
      path: '/withdraw',
      component: Layout,
      children: [
        {
          path: '',
          component: Withdraw
        }
      ]
    },
    {
      path: '/account',
      component: Layout,
      children: [
        {
          path: '',
          component: Account
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => !record.meta.noAuth)) {
    if (getUser()) { // 管理员
      next()
    } else {
      next({path: '/login'})
    }
  } else { // 如果不需要权限校验，直接进入路由页面
    next()
  }
})

export default router
