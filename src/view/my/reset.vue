<template>
  <div class="register-layout">
    <div class="title">RESET PASSWORD</div>
    <div class="register-form">
      <div class="logo"></div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm" :disabled="formDisabled">
        <el-form-item prop="pwd1">
          <el-tooltip class="item" effect="dark" content="密码由6-12位数字和字母组成" placement="right">
            <el-input type="password" v-model="ruleForm.pwd1" placeholder="Password" ></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item prop="pwd2">
          <el-tooltip class="item" effect="dark" content="密码由6-12位数字和字母组成" placement="right">
            <el-input type="password" v-model="ruleForm.pwd2" placeholder="Confirm Password"></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item>
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
          pw1: '',
          pw2: '',
          code: ''
        },
        rules: {
          pwd1: [
            { required: true, message: '请输入旧密码', trigger: 'blur' }
          ],
          pwd2: [
            { required: true, message: '请输入新密码', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submit (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params ={
              token : this.$route.query.t,
              pw1:this.ruleForm.pwd1,
              pw2:this.ruleForm.pwd2
            }
            this.$http.post(this.baseUrl + 'open/user/resetPW', params, {transformRequest: [ data => {
                data = this.qs.stringify(data);
                return data;
              }]},{
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }).then(res=>{
              if(res.status === 200) {
                if(res.status.result === 'Y'){
                  sessionStorage.clear()
                  this.$router.push({path:'/login'})
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

