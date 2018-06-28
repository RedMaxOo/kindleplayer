<template>
  <div class="pagelayout">
    <div class="header">
        <div class="logo"></div>
        <ul class="top-bar">
          <li><span v-if="!isLogin" @click="jumpToLogin">LOGIN</span></li>
          <li v-if="isLogin">
            <span><el-dropdown>
                <span><i class="user"></i>
                  {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item><span @click="toInfo">INFORMATION</span></el-dropdown-item>
                  <el-dropdown-item v-show="admin"><span @click="toBanner">BANNER</span></el-dropdown-item>
                  <el-dropdown-item><span @click="logout">LOGOUT</span></el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </span>
          </li>
          <li><span @click="jumpToHome">HOME</span></li>
          <li><span @click="showPower">COPYRIGHT</span></li>
          <li><span @click="showConect">CONNECT</span></li>
          <li><span @click="changeLangEvent">EN/CN</span></li>
        </ul>
      <dialog-form ref="dialog" :showdialog="showForm" :ruleForm="forminfor"></dialog-form>
      <!--<dialog-form ref="dialog"></dialog-form>-->
    </div>
    <el-dialog
      class="email-dialog"
      title="EMAIL"
      :visible.sync="emailDialog"
      width="42%"
    >
      <div class="center">
        <i class="icon-email-big"></i>
        <span>jeffry.christiansen@gmail.com</span>
        <a href="mailto:jeffry.christiansen@gmail.com"><i class="icon-copy"></i></a>
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
      isLogin:false,
      username:'',
      showForm:false,
      emailDialog:false,
      forminfor: {},
      admin:false
    }
  },
  methods:{
    jumpToLogin(){
      this.$router.push({path:'/login'})
    },
    jumpToHome(){
      this.$router.push({path:'/'})
    },
    showPower () {
      this.$refs.dialog.dialogVisible = true
      this.forminfor = {
        username: '',
        email: '',
        albumname: '',
        title:'',
        type: '',
        term: '',
        territory: ''
      }
    },
    showConect () {
      this.emailDialog = true
    },
    toInfo(){
      this.$router.push({path:'/myinfo'})
    },
    toBanner(){
      this.$router.push({path:'/banner-edit'})
    },
    logout(){
      sessionStorage.removeItem('username')
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('admin')
      this.$router.push({path:'/'})
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
          this.$i18n.locale = this.lang //关键语句
        }else {
          this.lang = 'zh-CN';
          this.$i18n.locale = this.lang //关键语句
        }
      });
    },
    getUserInfo(){
      var token = sessionStorage.getItem('token')
      if(token) {
        this.$http.get('api/api/user/getUser', {
          headers: {
            'Authorization': token
          }
        }).then(res => {
          if (res.status === 200) {
            if (res.data.result) {
              this.username = res.data.result.user_nm
              var role = res.data.result.role
              var isAdmin = (role && role === 'ROLE_ADMIN')
              if(isAdmin) {
                this.admin = true
                this.isLogin = true
                sessionStorage.setItem('admin', isAdmin)
              }
            }
          }
        })
      }
    }
  },
  mounted(){
    this.getUserInfo()
    var user = sessionStorage.getItem('username')
    if(user){
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
      &:hover{
         color: #E172A7;
         cursor: pointer;
       }
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
      span{
        padding:0 60px 0 40px;
      }
    }
  }
</style>
