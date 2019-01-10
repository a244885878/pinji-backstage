<template>
  <div class="hello">
  <el-container style="height: 600px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(242,242,242)">
      <el-menu :default-openeds="['1','2', '3','4','5']">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-menu"></i>客户管理</template>
          <el-menu-item-group>
            <template slot="title">管理类型</template>
            <router-link :to="{path:'/UserManage'}" ><el-menu-item index="1-1" class="homeList">用户信息</el-menu-item></router-link>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i>订单管理</template>
          <el-menu-item-group>
            <template slot="title">订单类型</template>
            <router-link :to="{path:'/OrderManage'}" ><el-menu-item index="2-1" class="homeList">订单信息</el-menu-item></router-link>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-menu"></i>商品管理</template>
          <el-menu-item-group>
            <template slot="title">商品类别</template>
            <router-link :to="{path:'/GoodsManage'}" > <el-menu-item index="3-1" class="homeList">招牌小熊</el-menu-item></router-link>
            <router-link :to="{path:'/GoodsManage2'}" ><el-menu-item index="3-2" class="homeList">翻糖蛋糕</el-menu-item></router-link>
            <router-link :to="{path:'/GoodsManage3'}" ><el-menu-item index="3-3" class="homeList">乳酪</el-menu-item></router-link>
            <router-link :to="{path:'/GoodsManage4'}" ><el-menu-item index="3-4" class="homeList">甜品</el-menu-item></router-link>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title"><i class="el-icon-menu"></i>统计报表</template>
          <el-menu-item-group>
            <template slot="title">数据表</template>
            <router-link :to="{path:'/StatisticalTable'}" ><el-menu-item index="4-1" class="homeList">基本信息</el-menu-item></router-link>
            <router-link :to="{path:'/Essential'}" ><el-menu-item index="4-2" class="homeList">销售信息</el-menu-item></router-link>
            <router-link :to="{path:'/Sales'}" ><el-menu-item index="4-3" class="homeList">统计信息</el-menu-item></router-link>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px" id="homeHead">
        <span class="homeHeadFont">品记后台管理系统</span>
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px;font-size: 18px;color: #fbfbfb"></i>
          <el-dropdown-menu slot="dropdown">
            <router-link :to="{path:'/Login'}"><el-dropdown-item>退出</el-dropdown-item></router-link>
            <!--<el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>-->
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>

      <el-main>
        <router-view class="router-view" name="Secondary"></router-view>
      </el-main>
    </el-container>
  </el-container>
  </div>
</template>

<script>
  import UserManage from './UserManage.vue'
  import OrderManage from './OrderManage.vue'
  import GoodsManage from './GoodsManage.vue'
  import GoodsManage2 from './GoodsManage2.vue'
  import GoodsManage3 from './GoodsManage3.vue'
  import GoodsManage4 from './GoodsManage4.vue'
  import StatisticalTable from './StatisticalTable.vue'
  import Login from './Login.vue'

export default {
      mode:'history',
  data :function () {
    return {
        arr:[{
          link:"UserManage",
          name:"客户管理"
        },{
          link:"OrderManage",
          name:"订单管理"
        },{
          link:"GoodsManage",
          name:"商品管理"
        },{
          link:"StatisticalTable",
          name:"统计报表"
        },{
          link:"Login",
          name:"退出"
        }],
      isCollapse: true,
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },

  component:{
      "UserManage":UserManage,
      "OrderManage":OrderManage,
      "GoodsManage":GoodsManage,
      "GoodsManage2":GoodsManage2,
      "GoodsManage3":GoodsManage3,
      "GoodsManage4":GoodsManage4,
      "StatisticalTable":StatisticalTable,
      "Login":Login,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

  /* 设置滚动条的样式 */::-webkit-scrollbar {    width: 6px;border: none}
  /* 滚动槽 */::-webkit-scrollbar-track
           {    /*-webkit-box-shadow: inset 0 0 5px rgb(242, 242, 242)*/;
             border-radius: 1px;}/* 滚动条滑块 */::-webkit-scrollbar-thumb
{    border-radius: 5px;    background: none;border: none;
 -webkit-box-shadow: inset 0 0 6px rgb(105,105,105);
  background: #B3C0D1;}  ::-webkit-scrollbar-thumb:window-inactive
 {    /*background: rgba(255,0,0,0.4)*/;}

/*  #homeHead{
    background: #3e3e3e;
  }*/
  .hello{
    margin:  20px auto;
    width: 1200px;
  }
 .homeHeadFont{
   font-size: 22px;
   color: #fbfbfb;
   font-family: 华文行楷;
   margin: 0 auto;
 }
  @height:50px;
  a{
    text-decoration: none;
    color: black;
  }
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
.tac{
  height: auto;
}
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>
