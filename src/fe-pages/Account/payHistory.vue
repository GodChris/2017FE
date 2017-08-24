<template>
  <section>
    <el-table :data="recharges" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width:100%;">
      <el-table-column prop="order_money" label="金额" width=""></el-table-column>
      <el-table-column prop="order_type" label="支付方式" width=""></el-table-column>
      <el-table-column prop="order_date" label="付款时间" width=""></el-table-column>
      <el-table-column prop="account_no" label="用户账户" width=""></el-table-column>
      <el-table-column prop="account_name" label="用户名" width=""></el-table-column>
      <el-table-column prop="description" label="描述" width=""></el-table-column>
      <el-table-column prop="create_date" label="创建时间" width=""></el-table-column>
      <el-table-column prop="status" label="处理进度" width="100"
                       :filters="[{ text: '待处理', value: '待处理' }, { text: '已处理', value: '已处理' }]"
                       :filter-method="filterStatus" filter-placement="bottom-end">
        <template scope="scope">
          <el-tag :type="scope.row.status === '0' ? 'primary' : 'success'" close-transition>{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
      <!--<el-table-column label="操作"  width="">-->
      <!--<template scope="scope">-->
      <!--<el-button size="small" @click="handleAudit(scope.$index, scope.row)">审核</el-button>-->
      <!--</template>-->
      <!--</el-table-column>-->
    </el-table>
    <!--分页-->
    <el-col :span="24" class="toolbar">
      <el-pagination layout="prev, pager, next,jumper" style="float:right;"
                     @current-change="handleCurrentChange"
                     @size-change="pageSizeChange"
                     :page-size="page_size"
                     :total="total">
      </el-pagination>
    </el-col>
  </section>
</template>

<script>
  import api from '../../axios/api'
  export default{
    data(){
      return{
        sels:[],
        recharges:[],
        page_size:5,
        total:0,
        page:1,
        listLoading: false,
      }
    },
    methods:{
      filterStatus(value,row){
        return row.status === value;
      },
      selsChange: function (sels) {
        this.sels = sels;
      },
      pageSizeChange(val) {
        this.page_size= val;
        this.getRechargeHistory();
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getRechargeHistory();
      },
      getRechargeHistory(){
        let para = {
          page: this.page,
          page_size:this.page_size,
        };
        this.listLoading = true;
        api.getRecharges(para)
          .then(res=>{
            if(res.data.status===0){
              this.total=res.data.total;
              let rechargesData=res.data.data;
              let datas=[];
              for(let i=0;i<rechargesData.length;i++){
                let obj={};
                obj.order_money=rechargesData[i].order_money;
                obj.order_type=(rechargesData[i].order_type>2?'微信':(rechargesData[i].order_type===2?'支付宝':'银行'));
                obj.order_date=rechargesData[i].order_date;
                obj.account_no=rechargesData[i].account_no;
                obj.account_name=rechargesData[i].account_name;
                obj.description=rechargesData[i].description;
                obj.create_date=rechargesData[i].create_date;
                obj.status=(rechargesData[i].status===0?'待处理':'已处理');
                datas[i]=obj;
              }
              this.recharges=datas;
              setTimeout(()=>{
                this.listLoading=false;
              },1000);
            }else{
              setTimeout(()=>{
                this.$message({
                  message:'查询出错'+res.data.msg,
                  type:'error'
                });
                this.listLoading=false;
              },1000);
            }
          }).catch(err=>{
          setTimeout(()=>{
            this.$message({
              message:'查询失败'+err,
              type:'error'
            });
            this.listLoading=false;
          },2000);
          console.log(err);
        })
      }
    },
    mounted(){
      this.getRechargeHistory();
    }
  }
</script>

<style scoped>
</style>
