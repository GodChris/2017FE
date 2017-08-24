<template>
  <section>
    <el-table :data="actions" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width:100%;">
      <el-table-column prop="action_module" label="操作模块"  width=""></el-table-column>
      <el-table-column prop="action_module_id" label="操作模块ID" width=""></el-table-column>
      <el-table-column prop="action_type" label="操作类型" width=""></el-table-column>
      <el-table-column prop="create_date" label="创建时间" width=""></el-table-column>
      <el-table-column prop="ip_address" label="IP地址" width=""></el-table-column>
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
        actions:[],
        page_size:5,
        total:0,
        page:1,
        listLoading: false,
      }
    },
    methods:{
      selsChange: function (sels) {
        this.sels = sels;
      },
      pageSizeChange(val) {
        this.page_size= val;
        this.getActionLog();
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getActionLog();
      },
      getActionLog(){
        let para={
          page:this.page,
          page_size:this.page_size
        };
        this.listLoading = true;
        api.getActions(para)
          .then(res=>{
            if(res.data.status===0){
              this.total=res.data.total;
              let actionsData=res.data.data;
              let datas=[];
              for(let i=0;i<actionsData.length;i++){
                let obj={};
                obj.action_module=actionsData[i].action_module;
                obj.action_module_id=actionsData[i].action_module_id;
                obj.action_type=actionsData[i].action_type;
                obj.create_date=actionsData[i].create_date;
                obj.ip_address=actionsData[i].ip_address;
                datas[i]=obj
              }
              this.actions=datas;
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
          console.log(err)
        })
      }
    },
    mounted(){
      this.getActionLog()
    }
  }
</script>

<style>
</style>
