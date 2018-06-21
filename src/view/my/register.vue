<template>
  <div class="register-layout">
    <div class="title">CREATE YOUR ACCOUNT</div>
    <div class="register-form">
      <div class="logo"></div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="Username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="ruleForm.password" placeholder="Password" ></el-input>
        </el-form-item>
        <el-form-item prop="confirmpwd">
          <el-input type="password" v-model="ruleForm.confirmpwd" placeholder="Confirm Password"></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="ruleForm.email" placeholder="Email"></el-input>
        </el-form-item>
        <el-form-item prop="contact">
          <el-input v-model="ruleForm.contact" placeholder="Contact"></el-input>
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
    name:"register",
    data () {
      var validateNumber = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            debugger
            callback(new Error('请输入数字值'));
          }
        },1000)
      }
      var validatePass = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.confirmpwd !== '') {
            this.$refs.ruleForm.validateField('confirmpwd');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }
      return {
        ruleForm: {
          username:"",
          password:"",
          confirmpwd:"",
          email:"",
          contact:"",
          company:"",
          address:"",
        },
        rules: {
          username: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          password: [
            { validator:validatePass, message: '请输入密码', trigger: 'blur' },
          ],
          confirmpwd: [
            { validator:validatePass2, trigger: 'blur' },
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
          ],
          contact: [
            { validator:validateNumber, trigger: 'blur' },
          ],
          company: [
            { required: false, message: '', trigger: 'blur' },
          ],
          address: [
            { required: false, message: '', trigger: 'blur' },
          ]
        },

      }
    },
    methods: {
      register(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('api/register',this.ruleForm,{transformRequest: [ data => {
              data = this.qs.stringify(data);
              return data;
            }]},{
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }).then(res=>{
              if(res.status === 200) {
                if(res.data.code === '0000') {
                  this.$router.go(-1)
                }
                else if(res.data.code === 'LG1111'){
                  alert(''+res.data.message)
                }
              }
            })
          } else {
            return false;
          }
        });
      },
      getUserInfo(uid){
        this.$http.get('api/open/hp/banner').then(res=>{
          if(res.status === 200) {
            let data = res.data.result
            let posters = data.map(item => item.img_path)
            let videos = data.map(item => item.video_path)
            this.videoSource = videos
            //this.videoPoster = posters
            console.log(posters)
            console.log(videos)
          }
        })
      }
    }
  }
</script>
<style lang="less">
  .register-layout{
    width:1098px;
    margin:auto;
    height: 100%;
    background-color: white;
    margin-top: 20px;
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
    /*width: 380px;*/
    /*height: 400px;*/
    /*margin: 0 auto;*/
    /*top: 110px;*/
    /*line-height: 400px;*/
    /*position: relative;*/
    /*background: #FFFFFF;*/
    /*border-radius: 5px;*/
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

