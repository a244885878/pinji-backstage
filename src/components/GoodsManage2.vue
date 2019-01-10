<template>
  <div>
    <header style="height: 50px; line-height: 50px;">
    <span class="tit">
          翻糖蛋糕类商品管理
        </span>
      <el-button size="mini"  plain type="success" style="float: right;height: 40px;margin-left: 12px;margin-top: 5px;margin-right: 5px"
                 @click="show()">+ 新增</el-button>
      <el-button size="mini" plain type="primary" style="float: right;height: 40px;margin-left: 12px;margin-top: 5px;"
                 @click="query()">查询</el-button>
      <el-input placeholder="请输入商品名称" style="width: 200px;height:40px;float: right" value="str" v-model="str">
      </el-input>
    </header>

    <template>

      <el-table
        :data="cakeData"
        style="width: 100%">
        <el-table-column
          label="上架日期"
          width="auto">
          <template slot-scope="cakeData">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ cakeData.row.putaway_time }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="c_name"
          label="商品名称"
          width="auto">
        </el-table-column>
        <el-table-column label="商品图片"
                         prop="c_img">
          <template slot-scope="scope">
            <img :src="'../../static/img/'+scope.row.c_img" style="width: 50px;height:50px">
          </template>
        </el-table-column>
        <el-table-column
          prop="c_size"
          label="尺寸"
          width="auto">
        </el-table-column>
        <el-table-column
          prop="c_money"
          label="单价"
          width="auto">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button plain
                       size="mini"
                       type="primary"
                       @click="show2(scope.$index, scope.row)">编辑</el-button>
            <el-button plain
                       size="mini"
                       type="danger"
                       @click="handleDelete(scope.$index, scope.row)">下架</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="text-align: center">
        <!-- <span class="demonstration">显示总数</span>-->
        <el-pagination
          @current-change="changePage()"
          :current-page.sync="currentPage1"
          :page-size="4"
          layout="total, prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
    </template>
    <!--新增弹出框-->
    <div class="showHide" v-show="showHide">
      <div class="shade"></div>
      <div class="add">
        <span class="close" @click="close()"> X </span>
        <el-button  size="mini" type="primary" @click="confirm()" class="confirm">确定</el-button>
        <h1 style="text-align: center;font-size: 24px;color:#303133;font-weight: normal;margin-top: 15px;margin-bottom: 15px">
          新增商品</h1>
        <div>
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="上架日期:">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"
                                value-format="yyyy-MM-dd"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="商品名称:">
              <el-input v-model="form.name" placeholder="请输入商品名称"></el-input>
            </el-form-item>
            <el-form-item label="商品尺寸:">
              <el-select v-model="form.size" placeholder="请选择商品尺寸">
                <el-option label="六寸" value="六寸"></el-option>
                <el-option label="八寸" value="八寸"></el-option>
                <el-option label="十寸" value="十寸"></el-option>
                <el-option label="十二寸" value="十二寸"></el-option>
                <el-option label="十六寸" value="十六寸"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品单价:">
              <el-input v-model="form.money" placeholder="只能填整型数字"></el-input>
            </el-form-item>
            <el-form-item label="商品类别:">
              <el-select v-model="form.type" placeholder="请选择商品类别">
                <el-option label="1" value="1">招牌小熊</el-option>
                <el-option label="2" value="2">翻糖蛋糕</el-option>
                <el-option label="3" value="3">乳酪</el-option>
                <el-option label="4" value="4">甜品</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品库存:">
              <el-input v-model="form.stock" placeholder="只能填整型数字"></el-input>
            </el-form-item>
          </el-form>
          <el-upload
            :multiple="true"
            :limit="10"
            class="upload-demo"
            ref="upload"
            action="http://localhost/upload2"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-change="handleChange"
            :file-list="fileList"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">最多上传6张图片</div>
          </el-upload>
        </div>
      </div>
    </div>
    <!--编辑弹出框-->
    <div class="showHide2" v-show="showHide2">
      <div class="shade2"></div>
      <div class="add2">
        <span class="close2" @click="close2()"> X </span>
        <el-button  size="mini" type="primary"  @click="confirm2()"
                    class="confirm2">修改</el-button>
        <h1 style="text-align: center;font-size: 18px;color:#303133;font-weight: normal;margin-top: 15px;margin-bottom: 10px">
          编辑商品信息</h1>
        <div>
          <el-form ref="updateData" v-model="updateData" label-width="80px">
            <el-form-item label="上架日期:">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="updateData.putaway_time" style="width: 100%;"
                                value-format="yyyy-MM-dd"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="商品名称:">
              <el-input v-model="updateData.c_name" placeholder="请输入商品名称"></el-input>
            </el-form-item>
            <el-form-item label="商品尺寸:">
              <el-select v-model="updateData.c_size" placeholder="请选择商品尺寸">
                <el-option label="六寸" value="六寸"></el-option>
                <el-option label="八寸" value="八寸"></el-option>
                <el-option label="十寸" value="十寸"></el-option>
                <el-option label="十二寸" value="十二寸"></el-option>
                <el-option label="十六寸" value="十六寸"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品单价:">
              <el-input v-model="updateData.c_money" placeholder="只能填整型数字"></el-input>
            </el-form-item>
            <el-form-item label="商品类别:">
              <el-select v-model="updateData.c_type1" placeholder="请选择商品类别">
                <el-option label="1" value="1">招牌小熊</el-option>
                <el-option label="2" value="2">翻糖蛋糕</el-option>
                <el-option label="3" value="3">乳酪</el-option>
                <el-option label="4" value="4">甜品</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品库存:">
              <el-input v-model="updateData.c_stock" placeholder="只能填整型数字"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>

