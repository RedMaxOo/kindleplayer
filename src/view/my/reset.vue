<template>
  <div class="register-layout">
    <div class="title">CREATE YOUR ACCOUNT</div>
    <div class="register-form">
      <div class="logo"></div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm" :disabled="formDisabled">
        <el-form-item prop="username">
          <el-input type="password" v-model="ruleForm.pwd1" placeholder="password" prefix-icon="el-icon-pwd"></el-input>
        </el-form-item>
        <el-form-item prop="useremail">
          <el-input  type="password" v-model="ruleForm.pwd2" placeholder="Confirm Password" prefix-icon="el-icon-pwd"></el-input>
        </el-form-item>
        <el-form-item v-show="isShowBtn">
          <el-button class="button" @click="submit('ruleForm')">SUBMIT</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'retrieve',
    data () {
      return {
        codeMsg: '',
        ruleForm: {
          username: '',
          useremail: '',
          code: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          useremail: [
            { required: true, message: '请输入邮箱', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '请输入校验码', trigger: 'blur' }
          ]
        },
        isShowBtn: true,
        formDisabled: false
      }
    },
    methods: {
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
      },
      submit (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            debugger
            this.$http.post('api/open/user/sendMail', this.ruleForm, {transformRequest: [ data => {
                data = this.qs.stringify(data);
                return data;
              }]},{
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }).then(res=>{
              if(res.status === 200) {
                this.$router.push({path:'/register-success'})
              }
            })
          } else {
            return false;
          }
        });
      },
      getUrl(){
        var token = sessionStorage.getItem('token')
        this.$http.get('api/api/user/getUser',{headers: {
            'Authorization': token
          }}).then(res=>{
          if(res.status === 200) {
            if(res.data) {
              this.ruleForm = res.data.result
              this.isShowBtn = false
              this.formDisabled = true
            }
          }
        })
      }
    },
    mounted () {
      this.createCode()
      this.getUserInfo()
    }
  }
</script>
<style lang="less">
  .register-layout{
    width:1098px;
    margin:auto;
    height: 100%;
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
  }
  .register-form {
    .el-form-item{
      margin-bottom:0px;
    }
    .el-form-item__content {
      width: 380px;
      margin: auto;
      margin-bottom: 0px !important;
    }
    .el-form-item__content:nth-child(1) {
      margin-top:30px;
    }
    .button{
      width:380px;
      height:40px;
      background-image: linear-gradient(-45deg, #4634A9 0%, #F63669 100%);
      border-radius: 4px;
      font-family: Avenir-Heavy;
      font-size: 18px;
      color: #FFFFFF;
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

