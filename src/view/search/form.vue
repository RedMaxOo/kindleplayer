<template>
  <div>
    <el-dialog
      class="form-dialog"
      :title="$t('m.licencetit')"
      :visible.sync="dialogVisible"
      width="33%"
      :before-close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
        <el-form-item :label="$t('m.name')" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item :label="$t('m.company')" prop="region">
          <el-input v-model="ruleForm.company"></el-input>
        </el-form-item>
        <el-form-item :label="$t('m.mail')" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item :label="$t('m.mobile')" prop="tele">
          <el-input v-model="ruleForm.tele"></el-input>
        </el-form-item>
        <el-form-item :label="$t('m.songtitle')" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item prop="albumname">
          <span slot="label">
            <el-tooltip class="item" effect="dark" :content="$t('m.albumtips')" placement="bottom">
              <span>{{$t('m.albumname')}}<i class="icon-tips"></i></span>
            </el-tooltip>
          </span>
          <el-input v-model="ruleForm.albumname"></el-input>
        </el-form-item>
        <el-form-item prop="prodname" :label="$t('m.prodname')">
          <el-input v-model="ruleForm.prodname"></el-input>
        </el-form-item>
        <el-form-item :label="$t('m.mediatype')" prop="type">
          <el-select v-model="ruleForm.type" placeholder="请选择" width="100%">
            <el-option
              v-for="item in $t('m.mediaOptions')"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="term">
          <span slot="label">
            <el-tooltip class="item" effect="dark" :content="$t('m.termtips')" placement="bottom">
              <span>{{$t('m.term')}} <i class="icon-tips"></i></span>
            </el-tooltip>
          </span>
          <el-input v-model="ruleForm.term"></el-input>
        </el-form-item>
        <el-form-item :label="$t('m.territory')" prop="territory">
          <el-input v-model="ruleForm.territory"></el-input>
        </el-form-item>
        <el-form-item :label="$t('m.additional')">
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
        } else {
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
      dialogVisible: false,
      mediaOptions: {},
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
          { required: true, message: this.$t('m.errortips.songname'), trigger: 'blur' },
        ],
        albumname: [
          { required: true, message: this.$t('m.errortips.albumname'), trigger: 'blur' },
        ],
        prodname: [
          { required: true, message: this.$t('m.errortips.proname'), trigger: 'blur' },
        ],
        type: [
          { required: true, message: this.$t('m.errortips.select'), trigger: 'change' },
        ],
        term: [
          { required: true, message: this.$t('m.errortips.term'), trigger: 'blur' },
        ],
        territory: [
          { required: true, message: this.$t('m.errortips.territory'), trigger: 'blur' },
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
      this.dialogVisible = false
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
            email: this.ruleForm.email,
            username: this.ruleForm.username,
            mobile: this.ruleForm.tele,
            company: this.ruleForm.company,
            mediaType: this.ruleForm.type,
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
              this.dialogVisible = false
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
    .el-form-item__label{
      padding: 0 30px 0;
    }
  }
  .form-dialog .el-dialog{
    background: #F3F9FC;
    min-width:500px;
    padding:20px 20px 30px;
    border-radius: 4px;
    margin-top:5px !important;
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
    padding:10px 0px;
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
    border: 0;
    &:hover,&:active{
      background-image: linear-gradient(45deg, #4634A9 0%, #F63669 100%);
    }
  }
  .el-tooltip__popper{
    width: 200px;
  }

</style>
