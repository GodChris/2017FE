<template>
  <div>
    <!--expand-trigger="hover" 子菜单打开方式-->
    <el-cascader
      :options="options"
      v-model="selectedOptions"
      @change="handleChange">
    </el-cascader>
  </div>
</template>

<script>
    export default{
        data(){
            return{

            }
        }
    }
</script>

<style>
</style>
