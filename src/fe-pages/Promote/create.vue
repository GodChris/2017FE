<template>
  <div>
    <el-steps :space="300" :active="active" finish-status="finish" center>
      <el-step title="基本信息"></el-step>
      <el-step title="定向信息"></el-step>
      <el-step title="URL信息"></el-step>
    </el-steps>
    <el-form class="basic_info" :label-position="position" v-show="isShow1"
             :model="createForm1"  :rules="createForm1Rules" ref="createForm1">
       <span class="create_tip">要开始，请给您的广告系列取一个名称</span>
      <el-form-item label="广告系列名称" prop="name">
        <el-input v-model="createForm1.name"></el-input>
      </el-form-item>
      <el-form-item label="应用包名" prop="bundle_id">
        <el-input v-model="createForm1.bundle_id" placehoder="APP ID"></el-input>
      </el-form-item>
      <el-form-item label="选择APP平台">
        <el-radio v-model="createForm1.app_platform" label="ios">ios</el-radio>
        <el-radio v-model="createForm1.app_platform" label="Android">Android</el-radio>
      </el-form-item>
      <el-form-item label="选择应用类别" prop="app_category">
        <span class="create_tip" style="position: relative;bottom: 0;top:-10px;">选择最能描述您的应用程序的类别</span>
        <el-cascader
          expand-trigger="hover" placeholder="请选择" clearable
          style="width: 400px;position: relative;bottom: 0;top:-10px;"
          :options="options" v-model="createForm1.app_category" @change="handleChange">
        </el-cascader>
      </el-form-item>
      <el-form-item label="每日预算" prop="budget_day">
        <el-input v-model="createForm1.budget_day"></el-input>
      </el-form-item>
      <el-form-item label="出价范围">
        <span style="color: rgb(96,107,125);">最低价:</span>
        <el-input v-model="createForm1.bidding_min" prop="bidding_min" style="width: 100px;"></el-input>
        <span style="color: rgb(96,107,125);margin-left: 82px;"> 最高价：</span>
        <el-input v-model="createForm1.bidding_max" prop="bidding_max" class="line" style="width: 100px;"></el-input>
      </el-form-item>
      <el-form-item label="出价类型">
        <el-radio v-model="createForm1.bidding_type" label="CPM">CPM</el-radio>
      </el-form-item>
      <el-form-item label="投放频次">
        <el-radio-group v-model="createForm1.frequency" @change="selectFrequency">
          <el-radio label="all">不设置</el-radio>
          <br>
          <el-radio label="specify" style="margin-top: 15px;">设置投放频次</el-radio>
        </el-radio-group>
        <div v-show="openFrequency">
        <span style="color: rgb(96,107,125);margin-right: 20px;">类型</span>
        <el-radio v-model="createForm1.type" label="hour">每时</el-radio>
        <el-radio v-model="createForm1.type" label="day">每天</el-radio>
        <br>
        <span style="color: rgb(96,107,125);margin-right: 20px;">次数</span>
        <el-input v-model="createForm1.num"  style="width: 345px;"></el-input>
        </div>
      </el-form-item>
      <el-form-item label="投放速率">
        <el-radio v-model="createForm1.speed" label="1">加速</el-radio>
        <el-radio v-model="createForm1.speed" label="2">匀速</el-radio>
      </el-form-item>
    </el-form>

    <el-form :label-position="position" :model="createForm2"
                  ref="createForm2" class="targeting_info" v-show="isShow2">
      <el-form-item label="投放平台">
        <el-radio v-model="createForm2.vendor" label="zonst">中至</el-radio>
      </el-form-item>

      <el-form-item label="选择地区">
        <el-radio-group v-model="createForm2.geo_code" @change="selectArea">
        <el-radio label="all">所有地区</el-radio>
          <br>
        <el-radio label="specify" style="margin-top: 15px;">特定地区</el-radio>
        </el-radio-group>
        <el-tree :data="geo_data" show-checkbox node-key="id" ref="geo_tree" v-show="openArea"
          highlight-current class="selectArea" >
        </el-tree>
      </el-form-item>
      <el-form-item label="选择应用类别">
        <el-radio-group v-model="createForm2.app_category" @change="selectCategories">
          <el-radio label="all">所有类别</el-radio>
          <br>
          <el-radio label="specify" style="margin-top: 15px;">特定类别</el-radio>
        </el-radio-group>
        <el-tree
          :data="categories_data"
          show-checkbox node-key="id2" v-show="openCategories" ref="categories_tree"
          highlight-current class="selectArea">
        </el-tree>
      </el-form-item>
      <el-form-item label="选择投放时间">
        <el-radio-group v-model="createForm2.day_parting" @change="selectDay_parting">
          <el-radio label="all">所有投放时间</el-radio>
          <br>
          <el-radio label="specify" style="margin-top: 15px;">特定投放时间</el-radio>
        </el-radio-group>
        <el-tree
          :data="day_part" show-checkbox node-key="id3" v-show="openDay_part" ref="dayPart_tree"
          highlight-current class="selectArea" >
        </el-tree>
      </el-form-item>
      <el-form-item label="选择设备类型">
        <el-radio-group v-model="createForm2.device_type" @change="selectDevice_type">
          <el-radio label="all">所有设备</el-radio>
          <br>
          <el-radio label="specify" style="margin-top: 15px;">特定设备</el-radio>
        </el-radio-group>
        <div class="radio_position" v-show="openDevice_type">
        <el-radio v-model="createForm2.specify_type" v-for="(key,value) in device_types" :key="value"
                  :label="value">
          {{key}}
        </el-radio>
        </div>
      </el-form-item>
      <el-form-item label="选择操作系统版本">
        <el-radio-group v-model="createForm2.os_version" @change="selectOs_version">
          <el-radio label="all">所有版本</el-radio>
          <br>
          <el-radio label="specify" style="margin-top: 15px;">特定版本</el-radio>
        </el-radio-group>
        <div class="radio_position" v-show="openOs_version">
        <el-radio v-model="createForm2.specify_version" v-for="(key,value) in os_versions" :key="value"
                  :label="parseInt(value)">
          {{key}}
        </el-radio>
        </div>
      </el-form-item>
      <el-form-item label="选择运营商">
        <el-radio-group v-model="createForm2.carrier" @change="selectCarrier">
          <el-radio label="all">所有运营商</el-radio>
          <br>
          <el-radio label="specify" style="margin-top: 15px;">特定运营商</el-radio>
        </el-radio-group>
        <div class="radio_position" v-show="openCarrier">
        <el-radio v-model="createForm2.specify_carrier" v-for="(key,value) in carriers" :key="value"
                  :label="value">
          {{key}}
        </el-radio>
        </div>
      </el-form-item>
      <el-form-item label="选择网络">
        <el-radio-group v-model="createForm2.network" @change="selectNetwork">
          <el-radio label="all">所有网络</el-radio>
          <br>
          <el-radio label="specify" style="margin-top: 15px;">特定网络</el-radio>
        </el-radio-group>
        <div class="radio_position" v-show="openNetwork">
        <el-radio v-model="createForm2.specify_network" v-for="(key,value) in networks" :key="value"
                  :label="value">
          {{key}}
        </el-radio>
        </div>
      </el-form-item>
    </el-form>

    <el-form :label-position="position" :model="createForm3"  :rules="createForm3Rules"
             ref="createForm3" class="url_info" v-show="isShow3">
      <el-form-item label="第三方展示监测地址" prop="tracking_imp_url">
        <el-input v-model="createForm3.tracking_imp_url"></el-input>
      </el-form-item>
      <el-form-item label="第三方点击监测地址" prop="tracking_clk_url">
        <el-input v-model="createForm3.tracking_clk_url"></el-input>
      </el-form-item>
      <el-form-item label="跳转地址" prop="jump_url">
        <el-input v-model="createForm3.jump_url"></el-input>
      </el-form-item>
      <el-form-item label="Deeplink" prop="deep_link_url">
        <el-input v-model="createForm3.deep_link_url"></el-input>
      </el-form-item>

    </el-form>


    <div class="toolbutton">
    <el-button style="margin-top: 12px;" @click="backTo" v-if="buttonShow" icon="arrow-left" type="primary" class="back">返回</el-button>
    <el-button style="margin-top: 12px;" @click="last" :disabled="disable" type="primary">上一步</el-button>
    <el-button style="margin-top: 12px;" @click="next" :disabled="nextdisable" :loading="createLoading" type="primary">{{tips}}</el-button>
    </div>
  </div>
