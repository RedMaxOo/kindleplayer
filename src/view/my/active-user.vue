<template>
  <div class="register-layout">
    <div class="title">ACTIVE ACCOUNT</div>
    <div class="imgbox" v-show="regsuccess">
      <img src="../../assets/icons/success.png" width="70" height="70">
    </div>
    <div class="text1" v-show="regsuccess">User Active Successfully!</div>
    <!--<div class="imgbox" v-show="regfail">
      <img src="../../assets/icons/success.png" width="70" height="70">
    </div>-->
    <div class="text1" v-show="regfail">User Active Fail!</div>
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
            }
            else{
              this.regfail = true
              this.$message({
                  message: 'active error',
                  type: 'error'
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
    overflow-y: scroll;
    background-color: white;
    margin-top: 20px;
    margin-bottom:50px;
  .title{
    height: 80px;
    line-height: 80px;
    text-align: center;
    opacity: 0.6;
    background-image: linear-gradient(-134deg, #4634A9 0%, #F63669 100%);
    font-family: Avenir-Heavy;
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
  }
  }
</style>
