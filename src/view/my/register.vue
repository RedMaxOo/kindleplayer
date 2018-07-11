<template>
  <div class="register-layout">
    <div class="title">CREATE YOUR ACCOUNT</div>
    <div class="reg-form">
      <div class="logo"></div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm" label-width="380px">
        <el-form-item prop="userID" label="用户名">
          <el-tooltip class="item" effect="dark" content="UserID由数字和字母组成" placement="right">
            <el-input v-model="ruleForm.userID" placeholder="UserID"></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item prop="pwd1" label="密码">
          <el-tooltip class="item" effect="dark" content="密码由6-12位数字和字母组成" placement="right">
            <el-input type="password" v-model="ruleForm.pwd1" placeholder="Password" ></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item prop="pwd2" label="确认密码">
          <el-tooltip class="item" effect="dark" content="密码由6-12位数字和字母组成" placement="right">
            <el-input type="password" v-model="ruleForm.pwd2" placeholder="Confirm Password"></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="ruleForm.email" placeholder="Email"></el-input>
        </el-form-item>
        <el-form-item prop="username" label="姓名">
          <el-tooltip class="item" effect="dark" content="Username不能超过32个字" placement="right">
            <el-input v-model="ruleForm.username" placeholder="Username"></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item prop="mobile" label="手机号">
          <el-input v-model="ruleForm.mobile" placeholder="Mobile"></el-input>
        </el-form-item>
        <el-form-item prop="company" label="公司">
          <el-input v-model="ruleForm.company" placeholder="Company"></el-input>
        </el-form-item>
        <el-form-item prop="address" label="地址">
          <el-input v-model="ruleForm.address" placeholder="Address"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="button" @click="register('ruleForm')">Register</el-button>
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
          return callback(new Error('请输入手机号'))
        }else  if (!this.isvalidPhone(value)){
          callback(new Error('请输入有效手机号'))
        }
        else {
          callback()
        }
      }
      var validatePass = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入密码'));
        }
        else if(!this.isvalidPwd(value)){
          callback(new Error('密码是6-12位数字和字母的组合'))
        }
        else {
          if (this.ruleForm.pwd2 !== '') {
            this.$refs.ruleForm.validateField('pwd2')
          }
          callback();
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请确认密码'));
        } 
        else if(!this.isvalidPwd(value)){
          callback(new Error('密码由6-12位字母和数字组成'))
        }else if (value !== this.ruleForm.pwd1) {
          callback(new Error('两次密码输入不匹配'))
        } else {
          callback();
        }
      }
      var validateEmail = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入邮箱'))
        }else  if (!this.isvalidEmail(value)){
          callback(new Error('请输入有效邮箱'))
        }
        else {
          callback()
        }
      }
      var validateUserID = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入用户名'))
        }else  if (!this.isvalidUser(value)){
          callback(new Error('需字母和数字组合'))
        } else if(value.length > 32){
          callback(new Error('用户名过长'))
        }
        else {
          callback()
        }
      }
      var validateUserName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入姓名'))
        } else if(value.length > 32){
          callback(new Error('姓名过长'))
        }
        else {
          callback()
        }
      }
      var validateCompany = (rule, value, callback) => {
        if(value.length > 100){
          callback(new Error('公司名称过长'))
        }
        else{
          callback()
        }
      }
      var validateAddress = (rule, value, callback) => {
        if(value.length > 255){
          callback(new Error('地址过长'))
        }else{
          callback()
        }
      }
      return {
        title:'',
        ruleForm: {
          userID:'',
          username:"",
          pwd1:"",
          pwd2:"",
          email:"",
          mobile:"",
          company:"",
          address:"",
        },
        rules: {
          userID: [
            { required: true, validator:validateUserID, trigger: 'blur' },
          ],
          username: [
            { required: true, message:'', validator:validateUserName, trigger: 'blur' },
          ],
          pwd1: [
            { required: true, validator:validatePass, trigger: 'blur' },
          ],
          pwd2: [
            { required: true, validator:validatePass2, trigger: 'blur' },
          ],
          email: [
            { required: true, validator: validateEmail, trigger: 'blur' },
          ],
          mobile: [
            { required: true, validator:validateNumber, trigger: 'blur' },
          ],
          company: [
            { validator: validateCompany, trigger: 'blur' },
          ],
          address: [
            { validator: validateAddress, trigger: 'blur' },
          ]
        }
      }
    },
    methods: {
      isvalidUser(str){
        const reg = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]/
        return reg.test(str)
      },
      isvalidPwd(str){
        const reg = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,12}$/
        return reg.test(str)
      },
      isvalidPhone(str) {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        return reg.test(str)
      },
      isvalidEmail(str) {
        const reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$")
        return reg.test(str)
      },
      register(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post(this.baseUrl + 'open/user/regUser',this.ruleForm,{transformRequest: [ data => {
              data = this.qs.stringify(data);
              return data;
            }]},{
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }).then(res=>{
              if(res.status === 200 && res.data.result === 'Y') {
               this.$router.push({path:'/register-success'})
              }
              else{
                this.$message({
                   message: res.data.message,
                   type: 'error',
                    duration:0,
                    showClose:true
                })
              }
            })
          } else {
            return false
          }
        });
      }
    },
    mounted(){
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
  .reg-form {
    margin-top:30px;
    .el-form-item{
      margin-bottom:30px;
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
      font-family: Avenir-Heavy;
      font-size: 18px;
      color: #FFFFFF;
    }
  }
</style>

