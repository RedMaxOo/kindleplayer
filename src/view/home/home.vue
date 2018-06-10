<template>
    <div>
        <div class="searchbox">
            <div class="searchlogo">
              <!--<input placeholder="请输入内容" class="searchinput" v-model="searchcontent">-->
            </div>
            <div class="searchinput">
              <el-input v-model="searchValue" placeholder="请输入内容" suffix-icon="el-icon-search"
                      ></el-input>
            </div>
        </div>
        <div class="banner">
            <el-carousel height=450px style="width:100%;">
                <el-carousel-item v-for="(item,index) in videoPoster" :key="item">
                    <img :src="item" width=100% height=450 @click="popup(index)">
                </el-carousel-item>
            </el-carousel>
            <div class="popup-layer" v-show="isShowVideo" @click="hideModal">
                <iframe height=450 width=1000 frameborder=0 allowfullscreen="true" ref="popupmodal" src="" class="videobox"></iframe>
            </div>
        </div>
        <div class="album">
            <div class="album-title">MUSIC ALBUM</div>
            <ul class="album-list">
              <li v-for="item in albums">
                <img :src="item">
              </li>
            </ul>
        </div>
    </div>
</template>
<script>

export default {
  name: 'Banner',
  data () {
    return {
      isShowVideo: false,
      videoPoster: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528627821222&di=5108569b0525df1e427664c17a2cf7bd&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01920557033f2a32f875a944278f1d.jpg%401280w_1l_2o_100sh.png', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528041454300&di=ddc102fa8a65769f76694565a542169f&imgtype=0&src=http%3A%2F%2Fdl.zhuansoo.com%2FuserHead%2F8%2F9%2F3%2F89344e0c0f065d6ddb4defd5c312e0fc.jpg'],
      videoSource: ['http://player.youku.com/embed/XMzYzNzY2MjY1Ng==', 'http://player.youku.com/embed/XMzYyMzE5NTM0MA==','https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528627846156&di=67d9bf2c8107c07f7aad2215be1399ce&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F32fa828ba61ea8d3e6bbd3e0920a304e241f58bc.jpg'],
      searchValue: '',
      albums:['./assets/img/album1.png','./assets/img/album2.png','./assets/img/album3.png','./assets/img/album4.png','./assets/img/album5.png','./assets/img/album6.png','./assets/img/album7.png','./assets/img/album8.png']
    }
  },
  methods: {
    popup: function (index) {
      this.$refs.popupmodal.src = this.videoSource[index]
      this.isShowVideo = true
    },
    hideModal: function () {
      this.isShowVideo = false
      this.$refs.popupmodal.src = ''
    },
    request:function () {
      this.$http.get('api/open/hp/banner').then(function (res) {
        console.log(res.data.result)

      })
    }
  },
  mounted(){
    this.request()
  }
}
</script>

<style lang="less">
.popup-layer{
    position: fixed;
    z-index: 200;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,1);
  .videobox{
    position: absolute;
    top:15%;
    left:15%;
  }
}
.searchbox{
    width:1098px;
    margin:auto;
    height:105px;
}
.searchlogo{
    width: 380px;
    height: 105px;
    background: url('../../assets/img/binder.png') no-repeat 0 center;
    float: left;
}
.searchinput {
    width: 700px;
    height: 105px;
    line-height:105px;
    float: right;
    .el-input__suffix-inner {
      margin-right: 20px;
    }

    .el-input__inner {
      width: 100%;
      height: 80px;
      border-radius: 4px;
    }
}
.album {
  width: 1098px;
  height: 100%;
  margin:auto;

  .album-title {
    width: 100%;
    height:70px;
    line-height: 80px;
    font-family: Avenir-Heavy;
    font-size: 24px;
    color: #666666;
  }
  .album-list {
    margin-left:-18px;
  margin-top:-18px;
    li {
      width: 240px;
      height: 225px;
      display: inline-block;
      border-radius:10px;
    padding:18px;
      img{
        border-radius: 5px;
        width:100%;
        height:100%;
      }
    }
  }
}
/*圆点风格*/
.banner {
  .el-carousel__button {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #FFFFFF;
    border: 2px solid #FFFFFF;
  }
  .el-carousel__indicator{padding: 20px;}
  .is-active{
    .el-carousel__button{background: #D53575;}
  }
}

</style>


