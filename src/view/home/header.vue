<template>
  <div class="pagelayout">
    <div class="header">
        <div class="logo"><a href="/"></a></div>
        <ul class="top-bar">
          <li><span v-if="!isLogin" @click="jumpToLogin">{{$t('m.navmenu1')}}</span></li>
          <li v-if="isLogin">
            <span><el-dropdown>
                <span><i class="user"></i>
                  {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item><span @click="toInfo">{{$t('m.submenu1')}}</span></el-dropdown-item>
                  <!-- <el-dropdown-item><span @click="toBanner">BANNER</span></el-dropdown-item> -->
                  <el-dropdown-item><span @click="toPassword">{{$t('m.submenu2')}}</span></el-dropdown-item>
                  <el-dropdown-item v-show="admin"><span @click="toBanner">{{$t('m.submenu3')}}</span></el-dropdown-item>
                  <el-dropdown-item><span @click="logout">{{$t('m.submenu4')}}</span></el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </span>
          </li>
          <li><span @click="jumpToHome">{{$t('m.navmenu2')}}</span></li>
          <li><span @click="jumpToCase">{{$t('m.navmenu3')}}</span></li>
          <li><span @click="showPower">{{$t('m.navmenu4')}}</span></li>
          <li><span @click="showConect">{{$t('m.navmenu5')}}</span></li>
          <li><span @click="changeLangEvent">{{$t('m.navmenu6')}}</span></li>
        </ul>
      <dialog-form ref="dialog" :showdialog="showForm" :ruleForm="forminfor"></dialog-form>
      <dialog-form ref="contactDialog" :ruleForm="contactInfo"></dialog-form>
      <!--<dialog-form ref="dialog"></dialog-form>-->
    </div>
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
      contactInfo:{},
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
    jumpToCase(){
      this.$router.push({path:'/case'})
    },
    toPassword(){
      this.$router.push({path:'/change'})
    },
    showPower () {
      this.$refs.dialog.dialogVisible = true
      let userinfor = JSON.parse(sessionStorage.getItem('userinfor'))
      this.forminfor = {
        username: userinfor ? userinfor.user_id : '',
        email: userinfor ? userinfor.email : '',
        tele: userinfor ? userinfor.mobile : '',
        company: userinfor ? userinfor.company : '',
        albumname: '',
        title:'',
        type: '',
        term: '',
        territory: ''
      }
    },
    showConect () {
      debugger
      this.$refs.contactDialog.contactVisible = true
      this.contactInfo = {
        username:'',
        email:'',
        company:'',
        textarea:''
      }
    },
    toInfo(){
      this.$router.push({path:'/myinfo'})
    },
    toBanner(){
      this.$router.push({path:'/banner-edit'})
    },
    logout(){
      sessionStorage.clear()
      this.$router.push({path:'/'})
      window.location.reload()
    },
    changeLangEvent () {
      this.lang = this.$i18n.locale
      if ( this.lang === 'zh-CN') {
        this.lang = 'en-US'
        sessionStorage.setItem('lang','EN')
        this.$i18n.locale = this.lang //关键语句
      }else {
        this.lang = 'zh-CN'
        sessionStorage.setItem('lang','CN')
        this.$i18n.locale = this.lang //关键语句
      }
      // let  msg = ''
      // if (this.lang === 'zh-CN') {
      //   msg = '要切换成英文吗'
      // } else {
      //   msg = '要切换成中文吗'
      // }
      // this.$confirm(msg, '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      //   if ( this.lang === 'zh-CN') {
      //     this.lang = 'en-US'
      //     sessionStorage.setItem('lang','EN')
      //     this.$i18n.locale = this.lang //关键语句
      //   }else {
      //     this.lang = 'zh-CN'
      //     sessionStorage.setItem('lang','CN')
      //     this.$i18n.locale = this.lang //关键语句
      //   }
      // });
    },
    getUserInfo(){
      var token = sessionStorage.getItem('token')
      if(token) {
        this.$http.get(this.baseUrl + 'api/user/getUser', {
          headers: {
            'Authorization': token
          }
        }).then(res => {
          if (res.status === 200) {
            if (res.data.result) {
              if(res.data.code ===1111){
                sessionStorage.clear()
                this.$router.push({path:'/login'})
              }
              else{
                this.username = res.data.result.user_nm
                // this.$store.state.username = res.data.result.user_id
                // this.$store.state.useremail = res.data.result.email
                // this.$store.state.mobile = res.data.result.mobile
                // this.$store.state.company = res.data.result.company
                var role = res.data.result.role
                var isAdmin = (role && role === 'ROLE_ADMIN')
                if(isAdmin) {
                  this.admin = true
                  sessionStorage.setItem('admin', isAdmin)
                }
              }
            }
          }
        })
      }
    }
  },
  mounted(){
    // this.getUserInfo()
    this.username = sessionStorage.getItem('username') || ''
    this.admin = sessionStorage.getItem('admin') || false
    if(this.username){
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
    a{
      display: block;
      width: 100%;
      height: 100%;
    }
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
      font-family: Segoe UI;
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
    background-image: linear-gradient(45deg, rgba(70, 52, 169, 0.4) 0%, rgba(246, 54, 105, 0.4) 100%);

    .el-dialog__title, .email-dialog, .el-dialog__headerbtn .el-dialog__close{
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
