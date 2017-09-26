<template>
  <section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-button type="primary" @click="handleBack" class="backButton">返回广告系列</el-button>
      <el-button type="primary" @click="handleAdd" class="addButton">新增素材</el-button>
      <!--<el-button type="primary" @click="handleEdit" class="addButton">修改素材</el-button>-->
      </el-form>
    </el-col>
    <el-table :data="ad_list" highlight-current-row v-loading="listLoading" @selection-change="selsChange" border
               class="ad_list">
      <!--<el-table-column type="expand">-->
        <!--<template scope="props">-->
          <!--<el-form label-position="left" inline class="demo-table-expand">-->
            <!--<el-form-item label="横幅:">-->
              <!--<span>{{ props.row.banner}}</span>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="横向视频:">-->
              <!--<span>{{ props.row.video_l}}</span>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="竖向视频:">-->
              <!--<span>{{ props.row.video_r }}</span>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="横向图片:">-->
              <!--<span>{{ props.row.inter_l }}</span>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="竖向图片:">-->
              <!--<span>{{ props.row.inter_r}}</span>-->
            <!--</el-form-item>-->
          <!--</el-form>-->
        <!--</template>-->
      <!--</el-table-column>-->

      <el-table-column prop="name" label="广告名" width="165px">
        <template scope="scope">
          <el-button size="small" style="font-weight: bold;font-size:16px;" type="text"
                     @click="jump_modify(scope.$index, scope.row)">{{scope.row.name}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="ad_category" label="分类" :formatter="formatCategory" width="70px"></el-table-column>
      <el-table-column prop="ad_type" label="广告类型" width="105px"></el-table-column>
      <el-table-column prop="creative_set_id" label="创意集ID" width="95px"></el-table-column>
      <el-table-column prop="campaign_id" label="广告系列ID" width="110px"></el-table-column>
      <el-table-column prop="status" label="状态" :formatter="formatStatus" width="80px"></el-table-column>
      <el-table-column  label="素材地址">
        <el-table-column prop="creative" label="素材一" width="360px">
          <template scope="scope">
            <el-button size="small" style="font-weight: bold;font-size:16px;" type="text"
                       @click="jump_set1(scope.$index, scope.row)">{{scope.row.creative}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="creative1" label="素材二" width="360px">
          <template scope="scope">
            <el-button size="small" style="font-weight: bold;font-size:16px;" type="text"
                       @click="jump_set2(scope.$index, scope.row)">{{scope.row.creative1}}</el-button>
          </template>
        </el-table-column>
      </el-table-column>

    </el-table>
    <!--分页-->
    <!--<el-col :span="24" class="toolbar">-->
      <!--<el-pagination layout="prev, pager, next,jumper" style="float:right;"-->
                     <!--@current-change="handleCurrentChange"-->
                     <!--@size-change="pageSizeChange"-->
                     <!--:page-size="page_size"-->
                     <!--:total="total">-->
      <!--</el-pagination>-->
    <!--</el-col>-->

  </section>
</template>

<script>
  import api from '../../axios/api'
    export default{
        data(){
            return{
              ad_list:[],
              sels:[],
//              total:0,
//              page:1,
//              page_size:10,
              listLoading: false,
            }
        },
      methods:{
//        pageSizeChange(val) {
//          this.page_size= val;
//          this.getAd_list();
//        },
//        handleCurrentChange(val) {
//          this.page = val;
//          this.getAd_list();
//        },
        jump_modify:function(index,row){
           this.$router.push({ name: '修改素材', params: { creative_set_id: row.creative_set_id }})
        },
        jump_set1:function(index,row){
          if(row.creative==='未上传'){
            this.$router.push({ name: '素材上传', params: { campaign_id: this.$route.params.campaign_id }})
          }else if(row.creative!==''){
            window.open(row.creative)
          }
        },
        jump_set2:function(index,row){
          if(row.creative1==='未上传'){
            this.$router.push({ name: '素材上传', params: { campaign_id: this.$route.params.campaign_id }})
          }else if(row.creative1!==''){
            window.open(row.creative1)
          }
        },
        formatStatus(row){
            return row.status===0?'待审核':(row.status===1?'已审核':'素材丢失')
        },
        formatCategory(row){
          return row.ad_category==="graphic"?'图片':'视频'
        },
        selsChange: function (sels) {
          this.sels = sels;
        },
        getCreatives(data){
            if(data.ad_type==="banner"){
                return data.creative.banner?data.creative.banner:'未上传';
            }
            if(data.ad_type==="interstitial"){
                return data.creative.inter_l?data.creative.inter_l:'未上传';
            }
            if(data.ad_type==="video_l"){
                return data.creative.video_l?data.creative.video_l:'未上传';
            }
            if(data.ad_type==="video_r"){
                return data.creative.video_r?data.creative.video_r:'未上传';
            }
        },
        getAd_list(){
            let data=this.$route.params.campaign_id;
//          let para = {
//            page: this.page,
//            page_size:this.page_size,
//          };
//            console.log(data);
          this.listLoading = true;
            api.getAdList(data).then(res=>{
                if(res.data.status===0){
                  let adList=res.data.data;
                  let datas=[];
                  for(let i=0;i<adList.length;i++){
                    let obj={};
                    obj.name=adList[i].name;
                    obj.ad_category=adList[i].ad_category;
                    obj.ad_type=adList[i].ad_type;
                    obj.creative_set_id=adList[i].creative_set_id;
                    obj.creative=this.getCreatives(adList[i]);
                    obj.creative1=adList[i].ad_type==="interstitial"?(adList[i].creative.inter_r?adList[i].creative.inter_r:'未上传'):'';
//                    obj.banner=adList[i].creative.banner?adList[i].creative.banner:'未上传';
//                    obj.inter_l=adList[i].creative.inter_l?adList[i].creative.inter_l:'未上传';
//                    obj.inter_r=adList[i].creative.inter_r?adList[i].creative.inter_r:'未上传';
//                    obj.video_l=adList[i].creative.video_l?adList[i].creative.video_l:'未上传';
//                    obj.video_r=adList[i].creative.video_r?adList[i].creative.video_r:'未上传';
                    obj.campaign_id=adList[i].campaign_id;
                    obj.status=adList[i].status;
                    datas[i]=obj;
                  }
                  this.ad_list=datas;
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
        handleAdd:function(){
            let campaign_id=this.$route.params.campaign_id;
            this.$router.push({ name: '素材上传', params: { campaign_id: campaign_id }})
        },
//        handleEdit:function(){
//          let campaign_id=this.$route.params.campaign_id;
//          this.$router.push({ name: '修改素材', params: { campaign_id: campaign_id }})
//        },
        handleBack:function(){
            this.$router.push('/adSerial')
        }
      },
      mounted(){
        this.getAd_list();
      }
    }
</script>

<style scoped>
  .addButton{
    position: relative;
    left: 63%;
    margin-top: 10px;
  }
  .backButton{
    position: relative;
    left: 1%;
    margin-top: 10px;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item  {
    margin-right: 0;
    margin-left: 12px;
    margin-bottom: 0;
    width: 46%;
  }
  .ad_list{
    width:100%;position: relative;top: 20px;
  }
  /*.toolbar{*/
    /*position: relative;*/
    /*top:20px;*/
  /*}*/
</style>
