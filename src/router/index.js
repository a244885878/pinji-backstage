import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage.vue'
import Login from '@/components/Login.vue'
import UserManage from '@/components/UserManage.vue'
import OrderManage from '@/components/OrderManage.vue'
import GoodsManage from '@/components/GoodsManage.vue'
import GoodsManage2 from '@/components/GoodsManage2.vue'

import GoodsManage3 from '@/components/GoodsManage3.vue'
import GoodsManage4 from '@/components/GoodsManage4.vue'

import StatisticalTable from '@/components/StatisticalTable.vue'
import OrderDetails from '@/components/OrderDetails.vue'
import store from '../vuex/store.js'

Vue.use(Router);
const aaa=new Router({
  routes: [
    {
      path:'/Login',
      components:{
        One:Login
      }
    },
    {
      path:'/HomePage',
      name:'HomePage',
      components:{
        One:HomePage
      },
      meta:{auth:true},
      // beforeEnter: (to, from, next) => {
      //   if (from.path == '/Login'){
      //     console.log('验证成功');
      //     next()
      //   }else{
      //     next({
      //       path:'/Login'
      //     })
      //   }
      // },
      children:[{
        path:'/OrderManage',
        components:{
          Secondary:OrderManage
        },
        meta:{auth:true},
      },
        {
          path:'/OrderDetails',
          components:{
            Secondary:OrderDetails
          },
          meta:{auth:true},
        },
        {
          path:'/UserManage',
          name:'UserManage',
          components:{
            Secondary:UserManage
          },
          meta:{auth:true},
        },
        {
          path:'/GoodsManage',
          name:'GoodsManage',
          components:{
            Secondary:GoodsManage
          },
          meta:{auth:true},
        },
        {
          path:'/GoodsManage2',
          name:'GoodsManage2',
          components:{
            Secondary:GoodsManage2
          },
          meta:{auth:true},
        },
        {
          path:'/GoodsManage3',
          name:'GoodsManage3',
          components:{
            Secondary:GoodsManage3
          },
          meta:{auth:true},
        },
        {
          path:'/GoodsManage4',
          name:'GoodsManage4',
          components:{
            Secondary:GoodsManage4
          },
          meta:{auth:true},
        },
        {
          path:'/StatisticalTable',
          name:'StatisticalTable',
          components: {
            Secondary:StatisticalTable
          },
          meta:{auth:true},
        },


        {
          path:'/HomePage',
          redirect:'/UserManage'
        }//重定向到订单信息
      ],
    },
    {
      path:'/',
      redirect:'/Login'
    },
  ]
});
aaa.beforeEach((to, from, next) => {
  let n=sessionStorage.getItem("userName");
  if (to.path === '/Login') {
    next();
    store.commit("userStatus",null);
    return
  }
  if (n !== 'null') {
    store.commit("userStatus",sessionStorage.getItem("userName"));
    next();
  } else {
    store.commit("userStatus",null);
    next({
      path: 'Login'
    });
  }
});
// next必须在没有参数的情况下调用以确认导航，否则您将继续触发beforeEach钩子：
export default aaa;
