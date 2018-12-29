<template>
  <div class="hello">
      <div id="title">
        <div><span class="title-left"><img src="../assets/logo.png" height="100" width="80"/></span><span class="title-right">品记管理系统</span></div>
      </div>
    <div id="box">
      <ul>
        <li v-for="v in arr"><router-link :to="{path:'/'+v.link}">{{v.name}}</router-link></li>
      </ul>
      <div id="box2">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import UserManage from './UserManage.vue'
  import OrderManage from './OrderManage.vue'
  import GoodsManage from './GoodsManage.vue'
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
          link:"UserManage",
          name:"客服管理"
        },{
          link:"Login",
          name:"退出"
        }]
    }
  },
  component:{
      "UserManage":UserManage,
      "OrderManage":OrderManage,
      "GoodsManage":GoodsManage,
      "StatisticalTable":StatisticalTable,
      "Login":Login,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @height:50px;
#title{
  height: 100px;
  width: 100%;
  border-bottom: 1px solid #ccc;
}
.title-left{
  height: 100px;
  float: left;
  /*border: 1px solid red;*/
  margin: 0 80px;
}
.title-right{
  float: left;
  line-height: 100px;
  height:100px;
  font-size: 28px;
  color: #BB9C7A;
}

#box{
  position: relative;
  height: 320px;/*首页 不包括顶部栏 的 高度*/
}
#box ul{
  margin: 0;
  padding: 0;
  width:240px;
  height: 600px;
  position: absolute;
  top: 0;
  left:0;
  border-right: 1px solid #ccc;
}

#box ul li{
    font-size: 18px;
    height:@height;
    line-height: @height;
    text-align: center;
    letter-spacing: 5px;
    border-bottom: 1px solid #ccc;
}
  #box ul li a{
    color: #BB9C7A;
    text-decoration: none;
  }
#box2{
  position: absolute;
  top: 0;
  left: 240px;
  border:1px solid red;
  width: 1200px - 240px;
}

</style>
