<template>
  <div class="login-zone">
  <div id="wrapper">

    <form name="login-form" class="login-form">
      <div class="form-header">
        <h1>Login Form</h1>
        <span>没有账号？</span>
          <router-link to="/register" tag="span">
            <a> 在这里注册</a>
          </router-link>
      </div>

      <div class="content">
        <input type="text" class="input username" placeholder="Your Email" v-verify="loginname" v-model="loginname" autofocus/>
        <div class="user-icon"></div>
        <div class="user-validate" ><span v-remind="loginname"></span></div>
        <input type="password" class="input password" placeholder="Your Password" v-verify="loginpass" v-model="loginpass"/>
        <div class="pass-icon"></div>
        <div class="pass-validate" v-remind="loginpass" ><span ></span></div>
      </div>

      <div class="form-footer">
        <input type="submit" name="submit" value="登录" class="button" :loading="loginLoading" @click.prevent="login"/>
        <input type="submit" name="submit" value="忘记密码？" class="findpass" />
      </div>
    </form>
  </div>
    <page-footer></page-footer>
  </div>
</template>
<script>
  import pagefoot from '../components/foter.vue'
  import api from '../axios/api'
  import axios from 'axios'
  import { mapActions } from 'vuex'

  export default{
    name:'adlogin',
    components:{
          'page-footer':pagefoot
    },
    data(){
        return{
          loginname:'',
          loginpass:'',
          loginLoading:false
        }
    },
    verify:{
        loginname:["full","required"],
        loginpass:["full","required"]
    },
    methods: {
      ...mapActions({setUserInfo: 'setUserInfo'}),
      login(){
        if (this.$verify.check()) {
          let data = {
            email: this.loginname,
            password: this.loginpass
          };

          this.loginLoading = true;
          this.$store.dispatch('setLoadingState', false);
          api.Login(data).then(res => {
              this.loginLoading = false;
              if (res.data.status === 0) {
                this.$store.dispatch('setLoadingState', true);
                this.setUserInfo(res);
                axios.get('/v1/options').then((res1)=>{
                  if(res1.data.status===0){
//                    this.$store.state.user.comdata1=res1.data.data[0].invoice_type;
//                    this.$store.state.user.comdata2=res1.data.data[0].need_invoice;
//                    this.$store.state.user.comdata3=res1.data.data[0].statement_type;
//                    this.$store.state.user.comdata4=res1.data.data[0].action_module;

                    sessionStorage.setItem('invoice_name',JSON.stringify(res1.data.data[0].invoice_name));
                    sessionStorage.setItem('entity_name',JSON.stringify(res1.data.data[0].entity_name));
                    sessionStorage.setItem('invoice_type',JSON.stringify(res1.data.data[0].invoice_type));
                    sessionStorage.setItem('order_type',JSON.stringify(res1.data.data[0].order_type));
                    sessionStorage.setItem('app_category',JSON.stringify(res1.data.data[0].app_category));
                    sessionStorage.setItem('geo_code',JSON.stringify(res1.data.data[0].geo_code2));
                    sessionStorage.setItem('day_parting',JSON.stringify(res1.data.data[0].day_parting));
                    sessionStorage.setItem('android_version',JSON.stringify(res1.data.data[0].android_version));
                    sessionStorage.setItem('ios_version',JSON.stringify(res1.data.data[0].ios_version));
                    sessionStorage.setItem('network',JSON.stringify(res1.data.data[0].network));
                    sessionStorage.setItem('carrier',JSON.stringify(res1.data.data[0].carrier));
                    sessionStorage.setItem('device_type',JSON.stringify(res1.data.data[0].device_type));
                    sessionStorage.setItem('creative_set',JSON.stringify(res1.data.data[0].creative_set))

                  }
                });

                this.$router.replace('/log')
              } else {
                this.$message({
                  message: res.data.msg,
                  type: 'error'
                });
                this.loginLoading = false;
              }
            }).catch(err => {
              this.$message({
                message: err,
                type: 'error'
              });
              console.log('fucku');
              this.loginLoading = false;
            })
        }
      }
    }
    }
</script>
<style >
  body,html,#app{
    height: 100%;
  }
