<template>
  <div>
    <el-form class="basic_info" :label-position="position"
             :model="modifyForm1"  :rules="modifyForm1Rules" ref="modifyForm1">
      <div class="tip"><span>活动信息</span></div>
      <el-form-item label="广告系列名称" prop="name">
        <el-input v-model="modifyForm1.name"></el-input>
      </el-form-item>
      <el-form-item label="应用包名" prop="bundle_id">
        <el-input v-model="modifyForm1.bundle_id" placehoder="APP ID"></el-input>
      </el-form-item>
      <el-form-item label="选择APP平台">
        <el-radio v-model="modifyForm1.app_platform" label="ios">ios</el-radio>
        <el-radio v-model="modifyForm1.app_platform" label="Android">Android</el-radio>
      </el-form-item>
      <el-form-item label="选择应用类别" prop="app_cat">
        <el-cascader
          expand-trigger="hover" placeholder="请选择" clearable
          style="width: 400px;position: relative;bottom: 0;top:10px;"
          :options="options" v-model="app_cat" @change="handleChange">
        </el-cascader>
      </el-form-item>
      <el-form-item label="每日预算" prop="budget_day">
        <el-input v-model="modifyForm1.budget_day"></el-input>
      </el-form-item>
      <el-form-item label="出价范围">
        <span style="color: rgb(96,107,125);">最低价:</span>
        <el-input v-model="modifyForm1.bidding_min" prop="bidding_min" style="width: 100px;"></el-input>
        <span style="color: rgb(96,107,125);margin-left: 82px;"> 最高价：</span>
        <el-input v-model="modifyForm1.bidding_max" prop="bidding_max" class="line" style="width: 100px;"></el-input>
      </el-form-item>
      <el-form-item label="出价类型">
        <el-radio v-model="modifyForm1.bidding_type" label="CPM">CPM</el-radio>
      </el-form-item>
      <el-form-item label="投放频次">
        <el-radio-group v-model="modifyForm1.frequency" @change="selectFrequency">
          <el-radio label="all">不设置</el-radio>
          <br>
          <el-radio label="specify" style="margin-top: 15px;">设置投放频次</el-radio>
        </el-radio-group>
        <div v-show="openFrequency">
          <span style="color: rgb(96,107,125);margin-right: 20px;">类型</span>
          <el-radio v-model="modifyForm1.type" label="hour">每时</el-radio>
          <el-radio v-model="modifyForm1.type" label="day">每天</el-radio>
          <br>
          <span style="color: rgb(96,107,125);margin-right: 20px;">次数</span>
          <el-input v-model="modifyForm1.num"  style="width: 345px;"></el-input>
        </div>
      </el-form-item>
      <el-form-item label="投放速率">
        <el-radio v-model="modifyForm1.speed" label="1">加速</el-radio>
        <el-radio v-model="modifyForm1.speed" label="2">匀速</el-radio>
      </el-form-item>

      <div class="tip"><span>定向信息</span></div>
      <el-form-item label="投放平台">
        <el-radio v-model="modifyForm1.vendor" label="zonst">中至</el-radio>
      </el-form-item>

      <el-form-item label="选择地区">
        <el-radio-group v-model="modifyForm1.geo_code" @change="selectArea">
          <el-radio label="all">所有地区</el-radio>
          <br>
          <el-radio label="specify" style="margin-top: 15px;">特定地区</el-radio>
        </el-radio-group>
        <el-tree :data="geo_data" show-checkbox node-key="id" ref="geo_tree" v-show="openArea"
                 highlight-current class="selectArea" >
        </el-tree>
      </el-form-item>
      <el-form-item label="选择应用类别">
        <el-radio-group v-model="app_category" @change="selectCategories">
          <el-radio label="all">所有类别</el-radio>
          <br>
          <el-radio label="specify" style="margin-top: 15px;">特定类别</el-radio>
        </el-radio-group>
        <el-tree
          :data="categories_data"
          show-checkbox node-key="id" v-show="openCategories" ref="categories_tree"
          highlight-current class="selectArea">
        </el-tree>
      </el-form-item>
      <el-form-item label="选择投放时间">
        <el-radio-group v-model="modifyForm1.day_parting" @change="selectDay_parting">
          <el-radio label="all">所有投放时间</el-radio>
          <br>
          <el-radio label="specify" style="margin-top: 15px;">特定投放时间</el-radio>
        </el-radio-group>
        <el-tree
          :data="day_part" show-checkbox node-key="id" v-show="openDay_part" ref="dayPart_tree"
          highlight-current class="selectArea">
        </el-tree>
      </el-form-item>
      <el-form-item label="选择设备类型">
        <el-radio-group v-model="modifyForm1.device_type" @change="selectDevice_type">
          <el-radio label="all">所有设备</el-radio>
          <br>
          <el-radio label="specify" style="margin-top: 15px;">特定设备</el-radio>
        </el-radio-group>
        <div class="radio_position" v-show="openDevice_type">
          <el-radio v-model="modifyForm1.specify_type" v-for="(key,value) in device_types" :key="value"
                    :label="value">
            {{key}}
          </el-radio>
        </div>
      </el-form-item>
      <el-form-item label="选择操作系统版本">
        <el-radio-group v-model="modifyForm1.os_version" @change="selectOs_version">
          <el-radio label="all">所有版本</el-radio>
          <br>
          <el-radio label="specify" style="margin-top: 15px;">特定版本</el-radio>
        </el-radio-group>
        <div class="radio_position" v-show="openOs_version">
          <el-radio v-model="modifyForm1.specify_version" v-for="(key,value) in os_versions" :key="value"
                    :label="parseInt(value)">
            {{key}}
          </el-radio>
        </div>
      </el-form-item>
      <el-form-item label="选择运营商">
        <el-radio-group v-model="modifyForm1.carrier" @change="selectCarrier">
          <el-radio label="all">所有运营商</el-radio>
          <br>
          <el-radio label="specify" style="margin-top: 15px;">特定运营商</el-radio>
        </el-radio-group>
        <div class="radio_position" v-show="openCarrier">
          <el-radio v-model="modifyForm1.specify_carrier" v-for="(key,value) in carriers" :key="value"
                    :label="value">
            {{key}}
          </el-radio>
        </div>
      </el-form-item>
      <el-form-item label="选择网络">
        <el-radio-group v-model="modifyForm1.network" @change="selectNetwork">
          <el-radio label="all">所有网络</el-radio>
          <br>
          <el-radio label="specify" style="margin-top: 15px;">特定网络</el-radio>
        </el-radio-group>
        <div class="radio_position" v-show="openNetwork">
          <el-radio v-model="modifyForm1.specify_network" v-for="(key,value) in networks" :key="value"
                    :label="value">
            {{key}}
          </el-radio>
        </div>
      </el-form-item>

      <div class="tip"><span>URL信息</span></div>
      <el-form-item label="印象网址" prop="tracking_imp_url">
        <el-input v-model="modifyForm1.tracking_imp_url"></el-input>
      </el-form-item>
      <el-form-item label="点击URL" prop="tracking_clk_url">
        <el-input v-model="modifyForm1.tracking_clk_url"></el-input>
      </el-form-item>
      <el-form-item label="跳转地址" prop="jump_url">
        <el-input v-model="modifyForm1.jump_url"></el-input>
      </el-form-item>
      <el-form-item label="深层链接" prop="deep_link_url">
        <el-input v-model="modifyForm1.deep_link_url"></el-input>
      </el-form-item>
    </el-form>
    <div class="toolbutton">
      <el-button style="margin-top: 12px;" @click="backTo"  type="primary" class="back">返回</el-button>
      <el-button style="margin-top: 12px;" @click="updateCampaign" :loading="createLoading" type="primary">修改</el-button>
    </div>
  </div>
