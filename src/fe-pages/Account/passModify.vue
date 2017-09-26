<template>
  <el-form :model="modify" :labelPosition="labelPosition" :rules="modifyRules" class="modifyForm" ref="modify">
    <el-form-item label="当前密码" prop="originalPass">
      <el-input v-model="modify.originalPass" type="password"></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="newPass">
      <el-input v-model="modify.newPass" type="password"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmPass">
      <el-input v-model="modify.confirmPass" type="password"></el-input>
    </el-form-item>

    <el-button class="modifyButton" native-type="reset">重置</el-button>
    <el-button class="modifyButton" type="primary" @click.native="modifyPass('modify')" :loading="modifyLoading">修改密码</el-button>
  </el-form>

</template>

<script>
  import api from '../../axios/api'
    export default{
        data(){
            let passValidate=(rule,value,callback)=>{
                if(value!==this.modify.newPass){
                  callback(new Error('两次输入密码不一致!'));
                }
                    callback();

            };
            return{
                modifyRules:{
                  originalPass:[
                    {required: true, message: '请输入当前密码', trigger: 'blur'}
                    ],
                  newPass:[
                    {required: true, message: '请输入新密码', trigger: 'blur'}
                  ],
                  confirmPass:[
                    {required: true, message: '请输入确认密码', trigger: 'blur'},
                    {validator:passValidate,trigger:'blur'}
                  ]
                },
              labelPosition:'top',
              modify:{
                  originalPass:'',
                  newPass:'',
                  confirmPass:''
                },
              modifyLoading:false,
            }
        },
      methods:{
        modifyPass:function(formName){
            console.log(this.$store.state.user);
          this.$refs[formName].validate((valid) =>{
            if(valid){
              this.$confirm('修改后将退出？', '提示', {}).then(()=>{
                this.modifyLoading=true;
                let resetData={
                  old_password:this.modify.originalPass,
                  password:this.modify.newPass,
                  dpassword:this.modify.confirmPass
                };
                api.resetPass(JSON.stringify(resetData))
                  .then(res=>{
                    if(res.data.status===0){
                      this.modifyLoading = false;
                      this.$message({
                        message: '修改成功',
                        type: 'success'
                      });
                      setTimeout(()=>{
                        this.$refs['modify'].resetFields();
                        this.$router.replace('/login')
                      },2000);
                    }else{
                      setTimeout(()=>{
                        this.$message({
                          message:'修改失败'+res.data.msg,
                          type:'error',
                        });
                        this.modifyLoading=false
                      },1000)
                    }
                  }).catch(err=>{
                  this.$message({
                    message:'修改失败'+err,
                    type:'error',
                  });
                  this.modifyLoading=false;
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
.modifyForm{
  margin: 20px auto 20px;
  width: 300px;
}
  .modifyButton{
    float: right;
    margin:0 25px 10px 0;
    position: relative;
    right: 100px;
  }
</style>
