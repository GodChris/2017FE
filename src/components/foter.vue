<template>

    <footer>
  <div class="footer-end-col-l">
    <a href="">服务条款</a>
    <font>&nbsp;&nbsp;|&nbsp;&nbsp;</font>
    <a href="">隐私政策</a>
  </div>
  <div class="footer-end-col-r">
        <span>版权所有©zonst 2017
        </span>
  </div>
  <div class="clear"></div>
</footer>

</template>

<script>
    export default{
        name:'footer'
    }
</script>

<style scoped>

  footer{
    border-top: 4px solid #000;
    background: #0b303c;
    padding: 20px 0;
    font-size: 11px;
    color: rgba(255, 255, 255, 0.2);
    display: block;

    width: 100%;
    margin:0 auto;
    height:45px;
  }

  footer .footer-end-col-l{
    float: left;
    position: relative;
    margin-left: 200px;
  }
  footer .footer-end-col-l a{
    letter-spacing: 1px;
    text-decoration: none;
    color: rgba(255, 255, 255, 0.2);
  }
  footer .footer-end-col-l a:hover{
    color: whitesmoke;
  }

  footer .footer-end-col-r {
    letter-spacing: 1px;
    float: right;
    position: relative;
    margin-right: 200px;

  }
</style>
