<template>
  <div>
    <el-dialog
      class="form-dialog"
      title="LICENCE INQUIRY"
      :visible.sync="dialogVisible"
      width="33%">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
        <el-form-item label="name" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="Company" prop="region">
          <el-input v-model="ruleForm.company"></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="Telephone number">
          <el-input v-model="ruleForm.tele"></el-input>
        </el-form-item>
        <el-form-item label="Song title" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item prop="albumname">
          <span slot="label">
            <el-tooltip class="item" effect="dark" content="State the name of the production, product or brand (typically the title of a film, the name of a TV show, or the brand that is being advertised)" placement="bottom">
              <span>Production name <i class="icon-tips"></i></span>
            </el-tooltip>
          </span>
          <el-input v-model="ruleForm.albumname"></el-input>
        </el-form-item>
        <el-form-item label="Media Type" prop="type">
          <el-select v-model="ruleForm.type" placeholder="请选择" width="100%">
            <el-option
              v-for="item in mediaOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="term">
          <span slot="label">
            <el-tooltip class="item" effect="dark" content="State how long you would like to license the song for your project (e.g. 3 months, 6 months, 1 year, etc.) " placement="bottom">
              <span>Term <i class="icon-tips"></i></span>
            </el-tooltip>
          </span>
          <el-input v-model="ruleForm.term"></el-input>
        </el-form-item>
        <el-form-item label="Territory" prop="territory">
          <el-input v-model="ruleForm.territory"></el-input>
        </el-form-item>
        <el-form-item label="Additional info">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="ruleForm.textarea">
          </el-input>

        </el-form-item>
        <el-form-item>
          <el-button class="color-submit" type="primary" @click="submitForm('ruleForm')">SUBMIT</el-button>
          <el-button @click="dialogVisible = false">CANCEL</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['showdialog', 'ruleForm'],
  data () {
    return {
      dialogVisible: false,
      mediaOptions: [
        {
          value: 'Advertisements',
          label: 'Advertisements'
        },
        {
          value: 'Corporate',
          label: 'Corporate'
        },
        {
          value: 'Film',
          label: 'Film'
        },
        {
          value: 'Games',
          label: 'Games'
        },
        {
          value: 'Merchandise',
          label: 'Merchandise'
        },
        {
          value: 'Online',
          label: 'Online'
        },
        {
          value: 'Print',
          label: 'Print'
        },
        {
          value: 'Radio',
          label: 'Radio'
        },
        {
          value: 'Trailer',
          label: 'Trailer'
        },
        {
          value: 'TV',
          label: 'TV'
        },
        {
          value: 'TV Promo',
          label: 'TV Promo'
        },
        {
          value: 'Other',
          label: 'Other'
        },
        {
          value: '',
          label: ''
        }

      ],
      rules: {
        username: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
        ],
        title: [
          { required: true, message: '请填写歌曲名称', trigger: 'blur' },
        ],
        albumname: [
          { required: true, message: '不能为空', trigger: 'blur' },
        ],
        type: [
          { required: true, message: '请选择', trigger: 'blur' },
        ],
        term: [
          { required: true, message: '不能为空', trigger: 'blur' },
        ],
        territory: [
          { required: true, message: '不能为空', trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
    submitForm (ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          let params = {
            email: this.ruleForm.email,
            username: this.ruleForm.username,
            mobile: this.ruleForm.tele,
            company: this.ruleForm.company,
            metaID: this.ruleForm.type,
            albumNM: this.ruleForm.albumname,
            trackNM: this.ruleForm.title,
            term: this.ruleForm.term,
            territory: this.ruleForm.territory,
            additional_info: this.ruleForm.textarea
          }
          this.$http.get(this.baseUrl + 'open/meta/cr', params).then(res => {
            if (res.status === 200) {
              this.listData = res.data.result
              this.dialogVisible = false
            }
          })
        } else {
          console.log('error submit!!')
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
