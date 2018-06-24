<template>
  <div class="footer">
    <div class="text">
      ©2018 by Kindle Music
    </div>
  </div>
</template>
<script>
  export default {
    name: 'XFooter'
  }
</script>
<style scoped lang="less">
  .footer{
    background-color:#212939;
    box-shadow: 0 -2px 5px 0;
    width:100%;
    height:50px;
    position: fixed;
    bottom: 0;
    z-index:5;
    .text{
      font-family: Avenir-Heavy;
      font-size: 16px;
      color: #FFFFFF;
      margin:auto 0;
      line-height:50px;
      text-align: center;
    }
  }
</style>
