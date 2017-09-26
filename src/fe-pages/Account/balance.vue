<template>
  <div>
    <div class="balance">
      <el-button class="getButton" type="primary" @click.native="getBalance" :loading="getLoading">查询余额</el-button>
      <table>
        <tr>
          <td>余额</td>
          <td>{{balance}}</td>
        </tr>
      </table>
    </div>



  </div>
</template>

<script>
  import api from '../../axios/api'
    export default{
        data(){
            return{
              balance:'',
              getLoading:false
            }
        },
      methods:{
            getBalance(){
                api.getBalance()
                  .then(res=>{
                      if(res.data.status===0){
                          console.log(res.data.data.balance);
                          this.balance=res.data.data.balance;
                      }
                  }).catch(err=>{
                  this.$message({
                    message:'查询失败'+err,
                    type:'error',
                  });
                      console.log(err)
                })
            }
      }
    }
</script>

<style scoped>
  .balance{
    margin: 20px auto;
    width: 210px;
    height: 30px;
  }
  .balance table,td{
    border:1px solid black;
    border-collapse: collapse;
  }
  .balance table tr td{
    width:100px;
    border: 1px solid black;
    border-collapse: collapse;
  }
  .getButton{
    margin:20px 20px 10px 40px;
    position:relative;
  }
</style>
