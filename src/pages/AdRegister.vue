<template>
  <div class="register-zone">
    <div class="register-header"></div>
    <div class="register-form">
      <div class="content">
      <h1> 注册</h1>
      <form id="registerHere"  method="post">
      <div class="row">
        <input type="email" v-model="email" v-verify.email="email" placeholder="Email" @blur="emailTest">
      </div>
        <span class="reminder" v-remind="email" id="emailTest"></span>

        <div class="row pass">
          <input type="password" id="password" v-model="pwd" v-verify="pwd" placeholder="password">
        </div>
        <span class="reminder" v-remind="pwd"></span>

        <div class="row pass">
          <input type="password" id="repassword" v-model="repassword" v-verify="repassword" placeholder="confirm password">
        </div>
        <span class="reminder" v-remind="repassword"></span>

        <div class="row">
          <input type="text" v-model="company_name" v-verify="company_name" placeholder="Your Company Name">
        </div>
        <span class="reminder" v-remind="company_name"></span>

        <div class="row">
          <input type="text" v-model="phone" v-verify="phone" placeholder="Your phone">
        </div>
        <span class="reminder" v-remind="phone"></span>

        <div class="row">
          <input type="text" v-model="qqnum" v-verify="qqnum" placeholder="Your QQ">
        </div>
        <span class="reminder" v-remind="qqnum"></span>

      <div class="submit">
        <div>
        <span>已有账号？</span>
        <router-link to="/login" tag="span">
          <a> 在这里登录</a>
        </router-link>
        </div>
        <el-button native-type="submit" id="register" @click.prevent="register" :loading="signing">注册</el-button>

      </div>
      </form>
      </div>
    </div>
  </div>
</template>

<script>

  import api from '../axios/api'
  import * as _ from '../axios/commonMethod'
  import { mapActions } from 'vuex'
  import vuex from 'vuex'
  import axios from 'axios'

  import pagefoot from '../components/foter.vue'

  export default{

      name:'register',
      components:{
        'page-footer':pagefoot
      },
      data(){
        return{
//          options: [
//            { text: '开发者', value: '1' },
//            { text: '广告商', value: '2' },
//            { text: '内部人员', value: '3' }
//          ],
          email:'',
          pwd:'',
          repassword:'',
          company_name:'',
          phone:'',
          qqnum:'',
//          selectedValue:'',
          signing:false
            }
        },

      verify:{
          company_name:[
            {
                maxLength:300,
              message:"公司名不得大于300位"
            }
          ],
          email:["required","email"],
          pwd:["required",{
              minLength:6,
             message:"密码需大于6位"
          },
            {
              maxLength:16,
              message:"密码需要小于16位"
          }],
          repassword:["required","passv"],
          qqnum:["required",
            {
                maxLength:20,
              message:"QQ号不得超过20位"
            }],
          phone:["required","mobile"]
      },
      methods:{
        emailTest(){
            if(this.$verify.check("email")){
          axios.get('/signup/'+this.email).then(res => {

            if(res.data.status!==0){
              console.log(res);
              document.getElementById("emailTest").innerHTML="该邮箱已注册";
            }else{
              document.getElementById("emailTest").innerHTML="邮箱可用";
            }
          }).catch(err => {
            console.log(err)
          });
        }},
          register(){
           if(this.$verify.check()){
            let that=this;
            that.$store.dispatch('setLoadingState', true);
            that.signing=true;
            let data = {
              email:this.email.toString(),
              password: this.pwd,
              dpassword:this.repassword,
              company_name:this.company_name,
              qq:this.qqnum,
              phone:this.phone,
            };
                api.Register(data).then(res => {
                    console.log(data);
                  that.signing=false;
                    if (res.data.status===0) {
                      that.$store.dispatch('setLoadingState', false);
                      setTimeout(()=>{that.$router.replace('/login')},2000);
                    }
                  })
                  .catch(error => {
                    console.log(error.config);
                    that.signing=false;
                  })
          }}
      }
  }
</script>

<style>

  html,
  body {
    height: 100%;
    min-height: 100%;

  }
  #app{height: 100%;}
</style>

