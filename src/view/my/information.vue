<template>
  <div class="info-layout">
    <div class="title">{{$t('m.infotit')}}</div>
    <div class="info-form">
      <div class="logo"></div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm" label-width="380px">
        <el-form-item prop="userID" :label="$t('m.username')">
            <el-input v-model="ruleForm.userID" :placeholder="$t('m.username')" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item prop="email" :label="$t('m.mail')">
          <el-input v-model="ruleForm.email" :placeholder="$t('m.mail')" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item prop="username" :label="$t('m.name')">
          <!-- <el-tooltip class="item" effect="dark" :content="$t('m.errortips.nametips')" placement="right"> -->
            <el-input v-model="ruleForm.username" :placeholder="$t('m.name')"></el-input>
          <!-- </el-tooltip> -->
        </el-form-item>
        <el-form-item prop="mobile" :label="$t('m.mobile')">
          <el-input v-model="ruleForm.mobile" :placeholder="$t('m.mobile')" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item prop="company" :label="$t('m.company')">
          <el-input v-model="ruleForm.company" :placeholder="$t('m.company')"></el-input>
        </el-form-item>
        <el-form-item prop="address" :label="$t('m.address')">
          <el-input v-model="ruleForm.address" :placeholder="$t('m.address')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="button" @click="register('ruleForm')">{{$t('m.save')}}</el-button>
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
          return callback(new Error(this.$t('m.errortips.mobile')))
        }else  if (!this.isvalidPhone(value)){
          callback(new Error(this.$t('m.errortips.mobiletips')))
        }
        else {
          callback()
        }
      }
      var validatePass = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$t('m.errortips.password')));
        }
        else {
          if (this.ruleForm.pwd2 !== '') {
            this.$refs.ruleForm.validateField('pwd2')
          }
          else if(!isvalidPwd(value)){
            callback(new Error(this.$t('m.errortips.passwordtips')));
          }
          else{
            callback()
            }
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$t('m.errortips.passwordtips')));
        }else if(!isvalidPwd(value)){
            callback(new Error(this.$t('m.errortips.passwordtips')));
          }
         else if (value !== this.ruleForm.pwd1) {
          callback(new Error(this.$t('m.errortips.pwdconfirm')))
        } else {
          callback();
        }
      }
      var validateEmail = (rule, value, callback) => {
        if (!value) {
          return callback(new Error(this.$t('m.errortips.mail')))
        }else  if (!this.isvalidEmail(value)){
          callback(new Error(this.$t('m.errortips.mailtips')))
        }
        else {
          callback()
        }
      }
      var validateUserName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error(this.$t('m.errortips.name')))
        } else if(value.length > 32){
          callback(new Error(this.$t('m.errortips.namemore')))
        }
        else {
          callback()
        }
      }
      var validateCompany = (rule, value, callback) => {
        if(value.length > 100){
          callback(new Error(this.$t('m.errortips.comtips')))
        }
        else{
          callback()
        }
      }
      var validateAddress = (rule, value, callback) => {
        if(value.length > 255){
          callback(new Error(this.$t('m.errortips.addresstips')))
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
                let  message = this.$t('m.errortips.changeinfo')
                this.$message({
                      message: message,
                      type: 'success'
                  })
              }
              else{
                this.$message({
                   message: res.data.message,
                    type: 'error',
                    duration:1500,
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
                    duration:1500,
                    showClose:true
                })
                sessionStorage.clear()
                this.$router.push({path:'/login'})
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
      var username = sessionStorage.getItem('username')
      if(username){
        this.getUserInfo()
      }
      else{
        this.$router.push({path:'/login'})
      }
    }
  }
</script>
<style lang="less">
  .info-layout{
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
      font-family: Avenir-Heavy;
      font-size: 30px;
      color: #FFFFFF;
      text-shadow: 0 2px 4px rgba(108,108,108,0.50);
    }
  }
  .info-form {
      margin-top:10px;
    .el-form-item{
      margin-bottom:18px;
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

