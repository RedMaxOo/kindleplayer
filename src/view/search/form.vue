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
        <el-form-item label="Email" required>
          <el-input v-model="ruleForm.company"></el-input>
        </el-form-item>
        <el-form-item label="Telephone number" required>
          <el-input v-model="ruleForm.company"></el-input>
        </el-form-item>
        <el-form-item label="Song title" required>
          <el-input v-model="ruleForm.company"></el-input>
        </el-form-item>
        <el-form-item label="Song Writer / Artist" required>
          <el-input v-model="ruleForm.company"></el-input>
        </el-form-item>
        <el-form-item label="Rroduction name" required>
          <el-input v-model="ruleForm.company"></el-input>
        </el-form-item>
        <el-form-item label="Media Type" required>
          <el-input v-model="ruleForm.company"></el-input>
        </el-form-item>
        <el-form-item label="Territory" required>
          <el-input v-model="ruleForm.company"></el-input>
        </el-form-item>
        <el-form-item label="Additional info" required>
          <el-input v-model="ruleForm.company"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">SUBMIT</el-button>
          <el-button @click="resetForm('ruleForm')">CANCEL</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ['dialogVisible'],
  data () {
    return {
      ruleForm: {},
      rules: {}
    }
  },
  methods: {

  }
}
</script>
<style lang="less">
  .form-dialog .el-dialog{
    background: #F3F9FC;
    border-radius: 4px;
  }
</style>
