<template>
  <div class="register-layout">
    <div class="title">{{$t('m.activetit')}}</div>
    <div class="imgbox" v-show="regsuccess">
      <img src="../../assets/icons/success.png" width="70" height="70">
    </div>
    <div class="text1" v-show="regsuccess">{{$t('m.errortips.activeSuc')}}</div>
    <!--<div class="imgbox" v-show="regfail">
      <img src="../../assets/icons/success.png" width="70" height="70">
    </div>-->
    <div class="text1" v-show="regfail">{{$t('m.errortips.activeFail')}}</div>
  </div>
</template>
<script>
  export default {
    name:"activeuser",
    data(){
      return{
        regsuccess:false,
        regfail:false
      }
    },
    methods:{
      checkRegister(){
        let token = this.$route.query.t || ''
        let params = {
          t:token
        }
        this.$http.post(this.baseUrl + 'open/user/activeUser',params,{transformRequest: [ data => {
              data = this.qs.stringify(data);
              return data;
            }]},{
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }).then(res=>{
          if(res.status === 200) {
            if(res.data.result === 'Y'){
              this.regsuccess = true
              this.$router.push({path:'/login'})
            }
            else{
              this.regfail = true
              this.$message({
                  message: 'active error',
                  type: 'error',
                  duration:1500,
                  showClose:true
              })
            }
          }
        })
      }
    },
    mounted(){
      this.checkRegister()
    }
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
    font-family: Segoe UI;
    font-size: 26px;
    color: #666666;
    margin-top:23px;
  }
  .text2{
    text-align: center;
    font-family: Segoe UI;
    font-size: 18px;
    color: #5BB4DB;
    margin-top:17px;
  }
  }
</style>
