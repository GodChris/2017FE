<template>
  <div id="campaigns">
    <p class="font-18 transparent">期待让新用户使用您的应用程序？</p>
    <el-button type="primary" @click="create" class="create">创建广告系列</el-button>
  </div>
</template>

<script>
    export default{
        methods:{
            create:function(){
                this.$router.push('/step1')
            }
        }
    }
</script>

<style scoped>
  #campaigns{
    background-image: url(https://www.applovin.com/assets/retargeting/img/empty-placeholders/empty-campaigns.svg);
    width: 420px;
    margin: 25pt auto 0 auto;
    padding-top: 150px;
    font-family: Avenir-Standard;
    color: #9EA2AB;
    font-size: 20px;
    text-align: center;
    background-repeat: no-repeat;
    background-position: center top;
  }
  #campaigns p{
    font-size: 18px!important;
    color: #9ea2ab;
  }
  .create{

  }
</style>