</style>
<style scoped>
  @import url(http://fonts.googleapis.com/css?family=Bree+Serif);
  @import '../assets/style.css';

  /* 高亮颜色 */
  ::selection {
    color: #fff;
    background: #f676b2; /* Safari */
  }
  ::-moz-selection {
    color: #fff;
    background: #f676b2; /* Firefox */
  }
  .login-zone{
    height: 100%;
    overflow-y:hidden;
    background: url('../assets/images/bg.png');

  }

  * {
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
  }

/*page*/
  #wrapper{

    text-align: left;
    text-decoration: none;
    height:100%;
    width: 300px;
    margin: 0 auto -89px auto;
    position: relative;

    bottom: 0;
    left: 0;
    right:0;
  }

  #wrapper:after{
    content: "";
    display: block;
    height:89px;
  }

  /* login form */
  .login-form {
    position: absolute;
    top: 9%;
    background: #f3f3f3;
    border: 1px solid #fff;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.5);
    -moz-box-shadow: 0 1px 3px rgba(0,0,0,0.5);
    -webkit-box-shadow: 0 1px 3px rgba(0,0,0,0.5);
  }

  /* form-header */
  .login-form .form-header {
    padding: 40px 30px 20px 30px;
  }

  .login-form .form-header h1 {
    font-family: 'Bree Serif', serif;
    font-weight: 300;
    font-size: 20px;
    line-height:30px;
    color: #414848;
    text-shadow: 1px 1px 0 rgba(256,256,256,1.0);
    margin-bottom: 10px;
  }

  .login-form .form-header span,.form-header a {
    font-size: 11px;
    line-height: 16px;
    color: #678889;
    text-shadow: 1px 1px 0 rgba(256,256,256,1.0);
    text-decoration: none;
  }

  /* content */
  .login-form .content {
    padding: 0 30px 15px 30px;
  }

  /* Input field */
  .login-form .content .input {
    width: 188px;
    padding: 15px 25px;
    font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: #9d9e9e;
    text-shadow: 1px 1px 0 rgba(256,256,256,1.0);
    background: #fff;
    border: 1px solid #fff;
    border-radius: 5px;
    box-shadow: inset 0 1px 3px rgba(0,0,0,0.50);
    -moz-box-shadow: inset 0 1px 3px rgba(0,0,0,0.50);
    -webkit-box-shadow: inset 0 1px 3px rgba(0,0,0,0.50);
  }
  .login-form .content .password, .login-form .content .pass-icon {
    margin-top: 20px;
  }

  .login-form .content .input:hover {
    background: #dfe9ec;
    color: #414848;
  }
  .login-form .content .input:focus {
    background: #dfe9ec;
    color: #414848;
    box-shadow: inset 0 1px 2px rgba(0,0,0,0.25);
    -moz-box-shadow: inset 0 1px 2px rgba(0,0,0,0.25);
    -webkit-box-shadow: inset 0 1px 2px rgba(0,0,0,0.25);
  }

  /* left icons */
  .user-icon, .pass-icon {
    width: 46px;
    height: 47px;
    display: block;
    position: absolute;
    left: 0;
    padding-right: 2px;
    visibility: hidden;
    -moz-border-radius-topleft: 5px;
    -moz-border-radius-bottomleft: 5px;
    -webkit-border-top-left-radius: 5px;
    -webkit-border-bottom-left-radius: 5px;
  }

  .user-icon {
    top:123px;
    background: rgba(65,72,72,0.75) url('../assets/images/user-icon.png') no-repeat center;
  }

  .pass-icon {
    top:196px;
    background: rgba(65,72,72,0.75) url('../assets/images/pass-icon.png') no-repeat center;
  }

  .content input:focus + div{
    left: -49px;
    visibility: visible;
    -webkit-transition: 0.5s;
    -moz-transition: 0.5s;
    -ms-transition: 0.5s;
    -o-transition: 0.5s;
    transition: 0.5s;
  }

  .user-icon, .pass-icon{
    transition: all 0s ease;
    -moz-transition: all 0s ease;
    -webkit-transition: all 0s ease;
    -o-transition: all 0s ease;
    -ms-transition: all 0s ease;
  }

  /* Animation */
  .input, .button, .findpass {
    transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -webkit-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    -ms-transition: all 0.5s ease;
  }

  /* form-footer */
  .login-form .form-footer {
    padding: 25px 30px 25px 30px;
    overflow: hidden;
    background: #d4dedf;
    border-top: 1px solid #fff;
    box-shadow: inset 0 1px 0 rgba(0,0,0,0.15);
    -moz-box-shadow: inset 0 1px 0 rgba(0,0,0,0.15);
    -webkit-box-shadow: inset 0 1px 0 rgba(0,0,0,0.15);
  }

  /* Login button */
  .login-form .form-footer .button {
    float:right;
    padding: 11px 25px;
    font-family: 'Bree Serif', serif;
    font-weight: 300;
    font-size: 18px;
    color: #fff;
    text-shadow: 0px 1px 0 rgba(0,0,0,0.25);
    background: #56c2e1;
    border: 1px solid #46b3d3;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: inset 0 0 2px rgba(256,256,256,0.75);
    -moz-box-shadow: inset 0 0 2px rgba(256,256,256,0.75);
    -webkit-box-shadow: inset 0 0 2px rgba(256,256,256,0.75);
  }

  .login-form .form-footer .button:hover {
    background: #3f9db8;
    border: 1px solid rgba(256,256,256,0.75);
    box-shadow: inset 0 1px 3px rgba(0,0,0,0.5);
    -moz-box-shadow: inset 0 1px 3px rgba(0,0,0,0.5);
    -webkit-box-shadow: inset 0 1px 3px rgba(0,0,0,0.5);
  }

  .login-form .form-footer .button:focus {
    position: relative;
    bottom: -1px;
    background: #56c2e1;
    box-shadow: inset 0 1px 6px rgba(256,256,256,0.75);
    -moz-box-shadow: inset 0 1px 6px rgba(256,256,256,0.75);
    -webkit-box-shadow: inset 0 1px 6px rgba(256,256,256,0.75);
  }

  /* Register button */
  .login-form .form-footer .findpass {
    display: block;
    float: right;
    padding: 10px;
    margin-right: 40px;
    background: none;
    border: none;
    cursor: pointer;
    font-weight: 300;
    font-size: 13px;
    line-height: 18px;
    color: #678889;
    text-shadow: 0 1px 0 rgba(256,256,256,0.5);
  }

  .login-form .form-footer .findpass:hover,.form-header a:hover {
    color: #3f9db8;
  }

  .login-form .form-footer .findpass:focus {
    position: relative;
    bottom: -1px;
  }

  /*hidden area*/
  .user-validate,.pass-validate{
    height: 25px;
    font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: #f676b2;
    visibility: visible;
  }
</style>


