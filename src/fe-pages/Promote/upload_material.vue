<template>
  <div class="upload">
    <div class="anchor">
      <span class="title">编辑广告素材</span>
      <ul>
        <li><a href="#cre_name">名称</a></li>
        <li><a href="#assets">资产</a></li>
        <li><a href="#adOutput">广告输出</a></li>
      </ul>
      <div class="upload_content">
        <div class="header">
          <span>广告素材集允许您在一次批量上传中创建每种类型和大小的广告</span>
        </div>
        <el-form :model="upForm" label-width="110px" :rules="upFormRules" ref="upForm"
                 :label-position="position">
          <el-collapse v-model="activeNames">
            <el-collapse-item title="名称" name="cre_name" id="cre_name">
              <el-form-item prop="creative_name" label="名称" >
                <el-input v-model="upForm.creative_name"></el-input>
              </el-form-item>
            </el-collapse-item>

            <el-collapse-item name="assets" id="assets">
              <template slot="title">
                素材 &nbsp;
                <el-tooltip placement="right-start">
                  <div slot="content"><span style="font-size: 14px;">
                    图片不能大于1m,格式为 jpg/ gif/ png <br><br>
                    图片插屏必须上传横竖两张图片,<br><br>
                    横(1024x768, 512x320, 480x320)<br><br>
                    纵(768x1024, 320x512, 320x480)<br><br>
                    图片横幅,必须上传一张图片 (320x50)<br><br>
                    视频不能大于4M 格式为mp4/mov <br><br>
                    视频必须上传横竖两张图片,<br><br>
                    横(1024x768, 512x320, or 480x320)<br><br>
                    纵(768x1024, 320x512, or 320x480)<br></span>
                  </div>
                  <i class="header-icon el-icon-information"></i></el-tooltip>
              </template>
              <el-form-item label="" >
                <el-upload
                  class="upload-demo" drag :on-preview="handlePreview"
                  :on-remove="handleRemove" :on-success="up_success" :on-error="up_failed"
                  :before-upload="before_up"
                  action="http://dsp.echowap.com/api/v1/campaigns/creativeSet/upload" ref="upload"
                  multiple :file-list="upload_asset" list-type="picture" :name="file_name"
                  :headers="file_head" :accept="file_type">
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                  <div class="el-upload__tip" style="text-align: center;" slot="tip">请按指定格式上传素材</div>
                </el-upload>
              </el-form-item>
            </el-collapse-item>

            <el-collapse-item name="adOutput" id="adOutput" title="Ad Output">
              <el-form-item label="Ad Output">
                <el-tree
                  :data="ad_output" show-checkbox node-key="id1" ref="ad_tree"
                  highlight-current class="tree_material" default-expand-all
                  :render-content="renderContent">
                </el-tree>

              </el-form-item>
            </el-collapse-item>
          </el-collapse>
          <el-button style="margin:25px 100px 20px 0px;" @click="backTo"  type="primary" >返回</el-button>
          <el-button type="primary" @click.native="upload('upForm')" :loading="upLoading"
                     style="margin:25px 0px 20px 370px;">保存</el-button>
        </el-form>

      </div>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
  import api from '../../axios/api'
  Array.prototype.equals = function (array) {
       if (!array)
            return false;
        if (this.length !== array.length)
             return false;

       for (let i = 0, l = this.length; i < l; i++) {
              if (this[i] instanceof Array && array[i] instanceof Array) {
                   if (!this[i].equals(array[i]))
                         return false;
                 }
              else if (this[i] !== array[i]) {
                    return false;
                }
           }
        return true;
     };
  ///集合取交集
  function arrayIntersection(a, b)
  {
    let ai=0, bi=0;
    let result = new Array();
    while( ai < a.length && bi < b.length )
    {
      if (a[ai] < b[bi] ){ ai++; }
      else if (a[ai] > b[bi] ){ bi++; }
      else
      {
        result.push(a[ai]);
        ai++;
        bi++;
      }
    }
    return result;
  }
  //集合取差，去重
   function subSet(arr1, arr2) {
    let set1 = new Set(arr1);
    let set2 = new Set(arr2);
    let subset = [];
    for (let item of set1) {
      if (!set2.has(item)) {
        subset.push(item);
      }
    }
    return subset;
  }
  //判断数组是否包含另一个数组
  function isContained(a, b){
    if(!(a instanceof Array) || !(b instanceof Array)) return false;
    if(a.length < b.length) return false;
    let aStr = a.toString();
    for(let i = 0, len = b.length; i < len; i++){
      if(aStr.indexOf(b[i]) === -1) return false;
    }
    return true;
  }
  //数组包含某个元素
  Array.prototype.contains = function (obj) {
    let i = this.length;
    while (i--) {
      if (this[i] === obj) {
        return true;
      }
    }
    return false;
  };
  //去重
  Array.prototype.unique = function(){
    let res = [];
    let json = {};
    for(let i = 0; i < this.length; i++){
      if(!json[this[i]]){
        res.push(this[i]);
        json[this[i]] = 1;
      }
    }
    return res;
  };
    export default{
        data(){
            return{
              position:'top',
              file_name:'upload_file',
              file_header:{
                'Access-Control-Allow-Origin':'*',
                'Accept': 'application/json;charset=UTF-8'
              },
              file_type:'image/gif,image/png,image/jpg,video/mp4,video/mov',
              activeNames: ['cre_name','assets','adOutput'],
              upLoading:false,
              upForm:{
                creative_name:'',
              },
              upFormRules:{
                creative_name:[
                  {required:true,message:'创意名不能为空'}
                ]
              },
              ad_output:[],
              ad_arr:'',
              list:[],
              list1:[],
              show_tip:false,
              up_list:[],
              upload_asset:[]
            }
        },
      methods:{
        renderContent(h, { node, data, store }){
            if(node.label==='图片'||node.label==='视频'){
                return (
                  <span>
                  <span>
                  <span>{node.data.label}</span>
              </span></span>
                )
            }else if(node.data.disabled){
                return (
              <span>
              <span>
              <span>{node.data.label}</span>
              </span>
              <span style=" margin-let: 10px;">
                <el-tooltip placement="right-start" >
                <div slot="content" style="width:240px;">
                  <p>缺少以下素材</p>
                  <p>{node.data.msg[0]}</p>
                  <p>{node.data.msg[1]}</p>
                  <p>{node.data.msg[2]}</p>
                </div>
                <i class="header-icon el-icon-search"></i>
                </el-tooltip>
                </span>
                </span>
                )
          }else{
                return (
                  <span>
                  <span>
                  <span>{node.data.label}</span>
                  </span>
              </span>
                )
            }
        },
        handleCompare(arr1,arr2){
            let bool=[];
            for(let i=0;i<arr1.length;i++){
                for(let j=0;j<arr2.length;j++){
                    if(arr2[j].equals(arr1[i])){
                    bool=bool.concat(["false"]);
                    }else{
                      bool=bool.concat(["true"]);
                    }
                }
            }
            console.log(bool);
          if(bool.contains("true")){
            return false;
          }else{
            return true;
          }
        },
        handlePreview(){
        },
        handleRemove(file,fileList){
            this.$message({
              message:'请重新上传所有素材!',
              showClose: true,
              duration:0,
              type:'warning'
            });
            this.ad_output=this.getAd_output();
            this.upload_asset=[];
            this.up_list=[];
            console.log(this.upload_asset);
        },
        before_up(file){
            console.log(file);
        },
        up_success(response,file,fileList){
          if(response.status===0){
          let info={
            name:response.data[0].name,
            type:response.data[0].type,
            url:response.data[0].url,
            category:response.data[0].category
          };
//          console.log(this.up_list);
//          console.log(info);
          if(this.up_list.length>0){
              let length=this.up_list.length;
            for(let o=0;o<length;o++){
                console.log(this.up_list[o].type===info.type);
                console.log(this.up_list.length);
              if(this.up_list[o].type!==info.type){
                this.up_list=this.up_list.concat([info]);
                console.log(this.up_list);
                this.upload_asset[o]={
                  name:this.up_list[o].name,
                  url:this.up_list[o].url
                };
                this.upload_asset=this.upload_asset.concat([this.upload_asset[length]]);
                console.log(this.upload_asset);
              }else{
                this.$message({
                  message:'请勿上传相同类型的素材',
                  type:'warning'
                });
              }
            }
          }else{
            this.up_list=this.up_list.concat([info]);
            this.upload_asset=[
              {
                name:this.up_list[0].name,
                url:this.up_list[0].url
              }
            ]
          }
            this.list=this.list.concat([info.type]);

          let creatives=JSON.parse(sessionStorage.getItem('creative_set'));
          for(let i=0;i<Object.keys(creatives).length;i++){
            for(let j=0;j<Object.keys(Object.values(creatives)[i].list).length;j++){
              for(let k=0;k<Object.keys(Object.values(Object.values(creatives)[i].list)[j].creative).length;k++){
                if(!this.list.contains("banner")){
                  //交集等于节点的list
                if(Object.keys(creatives)[i]===info.category&&
                  arrayIntersection(this.list,Object.values(Object.values(creatives)[i].list)[j].creative.list).equals(Object.values(Object.values(creatives)[i].list)[j].creative.list)){
                  this.ad_output[i].disabled=false;
                  this.ad_output[i].children[j].disabled=false;
                  this.$refs.ad_tree.setCheckedKeys([Object.keys(Object.values(creatives)[i].list)[j]]);
                }else if(isContained(Object.values(Object.values(creatives)[i].list)[j].creative.list,this.list)
                  &&!this.list.equals(Object.values(Object.values(creatives)[i].list)[j].creative.list)){
                  //交集包含于节点的list
                  let subSets=subSet(Object.values(Object.values(creatives)[i].list)[j].creative.list,this.list);
//                  console.log(Object.keys(Object.values(Object.values(creatives)[i].list)[j].creative)[k]);
                    if(subSets.contains(Object.keys(Object.values(Object.values(creatives)[i].list)[j].creative)[k])){
                      this.list1=this.list1.concat([Object.values(Object.values(Object.values(creatives)[i].list)[j].creative)[k]]);
                      this.ad_output[i].children[j].msg=this.list1.unique();
//                      console.log(this.list1);
//                      console.log(this.ad_output[i].children[j].msg)
                    }
                }
              }
              //含有banner
              if(this.list.contains("banner")){
                  let temp=this.list[0];
                  this.list[0]=this.list[this.list.length-1];
                  this.list[this.list.length-1]=temp;
//                  console.log(this.list);
//                  console.log(Object.keys(creatives)[i]===info.category);
                  if(Object.keys(creatives)[i]===info.category){
                  //交集等于节点的list
                  if(arrayIntersection([this.list[0]],Object.values(Object.values(creatives)[i].list)[j].creative.list)
                      .equals(Object.values(Object.values(creatives)[i].list)[j].creative.list)){
                    this.ad_output[i].disabled=false;
                    this.ad_output[i].children[j].disabled=false;
                    this.$refs.ad_tree.setCheckedKeys([Object.keys(Object.values(creatives)[i].list)[j]]);
                  }else if(isContained(Object.values(Object.values(creatives)[i].list)[j].creative.list,this.list.slice(1))
                    &&!this.list.equals(Object.values(Object.values(creatives)[i].list)[j].creative.list)){
                    //交集包含于节点的list
                    let subSets=subSet(Object.values(Object.values(creatives)[i].list)[j].creative.list,this.list.slice(1));
                    if(subSets.contains(Object.keys(Object.values(Object.values(creatives)[i].list)[j].creative)[k])){
                      this.list1=this.list1.concat([Object.values(Object.values(Object.values(creatives)[i].list)[j].creative)[k]]);
                      this.ad_output[i].children[j].msg=this.list1.unique();
//                      console.log(this.list1);
//                      console.log(this.ad_output[i].children[j].msg)
                    }
                  }
                  }
              }
            }
              this.list1=[];
          }}
          if(this.list.equals(["banner"])||(this.list.equals(["inter_l","inter_r"])&&info.category==='graphic')||
          this.list.equals(["video_r","inter_l","inter_r"])||this.list.equals(["video_l","inter_l","inter_r"])){
              this.list=[];
          }}else{
            this.$message({
              message:response.msg,
              type:'error',
              showClose: true,
              duration:0
            });
            this.upload_asset=[];
            if(this.up_list.length>0){
            for(let r=0;r<this.up_list.length;r++){
                this.upload_asset[r]={
                  name:this.up_list[r].name,
                  url:this.up_list[r].url
                };
            }
            }
          }
        },
        up_failed(err,file,fileList){
            console.log(err);
//            console.log(file);
//            console.log(fileList);
        },
        getAd_output(){
          let ad_output=JSON.parse(sessionStorage.getItem('creative_set'));
          let ad_arr=[];
          for(let i=0;i<Object.keys(ad_output).length;i++){
              ad_arr[i]={
                id1:Object.keys(ad_output)[i],
                label:Object.values(ad_output)[i].name,
                disabled:true,
                msg:'',
                children:[
                  Object.values(ad_output)[i].list
                ]
              };
              for(let j=0;j<Object.keys(Object.values(ad_output)[i].list).length;j++){
                delete Object.values(Object.values(ad_output)[i].list)[j].creative.list;
                  ad_arr[i].children[j]={
                      id1:Object.keys(Object.values(ad_output)[i].list)[j],
                    label:Object.values(Object.values(ad_output)[i].list)[j].name,
                    msg:Object.values(Object.values(Object.values(ad_output)[i].list)[j].creative),
                    disabled:true
                  };
              }
          }
//          console.log(ad_arr);
          return ad_arr;
        },
        upload(formName){
          this.$refs[formName].validate((valid) =>{
              if(valid){
                this.$confirm('这将需要一些时间？', '提示', {}).then(() =>{

                    let type1=[];let type2=[];
                    let type3=[];let type4=[];let type5=[];
                    console.log(this.up_list);
                    let info={};
                    for(let n=0;n<this.up_list.length;n++){
                        let keys=this.up_list[n].type;
                        info[keys]=this.up_list[n].url;
                    }
                    console.log(info);
                    for(let i=0;i<this.up_list.length;i++){
                      if(this.up_list[i].type==='inter_l'){

                        type1=["inter_l"];
                        }
                      if(this.up_list[i].type==='inter_r'){

                        type3=["inter_r"];
                      }
                      if(this.up_list[i].type==='video_l'){

                        type2=["video_l"];
                      }
                      if(this.up_list[i].type==='video_r'){

                        type2=["video_r"];
                      }
                      if(this.up_list[i].type==='banner'){
                        type5=["banner"];
                      }
                    }
                    let type=[type1.concat(type3),type2.concat(type1,type3),type4.concat(type1,type3),type5];
                    console.log(type);
                    let set=JSON.parse(sessionStorage.getItem('creative_set'));
                    let list_info=[];
                    for(let m=0;m<Object.keys(set).length;m++){
                        for(let n=0;n<Object.keys(Object.values(set)[m].list).length;n++){
                          list_info=list_info.concat([Object.values(Object.values(set)[m].list)[n].creative.list])
                        }
                    }
                    console.log(list_info);
                    let data={
                      campaign_id:Number(this.$route.params.campaign_id),
                      creative_name:this.upForm.creative_name,
                      info:info
                    };
                  this.upLoading=true;
                  if(this.handleCompare(type.unique(),list_info)){

                  api.postCreative(JSON.stringify(data)).then(res=>{
//                      console.log(JSON.stringify(data));
                      if(res.data.status===0){
//                        this.$refs.upload.submit();
                        setTimeout(()=>{
                          this.upLoading = false;
                            this.$message({
                              message:'保存成功',
                              type:'success'
                            });
                          this.$router.replace({ name: '广告列表', params: { campaign_id: this.$route.params.campaign_id }})
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
                        message:'保存失败',
                        type:'error'
                      });
                    this.upLoading = false;
                    console.log(err)
                  })}else{
                    this.upLoading = false;
                      this.$message({
                        message:'请按要求上传完整的素材!',
                        type:'warning'
                      });
                    document.getElementById("assets").scrollIntoView()
                  }
                })

              }
          })
        },
        backTo(){
          this.$router.go(-1);
        }
      },
      mounted(){
            this.ad_output=this.getAd_output();
      }
    }
</script>

<style >
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
  .upload_content .header{
    color: rgb(140,144,155);
    font-weight: bold;
    border-bottom: 1px solid rgb(203,203,203);
    height: 50px;
    text-align: center;
  }
  .tree_material{
    height: 300px;
    overflow-y: scroll;
    border: 1px solid rgb(175,189,206);
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
