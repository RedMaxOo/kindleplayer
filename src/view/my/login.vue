<template>
  <div class="login">
    <div class="login-layout">
    </div>
    <div class="title">Music is social , Let's make it fun</div>
    <div class="login-form">
      <div class="logo"></div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" :placeholder="$t('m.username')" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="ruleForm.password" :placeholder="$t('m.password')" prefix-icon="el-icon-pwd"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="ruleForm.code" :placeholder="$t('m.code')" prefix-icon="el-icon-code">
            <template slot="append"><div class="codemsg">{{codeMsg}}</div></template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="button" @click="login('ruleForm')">{{$t('m.login')}}</el-button>
        </el-form-item>
        <el-form-item>
          <div class="bottom">  <router-link to="/retrieve">{{$t('m.forgot')}}</router-link> |  <span @click="goRegister">{{$t('m.register')}}</span></div>
        </el-form-item>
      </el-form>
    </div>
    <div class="footer">
      ©2018 by Kindle Music
    </div>
  </div>
</template>

<script>
export default {
  name:"login",
  data () {
    var validateCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$t('m.errortips.code')))
      }else  if (this.ruleForm.code.toLowerCase() !== this.codeMsg.toLowerCase()) {
        callback(new Error(this.$t('m.errortips.codetips')))
      }
      else {
        callback()
      }
    }
    return {
      ruleForm: {},
      rules: {
        username: [
          { required: true, message: this.$t('m.errortips.userId'), trigger: 'blur' },
        ],
        password: [
          { required: true, message: this.$t('m.errortips.password'), trigger: 'blur' },
        ],
        code: [
          {validator: validateCode, trigger: 'blur' }
        ]
      },
      codeMsg:''
    }
  },
  methods: {
    login(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let  params = {
            username:this.ruleForm.username,
            password:this.ruleForm.password
          }
          //this.baseUrl +
          this.$http.post(this.baseUrl + 'login', params, {transformRequest: [ data => {
            data = this.qs.stringify(data)
            return data
          }]},{
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(res=>{
            if(res.status === 200) {
              if(res.data.code === '0000') {
                sessionStorage.setItem('username',this.ruleForm.username)
                sessionStorage.setItem('token',res.data.result)
                this.getUserInfo(res.data.result)
              }
              else{
                this.$message({
                  message: this.$t('m.errortips.errusers'),
                  type: 'error',
                  duration:1500,
                  showClose:true
                })
              }
            }
          })
        } else {
          return false
        }
      })
    },
    getUserInfo(token){
      this.$http.get(this.baseUrl + 'api/user/getUser',{headers: {
        'Authorization': token
      }}).then(res=>{
        if(res.status === 200) {
            if(res.data.result) {
              sessionStorage.setItem('userinfor', JSON.stringify(res.data.result))
              var role = res.data.result.role
              var isAdmin = (role && role === 'ROLE_ADMIN')
              if(isAdmin) {
                // this.admin = true
                sessionStorage.setItem('admin', isAdmin)
              }
              this.$router.push({path:'/'})
            }
            else{
              this.$message({
                  message: '获取用户信息失败',
                  type: 'error',
                  duration:1500,
                  showClose:true
                })
            }
        }
      })
    },
    goRegister(){
      this.$router.push({path:'/register'})
    },
    createCode () {
      var code = ''
      var codeLength = 4
      var selectChar = new Array(1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z')
      for (var i = 0; i < codeLength; i++) {
        var charIndex = Math.floor(Math.random() * 34)
        code += selectChar[charIndex]
      }
      if (code.length !== codeLength) {
        this.createCode()
      }
      this.codeMsg = code
    }
  },
   mounted () {
     this.createCode()
   }
}
</script>
<style lang="less">
  .login{
    .el-input__prefix{
      left: 10px;
    }
    .title{
      font-family: Segoe UI;
      font-size: 30px;
      color: #FFFFFF;
      position: relative;
      letter-spacing: 0;
      line-height: 54px;
      width: 500px;
      height: 54px;
      margin: auto;
      top: 68px;
      font-style: italic;
      font-weight: bold;
      z-index: 1;
      text-shadow: 0 2px 4px #310054;
    }
    .login-layout{
      position:absolute;
      left:0px;
      top:0px;
      right:0;
      bottom:0;
      width:100%;
      height:100%;
      background-image: url('../../../static/img/login.png');
      background-attachment: fixed;
      background-repeat: no-repeat;
      background-size: cover;
    }
    .login-form{
      width: 380px;
      height: 400px;
      margin: 0 auto;
      top: 110px;
      line-height: 400px;
      position: relative;
      background: #FFFFFF;
      border-radius: 5px;
      .el-form-item__content{
        width: 280px;
        margin: auto;
        margin-bottom: none !important;
      }
      .button{
        width:280px;
        background-image: linear-gradient(-45deg, #4634A9 0%, #F63669 100%);
        border-radius: 4px;
        border:none;
        font-family: Segoe UI;
        font-size: 18px;
        color: #FFFFFF;
      }
      .bottom{
        width:280px;
        margin:auto;
        font-family: Segoe UI;
        font-size: 12px;
        color: #999999;
        text-align: center;
        a{
          cursor: pointer;
          width:100px;
          margin-right:10px;
          color: #999999;
          text-decoration: none;
        }
        span:nth-child(2){
          color: #5BB4DB;
          margin-left:10px;
          cursor: pointer;
        }
      }
    }
    .logo{
      /*width:250px;*/
      height:90px;
      background: url('../../assets/img/logo.png') no-repeat center center;
    }
    .footer{
      font-family: Segoe UI;
      font-size: 16px;
      text-align: center;
      color: #FFFFFF;
      position: fixed;
      /*top: 0px;*/
      /*z-index: 100;*/
      left: 0px;
      right: 0px;
      bottom:20px;
      width: 200px;
      /*height: 200px;*/
      margin-left:auto;
      margin-right:auto;
    }
    .el-input-group__append{
      right: 0;
      padding: 0 0 0 20px;
      .codemsg{
        border: 1px solid #DDE3E8;
        border-radius: 4px;
        height: 40px;
        line-height: 40px;
        width: 100px;
        box-sizing: border-box;
        padding: 0 10px;
        letter-spacing: 7px;
        text-align: center;
      }
    }
  }
</style>
