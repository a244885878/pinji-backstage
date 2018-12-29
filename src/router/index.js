import Vue from 'vue'
import Router from 'vue-router'
import UserManage from '@/components/UserManage.vue'
import OrderManage from '@/components/OrderManage.vue'
import GoodsManage from '@/components/GoodsManage.vue'
import StatisticalTable from '@/components/StatisticalTable.vue'
import Login from '@/components/Login.vue'
import OrderDetails from '@/components/OrderDetails.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path:'/UserManage',
      name:'UserManage',
      component:UserManage
    },
    {
      path:'/OrderManage',
      name:'OrderManage',
      component:OrderManage,
      children:[{
        path:'OrderDetails',
        component:OrderDetails
      }]
    },{
      path:'/GoodsManage',
      name:'GoodsManage',
      component:GoodsManage
    },{
      path:'/StatisticalTable',
      name:'StatisticalTable',
      component:StatisticalTable
    },{
      path:'/Login',
      name:'Login',
      component:Login
    }
  ]
})
