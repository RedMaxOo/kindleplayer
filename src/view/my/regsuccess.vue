<template>
  <div class="register-layout">
    <div class="title">{{$t('m.registertit')}}</div>
    <div class="imgbox">
      <img src="../../assets/icons/success.png" width="70" height="70">
    </div>
    <div class="text1">{{message1}}</div>
    <div class="text2">{{message2}}</div>
  </div>
</template>
<script>
  export default {
    name:"regsuccess",
    data(){
      return{
        message1:"Registered Successfully!",
        message2:'Please visit the registered email confirmation'
      }
    },
    mounted() {
      var lang = sessionStorage.getItem('lang')
      if(lang === 'CN'){
        this.message1 = '注册成功！'
        this.message2 = '请前往注册邮箱激活您的账号'
      }
    },
  }
</script>
<style lang="less">
  .register-layout{
    width:1098px;
    margin:auto;
    height: 500px;
    // overflow-y: scroll;
    background-color: white;
    margin-top: 10px;
    // margin-bottom:50px;
    .title{
      height: 80px;
      line-height: 80px;
      text-align: center;
      opacity: 0.6;
      background-image: linear-gradient(-134deg, #4634A9 0%, #F63669 100%);
      font-family: Segoe UI;
      font-size: 30px;
      color: #FFFFFF;
      text-shadow: 0 2px 4px rgba(108,108,108,0.50);
    }
    .imgbox{
      text-align: center;
      margin-top:126px;
    }
    .text1{
      text-align: center;
      font-family: Avenir-Medium;
      font-size: 26px;
      color: #666666;
      margin-top:23px;
    }
    .text2{
      text-align: center;
      font-family: Avenir-Medium;
      font-size: 18px;
      color: #5BB4DB;
      margin-top:17px;
      a{
        color: #5BB4DB;
        text-decoration: none;
      }
    }
  }
</style>