<style scoped>
  @import '../assets/style.css';

  .register-zone{
    background-color: #0583aa;
    min-height:100%;
    height: 600px;
  }
  .register-form{
  position: absolute;
  left: 50%;
  width: 300px;
  top: 30px;
  margin: 0 auto 0 -170px;

}
  .register-form h1{
    font-size: 24px;
    color: #333;
    margin: 0 0 4px 0;
    font-family: 'Bree Serif', serif;
}

  .register-form .submit{
    width: 144px;
    display: block !important;
    margin: 0 auto;
  }
  .register-form .submit div{
    font-size: 11px;
    line-height: 16px;
    color: #678889;
    text-shadow: 1px 1px 0 rgba(256,256,256,1.0);
    position: relative;
    right:60px;
  }
  .submit div a{text-decoration: none;}
  .register-form .content{
    border-radius: 4px;
    background: #FFF;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
    padding: 15px 20px 20px;
  }
  .register-form .content  .reminder{
    font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
    font-size: 14px;
    text-align: right;
    color: #777;
    display: block;
    margin: 0 auto 0px;
    position: relative;
    top: -10px;height:17px;
  }

  /*.register-form .content  .customSelect{*/
    /*width: 100%;*/
    /*height: 44px;*/

    /*border: 1px solid #d7d7d7;*/
    /*background: url("../assets/images/dropdown-arrow.svg") no-repeat 234px #ffffff;*/
    /*font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;*/
  /*}*/

  /*.register-form .content  .customSelect select{*/
    /*background: transparent;*/
    /*width: 100%;*/
    /*font-size: 16px;*/
    /*border: 0;*/
    /*border-radius: 0;*/
    /*height: 44px;*/
    /*-webkit-appearance: caret;*/
    /*-moz-appearance: caret;*/
    /*padding: 10px;*/
  /*}*/
  /*.register-form .content  .customSelect select:focus{*/
    /*outline: none;*/
  /*}*/

  .register-form .content .row{
    margin-bottom: 10px;
    display: block;
    width: 100%;
    position: relative;
  }
  .register-form .content  .row input[type=text],
  .register-form .content  .row input[type=email],
  .register-form .content  .row input[type=password]{
    font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
    border: 1px solid #d7d7d7;
    font-size: 14px;
    height: 42px;
    padding: 0 0 0 10px;
    display: block;
    width: 96%;
    transition: 0.2s all linear;
    position: relative;
    margin-top: -1px;
  }

  .register-form .content  .row input[type=text]:focus,
  .register-form .content  .row input[type=email]:focus,
  .register-form .content  .row input[type=password]:focus{
    outline: none;
    border: 1px solid #0583aa;
    z-index: 1;
  }

  .register-form .content  .row input[type=text]:first-child,
  .register-form .content  .row input[type=email]:first-child,
  .register-form .content  .row input[type=password]:first-child{
    outline: none;
  }



  #register{
    border: none;
    border-radius: 3px;
    font-family: 'Bree Serif', serif;
    color: #FFF;
    text-transform: uppercase;
    font-size: 16px;
    padding: 10px 24px;
    text-align: center;
    background: #56c2e1;
    transition: 0.2s all linear;
    box-shadow: 0 -3px 0 rgba(0, 0, 0, 0.3) inset;
    letter-spacing: 1px;
    display: inline-block;
    width: 100px;
    position: relative;
    left: 80px;
    top: -20px;

  }

  #register:hover{
    background: #3f9db8;
    box-shadow: inset 0 1px 3px rgba(0,0,0,0.5);
  }

  /*!*erroe tip*!*/
  /*span.errorTip {*/
    /*position: absolute;*/
    /*padding: 10px;*/
    /*font-size: 12px;*/
    /*text-align: center;*/
    /*color: #7f0e0c;*/
    /*background: #FDE5E3;*/
    /*border: 1px solid #F9C0BB;*/
    /*border-radius: 5px;*/
    /*text-shadow: rgba(0, 0, 0, 0.0980392) 1px 1px 1px;*/
    /*box-shadow: rgba(0, 0, 0, 0.0980392) 1px 1px 2px 0px;*/
    /*z-index: 1;*/
    /*display: none;*/
    /*margin-top: 0px;*/
    /*margin-left: 10px;*/
    /*left: 100%;*/
    /*top: 3px;*/
    /*width: 150px;*/
  /*}*/
  /*span.errorTip:after {*/
    /*content: "";*/
    /*position: absolute;*/
    /*width: 0;*/
    /*height: 0;*/
    /*border-width: 10px;*/
    /*border-style: solid;*/
    /*border-color: transparent #FDE5E3 transparent transparent;*/
    /*top: 8px;*/
    /*right: 100%;*/
    /*left: auto;*/
    /*z-index: 1;*/
  /*}*/
  /*span.errorTip:before {*/
    /*content: "";*/
    /*position: absolute;*/
    /*width: 0;*/
    /*height: 0;*/
    /*border-width: 11px;*/
    /*border-style: solid;*/
    /*border-color: transparent #F9C0BB transparent transparent;*/
    /*top: 7px;*/
    /*right: 100%;*/
    /*left: auto;*/
    /*margin-bottom: -1px;*/
    /*z-index: 1;*/
  /*}*/

  /*footer{*/
    /*border-top: 4px solid #000;*/
    /*background: #0b303c;*/
    /*padding: 20px 0;*/
    /*font-size: 11px;*/
    /*color: rgba(255, 255, 255, 0.2);*/
    /*height:45px;*/
    /*width: 100%;*/



  /*}*/
</style>
