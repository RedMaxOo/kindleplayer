<template>
  <div class="container edit-wrapper" v-if="isShow">
    <div class="main-title">{{$t('m.music')}}</div>
    <el-row class="list-tit" type="flex" justify="end">
      <el-col :span="11">
        <el-button type="text" icon="icon-img">URL</el-button>
      </el-col>
      <el-col :span="11">
        <el-button type="text" icon="icon-url">IMAGES</el-button>
      </el-col>
    </el-row>
    <el-row class="edit-list" v-for="(item,index) in editList" :key="index"  type="flex" justify="end">
      <el-col :span="2"><div class="grid-content"><div class="edit-list-label">NO.{{index+1}}</div></div></el-col>
      <el-col :span="11">
        <div class="grid-content">
          <el-input :placeholder="$t('m.videoUrl')" v-model="item.video_path" class="input-with-select" style="width:100%">
            <template slot="prepend">https://</template>
            <el-button slot="append" icon="icon-clearm" @click="clearCurrent(item)"></el-button>
          </el-input>
        </div>
      </el-col>
      <el-col :span="11">
        <div class="grid-content upload">
          <div class="input-with-select el-input el-input-group el-input-group--append">
            <!--<input autocomplete="off" placeholder="请输入内容" disable="true" v-model="item.img_path" class="el-input__inner">-->
            <el-input
              :placeholder="$t('m.imgUrl')"
              v-model="item.img_path" class="none-apr"
              :disabled="true">
            </el-input>
            <div class="el-input-group__append">
              <button type="button" class="el-button el-button--default">
                <i class="icon-uploadm"><input type="file" @change="update($event,index)"></i>
                <span class="shade" v-if="!item.video_path" @click="valitete(index)"></span>
              </button>
            </div>
          </div>
          <el-button v-if="index > 4" class="clear-btn" @click="deletList(index)" icon="el-icon-close"></el-button>
        </div>
      </el-col>
    </el-row>
    <!--添加 提交-->
    <el-row class="edit-list" type="flex" justify="end">
      <el-col :span="3" style="text-indent: -999px">j</el-col>
      <el-col :span="16">
        <el-button class="editBtn addbtn" icon="icon-add" @click="addList"></el-button>
      </el-col>
      <!--<el-col :span="11">
        <el-button class="editBtn submit" type="primiry" @click="submitUpload">SUBMIT</el-button>
      </el-col>-->
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
          img_path: '',
          video_path: ''
        },
        {
          img_path: '',
          video_path: ''
        },
        {
          img_path: '',
          video_path: ''
        },
        {
          img_path: '',
          video_path: ''
        },
        {
          img_path: '',
          video_path: ''
        }
      ],
      fileList: [],
      isShow:true
    }
  },
  methods: {
    getData () {
      this.$http.get(this.baseUrl + 'open/hp/banner').then(res => {
        if (res.status === 200) {
          let data = res.data.result
          // if (data.length >= 5) {
          //   this.editList = data.map(item=>{item.video_path = item.video_path.replace('https://','')})
          // } else {
            for (var i = 0; i < data.length; i++) {
              data[i].video_path =  data[i].video_path.replace('https://','')
              this.$set(this.editList,i,data[i])
            }
          // }

        }
      }).catch((err) => {
        console.log(err)
      })
    },
    addList () {
      if (this.editList.length <= 8) {
        this.editList.push(
          {
            img_path: '',
            video_path: ''
          }
        )
      } else {
        this.$message({
          message: '最多只可以添加8个数据',
          type: 'warning'
        })
      }
    },
    clearCurrent (item) {
      item.video_path = ''
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
    valitete (i) {
      if (!this.editList[i].video_path) {
        this.$message({
          message: '请先填写当前url地址，再上传图片',
          type: 'warning',
          duration: 1500
        })
        return
      }
    },
    update (e, i) {
      this.$set(this.editList[i], 'img', e.target.files[0].name)
      var fd = new FormData()
      fd.append('file', e.target.files[0])
      fd.append('id', i + 1)
      fd.append('url', this.editList[i].video_path)
      var token = sessionStorage.getItem('token')
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': token
        }
      }
      this.$http.post(this.baseUrl + 'api/file/banner', fd, config).then(res => {
        if (res.status === 200) {
          if(res.data.code === '0000'){
          // this.editList = res.data.result
            this.$message({
              message: '上传成功',
              type: 'success'
            })
          }
          else{
            this.$message({
              message: res.data.message,
              type: 'error',
              duration:0,
              showClose:true
            })
          }
        }
      })

    },
    handleChange (file, fileList) {
      // console.log(file, fileList)
    },
    handleRemove (file, fileList) {
      // console.log(file, fileList)
    },
    handlePreview (file) {
      // console.log(file)
    },
    handleExceed (files, fileList) {
      // this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      // return this.$confirm(`确定移除${file.name}？`)
    }
  },
  mounted () {
    var username = sessionStorage.getItem('username')
    if(username){
      var isAdmin = sessionStorage.getItem('admin')
      if(isAdmin){
        this.getData();
      }
      else{
        this.isShow=false
         this.$message({
          message: '您没有维护权限，请联系管理员',
          type: 'error',
          duration:0,
          showClose:true
        })
      }
    }
    else{
      this.$router.push({path:'/login'})
    }
  }
}
</script>
<style lang="less">
.el-input-group__prepend{
    background-color: #f5f7fa !important;
    color: #909399 !important;
    vertical-align: middle !important;
    display: table-cell !important;
    position: relative !important;
    border: 1px solid #dcdfe6 !important;
    border-radius: 4px !important;
    width: 1px !important;
    white-space: nowrap !important;
    right:0 !important;
    padding:5px !important;
}
.el-input-group--prepend .el-input-group__prepend{
    border-right: 0 !important;
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
}
.el-input-group--prepend .el-input__inner, .el-input-group__append {
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
}
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
    padding: 0 52px 0 80px;
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
    padding: 0 52px 0 110px;
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
      padding-right:70px;
      border-radius: 4px;
      outline: none;
      width: 100%;
      border: 1px solid #dcdfe6;
    }
    .none-apr{
      .inner{
        width: 100%;
        padding: 0;
        background: none;
        outline: none;
        border: none;
      }

    }
    .upload{
      input{
        background: #F7F7F7;
      }
      .icon-uploadm{
        input{
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          padding: 0;
          cursor:pointer;
        }
      }
      .shade{
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
      }
    }
    .el-input-group__append{
      background: #fff;
      right: 57px;
      border: 1px solid #dcdfe6;
      position: relative;
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
  .icon-uploadm{
    input{
      width: 100%;
      opacity: 0;
    }
  }
  .clear-btn {
    position: absolute;
    right: 49px;
    top: 0;
    &.el-button{
      border: 0;
      font-size: 20px;
      &:hover{
        background: transparent;
      }
    }
  }
</style>
