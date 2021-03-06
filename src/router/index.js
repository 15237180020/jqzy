import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
    {
      path:"/",
      redirect:"/dl"
    },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children:[{
      path:"xs",
      name:"xs",
      component: () => import('../views/dh/xs.vue')
    },{
      path:"js",
      name:"js",
      component: () => import('../views/dh/js.vue')
    },{
      path:"zj",
      name:"jiaoshi",
      component: () => import('../views/dh/jiaoshi.vue')
      }, {
        path: "ongoods",
        name: "ongoods",
        component: () => import('../views/dh/onGoods')
      }, {
        path: "modify",
        name: "modify",
        component: () => import('../views/dh/modify.vue')
      }, {
        path: "addList",
        name: "addList",
        component: () => import('../views/dh/addList.vue')
      }, {
        path: "userList",
        name: "userList",
        component: () => import('../views/dh/userList.vue')
    }]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },{
    path:'/dl',
    name:'dl',
    component: () => import('../views/dl.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