</template>

<script>
  import api from '../../axios/api'
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
    export default{
        data(){
          let urlValidate=(rule,value,callback)=>{
            if(!( /^((https?|ftp|news):\/\/)?([a-z]([a-z0-9\-]*[\.。])+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel)|(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&]*)?)?(#[a-z][a-z0-9_]*)?$/.test(value))){
              return callback(new Error('URL格式不正确'));
            }
            callback();
          };
            return{
              createLoading:false,
              position:'top',
              modifyForm1:{
                name:'',
                bundle_id:'',
                app_platform:'',

                budget_day:'',
                bidding_min:'',
                bidding_max:'',
                bidding_type:'',
                frequency:'',
                type:'',
                num:'',
                speed:'',

                vendor:'',
                geo_code:'',
                day_parting:'',
                device_type:'',
                specify_type:'',
                os_version:'',
                specify_version:'',
                carrier:'',
                specify_carrier:'',
                network:'',
                specify_network:'',

                tracking_imp_url:'',
                tracking_clk_url:'',
                jump_url:'',
                deep_link_url:''
              },
              app_category1:'',
              app_category:'',

              options:[
                {
                  label:'',
                  value:'',
                  children:[]
                }
              ],
              modifyForm1Rules:{
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
                ],
                tracking_imp_url:[
                  {required:true,message:'印象地址必填',trigger:'blur'},
                  {validator:urlValidate,trigger:'blur'}
                ],
                tracking_clk_url:[
                  {required:true,message:'点击地址必填',trigger:'blur'},
                  {validator:urlValidate,trigger:'blur'}
                ],
                jump_url:[
                  {required:true,message:'跳转地址必填',trigger:'blur'},
                  {validator:urlValidate,trigger:'blur'}
                ],
                deep_link_url:[
                  {required:true,message:'深层地址必填',trigger:'blur'},
                  {validator:urlValidate,trigger:'blur'}
                ]
              },
              openFrequency:'',
              openArea:'',
              openCategories:'',
              openDay_part:'',
              openDevice_type:'',
              openOs_version:'',
              openCarrier:'',
              openNetwork:'',
              geo_data:this.getGeoData(),
              categories_data:this.getCategories_data(),
              day_part:this.getDay_part(),
              dayPart_arr1:'',
              app_arr1:'',
              geo_arr1:'',
              device_types:JSON.parse(sessionStorage.getItem('device_type')),
              carriers:JSON.parse(sessionStorage.getItem('carrier')),
              networks:JSON.parse(sessionStorage.getItem('network')),
            }
        },
      computed:{
        os_versions:function(){
          return (this.modifyForm1.app_platform==='ios'?JSON.parse(sessionStorage.getItem('ios_version')):JSON.parse(sessionStorage.getItem('android_version')))
        },
        app_cat:function(){
            return this.getApp_category(this.app_category1)
        },
//        geo_arr:function(){
//            console.log(this.getGeo_arr(this.geo_arr1));
//            console.log(this.geo_arr1);
//            return this.getGeo_arr(this.geo_arr1);
//        },
//        app_arr:function(){
//            return this.getApp_arr(this.app_arr1)
//        },
//        dayPart_arr:function(){
//
//            return this.getDaypart_arr(this.dayPart_arr1)
//        }
      },
      methods:{
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
              id:Object.keys(categories)[a],
              label:Object.values(categories)[a].name,
              children:[
                Object.values(categories)[a].child
              ]
            };
            for(let b=0;b<Object.keys(Object.values(categories)[a].child).length;b++){
              category_arr[a].children[b]={
                id:Object.keys(Object.values(categories)[a].child)[b],
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
              id:Object.keys(day_parts)[c],
              label:Object.values(day_parts)[c].name,
              children:[
                Object.values(day_parts)[c].hour
              ]
            };
            for(let d=0;d<Object.keys(Object.values(day_parts)[c].hour).length;d++){
              dayPart_arr[c].children[d]={
                id:Object.keys(Object.values(day_parts)[c].hour)[d],
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
        getApp_category(data){
          let category_arr=[];
          let category=JSON.parse(sessionStorage.getItem('app_category'));
            for(let i=0;i<Object.keys(category).length;i++){
                if(Object.keys(Object.values(category)[i].child).contains(data)){
                    category_arr=[i,data]
                }
            }
            return category_arr;
        },
        getGeo_arr(data){
          return data;
        },
        getApp_arr(data){
          return data;
        },
        getDaypart_arr(data){
          return data;
        },
        getCampaign_info(){
          let data=this.$route.params.campaign_id;
          api.getCampaign(data).then(res=>{
              if(res.data.status===0){
                  this.modifyForm1={
                    name:res.data.data[0].name,
                    bundle_id:res.data.data[0].bundle_id,
                    app_platform:res.data.data[0].app_platform,

                    budget_day:res.data.data[0].budget_day.toString(),
                    bidding_min:res.data.data[0].bidding_min,
                    bidding_max:res.data.data[0].bidding_max,
                    bidding_type:res.data.data[0].bidding_type,
                    frequency:res.data.data[0].freq.open===true?'specify':'all',
                    type:res.data.data[0].freq.open===true?res.data.data[0].freq.type:'',
                    num:res.data.data[0].freq.open===true?res.data.data[0].freq.num:'',
                    speed:res.data.data[0].speed.toString(),
                    tracking_imp_url:res.data.data[0].url.tracking_imp_url,
                    tracking_clk_url:res.data.data[0].url.tracking_clk_url,
                    jump_url:res.data.data[0].url.jump_url,
                    deep_link_url:res.data.data[0].url.deep_link_url,
                    vendor:res.data.data[0].targeting.vendor.list[0],
                    geo_code:res.data.data[0].targeting.geo_code.open===true?'specify':'all',
                    day_parting:res.data.data[0].targeting.day_parting.open===true?'specify':'all',
                    device_type:res.data.data[0].targeting.device_type.open===true?'specify':'all',
                    os_version:res.data.data[0].targeting.os_version.open===true?'specify':'all',
                    carrier:res.data.data[0].targeting.carrier.open===true?'specify':'all',
                    network:res.data.data[0].targeting.network.open===true?'specify':'all',
                    specify_type:res.data.data[0].targeting.device_type.open===true?res.data.data[0].targeting.device_type.list[0]:'',
                    specify_version:res.data.data[0].targeting.os_version.open===true?res.data.data[0].targeting.os_version.list[0]:'',
                    specify_carrier:res.data.data[0].targeting.carrier.open===true?res.data.data[0].targeting.carrier.list[0]:'',
                    specify_network:res.data.data[0].targeting.network.open===true?res.data.data[0].targeting.network.list[0]:''
                  };
                  this.app_category1=res.data.data[0].app_category;
                  this.app_category=res.data.data[0].targeting.app_category.open===true?'specify':'all';
                  this.openFrequency=res.data.data[0].freq.open;
                  this.openArea=res.data.data[0].targeting.geo_code.open;
                  this.openCategories=res.data.data[0].targeting.app_category.open;
                  this.openDay_part=res.data.data[0].targeting.day_parting.open;
                  this.openDevice_type=res.data.data[0].targeting.device_type.open;
                  this.openOs_version=res.data.data[0].targeting.os_version.open;
                  this.openCarrier=res.data.data[0].targeting.carrier.open;
                  this.openNetwork=res.data.data[0].targeting.network.open;

                this.geo_arr1=res.data.data[0].targeting.geo_code.open===true?res.data.data[0].targeting.geo_code.list:'';
                if(res.data.data[0].targeting.geo_code.open===true){
                  this.$refs.geo_tree.setCheckedKeys(this.geo_arr1);}
                this.app_arr1=res.data.data[0].targeting.app_category.open===true?res.data.data[0].targeting.app_category.list:'';
                if(res.data.data[0].targeting.app_category.open===true){
                  this.$refs.categories_tree.setCheckedKeys(this.app_arr1);}
                this.dayPart_arr1=res.data.data[0].targeting.day_parting.open===true?res.data.data[0].targeting.day_parting.list:'';
                if(res.data.data[0].targeting.day_parting.open===true){
                  this.$refs.dayPart_tree.setCheckedKeys(this.dayPart_arr1);}
              }else{
                this.$message({
                  message:'获取初始信息出错'+res.data.msg
                });
              }
          }).catch(err=>{
              this.$message({
                message:'获取初始信息失败',
                type:'error'
              });
            console.log(err)
          })
        },
        updateCampaign(){
          let data2={
            vendor:{
              open:true,
              list:[
                this.modifyForm1.vendor
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
              list:this.openDevice_type===true?[this.modifyForm1.specify_type]:Object.keys(JSON.parse(sessionStorage.getItem('device_type')))
            },
            os_version:{
              open:this.openOs_version,
              list:this.openOs_version===true?[this.modifyForm1.specify_version]:Object.keys(this.os_versions)
            },
            carrier:{
              open:this.openCarrier,
              list:this.openCarrier===true?[this.modifyForm1.specify_carrier]:Object.keys(JSON.parse(sessionStorage.getItem('carrier')))
            },
            network:{
              open:this.openNetwork,
              list:this.openNetwork===true?[this.modifyForm1.specify_network]:Object.keys(JSON.parse(sessionStorage.getItem('network')))
            }
          };
          let data3={
            tracking_imp_url:this.modifyForm1.tracking_imp_url,
            tracking_clk_url:this.modifyForm1.tracking_clk_url,
            jump_url:this.modifyForm1.jump_url,
            deep_link_url:this.modifyForm1.deep_link_url
          };
          let data={
            campaign_id:Number(this.$route.params.campaign_id),
            name:this.modifyForm1.name,
            bundle_id:this.modifyForm1.bundle_id,
            app_platform:this.modifyForm1.app_platform,
            app_category:this.app_cat[1],
            budget_day:Number(this.modifyForm1.budget_day),
            bidding_min:Number(this.modifyForm1.bidding_min),
            bidding_max:Number(this.modifyForm1.bidding_max),
            bidding_type:this.modifyForm1.bidding_type,
            freq:{
              open:this.openFrequency,
              type:this.openFrequency===true?this.modifyForm1.type:'',
              num:this.openFrequency===true?Number(this.modifyForm1.num):''
            },
            speed:Number(this.modifyForm1.speed),
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
              this.$refs.modifyForm1.validate(valid=>{
                  if(valid){
                    this.createLoading=true;
                api.modifyCampaign(JSON.stringify(data)).then(res=>{
                  if(res.data.status===0){
                    let campaign_id=this.$route.params.campaign_id;
                    setTimeout(()=>{
                      this.$message({
                        message:'修改成功',
                        type:'success'
                      });
                      this.createLoading=false;
                      this.$router.replace({ name: '广告系列', params: { campaign_id: campaign_id }})
//                  this.$router.replace('/adSerial')
                    },1000);
                  }else{
                    this.$message({
                      message:'修改出错'+res.data.msg,
                      type:'warning'
                    });
                    this.createLoading=false;
                  }
                }).catch(err=>{
                  this.$message({
                    message:'修改失败'+err,
                    type:'error'
                  });
                  this.createLoading=false;
                });
                  }
              })
          }
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
        handleChange(value){
          console.log(value)
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
        this.getCampaign_info();
    }
    }

</script>
<style scoped>
  .basic_info{
    margin: 0 auto;
    width: 400px;
    position: relative;
    top: 30px;
  }
  .tip{
    position: relative;
    bottom: 10px;
    left: -80px;
    color: rgb(56,68,88);
    font-size: 18px;
    font-weight: bold;
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
    margin: 15px 0;}
  .back{
    position: relative;
    right: 99%;
  }
</style>
