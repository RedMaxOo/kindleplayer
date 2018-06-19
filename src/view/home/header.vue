<template>
  <div class="pagelayout">
    <div class="header">
        <div class="logo"></div>
        <ul class="top-bar">
          <li v-for="item in menus">
            <span @click="jumpTo(item)">{{item}}</span>
          </li>
        </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'XHeader',
  data(){
    return{
      menus:['LOGIN','COPYRIGHT','CONNECT','EN/CN'],
    }
  },
  methods:{
    jumpTo(type){
      switch (type){
        case 'LOGIN':
          this.$router.push({path:'/login'})
          break
        case 'COPYRIGHT':
          break;
        case 'CONNECT':
          break;
        case 'EN/CN':
          break;
      }

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
</style>
