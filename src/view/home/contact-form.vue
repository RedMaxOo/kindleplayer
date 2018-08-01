<template>
  <div>
    <el-dialog
      class="contact-form-dialog"
      :title="$t('m.navmenu5')"
      :visible.sync="contactVisible"
      width="33%" 
      :before-close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
        <el-form-item :label="$t('m.name')" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
         <el-form-item :label="$t('m.mail')" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item :label="$t('m.company')" prop="company">
          <el-input v-model="ruleForm.company"></el-input>
        </el-form-item>       
        <el-form-item :label="$t('m.content')" prop="textarea">
          <el-input
            type="textarea"
            :rows="2"
            v-model="ruleForm.textarea">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="color-submit" type="primary" @click="submitForm('ruleForm')">{{$t('m.submint')}}</el-button>
          <el-button @click="close">{{$t('m.cancel')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ['showdialog', 'ruleForm'],
  data () {
    var validateNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$t('m.errortips.mobile')))
      }else  if (!this.isvalidPhone(value)) {
        callback(new Error(this.$t('m.errortips.mobiletips')))
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
    return {
      contactVisible: false,
      rules: {
        username: [
          { required: true, validator:validateUserName,  trigger: 'blur' },
        ],
        email: [
            { required: true, validator: validateEmail, trigger: 'blur' },
        ],
        company: [
          { required: true, message: '请输入公司', trigger: 'blur' },
        ],
        textarea: [
          { required: true, message: '请填写内容', trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
    handleClose(done){
      done()
      this.$refs.ruleForm.resetFields()
    },
    close(){
       this.contactVisible = false
       this.$refs.ruleForm.resetFields()
    },
    isvalidUser(str){
        const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]/
        return reg.test(str)
    },
    isvalidEmail(str) {
        const reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$")
        return reg.test(str)
    },
    isvalidPhone(str) {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        return reg.test(str)
    },
    submitForm (ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          let params = {
            title: this.ruleForm.username+'+'+this.ruleForm.email+'+'+this.ruleForm.company,
            desc: this.ruleForm.textarea
          }
          this.$http.post(this.baseUrl + '/open/hp/mail', params,{transformRequest: [ data => {
              data = this.qs.stringify(data);
              return data;
            }]},{
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }).then(res => {
            if (res.status === 200) {
              this.$message({
                message: '发送成功！',
                type: 'success'
              })
              this.contactVisible = false
            }
          })
        } else {
          // console.log('error submit!!')
          return false
        }
      })
    }
  },
  mounted () {
  }
}
</script>
<style lang="less">
  .contact-form-dialog{
    background-image: linear-gradient(45deg, rgba(70,52,169,.4) 0%, rgba(246,54,105,.4) 100%);
  }
  .contact-form-dialog .el-dialog{
    background: #F3F9FC;
    min-width:500px;
    padding:0 30px;
    border-radius: 4px;
    margin-top:10% !important;
    .el-dialog__title{
      font-weight: bold;
      font-size: 20px;
      color: #5BB4DB;
    }
    .el-dialog__headerbtn .el-dialog__close{
      color: #5BB4DB;
      font-weight: bolder;
    }
    .el-select{
      width: 100%;
    }
    .el-dialog__body{
    padding:0px;
  }
  .el-dialog__header{
    padding:10px;
  }
  .el-dialog__headerbtn{
    top:10px;
  }
  .el-form-item{
    margin-bottom:18px;
  }
  }
  .color-submit.el-button--primary{
    background-image: linear-gradient(45deg, #4634A9 0%, #F63669 100%);
    border-radius: 4px;
    &:hover,&:active{
      background-image: linear-gradient(45deg, #4634A9 0%, #F63669 100%);
    }
  }
  .el-tooltip__popper{
    width: 200px;
  }

</style>
