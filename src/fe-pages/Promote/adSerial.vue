<template>
  <section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
          <el-button type="primary" @click="handleAdd" class="addButton">新增</el-button>
      </el-form>
    </el-col>

    <el-table :data="ad_serial" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
              border style="width:100%;" class="serial_table" :default-sort="{prop: 'create_date', order: 'descending'}">
      <el-table-column prop="name" label="广告系列名称" width="130px">
        <template scope="scope">
          <el-button size="small" style="font-weight: bolder;font-size:16px;" type="text"
                     @click="adlist(scope.$index, scope.row)">{{scope.row.name}}</el-button>
        </template>
      </el-table-column>
      </el-table-column>
      <el-table-column prop="bundle_id" label="应用包ID" width=""></el-table-column>
      <el-table-column prop="budget_day" label="每日预算" width=""></el-table-column>
      <el-table-column prop="bidding_type" label="出价类型" width=""></el-table-column>
      <el-table-column prop="create_date" label="创建时间" width="" sortable></el-table-column>
      <el-table-column prop="status" label="状态" :formatter="formatStatus" width=""></el-table-column>
      <el-table-column prop="campaign_id" label="广告系列id" width="" v-if="isShow"></el-table-column>
      <el-table-column label="操作"  width="">
        <template scope="scope">
          <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
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
            ad_serial:[],
            sels:[],
            total:0,
            page:1,
            page_size:10,
            listLoading: false,
            isShow:false
        }
      },
      methods:{
        adlist:function(index,row){
          let campaign_id=row.campaign_id;
          this.$router.push({ name: '广告列表', params: { campaign_id: campaign_id }})
        },
        formatStatus(row){
            return row.status===0?'暂停':'活跃'
        },
        selsChange: function (sels) {
          this.sels = sels;
        },
        pageSizeChange(val) {
          this.page_size= val;
          this.getAd_serial();
        },
        handleCurrentChange(val) {
          this.page = val;
          this.getAd_serial();
        },
        getAd_serial(){
          let para = {
            page: this.page,
            page_size:this.page_size,
          };
          this.listLoading = true;
          api.getAdSerial(para).then(res=>{
              if(res.data.status===0){
                this.total=res.data.total;
                let adSerialData=res.data.data;
                let datas=[];
                for(let i=0;i<adSerialData.length;i++){
                  let obj={};
                  obj.campaign_id=adSerialData[i].campaign_id;
                  obj.name=adSerialData[i].name;
                  obj.bundle_id=adSerialData[i].bundle_id;
                  obj.budget_day=adSerialData[i].budget_day;
                  obj.bidding_type=adSerialData[i].bidding_type;
                  obj.create_date=adSerialData[i].create_date;
                  obj.status=adSerialData[i].status;
                  datas[i]=obj;
                }
                this.ad_serial=datas;
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
          }).catch(err =>{
            setTimeout(()=>{
              this.$message({
                message:'未查询到数据'+err,
                type:'error'
              });
              this.listLoading=false
            },1000);
            console.log(err)
          });
        },
        handleEdit:function(index,row){
          let campaign_id=row.campaign_id;
          this.$router.push({ name: '修改广告系列', params: { campaign_id: campaign_id }})
        },
        handleAdd:function(){
          this.$router.push('/step1')
        }
      },
      mounted(){
          this.getAd_serial();
      }
    }
</script>

<style scoped>
  .serial_table{
    position: relative;
    top:20px;
  }
  .addButton{
    position: relative;
    left: 87%;
    bottom: 10px;
  }
  .toolbar{
    position: relative;
    top:20px;
  }
</style>
