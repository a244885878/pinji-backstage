<template>
    <div id="login">
      <img src="../../static/login.jpg" class="login"/>
      <div class="div1">
        <div class="div1-box">
          <div class="div1-head">
            <el-input
              placeholder="请输入账号"
              v-model="user"
              clearable>
            </el-input>
            <span class="passTiShi" v-show="show2">账号由数字组成</span>
            <!--<span>{{isLogin}}</span>-->
          </div>
           <div class="div1-sec">
             <el-input
               type="password"
               placeholder="请输入密码"
               v-model="pass"

               clearable>
             </el-input>
             <span class="passTiShi" v-show="show">密码以字母开头，长度在6-10之间，只能包含字符、数字和下划线</span>
           </div>
          <div class="div1-footer">
            <el-button type="primary" @click="login()" @keyup.enter="login()">登陆</el-button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import store from '../vuex/store.js'

    document.body.parentNode.style.overflow = "hidden";
    export default {
        data: function () {
            return {
                user:'',
                pass:'',
                show:false,
                show2:false
            }
        },
        methods: {
            login(){
              let reg=/^[0-9]*$/g;
              let reg2=/^[a-zA-Z]\w{5,10}$/g;

              if (this.user.trim() == '' || this.pass.trim() == ''){
                this.open4('账号或密码不能为空');
                return;
              }
              if (reg2.test(this.pass)){
              }else{
                this.show=true;
                this.open4('账户或密码,不符合规范');
                return;
              }
              if (reg.test(this.user)){
              }else{
                this.show2=true;
                this.open4('账户或密码,不符合规范');
                return;
              }

                this.$axios({
                  method:'get',
                  url:'http://localhost/YLogin',
                  params:{
                    user:this.user,
                    pass:this.pass
                  }
                })
                  .then((res)=>{
                    if (!res.data.error){

                      sessionStorage.setItem('userName',this.user);
                      store.dispatch("setUser",this.user);

                      this.open3('登陆成功');
                      this.$router.push({path:'/HomePage'});
                    }else{
                      this.open4('账号或密码错误')
                    }
                })
                  .catch((err)=>{
                    console.log('报错了',err);
                })
            },

          open3(text) {
            this.$notify({
              title: '成功',
              message: text,
              type: 'success'
            });
          },
          open4(text) {
            this.$notify({
              title: '警告',
              message: text,
              type: 'warning'
            });
          },
        },
      computed:{
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .passTiShi{
    font-size: 12px;
    color: rgb(220, 223, 230);
    position: absolute;
    top: 50px;
  }
  .div1{
    height: 280px;
    width: 450px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.86);
    position: absolute;
    top: calc(50% - 140px);
    left: calc(50% - 225px);
  }
  .div1-box{
    width: 400px;
    margin: 50px auto;
  }
  .el-input{
    height: 50px;
  }
  .el-button{
    width: 90px;
    height: 40px;
  }
.div1-head{
  margin: 0 0 25px 0;
  position: relative;
}
.div1-sec{
  position: relative;
}
#login .el-input__inner{
    height: 50px;
    line-height: 50px;
  border: 1px solid red;
}
  .div1-footer{
    text-align: right;
    margin: 40px 0 0 0;
  }

  .login{
    width: 100%;
  }
</style>
