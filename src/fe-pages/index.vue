<template>
  <el-row class="container">
    <!--头部导航-->
    <el-col>
      <el-menu :router="rout" theme="dark" :default-active="currentPath"  class="el-menu-demo" mode="horizontal"  @select="handleSelectHeader">
        <el-menu-item index="" >Zonst FE</el-menu-item>
        <el-menu-item index="userInfo" >{{userName}}</el-menu-item>
        <el-menu-item index="/payHistory" >余额：{{balance}}</el-menu-item>
        <el-menu-item index="/charts" class="menu-right">展示</el-menu-item>
        <el-menu-item index="/create" class="menu-right">广告</el-menu-item>
        <el-menu-item index="/doc" class="menu-right">文件</el-menu-item>
        <el-menu-item index="/log" class="menu-right">账户</el-menu-item>
        <el-menu-item index="" class="menu-right" @click.native="logout">注销</el-menu-item>

      </el-menu>
    </el-col>
    <!--内容部分-->
    <div class="content">
      <!--头部导航面包-->
      <el-col class="inline-nav">
        <el-breadcrumb separator="/" class="bread">
          <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
            {{ item.name}}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <!--左侧导航-->
      <el-col class="main">
        <el-menu :default-active="currentPath" class="el-menu-vertical-demo"
                  @select="handleSelect" unique-opened :router="rout">
          <template  v-if="!item.hidden" v-for="(item,index) in items">
            <el-submenu :index="index+''" v-if="!item.leaf">
              <template slot="title"><i :class="item.iconCls"></i>{{item.name}}
              </template>
              <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">
                {{child.name}}</el-menu-item>
            </el-submenu>
            <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path">
              <i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
          </template>
        </el-menu>

        <section class="content-container">
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </section>
      </el-col>

    </div>
  </el-row>
</template>

<script>
  import { mapActions } from 'vuex'
  import api from '../axios/api'
  export default {
    data(){
      return{
        rout:true,
        userName:'',
        currentPath:this.$route.path,
        items:[],
        balance:''
      }
    },
    methods:{
      ...mapActions({setSignOut: 'setSignOut'}),
      handleSelectHeader(index) {
          if(index){
        window.location.reload();
          }else{
              index=this.$route.path;
          }
      },
      handleSelect(){
      },
      logout: function () {
          let that=this;
        this.$confirm('确认退出吗?', '提示', {
        }).then(() => {
            api.logOut().then(res=>{
                if(res.data.status===0){
              that.setSignOut();
              that.$router.replace('/login');}
            }).catch((err) => {
                this.$message({
                  message:'退出时出错!'
                });
              console.log(err);
            });

        })
      }
    },
    mounted() {
      let user = sessionStorage.getItem('userInfo');
      if (user) {
        user = JSON.parse(user);
        this.userName = user[0].email || '';
      }
      //获取余额
      api.getBalance()
        .then(res=>{
          if(res.data.status===0){
            this.balance=Number(res.data.data.balance).toFixed(2);
          }
        }).catch(err=>{
        this.balance=0;
        console.log(err)
      })
    },
    created(){
      this.items=[this.$router.options.routes[this.$route.meta.id],this.$router.options.routes[this.$route.meta.id+1]];
    }
  }
</script>
<style scoped>
  @media only screen and (max-height: 635px){
    .container{
      top: 0;
      bottom: 0;
      margin: 0;
      width:expression(document.body.clientWidth <= 1000? "auto": "1100px");
      min-width:1100px;
    }
    /*头部导航*/
    .el-menu-demo{
      width:expression(document.body.clientWidth <= 1000? "auto": "1100px");
      min-width:1100px;
      font-family: Avenir-Medium;
      font-size: 13px;
      display: flex;
      color: rgb(159,172,191);
    }
    .menu-right{
      position: relative;
      left: 30%;

    }
    /* 左侧导航*/
    .el-menu-vertical-demo{
      width: 220px;
      background-color: rgb(234,237,244);
      overflow-y: hidden;
      height:520px;
      border-right: 1px solid rgb(213,213,213);
    }
    /**/
    .content{
      margin: 0 20px 20px 30px;
      box-shadow: -1px 0 0 rgba(0,0,0,.05), -1px 0 1px rgba(0,0,0,.1) inset;
      background: rgb(255,255,255);
      border-radius: 0 0 0 3px;
      border: 1px solid rgb(213,213,213);
      border-top: none;
      height: 610px;
    }
    /*左侧导航和右侧内容*/
    .main{
      display: flex;
      overflow: hidden;
      height:auto;
    }
    /*头部面包*/
    .inline-nav{
      height: 30px;
      border-bottom: 1px solid rgb(223,223,223);
      border-right: none;
      box-shadow: -1px 0 0 rgba(0,0,0,.05), -1px 0 1px rgba(0,0,0,.1) inset;
    }
    .bread{
      margin-top: 10px;
      margin-left: 10px;
    }
    /*右侧内容部分*/
    .content-container{
      display: flex;
      height: 490px;
      overflow-y: scroll;
      overflow-x: scroll;
      flex:1;
      padding: 0px 10px 14px 20px;
      margin:15px 0px 0px 18px;
      background-color: rgb(234,237,244);
      border-left: 1px solid rgb(223,223,223);
      border-top:1px solid rgb(223,223,223);
    }

  }
  @media only screen and (min-height: 635px){
    .container{
      top: 0;
      bottom: 0;
      margin: 0;
      width: 100%;
    }
    /*头部导航*/
    .el-menu-demo{
      width: 100%;
      font-family: Avenir-Medium;
      font-size: 13px;
      display: flex;
      color: rgb(159,172,191);
    }
    .menu-right{
      position: relative;
      left: 40%;

    }
    /* 左侧导航*/
    .el-menu-vertical-demo{
      width: 200px;
      background-color: rgb(234,237,244);
      overflow-y: hidden;
      height:580px;
    }
    /**/
    .content{
      margin: 0 20px 20px 30px;
      box-shadow: -1px 0 0 rgba(0,0,0,.05), -1px 0 1px rgba(0,0,0,.1) inset;
      background: rgb(255,255,255);
      border-radius: 0 0 0 3px;
      border: 1px solid rgb(213,213,213);
      border-top: none;
      height: 680px;
    }
    /*左侧导航和右侧内容*/
    .main{
      display: flex;
      overflow: hidden;
      height:auto;
    }
    /*头部面包*/
    .inline-nav{
      height: 40px;
      border-bottom: 1px solid rgb(223,223,223);
      border-right: none;
      box-shadow: -1px 0 0 rgba(0,0,0,.05), -1px 0 1px rgba(0,0,0,.1) inset;
    }
    .bread{
      margin-top: 10px;
      margin-left: 10px;
    }
    /*右侧内容部分*/
    .content-container{
      display: flex;
      height: 510px;
      overflow-y: scroll;
      flex:1;
      padding: 20px;
      margin:16px 0px 16px 16px;
      background-color: rgb(234,237,244);
    }
  }
</style>
