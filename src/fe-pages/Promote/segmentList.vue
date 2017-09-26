<template>
  <section>
    <!--<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">-->
      <!--<el-button type="primary" @click="handleBack" class="backButton">返回广告系列</el-button>-->
      <!--<el-button type="primary" @click="handleAdd" class="addButton">新增素材</el-button>-->
      <!--&lt;!&ndash;<el-button type="primary" @click="handleEdit" class="addButton">修改素材</el-button>&ndash;&gt;-->
      <!--</el-form>-->
    <!--</el-col>-->
    <el-table :data="segment_list" highlight-current-row v-loading="listLoading" @selection-change="selsChange" border
              class="segment_list">

      <el-table-column prop="name" label="名称" width="">
        <!--<template scope="scope">-->
          <!--<el-button size="small" style="font-weight: bold;font-size:16px;" type="text"-->
                     <!--@click="jump_modify(scope.$index, scope.row)">{{scope.row.name}}</el-button>-->
        <!--</template>-->
      </el-table-column>
      <el-table-column prop="user_id" label="用户ID" width=""></el-table-column>
      <el-table-column prop="user_email" label="用户邮箱" width=""></el-table-column>
      <el-table-column prop="uv" label="人群个数" width=""></el-table-column>
      <el-table-column prop="create_date" label="创建时间" width=""></el-table-column>
      <el-table-column prop="update_date" label="修改时间" width=""></el-table-column>
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
              segment_list:[],
              listLoading:false,
              page_size:10,
              total:0,
              page:1,
              sels:[]
            }
        },
      methods:{
        selsChange: function (sels) {
          this.sels = sels;
        },
        pageSizeChange(val) {
          this.page_size= val;
          this.getSegment_list();
        },
        handleCurrentChange(val) {
          this.page = val;
          this.getSegment_list();
        },
        getSegment_list(){
          let para = {
            page: this.page,
            page_size:this.page_size,
          };
          this.listLoading = true;
          api.getSegments(para).then(res=>{
              if(res.data.status===0){
                this.total = res.data.total;
                let segList=res.data.data;
                let datas=[];
                for(let i=0;i<segList.length;i++){
                  let obj={};
                  obj.name=segList[i].name;
                  obj.user_id=segList[i].user_id;
                  obj.user_email=segList[i].user_email;
                  obj.uv=segList[i].uv;
                  obj.create_date=segList[i].create_date;
                  obj.update_date=segList[i].update_date;
                  datas[i]=obj;
                }
                this.segment_list=datas;
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
                message:'未查询到数据'+err,
                type:'error'
              });
              this.listLoading=false
            },1000);
            console.log(err)
          })
        },
      },
      mounted(){
            this.getSegment_list();
      }
    }
</script>

<style>
</style>
