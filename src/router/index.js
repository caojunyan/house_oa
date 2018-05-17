import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/home.vue'
import BarHai from '../components/haichuang/barHai.vue'
import PieHai from '../components/haichuang/pieHai.vue'
import BarHouse from '../components/house/barHouse.vue'
import PieHouse from '../components/house/pieHouse.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta:{
        title:"登陆"
      }
    },
    {
      path:'/home',
      name:'Home',
      component:Home,
      redirect: "/barHai",
      children:[
        {
          path:'/barHai',
          name:"BarHai",
          component:BarHai,
          meta:{
            title:"海创柱形图分析"
          }
        },
        {
          path:'/pieHai',
          name:"PieHai",
          component:PieHai,
          meta:{
            title:"海创饼状图分析"
          }
        },
        {
          path:'/barHouse',
          name:"BarHouse",
          component:BarHouse,
          meta:{
            title:"房多多柱形图分析"
          }
        },
        {
          path:'/pieHouse',
          name:"PieHouse",
          component:PieHouse,
          meta:{
            title:"房多多饼状图分析"
          }
        }
      ]
    }
  ]
})
