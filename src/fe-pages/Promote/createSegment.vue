<template>
  <div class="upload">
    <div class="anchor">
      <span class="title">人群包创建</span>
      <ul>
        <li><a href="#seg_name">名称</a></li>
        <li><a href="#seg_type">类型</a></li>
        <li><a href="#assets">人群包</a></li>

      </ul>
      <div class="upload_content">
        <!--<div class="header">-->
          <!--<span>广告素材集允许您在一次批量上传中创建每种类型和大小的广告</span>-->
        <!--</div>-->
        <el-form :model="segForm" label-width="110px" :rules="segFormRules" ref="segForm"
                 :label-position="position">
          <el-collapse v-model="activeNames">
            <el-collapse-item title="名称" name="seg_name" id="seg_name">
              <el-form-item prop="name" label="名称" >
                <el-input v-model="segForm.name"></el-input>
              </el-form-item>
            </el-collapse-item>

            <el-collapse-item name="assets" id="assets">
              <!--<template slot="title">-->
                <!--素材 &nbsp;-->
                <!--<el-tooltip placement="right-start">-->
                  <!--<div slot="content"><span style="font-size: 14px;">-->
                    <!--图片不能大于1m,格式为 jpg/ gif/ png <br><br>-->
                    <!--图片插屏必须上传横竖两张图片,<br><br>-->
                    <!--横(1024x768, 512x320, 480x320)<br><br>-->
                    <!--纵(768x1024, 320x512, 320x480)<br><br>-->
                    <!--图片横幅,必须上传一张图片 (320x50)<br><br>-->
                    <!--视频不能大于4M 格式为mp4/mov <br><br>-->
                    <!--视频必须上传横竖两张图片,<br><br>-->
                    <!--横(1024x768, 512x320, or 480x320)<br><br>-->
                    <!--纵(768x1024, 320x512, or 320x480)<br></span>-->
                  <!--</div>-->
                  <!--<i class="header-icon el-icon-information"></i></el-tooltip>-->
              <!--</template>-->
              <el-form-item label="" >
                <el-upload
                  class="upload-demo" drag :on-preview="handlePreview"
                  :on-remove="handleRemove" :on-success="up_success" :on-error="up_failed"
                  action="http://dsp.echowap.com/api/v1/campaigns/creativeSet/upload" ref="seg_up"
                  multiple :file-list="seg_asset" :name="file_name" :accept="file_type"
                  :headers="file_head">
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                  <!--<div class="el-upload__tip" style="text-align: center;" slot="tip">请按指定格式上传素材</div>-->
                </el-upload>
              </el-form-item>
            </el-collapse-item>

            <el-collapse-item name="type" id="type" title="类型">
              <el-form-item label="类型" prop="type">
                <el-radio-group v-model="segForm.type">
                  <el-radio label="1">增量</el-radio>
                  <el-radio label="2">全量</el-radio>
                </el-radio-group>
                <!--<el-radio :label="1" v-model="segForm.type" name="type"></el-radio>-->
                <!--<el-radio :label="2" v-model="segForm.type" name="type"></el-radio>-->
              </el-form-item>
            </el-collapse-item>
          </el-collapse>
          <el-button type="primary" @click.native="upSegment('segForm')" :loading="upLoading"
                     style="margin:25px 0px 20px 370px;">提交</el-button>
        </el-form>

      </div>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
  import api from '../../axios/api'
    export default{
        data(){
            return{
              activeNames: ['seg_name','assets','adOutput'],
              segForm:{
                name:'',
                type:'',
                },
              segFormRules:{
                name:[
                  {required:true,message:'名称不能为空',trigger:'blur'}
                ],
                type:[
                  {required:true,message:'请选择类型',trigger:'change'}
                ]
              },
              position:'top',
              pkg_path:'',
              upLoading:false,
              file_name:'upload_file',
              file_header:{
                'Access-Control-Allow-Origin':'*',
                'Accept': 'application/json;charset=UTF-8'
              },
              file_type:'aplication/zip',
              seg_asset:[],
              list:[]
            }
        },
      methods:{
        handlePreview(){
        },
        handleRemove(file,fileList){
          this.$message({
            message:'请重新上传!',
            showClose: true,
            duration:0,
            type:'warning'
          });
//          this.ad_output=this.getAd_output();
//          this.upload_asset=[];
//          this.up_list=[];
//          console.log(this.upload_asset);
          this.seg_asset=[];
          this.list=[];
        },
        up_success(res,file,fileList){
            console.log(res);
            if(res.status===0){
                let info={
                    name:res.data[0].name,
                    url:res.data[0].url
                };
                this.list=this.list.concat([info]);
                this.seg_asset=this.list;
            }else{
              this.$message({
                message:res.msg,
                type:'error',
                showClose: true,
                duration:0
              });
              this.seg_asset=[];
            }

        },
        up_failed(err){
            console.log(err);
        },
        upload(formName){
          this.$refs[formName].validate((valid)=>{
              if(valid){
                  let data={
                    name:this.segForm.name,
                    type:this.segForm.type,
                    pkg_path:this.list[0].url
                  };
                  this.upLoading=true;
                  api.postSegment(JSON.stringify(data)).then(res=>{
                      if(res.data.status===0){
                        setTimeout(()=>{
                          this.upLoading = false;
                          this.$message({
                            message:'保存成功',
                            type:'success'
                          });
                          this.$router.replace('/segments')
                        },1500);
                      }else{
                        this.upLoading = false;
                        this.$message({
                          message:'操作出错'+res.data.msg,
                          type:'warning'
                        })
                      }
                  }).catch(err=>{
                    this.$message({
                      message:'提交失败',
                      type:'error'
                    });
                    this.upLoading = false;
                    console.log(err)
                  })
              }
          })
        }
      }
    }
</script>

<style>
  .anchor{
    height: 480px;
  }
  .title{
    font-size: 18px;
    font-weight: bold;
    position: relative;
    top: 10px;
    text-align: right;
    margin-left: 32px;
  }
  .anchor a{
    text-decoration: none;
    color:rgb(12,94,156)
  }
  .anchor a:link{
    color:rgb(12,94,156);
  }
  .anchor a:hover{
    color: blue;
  }
  .anchor ul{
    width: 100px;
  }
  .anchor ul li{
    list-style: none;
    margin-top: 10px;
    text-align: right;
  }
  .upload_content{
    position: relative;
    left: 200px;
    top: -120px;
    width: 600px;
  }
  .el-collapse{
    border-left: 1px solid rgb(203,203,203);
  }
  .el-collapse-item__content {
    margin-left: -1px;
    border-right: 1px solid rgb(203,203,203);
  }
  .el-collapse-item__header{
    background-color: rgb(234,237,244);
    height: 49px;
    border-bottom: 1px solid rgb(203,203,203);
    border-right: 1px solid rgb(203,203,203);
  }
  .el-upload--picture{
    position: relative;
    left: 59px;
  }
  .el-upload-dragger{
    position: relative;
    left: 59px;
    margin-top: 20px;
    width: 500px;
    text-align: center;
  }
  .el-upload-list--picture .el-upload-list__item{
    position: relative;
    left: 120px;
    width: 360px;
  }
  .back{
    position: relative;
    right: 89%;
  }
</style>
