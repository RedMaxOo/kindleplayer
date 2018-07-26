<template>
  <div>
    <el-dialog
      class="form-dialog"
      :title="$t('navmenu5')"
      :visible.sync="contactVisible"
      width="33%">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm1" label-width="150px" class="demo-ruleForm">
        <el-form-item :label="$t('m.name')" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item :label="$t('m.company')" prop="region">
          <el-input v-model="ruleForm.company"></el-input>
        </el-form-item>
        <el-form-item :label="$t('m.mail')" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item :label="$t('m.additional')">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="ruleForm.textarea">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="color-submit" type="primary" @click="submitForm('ruleForm')">{{$t('m.submint')}}</el-button>
          <el-button @click="contactVisible = false">{{$t('m.cancel')}}</el-button>
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
          return callback(new Error('请输入手机号'))
        }else  if (!this.isvalidPhone(value)){
          callback(new Error('请输入有效手机号'))
        }
        else {
          callback()
        }
    }
    var validateUserName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入姓名'))
        } else if (!this.isvalidUser(value)){
          callback(new Error('需字母和数字组合'))
        }else if(value.length > 32){
          callback(new Error('姓名过长'))
        }
        else {
          callback()
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
    return {
      contactVisible: false,
      rules: {
        username: [
          { required: true, validator:validateUserName,  trigger: 'blur' },
        ],
        email: [
            { required: true, validator: validateEmail, trigger: 'blur' },
        ],
        tele: [
            { required: true, validator:validateNumber, trigger: 'blur' },
          ],
        title: [
          { required: true, message: '请填写歌曲名称', trigger: 'blur' },
        ],
        albumname: [
          { required: true, message: '请填写专辑名称', trigger: 'blur' },
        ],
        prodname: [
          { required: true, message: '请填写作品名称', trigger: 'blur' },
        ],
        type: [
          { required: true, message: '请选择', trigger: 'change' },
        ],
        term: [
          { required: true, message: '请填写授权期限', trigger: 'blur' },
        ],
        territory: [
          { required: true, message: '请填写授权地区', trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
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
      this.$refs[ruleForm1].validate((valid) => {
        if (valid) {
          let params = {
            email: this.ruleForm.email,
            username: this.ruleForm.username,
            mobile: this.ruleForm.tele,
            company: this.ruleForm.company,
            metaID: this.ruleForm.type,
            albumNM: this.ruleForm.albumname,
            prodNM: this.ruleForm.prodname,
            trackNM: this.ruleForm.title,
            term: this.ruleForm.term,
            territory: this.ruleForm.territory,
            additional_info: this.ruleForm.textarea
          }
          this.$http.post(this.baseUrl + 'open/meta/cr', params,{transformRequest: [ data => {
              data = this.qs.stringify(data);
              return data;
            }]},{
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }).then(res => {
            if (res.status === 200) {
              this.listData = res.data.result
              this.$message({
                message: '申请成功！',
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
  .form-dialog{
    background-image: linear-gradient(45deg, rgba(70,52,169,.4) 0%, rgba(246,54,105,.4) 100%);
  }
  .form-dialog .el-dialog{
    background: #F3F9FC;
    min-width:500px;
    padding:0 30px;
    border-radius: 4px;
    margin-top:0px !important;
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
