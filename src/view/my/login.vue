<template>
  <div class="login">
    <div class="login-layout">
    </div>
    <div class="title">Music is social , Let's make it fun</div>
    <div class="login-form">
      <div class="logo"></div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="Username" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="ruleForm.password" placeholder="Password" prefix-icon="el-icon-pwd"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="ruleForm.code" placeholder="Code" prefix-icon="el-icon-code"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="button" @click="login('ruleForm')">SIGN IN</el-button>
        </el-form-item>
        <el-form-item>
          <div class="bottom"><span>Forgot Password</span>  |  <span>Register</span></div>
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
      return {
        ruleForm: {},
        rules: {
          username: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
          code: [
//            { required: true, message: '请输入验证码', trigger: 'blur' },
          ]
        }
      }
    },
    methods: {
      login(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('api/login',this.ruleForm,{transformRequest: [ data => {
              data = this.qs.stringify(data)
              return data
            }]},{
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }).then(res=>{
              if(res.status === 200) {
                if(res.data.code === '0000') {
//                  this.$router.go(-1)
                  this.$router.push({path:'/'})
                }
                else if(res.data.code === 'LG1111'){
                  alert(''+res.data.message)
                }
              }
            })
          } else {
            return false
          }
        })
      }
    },
    computed: {
    }
  }
</script>
<style lang="less">
  .login{
    .title{
      font-family: Avenir-HeavyOblique;
      font-size: 30px;
      color: #FFFFFF;
      position: relative;
      letter-spacing: 0;
      line-height: 54px;
      width: 460px;
      height: 54px;
      margin: auto;
      top: 68px;
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
      background-image: url('../../assets/img/login.png');
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
        font-family: Avenir-Heavy;
        font-size: 18px;
        color: #FFFFFF;
      }
      .bottom{
        width:280px;
        margin:auto;
        font-family: Avenir-Light;
        font-size: 12px;
        color: #999999;
        text-align: center;
        span{
          cursor: pointer;
          width:100px;
          margin-right:10px;
        }
        span:nth-child(2){
          color: #5BB4DB;
          margin-left:10px;
        }
      }
    }
    .logo{
      /*width:250px;*/
      height:90px;
      background: url('../../assets/img/logo.png') no-repeat center center;
    }
    .footer{
      font-family: Avenir-Heavy;
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
  }
</style>
