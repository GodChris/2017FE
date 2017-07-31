<template>
  <div class="register-zone">
    <div class="register-header"></div>
    <div class="register-form">
      <div class="content">
      <h1>aa</h1>
      <form id="registerHere">
      <div class="row">
        <input type="text" v-model="uname" placeholder="Your Name">
      </div>
        <span class="reminder" v-show="true">{{usertip}</span>

      <div class="row">
        <input type="email" v-model="email" placeholder="Email">
      </div>
        <span class="reminder">{{emailtip}}</span>

      <div class="row">
        <div class="customSelect">
          <select v-model="selectedValue">
            <option value="" disabled>我是</option>
            <option >Developer</option>
            <option >Advertiser</option>
          </select>
        </div>
      </div>
        <span class="reminder">{{selecttip}}</span>

      <div class="row pass">
        <input type="password" id="password" v-model="password" placeholder="password">
      </div>
        <span class="reminder">{{passtip}}</span>


      <div class="row pass">
        <input type="password" id="repassword" placeholder="confirm password">
      </div>
        <span class="reminder" >{{repasstip}</span>

      <div class="submit">
        <input type="submit" id="register" value="register" @click="register">
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

  import pagefoot from '../components/foter.vue'
  export default{
      name:'register',
      components:{
        'page-footer':pagefoot
      },
      data(){
        return{
          usertip: '',
          emailtip:'',
          selecttip:'',
          passtip:'',
          repasstip:'',
          uname:'',
          email:'',
          selectedValue:'',
          pwd:''
            }
        },
      methods:{
          register(){
              if(!this.uname||!this.email||!this.selectedValue||!this.pwd){
                //调用公共模块的方法
                  _.alert('请填写完整的信息');
              }
              //data部分
              let data={
                  username:this.uname,
                  email:this.email,
                  password:this.pwd,
                  type:this.selectedValue
              };

            this.$store.dispatch('setLoadingState', true);
              //
            api.Register(data)
              .then(res => {
                if(res.success) {
                  // let userInfo = Object.assign()
                  this.$store.dispatch('setLoadingState', false);
                  this.setUserInfo(res.data);
                  this.$router.replace('/');
                }
              })
              .catch(error => {
                console.log(error)
              })
          }
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
    height: 100%;
    overflow: hidden;

  }
  .register-form{
  position: absolute;
  left: 50%;
  width: 300px;
  top: 30px;
  margin: 0 auto 0 -180px;


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

  .register-form .content  .customSelect{
    width: 100%;
    height: 44px;

    border: 1px solid #d7d7d7;
    background: url("../assets/images/dropdown-arrow.svg") no-repeat 234px #ffffff;
    font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
  }

  .register-form .content  .customSelect select{
    background: transparent;
    width: 100%;
    font-size: 16px;
    border: 0;
    border-radius: 0;
    height: 44px;
    -webkit-appearance: caret;
    -moz-appearance: caret;
    padding: 10px;
  }
  .register-form .content  .customSelect select:focus{
    outline: none;
  }

  .register-form .content .row{
    margin-bottom: 20px;
    display: block;
    width: 100%;
    position: relative;
  }
  .register-form .content  .row input[type=text],
  .register-form .content  .row input[type=email],
  .register-form .content  .row input[type=password]{
    font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
    border: 1px solid #d7d7d7;
    font-size: 16px;
    height: 44px;
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



  .register-form .content .submit input[type=submit]{
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

  }

  .register-form .content .submit input[type=submit]:hover{
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

  footer{
    border-top: 4px solid #000;
    background: #0b303c;
    padding: 20px 0;
    font-size: 11px;
    color: rgba(255, 255, 255, 0.2);
    height:45px;
    width: 100%;



  }
</style>
