<template>
    <div id="OrderManage">
      <header>
        <span>
          订单详情

        </span>

          <el-select v-model="value4" clearable placeholder="请选择" class="y-t1">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-input placeholder="请输入订单编号" v-model="input10" clearable class="y-t1"></el-input>
          <!--<el-button type="primary" icon="el-icon-search">搜索</el-button>-->
          <span>{{title}}</span>

      </header> <!--搜索头-->

      <section>
        <el-table
          :data="tableData6"
          border
          style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
          width="50px">
          </el-table-column>
          <el-table-column
            prop="o_orderNum"
            label="订单编号"
            sortable
          width=" 140px">
          </el-table-column>
          <el-table-column
            prop="o_orderTime"
            sortable
            label="下单时间"
            width=" 140px">
          </el-table-column>
          <el-table-column
            prop="o_orderName"
            label="商品名称"
            width=" 140px">
          </el-table-column>
          <el-table-column
            prop="num"
            sortable
            label="订单数量">
          </el-table-column>
          <el-table-column
            prop="money"
            sortable
            label="订单金额">
          </el-table-column>
          <el-table-column
            prop="orderTypeName"
            label="订单状态">
          </el-table-column>
          <el-table-column label="订单详情">
            <template slot-scope="scope">
              <!--<router-link :to="{path:'OrderDetails'}" @click="aaa()">-->
                <!--详情-->
              <!--</router-link>-->
              <el-button @click="aaa(scope.$index,scope.row)">
                详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        </el-table>
      </section> <!--表格-->

      <footer>
        <!--<el-pagination-->
        <!--background-->
        <!--:current-page="page"-->
        <!--layout="prev, pager, next "-->
        <!--:total="pageNum"-->
        <!--@current-change="handleCurrentChange"-->
     <!--&gt;-->
      <!--</el-pagination>-->
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="page"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="num">
        </el-pagination>
      </footer> <!--分页-->
    </div>
</template>

<script>
    export default {
      data: function () {
        return {
          currentPage1: 5,
          options: [{
            value: '已完成',
            label: '已完成'
          },
            {
              value: '未完成',
              label: '未完成'
            },
            ],
          value4: '',
          input10: '',
          tableData6:[],
          pageNum: 10,//分页个数
          page:1,//默认页码
          num:0,
        }
      },
      methods: {
        /*input框搜索*/
        search(){
          let userID = this.$route.query.userID;
            this.$axios({
              method:'get',
              url:'http://localhost/searchOrder',
              params:{
                    data:this.input10,
                    txt:this.value4,
                    page:this.page,
                    userID:userID
              }
            })
              .then((res)=>{
                res.data.content.forEach((v,i)=>{
                  v.o_orderTime=v.o_orderTime+' '+v.o_orderTime2;
                  v.orderTypeName=v.orderTypeName.split('&').splice(1,1).join();
                });
                this.tableData6=res.data.content;
//                console.log(this.page);
            })
              .catch((err)=>{
                console.log(err);
            });

            //获取搜索分页
          this.$axios({
            method:'get',
            url:'http://localhost/getSearchPage',
            params:{
              data:this.input10,
              txt:this.value4,
              userID:userID
            }
          })
            .then((res)=>{
              let n=res.data.content.length;
              this.pageNum=Math.ceil(n/10)*10;
//              console.log('数据条数:',n);
              if (n<=10 * (this.page-1)){
                  this.page=1;
              }/*重定向 页码为1*/
//              console.log('范围:',10 * (this.page-1));
              this.num=n;
            })
            .catch((err)=>{
              console.log('报错了'+err)
            })

        },

        /*点击详情*/
        aaa(s,p){
              //获取的当前点击的数据
              this.$router.push({ path: 'OrderDetails', query: { num: p.o_orderNum, cakeID1: p.cakeID ,customID1: p.customID}})
        },
        /*提示框i*/
        open() {
          this.$alert('不能为空', '提示', {
            confirmButtonText: '确定'
          });
        },
        /*点击获取当前电极的分页码--->然后执行 获取匹配分页的数据*/
        handleCurrentChange(val){
            this.page=val;
            this.$axios({
              method:'get',
              url:'http://localhost/searchOrder',
              params:{
                data:this.input10,
                txt:this.value4,
                page:this.page,
              }
            })
              .then((res)=>{
                res.data.content.forEach((v,i)=>{
                  v.o_orderTime=v.o_orderTime+' '+v.o_orderTime2;
                  v.orderTypeName=v.orderTypeName.split('&').splice(1,1).join();
                });
                this.tableData6=res.data.content;
                console.log(this.page);
              })
              .catch((err)=>{
                console.log(err);
              });
        },
      },
      /*钩子函数创建之后*/
      created(){
          let userID = this.$route.query.userID;
          //创建内容
          this.$axios({
            method:'get',
            url:'http://localhost/YGetOrder',
            params:{
              page:this.page,
              userID:userID
            }
          })
            .then((res)=>{
              res.data.content.forEach((v,i)=>{
                v.o_orderTime=v.o_orderTime+' '+v.o_orderTime2;
                v.orderTypeName=v.orderTypeName.split('&').splice(1,1).join();
              });
              this.tableData6=res.data.content;
            })
            .catch((err)=>{
            console.log(err);
          });
          //创建页码
          this.$axios({
            method:'get',
            url:'http://localhost/getPage',
            params:{
                userID:userID
            }
          })
            .then((res)=>{
           let n=res.data.content.length;
            this.pageNum=Math.ceil(n/10)*10;
            this.num=n;
          })
            .catch((err)=>{
            console.log('报错了'+err)
          })
      },
      /*侦听*/
      computed:{
        title(){
          this.search();
        },
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
span{
  font-size: 20px;
  line-height: 50px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","微软雅黑",Arial,sans-serif;
}
  .y-t1{
    width: 200px;
}
  #OrderManage{
    position: relative;
  }
  header{
    height: 50px;
    width: 100%;
    border-bottom: 1px solid #ebeef5;
}
  .el-table{
    font-size: 12px;
  }
footer{
  margin: 20px 0;
  text-align: center;
  height: 30px;
}
  .el-select{
    margin: 5px 20px;
  }
.el-input{
  margin: 5px 40px 5px 20px;
}
  a{
    color: blue;
    text-decoration:none;
  }
</style>
