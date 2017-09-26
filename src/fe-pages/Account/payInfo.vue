<template>
  <el-form :model="rechargesForm" label-width="80px" :rules="rechargesFormRules" ref="rechargesForm" :label-position="position" class="rechargesForm">
    <el-form-item label="金额" prop="order_money">
      <el-input v-model="rechargesForm.order_money"></el-input>
    </el-form-item>
    <!--<el-form-item label="支付方式">-->
      <!--<el-radio v-model="rechargesForm.order_type" label="1" name="type">银行</el-radio>-->
      <!--<el-radio v-model="rechargesForm.order_type" label="2" name="type">支付宝</el-radio>-->
      <!--<el-radio v-model="rechargesForm.order_type" label="3" name="type">微信</el-radio>-->
    <!--</el-form-item>-->

    <el-form-item label="支付方式">
      <el-radio v-for="(key,value) in order_types" :key="value"
                :label="parseInt(value)" v-model="rechargesForm.order_type" name="type">
        {{ key }}
      </el-radio>
    </el-form-item>

    <el-form-item label="支付账号" prop="account_no">
      <el-input v-model="rechargesForm.account_no"></el-input>
    </el-form-item>
    <el-form-item label="支付人" prop="account_name">
      <el-input v-model="rechargesForm.account_name"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="description">
      <el-input type="textarea" v-model="rechargesForm.description"></el-input>
    </el-form-item>
    <el-button class="openbutton" native-type="reset">取消</el-button>
    <el-button class="openbutton" type="primary" @click.native="addSubmit('rechargesForm')" :loading="addLoading">充值</el-button>
  </el-form>
</template>

<script>
  import api from '../../axios/api'
  export default{
    data(){
      return{
        position:'left',
        addLoading:false,
        order_types:JSON.parse(sessionStorage.getItem('order_type')),
        rechargesForm:{
          order_money:'',
          order_type:1,
          account_no:'',
          account_name:'',
          description:''
        },
        rechargesFormRules:{
          order_money:[
            {required: true, message: '请输入充值金额', trigger: 'blur'}
          ],
          account_no:[
            {required: true, message: '请输入用户账号', trigger: 'blur'}
          ],
          account_name:[
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
//          description:[
//            {required: true, message: '请填写注释', trigger: 'blur'}
//          ],
          order_type:[
            {required:true,message:'请选择支付方式',trigger:'blur'}
          ]
        }
      }
    },
    methods:{
      addSubmit: function (formName){
        this.$refs[formName].validate((valid) => {
          if(valid){
            this.$confirm('确认充值吗？', '提示', {}).then(()=>{
              this.addLoading=true;
              let datas={
                order_money:Number(this.rechargesForm.order_money),
                order_type:parseInt(this.rechargesForm.order_type),
                account_no:this.rechargesForm.account_no,
                account_name:this.rechargesForm.account_name,
                description:this.rechargesForm.description
              };
              api.addRecharges(JSON.stringify(datas)).then(res=>{
                if(res.data.status===0){
                  this.addLoading=false;
                  this.$message({
                    message: '充值成功',
                    type: 'success'
                  });
                  this.$refs['rechargesForm'].resetFields();
                  this.$router.replace('/payHistory')
                }else{
                  setTimeout(()=>{
                    this.$message({
                      message:'充值出错'+res.data.msg,
                      type:'error'
                    });
                    this.addLoading=false
                  },1000)
                }
              }).catch(err=>{
                setTimeout(()=>{
                  this.$message({
                    message:'充值失败'+err,
                    type:'error'
                  });
                  this.addLoading=false;
                },1000);
                console.log(err);
              })
            })
          }
        })
      }
    }
  }
</script>

<style scoped>
  .rechargesForm{
    margin: 20px auto 20px;
    width: 400px;
  }
  .openbutton{
    float: right;
    margin:0 25px 10px 0;
    position: relative;
    right: 100px;
  }
</style>
