import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store=new Vuex.Store({
  state:{
    currentUser:null,
    isLogin:false,
  },
  getters:{
    currentUser(state){
      return state.currentUser;
    },
    isLogin(state){
      return state.isLogin;
    }
  },
  mutations:{
    userStatus(state,user){
      if (user){
        state.currentUser=user;
        state.isLogin=true;
      }else if (user == null){
        sessionStorage.setItem('userName',null);
        state.currentUser = null;
        state.isLogin = false;
      }
    }
  },
  actions:{
    setUser({commit},user){
      commit("userState",user)
    }
  }
});

export default store;
