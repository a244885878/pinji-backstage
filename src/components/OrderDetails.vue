<template>
    <div>
      <header>
        <span class="tit">
          <span class="el-icon-back" @click="back()"></span>
          订单详情
        </span>
      </header>
      <section>
        <el-card class="box-card">
          <div  class="text">
            <p>订单编号:
              {{arr.o_orderNum}}
            </p>
            <p>状态:
              {{arr.orderTypeName}}
            </p>
            <p>订单时间:
              {{arr.o_orderTime }}
            </p>
          </div>
        </el-card>
        <el-card class="box-card">
          <div  class="text">
            <p>收货人:
              {{arr.t_name}}
            </p>
            <p>手机号码:
              {{arr.t_phone}}
            </p>
            <p>收货地址:
              {{arr.t_address + arr.t_details}}
            </p>
          </div>
        </el-card>
        <el-card class="box-card">
          <div  class="text">
            <p>支付方式: 在线支付</p>
            <p>配送方式:
              {{arr.o_Delivery}}
            </p>
            <p>配送时间: 工作日，节假日均可送货</p>
          </div>
        </el-card>
      </section>
      <section class="sec2">
        <ul class="sec2-head">
          <li>图片</li>
          <li>商品名称</li>
          <li>售价</li>
          <li>数量</li>
          <li>小计金额</li>
        </ul>
        <ul class="box">
          <li v-for="v in tableData">
            <ol>
              <li class="img"><img :src="'../../static/'+ (v.cakeID ?  v.c_img : v.customImg )" height="48" width="48" alt=""></li>
              <li><span>{{v.cakeID ?  v.c_name : v.Style }}</span></li>
              <li><span>￥{{v.cakeID ? v.c_money : v.o_price}}</span></li>
              <li><span>{{v.cakeID ? v.o_num : v.o_num}}</span></li>
              <li><span>￥{{v.cakeID ? v.c_money*v.o_num : v.o_price*v.o_num}}</span></li>
            </ol>
          </li>
        </ul>
      </section>
      <footer>
        <div>商品数量总计:<span>{{change}}</span>件</div>
        <div>合计商品金额:<span>{{change2}}</span>元</div>
      </footer>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
              tableData: [],
              arr:[],
              orderNum:'',
              orderMoney:'',
            }
        },
        methods: {
            back(){
              this.$router.back(-1)
            }
        },
        computed:{
              change(){
                  let n=0;
                  this.tableData.forEach((v,i)=>{
                      n=n + parseInt(v.cakeID ? v.o_num : v.o_num)
                  });
                return this.orderNum=n;
              },
              change2(){
                let n=0;
                this.tableData.forEach((v,i)=>{
                  n=n + parseInt(v.cakeID ? v.c_money*v.o_num : v.o_price*v.o_num)
                });
                return this.orderMoney=n;
              },
          },
      created(){
            let n = this.$route.query.num;
            let cake = this.$route.query.cakeID1;
            let custom = this.$route.query.customID1;
            this.$axios({
                method:'get',
              url:'http://localhost/details',
              params:{
                    num:n,
                    cakeID:cake,
                    customID:custom,
              }
            })
              .then((res)=>{
                res.data.content.forEach((v,i)=>{
                  v.o_orderTime=v.o_orderTime+' '+v.o_orderTime2;
                  v.orderTypeName=v.orderTypeName.split('&').splice(1,1).join();
                });
                this.tableData=res.data.content;
                this.arr=res.data.content[0];
                console.log(this.arr)
              }).catch((err)=>{
                console.log('报错了:'+err)
            })
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  header{
    height: 50px;
    width: 100%;
    border-bottom: 1px solid #ccc;
  }
  span{
    font-size: 20px;
    line-height: 50px;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","微软雅黑",Arial,sans-serif;
  }
  .el-icon-back{
    cursor: pointer;
  }
  .text {
    font-size: 14px;
  }
  .box-card {
    width: 32%;
    margin: 10px 0 0 0;
    display: inline-block;
  }
  .box-card p{
    height: 22px;
    line-height: 22px;
    color:#606266;
  }
  .sec2-head{
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #ebeef5;
  }
  .sec2-head>li{
    width: 20%;
    line-height:  50px;
    font-size: 18px;
    float: left;
    color:#606266;
  }
  ol{
    height: 50px;
  }
ol>li{
  width: 20%;
  height: 50px;
  float: left;
  color:#606266;
}
  ol>li>img{
    margin: 1px 0;
  }

  ol>li>span{
    font-size:14px;
    font-weight: 400;
    color:#606266;
  }
  ol{
    border-bottom: 1px solid #ebeef5;
  }
footer {
  text-align: right;
  font-size: 16px;
  color:#606266;
  margin:  20px 0 0 0;
}
  footer div{
    width: 49%;
    display: inline-block;
  }
  footer div:nth-of-type(1){
    text-align: left;
  }
  footer span{
   display: inline-block;
   margin: 0 5px;
   font-size: 14px;
   color: #BB9C7A;
 }
  .sec2{
    margin:  20px 0 0 0 ;
  }
  .tit{
    font-size: 20px;
    width: 100px;
    height: 50px;
    line-height: 50px;
    color: #909399;
  }
</style>