</template>

<script>
  Array.prototype.contains = function (obj) {
    let i = this.length;
    while (i--) {
      if (this[i] === obj) {
        return true;
      }
    }
    return false;
  };
  Array.prototype.indexOf = function(val) {
    for (let i = 0; i < this.length; i++) {
      if (this[i] === val) return i;
    }
    return -1;
  };
  Array.prototype.remove = function(val) {
    let index = this.indexOf(val);
    if (index > -1) {
      this.splice(index, 1);
    }
  };
  import api from '../../axios/api'
    export default{
        data(){
            let urlValidate_deeplink=(rule,value,callback)=>{
              if(this.createForm3.deep_link_url===''&&this.createForm3.jump_url===''){
                return callback(new Error('跳转地址和Deeplink不能都为空'))
              }
              if(this.createForm3.deep_link_url!==''&&this.createForm3.jump_url===''){
                    if(!( /^((https?|ftp|news):\/\/)?([a-z]([a-z0-9\-]*[\.。])+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel)|(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&]*)?)?(#[a-z][a-z0-9_]*)?$/.test(value))){
                      return callback(new Error('URL格式不正确'));
                    }
              }
              if(this.createForm3.deep_link_url!==''&&this.createForm3.jump_url!==''){
                if(!( /^((https?|ftp|news):\/\/)?([a-z]([a-z0-9\-]*[\.。])+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel)|(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&]*)?)?(#[a-z][a-z0-9_]*)?$/.test(value))){
                  return callback(new Error('URL格式不正确'));
                }
              }

              callback();
            };
            let urlValidate_jumplink=(rule,value,callback)=>{
              if(this.createForm3.deep_link_url===''&&this.createForm3.jump_url===''){
                return callback(new Error('跳转地址和Deeplink不能都为空'))
              }
              if(this.createForm3.deep_link_url===''&&this.createForm3.jump_url!==''){
                if(!( /^((https?|ftp|news):\/\/)?([a-z]([a-z0-9\-]*[\.。])+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel)|(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&]*)?)?(#[a-z][a-z0-9_]*)?$/.test(value))){
                  return callback(new Error('URL格式不正确'));
                }
              }
              if(this.createForm3.deep_link_url!==''&&this.createForm3.jump_url!==''){
                if(!( /^((https?|ftp|news):\/\/)?([a-z]([a-z0-9\-]*[\.。])+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel)|(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&]*)?)?(#[a-z][a-z0-9_]*)?$/.test(value))){
                  return callback(new Error('URL格式不正确'));
                }
              }
              callback();
            };
            return{
              createLoading:false,
              active:0,
              isShow1:true,
              isShow2:false,
              isShow3:false,
              disable:true,
              nextdisable:false,
              buttonShow:true,
              tips:'下一步',
              position:'top',
              openFrequency:false,
              openArea:false,
              openCategories:false,
              openDay_part:false,
              openDevice_type:false,
              openOs_version:false,
              openCarrier:false,
              openNetwork:false,
              //step1
              createForm1:{
              name:'',
              bundle_id:'',
              app_platform:'ios',
              app_category:'',
              budget_day:'',
              bidding_min:'',
              bidding_max:'',
              bidding_type:'CPM',
                frequency:'all',
              type:'',
              num:'',
              speed:'1',
              },
              options:[
                {
                  label:'',
                  value:'',
                  children:[]
                }
              ],
              geo_data:this.getGeoData(),
              categories_data:this.getCategories_data(),
              day_part:this.getDay_part(),
              createForm1Rules:{
                name:[
                  {required:true,message:'名称不可为空',trigger:'blur'}
                ],
                bundle_id:[
                  {required:true,message:'应用包名不可为空',trigger:'blur'}
                ],
                budget_day:[
                  {required:true,message:'每日预算不可为空',trigger:'blur'}
                ],
                bidding_min:[
                  {required:true,message:'最低出价不可为空',trigger:'blur'}
                ],
                bidding_max:[
                  {required:true,message:'最高出价不可为空',trigger:'blur'}
                ]
              },
              //step2
              createForm2:{
              vendor:'zonst',
              geo_code:'all',
              app_category:'all',
              day_parting:'all',
                device_type:'all',
                specify_type:'',
                os_version:'all',
                specify_version:'',
                carrier:'all',
                specify_carrier:'',
                network:'all',
                specify_network:''
              },
              device_types:JSON.parse(sessionStorage.getItem('device_type')),
              carriers:JSON.parse(sessionStorage.getItem('carrier')),
              networks:JSON.parse(sessionStorage.getItem('network')),

              //step3
              createForm3:{
                tracking_imp_url:'',
                tracking_clk_url:'',
                jump_url:'',
                deep_link_url:''
              },
              createForm3Rules:{
//                tracking_imp_url:[
//                  {required:true,message:'印象地址必填',trigger:'blur'},
//                  {validator:urlValidate,trigger:'blur'}
//                ],
//                tracking_clk_url:[
//                  {required:true,message:'点击地址必填',trigger:'blur'},
//                  {validator:urlValidate,trigger:'blur'}
//                ],
                jump_url:[
                  {validator:urlValidate_jumplink,trigger:'change'}
                ],
                deep_link_url:[
//                  {required:true,message:'深层地址必填',trigger:'blur'},
                  {validator:urlValidate_deeplink,trigger:'change'}
                ]
              }
            }
        },
      computed:{
         os_versions:function(){
             return (this.createForm1.app_platform==='ios'?JSON.parse(sessionStorage.getItem('ios_version')):JSON.parse(sessionStorage.getItem('android_version')))
         }
      },
      methods: {
        getGeoData(){
          let geo_code=JSON.parse(sessionStorage.getItem('geo_code'));
          let geo_arr=[];
          for(let m=0;m<Object.keys(geo_code).length;m++){
            geo_arr[m]={
              id:Object.keys(geo_code)[m],
              label:Object.values(geo_code)[m].name,
              children:[
                Object.values(geo_code)[m].child
              ]
            };
            if(Object.keys(Object.values(geo_code)[m].child)[0]){
            for(let n=0;n<Object.keys(Object.values(geo_code)[m].child).length;n++){
              geo_arr[m].children[n]={
                id:Object.keys(Object.values(geo_code)[m].child)[n],
                label:Object.values(Object.values(geo_code)[m].child)[n].name,
                children:[
                    Object.values(Object.values(geo_code)[m].child)[n].child
                ]
              };
              if(Object.keys(Object.values(Object.values(geo_code)[m].child)[n].child)[0]){
              for(let k=0;k<Object.keys(Object.values(Object.values(geo_code)[m].child)[n].child).length;k++){
                geo_arr[m].children[n].children[k]={
                  id:Object.keys(Object.values(Object.values(geo_code)[m].child)[n].child)[k],
                  label:Object.values(Object.values(Object.values(geo_code)[m].child)[n].child)[k]
                }
              }
            }else{
                geo_arr[m].children[n]={
                  id:Object.keys(Object.values(geo_code)[m].child)[n],
                  label:Object.values(Object.values(geo_code)[m].child)[n].name
                };
              }
            }
              }else{
                geo_arr[m]={
                  id:Object.keys(geo_code)[m],
                  label:Object.values(geo_code)[m].name
                };
              }
          }
          return geo_arr;
        },
        getCategories_data(){
          let categories=JSON.parse(sessionStorage.getItem('app_category'));
          let category_arr=[];
          for(let a=0;a<Object.keys(categories).length;a++){
            category_arr[a]={
              id2:Object.keys(categories)[a],
              label:Object.values(categories)[a].name,
              children:[
                Object.values(categories)[a].child
              ]
            };
            for(let b=0;b<Object.keys(Object.values(categories)[a].child).length;b++){
              category_arr[a].children[b]={
                id2:Object.keys(Object.values(categories)[a].child)[b],
                label:Object.values(Object.values(categories)[a].child)[b]
              }
            }
          }
          return category_arr;
        },
        getDay_part(){
          let day_parts=JSON.parse(sessionStorage.getItem('day_parting'));
          let dayPart_arr=[];
          for(let c=0;c<Object.keys(day_parts).length;c++){
            dayPart_arr[c]={
              id3:Object.keys(day_parts)[c],
              label:Object.values(day_parts)[c].name,
              children:[
                Object.values(day_parts)[c].hour
              ]
            };
            for(let d=0;d<Object.keys(Object.values(day_parts)[c].hour).length;d++){
              dayPart_arr[c].children[d]={
                id3:Object.keys(Object.values(day_parts)[c].hour)[d],
                label:Object.values(Object.values(day_parts)[c].hour)[d]
              }
            }
          }
          return dayPart_arr;
        },
        getGeoAll(){
          let geo=[];
          let geos=JSON.parse(sessionStorage.getItem('geo_code'));
          for(let i=0;i<Object.keys(geos).length;i++){
            if(Object.keys(Object.values(geos)[i].child)[0]){
              for(let j=0;j<Object.keys(Object.values(geos)[i].child).length;j++){
                  if(Object.keys(Object.values(Object.values(geos)[i].child)[j].child)[0]){
                  for(let k=0;k<Object.keys(Object.values(Object.values(geos)[i].child)[j].child).length;k++){
                      geo=geo.concat(Object.keys(Object.values(Object.values(geos)[i].child)[j].child)[k]);
                  }
                  }else{
                      geo=geo.concat([Object.keys(Object.values(geos)[i].child)[j]])
                  }
              }
            }else{
              geo=geo.concat([Object.keys(geos)[i]]);
            }
          }
          return geo;
        },
        getGeo(){
            let geo=this.$refs.geo_tree.getCheckedKeys();
            let geos=JSON.parse(sessionStorage.getItem('geo_code'));
            for(let i=0;i<Object.keys(geos).length-1;i++){
            if(geo.contains(Object.keys(geos)[i])){
              geo.remove(Object.keys(geos)[i]);
              console.log(geo)
            }
            for(let j=0;j<Object.keys(Object.values(geos)[i].child).length;j++){
                if(geo.contains(Object.keys(Object.values(geos)[i].child)[j])){
                    geo.remove(Object.keys(Object.values(geos)[i].child)[j])
                }
            }
          }
          return geo;
        },
        getCategoryAll(){
        let category=[];
        for(let i=0;i<Object.keys(JSON.parse(sessionStorage.getItem('app_category'))).length;i++){
            category=category.concat(Object.keys(Object.values(JSON.parse(sessionStorage.getItem('app_category')))[i].child));
        }
        return category;
        },
        getCategory(){
          let category=this.$refs.categories_tree.getCheckedKeys();
          let categories=JSON.parse(sessionStorage.getItem('app_category'));
          for(let i=0;i<Object.keys(categories).length;i++){
              if(category.contains(Object.keys(categories)[i])){
                  category.remove(Object.keys(categories)[i])
              }
          }
          return category;
        },
        getDpAll(){
          let day=[];
            for(let i=0;i<Object.keys(JSON.parse(sessionStorage.getItem('day_parting'))).length;i++){
              day=day.concat(Object.keys(Object.values(JSON.parse(sessionStorage.getItem('day_parting')))[i].hour));
          }
          return day;
        },
        getDp(){
            let day=this.$refs.dayPart_tree.getCheckedKeys();
            let dp=JSON.parse(sessionStorage.getItem('day_parting'));
          for(let i=0;i<Object.keys(dp).length;i++){
            if(day.contains(Object.keys(dp)[i])){
              day.remove(Object.keys(dp)[i])
            }
          }
          return day;
        },
        last(){
          this.active--;
          if(this.active===0){
            this.isShow1=true;
            this.isShow2=false;
            this.isShow3=false;
            this.disable=true;
            this.buttonShow=true;
            this.tips='下一步'
          }else if(this.active===1){
            this.isShow1=false;
            this.isShow2=true;
            this.isShow3=false;
            this.nextdisable=false;
            this.buttonShow=false;
            this.tips='下一步';
          }else{
            this.buttonShow=false;
            this.isShow1=false;
            this.isShow2=false;
            this.isShow3=true;
            this.nextdisable=false;
          }
        },
        next() {
          this.active++;
          if(this.active===0){
              this.active++;
            this.isShow2=false;
            this.isShow3=false;
            this.tips='下一步';
          }else if(this.active===1){
            this.$refs.createForm1.validate((valid)=>{
                if(valid){
                  this.isShow1=false;
                  this.isShow2=true;
                  this.isShow3=false;
                  this.disable=false;
                  this.buttonShow=false;
                  this.tips='下一步';
                }else{
                    this.active--;
                }
            });
          }else if(this.active===2){
            this.isShow1=false;
            this.isShow2=false;
            this.isShow3=true;
            this.disable=false;
            this.buttonShow=false;
            this.nextdisable=false;
            this.tips='提交';
            console.log(this.active)
          }else{
            this.buttonShow=false;

            let data2={
              vendor:{
                open:true,
                list:[
                  this.createForm2.vendor
                ]
              },
              geo_code:{
                open:this.openArea,
                list: this.openArea===false?this.getGeoAll():this.getGeo()

              },
              app_category:{
                open:this.openCategories,
                list: this.openCategories===false?this.getCategoryAll():this.getCategory()
              },
              day_parting:{
                open:this.openDay_part,
                list: this.openDay_part===false?this.getDpAll():this.getDp()
              },
              device_type:{
                open:this.openDevice_type,
                list:this.openDevice_type===true?[this.createForm2.specify_type]:Object.keys(JSON.parse(sessionStorage.getItem('device_type')))
              },
              os_version:{
                open:this.openOs_version,
                list:this.openOs_version===true?[this.createForm2.specify_version]:Object.keys(this.os_versions)
              },
              carrier:{
                open:this.openCarrier,
                list:this.openCarrier===true?[this.createForm2.specify_carrier]:Object.keys(JSON.parse(sessionStorage.getItem('carrier')))
              },
              network:{
                open:this.openNetwork,
                list:this.openNetwork===true?[this.createForm2.specify_network]:Object.keys(JSON.parse(sessionStorage.getItem('network')))
              }
            };
            let data3={
              tracking_imp_url:this.createForm3.tracking_imp_url,
              tracking_clk_url:this.createForm3.tracking_clk_url,
              jump_url:this.createForm3.jump_url,
              deep_link_url:this.createForm3.deep_link_url
            };
            let data={
              name:this.createForm1.name,
              bundle_id:this.createForm1.bundle_id,
              app_platform:this.createForm1.app_platform,
              app_category:this.createForm1.app_category[1],
              budget_day:Number(this.createForm1.budget_day),
              bidding_min:Number(this.createForm1.bidding_min),
              bidding_max:Number(this.createForm1.bidding_max),
              bidding_type:this.createForm1.bidding_type,
              freq:{
                open:this.openFrequency,
                type:this.openFrequency===true?this.createForm1.type:'',
                num:this.openFrequency===true?Number(this.createForm1.num):''
              },
              speed:Number(this.createForm1.speed),
              targeting:data2,
              url:data3
            };
            if(!this.$refs.geo_tree.getCheckedKeys()){
                this.$message({
                  message:'请选择地区',
                  type:'warning'
                });
              this.createLoading=false;
            }else if(!this.$refs.categories_tree.getCheckedKeys()){
              this.$message({
                message:'请选择应用类别',
                type:'warning'
              });
              this.createLoading=false;
            }else if(!this.$refs.dayPart_tree.getCheckedKeys()){
              this.$message({
                message:'请选择投放时间',
                type:'warning'
              });
              this.createLoading=false;
            }else{
              this.$refs.createForm3.validate(valid=>{
                  if(valid){
                    this.createLoading=true;
                    console.log(JSON.stringify(data));
                    api.createCampaign(JSON.stringify(data)).then(res=>{
                      if(res.data.status===0){
                        let campaign_id=res.data.data[0].campaign;
                        console.log(res.data);
                        setTimeout(()=>{
                          this.$message({
                            message:'创建成功',
                            type:'success'
                          });
                          this.createLoading=false;
                          this.$router.replace({ name: '广告列表', params: { campaign_id: campaign_id }})
//                  this.$router.replace('/adSerial')
                        },1000);
                      }else{
                        this.$message({
                          message:'创建出错'+res.data.msg,
                          type:'warning'
                        });
                        this.createLoading=false;
                      }
                    }).catch(err=>{
                      this.$message({
                        message:'创建失败',
                        type:'error'
                      });
                      this.createLoading=false;
                      console.log(err);
                    });
                  }
              });
            }
            --this.active;
          }
        },
        handleChange(value){
            console.log(value)
        },
        selectFrequency(label){
          if(label==='specify'){
            this.openFrequency=true;
          }else{
            this.openFrequency=false
          }
        },
        selectArea(label){
            if(label==='specify'){
                this.openArea=true;
            }else{
                this.openArea=false
            }
        },
        selectCategories(label){
          if(label==='specify'){
            this.openCategories=true
          }else{
            this.openCategories=false
          }
        },
        selectDay_parting(label){
          if(label==='specify'){
            this.openDay_part=true
          }else{
            this.openDay_part=false
          }
        },
        selectDevice_type(label){
          if(label==='specify'){
            this.openDevice_type=true
          }else{
            this.openDevice_type=false
          }
        },
        selectOs_version(label){
          if(label==='specify'){
            this.openOs_version=true
          }else{
            this.openOs_version=false
          }
        },
        selectCarrier(label){
          if(label==='specify'){
            this.openCarrier=true
          }else{
            this.openCarrier=false
          }
        },
        selectNetwork(label){
          if(label==='specify'){
            this.openNetwork=true
          }else{
            this.openNetwork=false
          }
        },
        backTo(){
            this.$router.go(-1);
        }

      },
      mounted(){
            let categories=JSON.parse(sessionStorage.getItem('app_category'));
            //对象转换为数组
            let arr=[];
            for(let k in categories){
                let str=categories[k];
                arr.push(str)
            }
//            console.log(arr);
            for(let i=0;i<Object.keys(categories).length;i++){
              this.options[i]={
                label:arr[i].name,
                children:[
                    arr[i].child
                ],
                value:i
              };
              for(let j=0;j<Object.keys(arr[i].child).length;j++){
                  this.options[i].children[j]={
                    label:Object.values(arr[i].child)[j],
                    value:Object.keys(arr[i].child)[j]
                  };
              }
            }
      }
    }
</script>

<style scoped>
  .basic_info,.targeting_info,.url_info{
    margin: 0 auto;
    width: 400px;
    position: relative;
    top: 30px;
  }
  .create_tip{
    font-family: AvenirNext-Regular;
    font-size: 13px;
    color: #767a82;
    line-height: 1.5;
    position: relative;
    bottom: 10px;

  }
  .toolbutton{
    float:right;
    position: relative;
    top: 20px;
    right: 29%;
    margin-bottom: 20px;
  }
  .selectArea{
    height: 300px;
    overflow-y: scroll;
    border: 1px solid rgb(175,189,206);
  }
  .radio_position{
    border: 1px solid rgb(175,189,206);
    margin: 15px 0;
  }
  .back{
    position: relative;
    right: 89%;
  }
  @media only screen and (min-height: 635px){
    .toolbutton{
      float:right;
      position: relative;
      top: 40px;
      right: 31%;
    }
  }
</style>
