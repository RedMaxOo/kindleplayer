<template>
  <div class="register-layout">
    <div class="title">{{$t('m.submenu2')}}</div>
    <div class="register-form">
      <div class="logo"></div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm" label-width="380px">
        <el-form-item prop="pwd1" :label="$t('m.oldpass')">
          <el-tooltip class="item" effect="dark" :content="$t('m.errortips.passwordtips')" placement="right">
            <el-input type="password" v-model="ruleForm.pwd1" :placeholder="$t('m.oldpass')" ></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item prop="pwd2" :label="$t('m.newpass')">
          <el-tooltip class="item" effect="dark" :content="$t('m.errortips.passwordtips')" placement="right">
            <el-input type="password" v-model="ruleForm.pwd2" :placeholder="$t('m.newpass')"></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item>
          <el-button class="button" @click="submit('ruleForm')">{{$t('m.submint')}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'change',
  data () {
      var validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('m.errortips.password')));
      }
      else if(!this.isvalidPwd(value)){
        callback(new Error(this.$t('m.errortips.passwordtips')))
      }
      else {
        callback();
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('m.errortips.password')))
      }
      else if(!this.isvalidPwd(value)){
        callback(new Error(this.$t('m.errortips.passwordtips')))
      } else if(value == this.ruleForm.pwd1){
        callback(new Error(this.$t('m.errortips.pwdconfirm')))
      }else {
        callback();
      }
    }
    return {
      codeMsg: '',
      ruleForm: {
        pwd1: '',
        pwd2: ''
      },
      rules: {
        pwd1: [
          { required:true, validator:validatePass, trigger: 'blur' },
        ],
        pwd2: [
          { required:true, validator:validatePass2, trigger: 'blur' },
        ]
        // pwd3: [
        //   { required:true, validator:validatePass3, trigger: 'blur' },
        // ]
      }
    }
  },
  methods: {
  isvalidPwd(str){
      const reg = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,12}$/
      return reg.test(str)
    },
    submit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var token = sessionStorage.getItem('token')
          var config = {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': token
            }
          }
          var fd = new FormData()
          fd.append('pw1', this.ruleForm.pwd1)
          fd.append('pw2', this.ruleForm.pwd2)
          this.$http.post(this.baseUrl + 'api/user/changePW', fd, config).then(res => {
            if (res.status === 200) {
              if (res.data.result === 'Y') {
                sessionStorage.clear()
                this.$router.push({path:'/login'})
              } else {
                this.$message({
                 message: res.data.message,
                  type: 'error',
                  duration: 1500,
                  showClose:true
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
    var username = sessionStorage.getItem('username')
    if(!username){
      this.$router.push({path:'/login'})
    }
  }
}
</script>
<style lang="less">
  .register-layout{
    width:1098px;
    margin:auto;
    height: 100%;
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
  }
  .register-form {
      margin-top:10px;
    .el-form-item{
      margin-bottom:20px;
    }
    .el-form-item__content {
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
      font-family: Segoe UI;
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

