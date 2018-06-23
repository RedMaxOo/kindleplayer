<template>
  <div class="container edit-wrapper">
    <div class="main-title">BANNER MANAGEMENT</div>
    <el-row class="list-tit" type="flex" justify="end">
      <el-col :span="10">
        <el-button type="text" icon="icon-img">IMAGES</el-button>
      </el-col>
      <el-col :span="10">
        <el-button type="text" icon="icon-url">URL</el-button>
      </el-col>
    </el-row>
    <el-row class="edit-list" v-for="(item,index) in editList" :key="index"  type="flex" justify="end">
      <el-col :span="4"><div class="grid-content"><div class="edit-list-label">NO.{{index+1}}</div></div></el-col>
      <el-col :span="10">
        <div class="grid-content upload">
          <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
            <el-upload
              slot="append"
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList">
              <el-button  icon="icon-uploadm"></el-button>
            </el-upload>
          </el-input>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="grid-content">
          <el-input placeholder="请输入内容" v-model="input5" class="input-with-select" style="width:100%">
            <el-button slot="append" icon="icon-clearm" @click="deletList(index)"></el-button>
          </el-input>
        </div>
      </el-col>
    </el-row>
    <!--添加 提交-->
    <el-row class="edit-list" type="flex" justify="end">
      <el-col :span="4" style="text-indent: -999px">j</el-col>
      <el-col :span="10">
        <el-button class="editBtn addbtn" icon="icon-add" @click="addList"></el-button>
      </el-col>
      <el-col :span="10">
        <el-button class="editBtn submit" type="primiry">SUBMIT</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      input5: '',
      editList: [
        {
          img: '3',
          url: ''
        },
        {
          img: '4',
          url: ''
        },
        {
          img: '5',
          url: ''
        },
        {
          img: '6',
          url: ''
        },
        {
          img: '7',
          url: ''
        }
      ],
      fileList: []
    }
  },
  methods: {
    addList () {
      if (this.editList.length <= 8){
        this.editList.push(
          {
            img: '',
            url: ''
          }
        )
      } else {
        this.$message({
          message: '最多只可以添加8个数据',
          type: 'warning'
        })
      }
    },
    deletList (val) {
      if (this.editList.length > 5) {
        this.editList.splice(val, 1)
      } else {
        this.$message({
          message: '必须添加5个数据',
          type: 'warning'
        })
      }
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除${file.name}？`)
    }
  }
}
</script>
<style lang="less">
  .edit-wrapper{
    background: #fff;
    margin-bottom: 60px;
    .editBtn{
      width: 353px;
      padding: 0;
      line-height: 40px;
    }
  }
  .main-title{
    margin-bottom: 28px;
    line-height: 80px;
    opacity: 0.6;
    background-image: linear-gradient(134deg, #4634A9 0%, #F63669 100%);
    color: #fff;
    font-family: Avenir-Heavy;
    font-size: 30px;
    color: #FFFFFF;
    text-shadow: 0 2px 4px rgba(108,108,108,0.50);
    text-align: center;
  }
  .list-tit{
    padding: 0 20px 0 60px;
    text-align: center;
    .el-col{
      padding-right: 80px;
    }
    .el-button--text{
      font-size: 20px;
      color: #666666;
      span{
        padding-left: 10px;
      }
    }
  }
  .edit-list{
    margin-bottom: 30px;
    padding: 0 20px 0 90px;
    line-height: 40px;
    .edit-list-label{
      width: 60px;
      display: inline-block;
      background: #F7F7F7;
      border: 1px solid #DDE3E8;
      border-radius: 4px;
      font-size: 16px;
      color: #666666;
      text-align: center;
    }
    input,.el-input-group--append .el-input__inner{
      padding-right: 0;
      border-radius: 4px;
    }
    .upload{
      input{
        background: #F7F7F7;
      }
    }
    .el-input-group__append{
      background: #fff;
      right: 57px;
      border: 1px solid #dcdfe6;
      button{
        padding: 0 16px;
      }
    }
    .addbtn{
      border: 1px dashed #DDE3E8;
      border-radius: 4px;
    }
    .submit{
      font-size: 18px;
      color: #FFFFFF;
      background-image: linear-gradient(45deg, #4634A9 0%, #F63669 100%);
      border-radius: 4px;
    }
  }
</style>
