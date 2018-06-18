<template>
  <div>
    <el-dialog
      class="form-dialog"
      title="LICENCE INQUIRY"
      :visible.sync="dialogVisible"
      width="46%">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="208px" class="demo-ruleForm">
        <el-form-item label="name" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
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
        <el-form-item label="Song title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="Song Writer / Artist">
          <el-input v-model="ruleForm.artist"></el-input>
        </el-form-item>
        <el-form-item>
          <div slot="label">
            <el-tooltip class="item" effect="dark" content="Bottom Center 提示文字" placement="bottom">
              <span>Production name</span>
            </el-tooltip>
          </div>
          <el-input v-model="ruleForm.production"></el-input>
        </el-form-item>
        <el-form-item label="Media Type">
          <el-select v-model="ruleForm.type" placeholder="请选择" width="100%">
            <el-option
              v-for="item in mediaOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Territory">
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
          <el-button type="primary" @click="submitForm('ruleForm')">SUBMIT</el-button>
          <el-button @click="resetForm('ruleForm')">CANCEL</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <select class="form-control ng-pristine ng-invalid ng-invalid-required ng-touched" id="media-type" ng-model="enquiry.mediaType" required="required" aria-required="true" aria-invalid="true" style="">
      <option value="">Select a value</option>
      <option value="ADS">Advertisements</option>
      <option value="CORPORATE">Corporate</option>
      <option value="FILM">Film</option>
      <option value="GAMES">Games</option>
      <option value="MERCHANDISE">Merchandise</option>
      <option value="ONLINE">Online</option>
      <option value="PRINT">Print</option>
      <option value="RADIO">Radio</option>
      <option value="TRAILER">Trailer</option>
      <option value="TV">TV</option>
      <option value="TVPROMO">TV Promo</option>
      <option value="OTHER">Other</option>
    </select>
  </div>
</template>

<script>
export default {
  props: ['showdialog'],
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
      ruleForm: {},
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
        ],
        title: [
          { required: true, message: '请填写歌曲名称', trigger: 'blur' },
        ],
        artist: [
          { required: true, message: '请填写歌曲作者', trigger: 'blur' },
        ],
        title: [
          { required: true, message: '请填写歌曲名称', trigger: 'blur' },
        ],
        title: [
          { required: true, message: '请填写歌曲名称', trigger: 'blur' },
        ],
      }
    }
  },
  methods: {

  },
  computed: {
//    dialogVisible () {
//      return this.showdialog
//    }
  }
}
</script>
<style lang="less">
  .form-dialog .el-dialog{
    background: #F3F9FC;
    border-radius: 4px;
    .el-select{
      width: 100%;
    }
  }
</style>
