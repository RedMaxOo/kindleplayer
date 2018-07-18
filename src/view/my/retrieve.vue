<template>
  <div class="register-layout">
    <div class="title">{{$t('m.retieve')}}</div>
    <div class="register-form">
      <div class="logo"></div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm" :disabled="formDisabled" label-width="380px">
        <el-form-item prop="username" :label="$t('m.username')">
          <el-input v-model="ruleForm.username" :placeholder="$t('m.username')" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="useremail" :label="$t('m.mail')">
          <el-input  v-model="ruleForm.useremail" :placeholder="$t('m.mail')" prefix-icon="icon-email-small"></el-input>
        </el-form-item>
        <el-form-item prop="code" :label="$t('m.code')">
          <el-input v-model="ruleForm.code" :placeholder="$t('m.code')" prefix-icon="el-icon-code">
            <template slot="append"><div class="codemsg">{{codeMsg}}</div></template>
          </el-input>
        </el-form-item>
        <el-form-item v-show="isShowBtn">
          <el-button class="button" @click="submit('ruleForm')">{{$t('m.submint')}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'retrieve',
  data () {
      var validateEmail = (rule, value, callback) => {
        if (!value) {
          return callback(new Error(this.$t('m.errortips.mail')))
        }else  if (!this.isvalidEmail(value)) {
          callback(new Error(this.$t('m.errortips.mailtips')))
        }
        else {
          callback()
        }
      }
     var validateUserID = (rule, value, callback) => {
        if (!value) {
          return callback(new Error(this.$t('m.errortips.userId')))
        }else  if (!this.isvalidUser(value)){
          callback(new Error(this.$t('m.errortips.userIdtips')))
        } else if(value.length > 32){
          callback(new Error(this.$t('m.errortips.userIdmore')))
        }
        else {
          callback()
        }
      }
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
      codeMsg: '',
      ruleForm: {
        username: '',
        useremail: '',
        code: ''
      },
      rules: {
        username: [
          { required: true, validator:validateUserID, trigger: 'blur' }
        ],
        useremail: [
          { required: true, validator:validateEmail, trigger: 'blur' }
        ],
        code: [
          { required: true, validator: validateCode, trigger: 'blur' }
        ]
      },
      isShowBtn: true,
      formDisabled: false
    }
  },
  methods: {
    isvalidEmail(str) {
        const reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$")
        return reg.test(str)
    },
    isvalidUser(str){
        const reg = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]/
        return reg.test(str)
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
    },
    submit (formName) {
      let  params = {
        userID:this.ruleForm.username,
        email:this.ruleForm.useremail
      }
      this.$refs[formName].validate((valid) => {

        if (valid) {
          this.$http.post(this.baseUrl + 'open/user/sendResetMail', params, {transformRequest: [ data => {
            data = this.qs.stringify(data);
            return data;
          }]},{
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(res => {
            if (res.status === 200) {
              if(res.data.message == 'success'){
                this.$message({
                    message: '找回密码申请成功，请前往邮箱重置密码',
                    type: 'success',
                    duration:'1500'
                  })
              }
              else{
                  this.$message({
                    message: '密码找回失败',
                    type: 'error',
                    duration : 1500,
                  })
              }
            }
          })
        } else {
          return false;
        }
      });
    }
  },
  mounted () {
    this.createCode()
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
     margin-top:30px;
    .el-input__prefix{
      left: 10px;
    }
    .el-form-item{
      margin-bottom:30px;
    }
    .el-form-item__content {
       margin-top:30px;
      width: 380px;
      margin: auto;
      margin-bottom: 0px !important;
    }
    // .el-form-item__content:nth-child(1) {
    //   margin-top:30px;
    // }
    .button{
      width:380px;
      height:40px;
      background-image: linear-gradient(-45deg, #4634A9 0%, #F63669 100%);
      border-radius: 4px;
      font-family: Avenir-Heavy;
      font-size: 18px;
      color: #FFFFFF;
      margin-top:30px;
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

