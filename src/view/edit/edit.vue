<template>
  <div class="container edit-wrapper" v-if="isShow">
    <div class="main-title">{{$t('m.music')}}</div>
    <el-row class="list-tit" type="flex" justify="end">
      <el-col :span="22">
        <el-button type="text" icon="icon-img">URL</el-button>
      </el-col>
    </el-row>
    <el-row class="edit-list" v-for="(item,index) in editList" :key="index"  type="flex" justify="end">
      <el-col :span="2"><div class="grid-content"><div class="edit-list-label">NO.{{index+1}}</div></div></el-col>
      <el-col :span="20">
        <div class="grid-content">
          <el-input :placeholder="$t('m.videoUrl')" v-model="item.video_path" class="input-with-select" style="width:100%">
            <template slot="prepend">https://</template>
            <el-button slot="append" icon="icon-clearm" @click="clearCurrent(item)"></el-button>
          </el-input>
        </div>
      </el-col>
      <el-col :span="2"><el-button @click="update($event,index)">保存</el-button></el-col>
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
      isShow: true
    }
  },
  methods: {
    getData () {
      this.$http.get(this.baseUrl + 'open/hp/banner').then(res => {
        if (res.status === 200) {
          let data = res.data.result
          for (var i = 0; i < data.length; i++) {
            data[i].video_path = data[i].video_path.replace('https://','')
            this.$set(this.editList, i, data[i])
          }
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    clearCurrent (item) {
      item.video_path = ''
    },
    update (e, i) {
      // var fd = new FormData()
      // fd.append('id', i + 1)
      // fd.append('url', this.editList[i].video_path)
      var token = sessionStorage.getItem('token')
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': token
        }
      }
      this.$http.post(this.baseUrl + 'api/file/banner', {id: i + 1, url: this.editList[i].video_path}, config).then(res => {
        if (res.status === 200) {
          if (res.data.code === '0000') {
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
    font-family: Segoe UI;
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
    right: 0;
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
