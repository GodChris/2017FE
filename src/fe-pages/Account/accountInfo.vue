<template>
  <div>
    <el-form :model="addForm" label-width="110px" :rules="addFormRules" ref="addForm"
             :label-position="position" class="addForm">
      <span class="octittle">账户信息:</span>
      <el-form-item label="邮箱" prop="email">
        <input type="text" v-model="addForm.email" readonly
               style="width: 250px;height: 36px;border: none;color:rgb(23,33,47);font-size: 15px;">
      </el-form-item>
      <el-form-item label="QQ" prop="qq">
        <el-input v-model="addForm.qq"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="addForm.phone"></el-input>
      </el-form-item>
      <span class="octittle" style="position: relative;top: 10px">开票信息:</span>
      <el-form-item label="开票项目名称" prop="name" style="margin-top:20px;">
        <el-select v-model="addForm.name" placeholder="请选择开票项目名称" style="width: 250px;height: 36px;">
          <el-option
            v-for="(key,value) in invoice_name"
            :key="value"
            :label="key"
            :value="value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="发票类型">
        <el-radio v-model="addForm.type" v-for="(key,value) in invoices" :key="value"
                  :label="parseInt(value)" id="radio">
          {{key}}
        </el-radio>
      </el-form-item>

      <el-form-item label="开票企业名称" prop="company_name">
        <el-input v-model="addForm.company_name"></el-input>
      </el-form-item>
      <el-form-item label="企业税号" prop="tax_no">
        <el-input v-model="addForm.tax_no"></el-input>
      </el-form-item>
      <el-form-item label="注册地址" prop="address">
        <el-input v-model="addForm.address"></el-input>
      </el-form-item>
      <el-form-item label="注册电话" prop="telephone">
        <el-input v-model="addForm.telephone"></el-input>
      </el-form-item>
      <el-form-item label="开户行" prop="bank_name">
      <el-input v-model="addForm.bank_name"></el-input>
      </el-form-item>
      <el-form-item label="银行帐号" prop="bank_no">
      <el-input v-model="addForm.bank_no"></el-input>
      </el-form-item>
      <el-button class="openbutton" native-type="reset">取消</el-button>
      <el-button class="openbutton" type="primary" @click.native="addSubmit('addForm')" :loading="addLoading">提交</el-button>
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
        if(!((/^0\d{2,3}-[1-9]\d{6,7}$/.test(value))||(/^1[3|4|5|7|8][0-9]{9}$/.test(value)))){
          return callback(new Error('电话号码格式不正确'));
        }
        callback();
      };
      let qqValidate=(rule,value,callback)=>{
        if(!(/[1-9][0-9]{4,}/.test(value))){
          return callback(new Error('QQ号格式不正确'));
        }
        callback();
      };
      let bankNoValidate=(rule,value,callback)=>{
          if(!(/^\d{16}|\d{17}|\d{18}|\d{19}$/.test(value))){
            return callback(new Error('银行卡号格式不正确'));
          }
        callback();
      };
      let checkType=(rule,value,callback)=>{
        if (!document.getElementById('radio').checked) {
          return callback(new Error('请选择发票类型'));
        }
        callback();
      };
      return {
        addForm:{
          //account
          email:'',
          qq:'',
          phone:'',
          //invoice info
          name:'',
          type:'',
//          entity_name:'',
          company_name:'',
          tax_no:'',
          address:'',
          telephone:'',
          bank_name:'',
          bank_no:''
        },
        addFormRules: {
          qq:[
            {required: true, message: 'QQ不可为空', trigger: 'blur'},
            {validator:qqValidate,trigger:'blur'}
          ],
          phone:[
            {required: true, message: '手机号码不可为空', trigger: 'blur'},
            {validator:phoneValidate,trigger:'blur'}
          ],

          name:[
            { required: true, message: '请选择开票项目名称', trigger: 'change'}
          ],
          type: [
            {validator:checkType,trigger:'change'}
          ],
//          entity_name:[
//            { required: true, message: '请选择开票主体', trigger: 'change'}
//          ],
          company_name:[
            { required:true,message:'请填写发票抬头',trigger:'blur'}
          ],
          tax_no:[
            { required:true,message:'企业税号',trigger:'blur'}
          ],
          address:[
            { required:true,message:'请填写公司地址',trigger:'blur'},

          ],
          telephone:[
            { required:true,message:'电话号码不可为空',trigger:'blur'},
            { validator:telValidate,trigger:'blur'}
          ],
          bank_name:[
            { required:true,message:'请填写开户行',trigger:'blur'},
          ],
          bank_no:[
            { required:true,message:'请输入16-19位的银行卡号',trigger:'blur'},
            { validator:bankNoValidate,trigger:'blur'}
          ]
        },
        invoice_name:JSON.parse(sessionStorage.getItem('invoice_name')),
        entity_name:JSON.parse(sessionStorage.getItem('entity_name')),
        invoices:JSON.parse(sessionStorage.getItem('invoice_type')),
        position:'left',
        addLoading: false

      }
    },
    methods:{
      getInfo(){
          api.getUserInfo().then(res=>{
              if(res.data.status===0){
                  this.addForm={
                    email:res.data.data[0].email,
                    qq:res.data.data[0].qq,
                    phone:res.data.data[0].phone,
                    name:(res.data.data[0].invoice===null?'':res.data.data[0].invoice.name),
                    type:(res.data.data[0].invoice===null?'':res.data.data[0].invoice.type),
//                    entity_name:(res.data.data[0].invoice===null?'':res.data.data[0].invoice.entity_name),
                    company_name:(res.data.data[0].invoice===null?'':res.data.data[0].invoice.company_name),
                    tax_no:(res.data.data[0].invoice===null?'':res.data.data[0].invoice.tax_no),
                    address:(res.data.data[0].invoice===null?'':res.data.data[0].invoice.address),
                    telephone:(res.data.data[0].invoice===null?'':res.data.data[0].invoice.telephone),
                    bank_name:(res.data.data[0].invoice===null?'':res.data.data[0].invoice.bank_name),
                    bank_no:(res.data.data[0].invoice===null?'':res.data.data[0].invoice.bank_no),
                  }
              }else{
                this.$message({
                  message:'获取信息出错'+res.data.msg
                });
              }
          }).catch(err=>{
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
                email:this.addForm.email,
                qq:this.addForm.qq,
                phone:this.addForm.phone,
                invoice:{
                  name:this.addForm.name,
                  type:parseInt(this.addForm.type),
//                  entity_name:this.addForm.entity_name,
                  company_name:this.addForm.company_name,
                  tax_no:this.addForm.tax_no,
                  address:this.addForm.address,
                  telephone:this.addForm.telephone,
                  bank_name:this.addForm.bank_name,
                  bank_no:this.addForm.bank_no
                }
              };
              console.log(JSON.stringify(datas));
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
  .addForm{
    margin: 20px auto 20px;
    width: 360px;
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
  .active{
    border: none;
  }
</style>
