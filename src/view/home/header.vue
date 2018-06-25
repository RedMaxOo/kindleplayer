<template>
  <div class="pagelayout">
    <div class="header">
        <div class="logo"></div>
        <ul class="top-bar">
          <li v-for="item in menus">
            <span v-if="item === 'LOGIN'">
              <el-dropdown v-if="isLogin">
                <span><i class="user"></i>
                  {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item><span @click="toInfo">Infomation</span></el-dropdown-item>
                  <el-dropdown-item><span @click="toBanner">Banner</span></el-dropdown-item>
                  <el-dropdown-item><span @click="logout">Logout</span></el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <span v-if="!isLogin" @click="jumpTo(item)">LOGIN</span>
            </span>
            <span v-if="item!=='LOGIN' && item!=='CONNECT'  && item!=='EN/CN'" @click="jumpTo(item)">{{item}}
            </span>
            <span v-if="item==='CONNECT'" @click="showConect">{{item}}
            </span>
            <span v-if="item==='EN/CN'" @click="changeLangEvent">{{item}}
            </span>
          </li>
        </ul>
      <!--<dialog-form ref="dialog"></dialog-form>-->
    </div>
    <el-dialog
      class="email-dialog"
      title="EMAIL"
      :visible.sync="emailDialog"
      width="42%"
    >
      <div class="center">
        <i class="icon-email"></i>
        <span>jeffry.christiansen@gmail.com</span>
        <a href="mailto:jeffry.christiansen@gmail.com"><i class="icon-send">ssss</i></a>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import DialogForm from '../search/form.vue'
export default {
  name: 'XHeader',
  components: {DialogForm},
  data(){
    return{
      menus:['LOGIN','HOME','COPYRIGHT','CONNECT','EN/CN'],
      isLogin:false,
      username:'',
      showForm:false,
      emailDialog:false
    }
  },
  methods:{
    showPower (item) {
      this.$refs.dialog.dialogVisible = true
    },
    jumpTo(type){
      switch (type){
        case 'LOGIN':
          this.$router.push({path:'/login'})
          break
        case 'HOME':
          this.$router.push({path:'/'})
          break
        case 'COPYRIGHT':
          this.$router.push({path:'/'})
          break;
        case 'CONNECT':
          break;
        case 'EN/CN':
          break;
      }
    },
    showConect () {
      this.emailDialog = true
    },
    toInfo(){
      this.$router.push({path:'/register'})
    },
    toBanner(){
      this.$router.push({path:'/banner-edit'})
    },
    logout(){
      sessionStorage.removeItem('username')
      sessionStorage.removeItem('token')
      window.location.reload()
    },
    changeLangEvent () {
      this.$confirm('确定切换语言吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if ( this.lang === 'zh-CN' ) {
          this.lang = 'en-US';
          this.$i18n.locale = this.lang;//关键语句
        }else {
          this.lang = 'zh-CN';
          this.$i18n.locale = this.lang;//关键语句
        }
      });
    }
  },
  mounted(){
    var user = sessionStorage.getItem('username')
    if(user){
      this.username = user
      this.isLogin = true
    }
  }
}
</script>

<style scoped lang="less">
  .pagelayout{
    background: #FFFFFF;
    box-shadow: 0 2px 5px 0 rgba(91,180,219,0.50);
  }
  .header{
    width:1098px;
    margin:auto;
    height:90px;
  }
  .logo{
    width:250px;
    height:90px;
    background: url('../../assets/img/logo.png') no-repeat 0 center;
    float: left;
  }
  .top-bar{
    height:90px;
    line-height: 90px;
    list-style: none;
    float: right;
  }
  .top-bar li{
    float: left;
    margin-left:30px;
    height: 70px;
    span{
      font-family: Avenir-Medium;
      font-size: 16px;
      color: #666666;
    }
    &:hover{
      color: #E172A7 !important;
      cursor: pointer;
     }
  }
  .user
  {
    display: inline-block;
    width:14px;
    height:14px;
    background: url("../../assets/icons/user.png") no-repeat center center;
    background-size: 14px 14px;
  }
</style>
<style lang="less">
  .email-dialog {
    .el-dialog__title, .email-dialog .el-dialog__headerbtn .el-dialog__close{
      font-weight: bold;
      color: #5BB4DB;
    }
    .el-dialog{
      background: #F3F9FC;
      border-radius: 4px;
    }
    .el-dialog__body{
      padding: 30px;
    }
    .center{
      background: #FFFFFF;
      border: 1px solid #DDE3E8;
      border-radius: 4px;
      text-align: center;
      font-size: 20px;
      color: #666666;
      line-height: 80px;
    }
  }
</style>
