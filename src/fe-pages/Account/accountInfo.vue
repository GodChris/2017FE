<template>
  <div>
    <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm"
             :label-position="position" class="addForm">
      <span class="octittle">账户信息:</span>
      <el-form-item label="公司名" prop="company_name">
        <el-input v-model="addForm.company_name"></el-input>
      </el-form-item>
      <el-form-item label="公司地址" prop="company_addr">
        <el-input v-model="addForm.company_addr"></el-input>
      </el-form-item>
      <el-form-item label="税号" prop="tax_no">
        <el-input v-model="addForm.tax_no"></el-input>
      </el-form-item>
      <el-form-item label="QQ" prop="qq">
        <el-input v-model="addForm.qq"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="addForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="发票类型">
        <el-radio v-for="(key,value) in this.$store.state.user.comdata3" :key="value"
                  :label="parseInt(value)" v-model="addForm.statement_type" name="type">
          {{key}}
        </el-radio>
      </el-form-item>
      <el-form-item label="开票">
        <el-radio v-for="(key,value) in this.$store.state.user.comdata2" :key="value"
                  :label="parseInt(value)" v-model="addForm.need_invoice" name="type">
          {{key}}
        </el-radio>
      </el-form-item>
      <el-form-item label="业务ID" prop="zonst_user_id">
        <el-input v-model="addForm.zonst_user_id" readonly unselectable="on"></el-input>
      </el-form-item>

      <span class="octittle" style="position: relative;top: 10px">开票信息:</span>
      <el-form-item label="开票主体" prop="entity_name" style="margin-top:20px;">
      <el-input v-model="addForm.entity_name"></el-input>
      </el-form-item>
      <el-form-item label="开票类型">
        <el-radio v-for="(key,value) in this.$store.state.user.comdata1" :key="value"
                  :label="parseInt(value)" v-model="addForm.invoice_type" name="type">
          {{ key }}
        </el-radio>
      </el-form-item>
      <el-form-item label="座机号" prop="invoice_tel">
      <el-input v-model="addForm.invoice_tel"></el-input>
      </el-form-item>
      <el-form-item label="银行" prop="invoice_bank">
      <el-input v-model="addForm.invoice_bank"></el-input>
      </el-form-item>
      <el-form-item label="银行号" prop="invoice_bank_no">
      <el-input v-model="addForm.invoice_bank_no"></el-input>
      </el-form-item>
      <el-form-item label="开票名" prop="invoice_name">
      <el-input v-model="addForm.invoice_name"></el-input>
      </el-form-item>

      <el-button class="openbutton" native-type="reset">取消</el-button>
      <el-button class="openbutton" type="primary" @click.native="addSubmit('addForm')" :loading="addLoading">开户</el-button>
    </el-form>
  </div>
</template>

