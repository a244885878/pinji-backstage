<template>
  <div>
    <span class="zx2">客户详情</span>
      <el-input placeholder="请输入昵称" v-model="str" clearable style="width: 150px" @input="query()"></el-input>

    <!--表格-->
  <div class="dormitoryData">
  <el-table :data="dormitory" style="width: 100%" class="zx3"
            stripe
            :default-sort = "{prop: 'date', order: 'descending'}">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="昵称">
            <span>{{ props.row.t_Nickname }}</span>
          </el-form-item>
          <el-form-item label="编号">
            <span>{{ props.row.userID }}</span>
          </el-form-item>
          <el-form-item label="手机 ">
            <span>{{ props.row.t_user }}</span>
          </el-form-item>
          <el-form-item label=" 余额">
            <span>{{ props.row.t_Banlance }}</span>
          </el-form-item>
          <el-form-item label="密码">
            <span>{{ props.row.t_pass }}</span>
          </el-form-item>
          <!--<el-form-item label="购买数量">-->
            <!--<span>{{ props.row.o_num }}</span>-->
          <!--</el-form-item>-->
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="ID"
      type="index"
      sortable
      prop="userID">
    </el-table-column>
    <el-table-column
      label="昵称"
      prop="t_Nickname">
    </el-table-column>
    <el-table-column
      label="手机号"
      prop="t_user">
    </el-table-column>
    <el-table-column
      label="账户余额"
      prop="t_Banlance">
    </el-table-column>
    <!--<el-table-column-->
      <!--label="购买数量"-->
      <!--prop="o_num">-->
    <!--</el-table-column>-->
    <el-table-column>
    <template slot-scope="scope">
      <el-button @click="jump(scope.$index,scope.row)" type="primary" plain icon="el-icon-search">订单</el-button>
    </template>
    </el-table-column>
  </el-table>


  <!--分页-->
  <div class="block">
    <el-pagination
      @current-change="changePage()"
      :current-page.sync="currentPage1"
      :page-size="6"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
  </div>
  </div>
</template>




<script>
  export default {
    data() {
      return {
        dormitory: [],
        currentPage1:1,
        total:0,
        str:'',
      }
    },
    methods:{
      //点击去某一页
      changePage(){
        this.$axios.get('http://localhost/ZgetPage', {
          params: {
            page:this.currentPage1,
            str:this.str,
          }
        })
          .then((res)=> {
            this.dormitory=res.data.data1;
          })
          .catch((err)=> {
            console.log(err);
          });
      },
      //获取某一页数据
      getPage:function(){
        this.$axios.get('http://localhost/ZgetPage', {
          params: {
            page:this.currentPage1,
            str:this.str,
          }
        })
          .then((res)=> {
            this.dormitory=res.data.data1;
            this.total=res.data.data.length
          })
          .catch((err)=> {
            console.log(err);
          });
      },
      //按钮跳转页面并获取数据
      jump(s,p){
        this.$router.push({ path: 'OrderDetails', query: { userID: p.userID}})
      },
      //  查询数据（与分页绑定）
      query(){
        this.$axios.get('http://localhost/ZgetPage', {
          params: {
            page:this.currentPage1,
            str:this.str,
          }
        })
          .then((res)=> {
            this.dormitory=res.data.data1;
            this.total=res.data.data.length
          })
          .catch((err)=> {
            console.log(err);
          });
      },

    },
      //调用
      created(){
       this.getPage();
    },
    //  获取后台数据
  }
</script>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .zx2{
    font-size: 16px;
    width: 100px;
    height: 60px;
    padding: 20px;
    color: #909399;

  }
  .block{
    text-align:center;
    margin-top:30px;
  }
.zx3{
  margin: 20px;
}

</style>
