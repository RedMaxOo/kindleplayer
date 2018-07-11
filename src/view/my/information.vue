<template>
  <div class="info-layout">
    <div class="title">PERSONAL INFORMATION</div>
    <div class="info-form">
      <div class="logo"></div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm" label-width="380px">
        <el-form-item prop="userID" label="用户名">
          <el-tooltip class="item" effect="dark" content="UserID由数字和字母组成" placement="right">
            <el-input v-model="ruleForm.userID" placeholder="UserName" :disabled="true"></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="ruleForm.email" placeholder="Email" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item prop="username" label="姓名">
          <el-tooltip class="item" effect="dark" content="Username不能超过32个字" placement="right">
            <el-input v-model="ruleForm.username" placeholder="Name"></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item prop="mobile" label="手机号">
          <el-input v-model="ruleForm.mobile" placeholder="Mobile" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item prop="company" label="公司">
          <el-input v-model="ruleForm.company" placeholder="Company"></el-input>
        </el-form-item>
        <el-form-item prop="address" label="地址">
          <el-input v-model="ruleForm.address" placeholder="Address"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="button" @click="register('ruleForm')">Save</el-button>
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
          else if(!isvalidPwd(value)){
            callback(new Error('密码必须由6-12位数字和字母组成'));
          }
          else{
            callback()
            }
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请确认密码'));
        }else if(!isvalidPwd(value)){
            callback(new Error('密码必须由6-12位数字和字母组成'));
          }
         else if (value !== this.ruleForm.pwd1) {
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
          email:"",
          mobile:"",
          company:"",
          address:"",
        },
        rules: {
          userID: [
            // { validator:validateUser,  trigger: 'blur' },
          ],
          username: [
            { required: true, validator:validateUserName,  trigger: 'blur' },
          ],
          pwd1: [
            // { validator:validatePass, trigger: 'blur' },
          ],
          pwd2: [
            // { validator:validatePass2, trigger: 'blur' },
          ],
          email: [
            // { validator: validateEmail, trigger: 'blur' },
          ],
          mobile: [
            // { validator:validateNumber, trigger: 'blur' },
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
        const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]/
        return reg.test(str)
      },
       isvalidPwd(str){
        const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/
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
            var token = sessionStorage.getItem('token')
            var config = {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': token
              }
            }
            var fd = new FormData()
            fd.append('username', this.ruleForm.username)
            fd.append('company', this.ruleForm.company)
            fd.append('address', this.ruleForm.address)
            this.$http.post(this.baseUrl + 'api/user/change',fd,config).then(res=>{
              if(res.status === 200 && res.data.result === 'Y') {
                this.$message({
                      message: "信息已修改完成!",
                      type: 'success'
                  })  
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
            return false;
          }
        });
      },
      getUserInfo(){
        var token = sessionStorage.getItem('token')
        this.$http.get(this.baseUrl + 'api/user/getUser',{headers: {
          'Authorization': token
        }}).then(res=>{
          if(res.status === 200) {
            if(res.data.code === '1111'){
                this.$message({
                   message: res.data.message,
                    type: 'error',
                    duration:0,
                  showClose:true
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