<script>
import api from '../../axios/api'
  export default {
    data() {
      let phoneValidate=(rule, value, callback)=>{
        if(!(/^1[3|4|5|7|8][0-9]{9}$/.test(value))){
          return callback(new Error('手机号码格式不正确'));
        }
        callback();
      };
      let telValidate=(rule,value,callback)=>{
        if(!(/^0\d{2,3}-[1-9]\d{6,7}$/.test(value))){
          return callback(new Error('座机号码格式不正确'));
        }
        callback();
      };
      let qqValidate=(rule,value,callback)=>{
        if(!(/[1-9][0-9]{4,}/.test(value))){
          return callback(new Error('QQ号格式不正确'));
        }
        callback();
      };
      return {
        addFormRules: {
          company_name:[
            { required: true, message: '请输入公司名', trigger: 'blur'}
          ],
          company_addr: [
            { required: true, message: '请输入地址', trigger: 'blur' }
          ],
          tax_no:[
            { required: true, message: '请输入税号', trigger: 'blur'}
          ],
          qq:[
            {required: true, message: '请输入QQ号', trigger: 'blur'},
            {validator:qqValidate,trigger:'blur'}
          ],
          phone:[
            {required: true, message: '请输入手机', trigger: 'blur'},
            {validator:phoneValidate,trigger:'blur'}
          ],
          entity_name:[
            { required:true,message:'请输入开票主体',trigger:'blur'}
          ],
          invoice_tel:[
            { required:true,message:'请输入手机号',trigger:'blur'},
            { validator:telValidate,trigger:'blur'}
          ],
          invoice_bank:[
            { required:true,message:'请输入银行',trigger:'blur'},
          ],
          invoice_bank_no:[
            { required:true,message:'请输入银行号码',trigger:'blur'},
          ],
          invoice_name:[
            { required:true,message:'请输入开票姓名',trigger:'blur'},
          ]
        },

        addForm:{
          //account
          company_name: '',
          company_addr: '',
          tax_no: '',
          qq:'',
          phone:'',
          statement_type:'',
          need_invoice: '',
          zonst_user_id:'',
          //invoice-info
          entity_name:'',
          invoice_type:'',
          invoice_tel:'',
          invoice_bank:'',
          invoice_bank_no:'',
          invoice_name:''
        },
        position:'top',
        addLoading: false,
      }
    },
    methods:{
      getInfo(){
          api.getUserInfo().then(res=>{
              if(res.data.status===0){
                  this.addForm={
                    user_id:res.data.data[0].user_id,
                    company_name:res.data.data[0].company_name,
                    company_addr:res.data.data[0].company_addr,
                    qq:res.data.data[0].qq,
                    phone:res.data.data[0].phone,
                    tax_no:res.data.data[0].tax_no,
                    need_invoice:res.data.data[0].need_invoice,
                    statement_type:res.data.data[0].statement_type,
                    zonst_user_id:res.data.data[0].zonst_user_id,
                    create_date:res.data.data[0].create_date,
                    entity_name:(res.data.data[0].invoice===null?'':res.data.data[0].invoice.entity_name),
                    invoice_type:(res.data.data[0].invoice===null?'':res.data.data[0].invoice.invoice_type),
                    invoice_tel:(res.data.data[0].invoice===null?'':res.data.data[0].invoice.invoice_tel),
                    invoice_bank:(res.data.data[0].invoice===null?'':res.data.data[0].invoice.invoice_bank),
                    invoice_bank_no:(res.data.data[0].invoice===null?'':res.data.data[0].invoice.invoice_bank_no),
                    invoice_name:(res.data.data[0].invoice===null?'':res.data.data[0].invoice.invoice_name),
                    email:res.data.data[0].email,
                  }
              }
          }).then(err=>{
            this.$message({
              message:'获取信息失败'
            });
              console.log(err)
          })
      },
      addSubmit: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('确认修改吗？', '提示', {}).then(() => {
              this.addLoading = true;
              let datas={
                company_name:this.addForm.company_name,
                company_addr:this.addForm.company_addr,
                tax_no:this.addForm.tax_no,
                qq:this.addForm.qq,
                phone:this.addForm.phone,
                statement_type:parseInt(this.addForm.statement_type),
                need_invoice:parseInt(this.addForm.need_invoice),
                zonst_user_id:parseInt(this.addForm.zonst_user_id),
                invoice:{
                  entity_name:this.addForm.entity_name,
                  invoice_type:parseInt(this.addForm.invoice_type),
                  invoice_tel:this.addForm.invoice_tel,
                  invoice_bank:this.addForm.invoice_bank,
                  invoice_bank_no:this.addForm.invoice_bank_no,
                  invoice_name:this.addForm.invoice_name
                }
              };
              api.editAccount(JSON.stringify(datas)).then(res=>{
                if(res.data.status===0) {
                  this.addLoading = false;
                  this.$message({
                    message: '修改成功',
                    type: 'success'
                  });
                  this.$refs['addForm'].resetFields();
                  this.getInfo();
                }
              }).catch(error=>{
                this.$message({
                  message: '修改失败'+error,
                  type: 'error'
                });
                this.addLoading = false;
                console.log(error)
              })
            });
          }
        });
      }
    },
    mounted(){
        this.getInfo();
    }
  }
</script>
<style scoped>
  .openform{
    margin: 20px auto 20px;
    width: 400px;
  }
  .openbutton{
    float: right;
    margin:0 25px 10px 0;
    position: relative;
    right: 100px;
  }
  .octittle{
    position: relative;
    bottom: 10px;
    right: 60px;
    font-size: 16px;
    color:rgb(56,69,89);
  }
</style>