</template>
<script >
  export default {
    data() {
      return {
        cakeData: [{
        },
        ],
        updateData: [{
        },
        ],
        form: {
          date: '',             //新增的数据
          name: '',
          size: '',
          money:'',
          type: '',
          stock:'',
        },
        str:'',
        showHide:false,
        showHide2:false,
        fileList:[],
        imgList:[],
        currentPage1: 1,
        total:0,
        num:1,
      }
    },
    created(){
      /*this.$axios.get('http://localhost/cake1')         //创建完成后渲染蛋糕1的数据
        .then((res)=>{
          this.cakeData=res.data.content;
          //console.log(res)
        }).catch((err)=>{
          console.log(err);
        })*/
      this.getPage1();
      this.getPageNum();
    },
    methods: {
      //点击去某一页
      changePage(){
        this.$axios({
          method: 'get',
          url:'http://localhost/getPage1',
          params:{
            page:this.currentPage1,
            type:2,
            str:this.str,
          }
        })
          .then((res)=>{
            this.cakeData=res.data.data1;
          })
          .catch((err)=>{
            console.log(err);
          })
      },
      //获取某一页的数据
      getPage1:function () {
        this.$axios({
          method: 'get',
          url:'http://localhost/getPage1',
          params:{
            page:this.currentPage1,
            type:2,
            str:this.str,
          }
        })
          .then((res)=>{
            this.cakeData=res.data.data1;
          })
          .catch((err)=>{
            console.log(err);
          })
      },
      //获取有多少页
      getPageNum:function () {
        this.$axios({
          method: 'get',
          url:'http://localhost/getPageNum',
          params:{
            type:2,
          }
        })
          .then((res)=>{
            this.total=res.data.count;
          })
          .catch((err)=>{
            console.log(err);
          })
      },

      /*------------------*/
      query(){
        this.$axios({
          method: 'get',
          url:'http://localhost/getPage1',
          params:{
            page:1,
            type:2,
            str:this.str,
          }
        })
          .then((res)=>{
            this.currentPage1=1;
            this.cakeData=res.data.data1;
            this.total=res.data.data.length;
          })
          .catch((err)=>{
            console.log(err);
          })

      },
      handleChange(file, fileList) {
        this.imgList.push(file.name);
        //console.log(this.imgList);
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        //console.log(file.name);
        for (let i=0;i<=this.imgList.length;i++){
          if(file.name == this.imgList[i]){
            this.imgList.splice(i,1);
          }
        }
      },
      handlePreview(file) {
        console.log(file.name);
      },
      close(){
        this.showHide=false;
        this.$message({
          type: 'info',
          message: '取消!',
        });
      },
      close2(){
        this.showHide2=false;
        this.$message({
          type: 'info',
          message: '取消!',
        });
      },
      show(){
        this.showHide=true;
        this.form.date='';
        this.form.name='';
        this.form.size='';
        this.form.money='';
        this.form.type='';
        this.form.stock='';
        this.imgList=[];
        this.fileList=[];
      },
      show2(i, data){
        this.showHide2=true;
        this.updateData=data;
      },
      confirm(){
        //console.log(this.form);
        if(this.form.date=='' || this.form.name=='' ||
          this.form.size=='' || this.form.money=='' ||
          this.form.type=='' || this.form.stock==''){
          this.$message({
            type: 'warning',
            message: '所有信息都不能为空!',
          });
        }else {
          /*let arr4=[];
          arr4[0]=this.form;*/
          this.$axios.get('http://localhost/addCake', {
            params: {
              date:this.form.date,
              name:this.form.name,
              size:this.form.size,
              money:this.form.money,
              type:this.form.type,
              stock:this.form.stock,
              arr:this.imgList,
            }
          })
            .then((res)=> {
              this.showHide=false;
              this.$message({
                type: 'success',
                message: '新增成功!',
              });
              this.getPage1();   //新增成功后刷新
              this.getPageNum(); //新增成功后刷新页码
            })
            .catch((err)=> {
              console.log(err);
              this.$message({
                type: 'warning',
                message: '新增失败!所有信息都不能为空',
              });
            });
        }/*else {
            //console.log(this.form.date,this.form.name,this.form.size,this.form.money,this.form.type);
            this.showHide=false;
            this.$message({
              type: 'success',
              message: '新增成功!',
            });
          }*/
      },
      confirm2(){
        this.showHide2=false;
        //console.log(this.updateData);
        this.$axios.get('http://localhost/updateCake', {
          params: {
            id:this.updateData.cakeID,
            date:this.updateData.putaway_time,
            name:this.updateData.c_name,
            size:this.updateData.c_size,
            money:this.updateData.c_money,
            type:this.updateData.c_type1,
            stock:this.updateData.c_stock,
          }
        })
          .then((res)=> {
            this.$message({
              type: 'success',
              message: '修改成功!',
            });
            this.getPage1(); //修改成功后刷新
            this.getPageNum(); //修改成功后刷新页码
          })
          .catch((err)=> {
            this.$message({
              type:'warning',
              message: '修改失败!',
            });
          });
      },
      handleDelete(i, data) {
        //console.log(index, row);
        this.$confirm('此操作将永久下架该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$axios.get('http://localhost/DeleteCake', {
            params: {
              cakeID:data.cakeID,
            }
          })
            .then((res)=> {
              //删除成功后刷新
              this.currentPage1=1;
              this.getPage1();   //成功后刷新
              this.getPageNum(); //删除成功后刷新页码
              this.$message({
                type: 'success',
                message: '下架成功',
              });

            })
          /*.catch((err)=> {
            console.log(err);
            this.$message({
              type: 'warning',
              message: '新增失败!',
            });
          });*/
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消下架'
          });
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

  h3{
    font-size: 20px;
    font-weight: bold;
    color: #0089eb;
  }
  *{
    font-size: 14px;
  }
  .add{
    display: inline-block;
    width: 600px;
    height: 720px;
    vertical-align: middle;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    font-size: 18px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    text-align: left;
    overflow: hidden;
    backface-visibility: hidden;
    position: absolute;
    top: 5px;
    left: 30%;
    z-index: 99;
    padding:  20px;
  }
  .shade{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: black;
    opacity: 0.2;
    z-index: 99;
  }
  .close{
    position: absolute;
    top: 15px;
    right: 25px;
    padding: 0;
    border: none;
    outline: none;
    background: transparent;
    font-size: 16px;
    cursor: pointer;
    color: #b6b6b6;
  }
  .close:hover{
    color: #56a7b4;
  }
  .confirm{
    position: absolute;
    right: 15px;
    bottom: 15px;
  }
  //编辑弹出框
  .add2{
    display: inline-block;
    width: 600px;
    height: 500px;
    padding-bottom: 10px;
    vertical-align: middle;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    font-size: 18px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    text-align: left;
    overflow: hidden;
    backface-visibility: hidden;
    position: absolute;
    top: 60px;
    left: 30%;
    z-index: 99;
  }
  .shade2{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: black;
    opacity: 0.2;
    z-index: 99;
  }
  .close2{
    position: absolute;
    top: 15px;
    right: 25px;
    padding: 0;
    border: none;
    outline: none;
    background: transparent;
    font-size: 16px;
    cursor: pointer;
    color: #b6b6b6;
  }
  .close2:hover{
    color: #56a7b4;
  }
  .confirm2{
    position: absolute;
    right: 15px;
    bottom: 15px;
  }
  .el-col-11{
    width: 100%;
  }
  .el-select{
    width:  100%;
  }
  .tit{
    font-size: 20px;
    width: 100px;
    height: 50px;
    line-height: 30px;
    color: #909399;
  }
</style>
