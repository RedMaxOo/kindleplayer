<template>
  <div class="info-layout">
    <div class="title">PERSONAL INFORMATION</div>
    <div class="info-form">
      <div class="logo"></div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="userID">
          <el-tooltip class="item" effect="dark" content="UserID由数字和字母组成" placement="right">
            <el-input v-model="ruleForm.userID" placeholder="User name"></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="ruleForm.email" placeholder="Email"></el-input>
        </el-form-item>
        <el-form-item prop="username">
          <el-tooltip class="item" effect="dark" content="Username由数字和字母组成" placement="right">
            <el-input v-model="ruleForm.username" placeholder="Name"></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item prop="mobile">
          <el-input v-model="ruleForm.mobile" placeholder="Mobile"></el-input>
        </el-form-item>
        <el-form-item prop="company">
          <el-input v-model="ruleForm.company" placeholder="Company"></el-input>
        </el-form-item>
        <el-form-item prop="address">
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
    name:"myinfo",
    data () {
      var validateNumber = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('电话不能为空'))
        }else  if (!this.isvalidPhone(value)){
          callback(new Error('请输入正确的11位手机号码'))
        }
        else {
          callback()
        }
      }
      var validatePass = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入密码'));
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
        } else if (value !== this.ruleForm.pwd1) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback();
        }
      }
      var validateEmail = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('邮箱不能为空'))
        }else  if (!this.isvalidEmail(value)){
          callback(new Error('请输入正确的邮箱，以便您激活账号'))
        }
        else {
          callback()
        }
      }
      return {
        title:'',
        ruleForm: {
          userID:'',
          username:"",
          email:"",
          mobile:"",
          company:"",
          address:"",
        },
        rules: {
          userID: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          username: [
            { required: true, message: '请输入ID', trigger: 'blur' },
          ],
          pwd1: [
            { validator:validatePass, trigger: 'blur' },
          ],
          pwd2: [
            { validator:validatePass2, trigger: 'blur' },
          ],
          email: [
            { validator: validateEmail, trigger: 'blur' },
          ],
          mobile: [
            { validator:validateNumber, trigger: 'blur' },
          ]
        }
      }
    },
    methods: {
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
            this.$http.post('api/open/user/regUser',this.ruleForm,{transformRequest: [ data => {
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
                    duration:'5000'
                })
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
            if(res.data.code === '1111'){
                this.$message({
                   message: res.data.message,
                    type: 'error',
                    duration:'5000'
                })
            }
            else{
                if(res.data) {
                    this.ruleForm = res.data.result
                    this.ruleForm.userID = res.data.result.user_id
                    this.ruleForm.username = res.data.result.user_nm
                }
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
  .info-layout{
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
  .info-form {
      margin:0;
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

