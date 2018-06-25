<template>
  <div class="register-layout">
    <div class="title">CREATE YOUR ACCOUNT</div>
    <div class="register-form">
      <div class="logo"></div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm" :disabled="formDisabled">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="Username"></el-input>
        </el-form-item>
        <el-form-item prop="pwd1">
          <el-input type="password" v-model="ruleForm.pwd1" placeholder="Password" ></el-input>
        </el-form-item>
        <el-form-item prop="pwd2">
          <el-input type="password" v-model="ruleForm.pwd2" placeholder="Confirm Password"></el-input>
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
  name:"register",
  data () {
    var validateNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('电话不能为空'))
      }
      if (!(/^\d+$/.test(value))) {
        callback(new Error('请输入正整数'))
      }
      callback()
    }
    var validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'))
      }
      else {
        if (this.ruleForm.pwd !== '') {
          this.$refs.ruleForm.validateField('pwd')
        }
        callback()
      }
    }
    return {
      ruleForm: {
        pwd: '',
        email: '',
        code: ''
      },
      rules: {
        pwd: [
          { validator:validatePass, trigger: 'blur' },
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
        ]
      },
      isShowBtn:true,
      formDisabled:false
    }
  },
  methods: {
    submit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('api/open/user/regUser',this.ruleForm,{transformRequest: [ data => {
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
    getUserInfo(){
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
  mounted(){
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
  }
</style>

