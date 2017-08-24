<template>
  <el-form :model="invoiceForm" ref="invoiceForm" label-width="80px" :rules="invoiceFormRules" :label-position="position" class="invoiceForm">
    <el-form-item label="开票主体" prop="entity_name" style="margin-top:20px;">
      <el-input v-model="invoiceForm.entity_name"></el-input>
    </el-form-item>

    <el-form-item label="开票类型">
      <el-radio v-for="(key,value) in this.$store.state.user.comdata1" :key="value" :label="parseInt(value)" v-model="invoiceForm.invoice_type" name="type">
        {{ key }}
      </el-radio>
    </el-form-item>
    <el-form-item label="座机号" prop="invoice_tel">
      <el-input v-model="invoiceForm.invoice_tel"></el-input>
    </el-form-item>
    <el-form-item label="银行" prop="invoice_bank">
      <el-input v-model="invoiceForm.invoice_bank"></el-input>
    </el-form-item>
    <el-form-item label="银行号" prop="invoice_bank_no">
      <el-input v-model="invoiceForm.invoice_bank_no"></el-input>
    </el-form-item>
    <el-form-item label="开票名" prop="invoice_name">
      <el-input v-model="invoiceForm.invoice_name"></el-input>
    </el-form-item>

    <el-button class="openbutton" native-type="reset">取消</el-button>
    <el-button class="openbutton" type="primary" @click.native="addSubmit('invoiceForm')" :loading="addLoading">开户</el-button>
  </el-form>
</template>

<script>
    export default{
        data(){
          let telValidate=(rule,value,callback)=>{
            if(!(/^0\d{2,3}-[1-9]\d{6,7}$/.test(value))){
              return callback(new Error('座机号码格式不正确'));
            }
            callback();
          };
            return{
              addLoading:false,
              position:'left',
                invoiceForm:{
                  entity_name:'',
                  invoice_type:'',
                  invoice_tel:'',
                  invoice_bank:'',
                  invoice_bank_no:'',
                  invoice_name:''
                },
              invoiceForms:{
                  entity_name:[
                    {required: true, message: '必须输入开票实体', trigger: 'blur'}
                  ],
                  invoice_tel:[
                    {required: true, message: '必须输入座机号码', trigger: 'blur'},
                    {validator:telValidate,trigger:'blur'}
                  ],
                  invoice_bank:[
                    {required: true, message: '必须输入开户银行', trigger: 'blur'}
                  ],
                  invoice_bank_no:[
                    {required: true, message: '必须输入银行账号', trigger: 'blur'}
                  ],
                  invoice_name:[
                    {required: true, message: '必须输入开户名', trigger: 'blur'}
                  ]
              }
            }
        },
      methods:{
            addSubmit:function(formName){
              this.$refs[formName].validate((valid) =>{
                  if(valid){
                      this.$confirm('确认修改吗？', '提示', {}).then(()=>{
                        this.addLoading=true;
                        let datas={}
                      })
                  }
              })
            }
      }
    }
</script>

<style scoped>
  .invoiceForm{
    margin: 20px auto 20px;
    width: 400px;
  }

</style>
