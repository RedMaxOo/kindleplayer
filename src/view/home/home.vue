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
            <el-carousel height="450px" style="width:100%;">
                <el-carousel-item v-for="(item,index) in videoPoster" :key="item">
                    <img :src="item" width=100% height=450 @click="popup(index)">
                </el-carousel-item>
            </el-carousel>
            <div class="popup-layer" v-show="isShowVideo">
              <div style="wisth:100px;height:50px;background-color: #D53575;position: absolute;right:10%;top:10%;" @click="hideModal">close</div>
              <video-player
                             class="vjs-custom-skin"
                             ref="videoPlayer"
                             :options="playerOptions"
                             :playsinline="true"
                             @play="onPlayerPlay($event)"
                             @pause="onPlayerPause($event)"
                             @ended="onPlayerEnded($event)"
                             @loadeddata="onPlayerLoadeddata($event)"
                             @waiting="onPlayerWaiting($event)"
                             @playing="onPlayerPlaying($event)"
                             @timeupdate="onPlayerTimeupdate($event)"
                             @canplay="onPlayerCanplay($event)"
                             @canplaythrough="onPlayerCanplaythrough($event)"
                             @ready="playerReadied"
                             @statechanged="playerStateChanged($event)">
              </video-player>
            </div>
        </div>
        <div class="album">
            <div class="album-title">MUSIC ALBUM</div>
            <ul class="album-list">
              <li v-for="items in albums">
                <el-carousel width="240px" height="250px" arrow="never" :interval="5000" indicator-position="none">
                  <el-carousel-item v-for="(item,index) in items" :key="item">
                    <img :src="item" @click="">
                  </el-carousel-item>
                </el-carousel>
              </li>
            </ul>
        </div>
    </div>
</template>
<script>
  import 'video.js/dist/video-js.css'
  import { videoPlayer } from 'vue-video-player'
  export default {
  name: 'Banner',
  components: {
    videoPlayer
  },
  data () {
    return {
      isShowVideo: false,
      videoPoster: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528627821222&di=5108569b0525df1e427664c17a2cf7bd&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01920557033f2a32f875a944278f1d.jpg%401280w_1l_2o_100sh.png', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528041454300&di=ddc102fa8a65769f76694565a542169f&imgtype=0&src=http%3A%2F%2Fdl.zhuansoo.com%2FuserHead%2F8%2F9%2F3%2F89344e0c0f065d6ddb4defd5c312e0fc.jpg'],
      videoSource: ['http://player.youku.com/embed/XMzYzNzY2MjY1Ng==', 'http://player.youku.com/embed/XMzYyMzE5NTM0MA==','https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528627846156&di=67d9bf2c8107c07f7aad2215be1399ce&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F32fa828ba61ea8d3e6bbd3e0920a304e241f58bc.jpg'],
      searchValue: '',
      albums:[],
      playerOptions: {
        width:'800',
        height: '500',
        autoplay: false,
        muted: true,
        language: 'en',
        sources: [{
          type: "video/mp4",
          // mp4
          src: "http://vjs.zencdn.net/v/oceans.mp4",
          // webm
          // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
        }],
        poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg",
      }
    }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    }
  },
  methods: {
    popup: function (index) {
//      this.$refs.popupmodal.src = this.videoSource[index]
      this.isShowVideo = true
    },
    hideModal: function () {
      this.isShowVideo = false
      this.onPlayerEnded(this.$refs.videoPlayer.player)
      debugger
    },
    getBanner:function () {
      this.$http.get('api/open/hp/banner').then(function (res) {
        if(res.status === 200) {
          let data = res.data.result
          let posters = data.map(item => item.img_path)
          let videos = data.map(item => item.video_path)
          console.log(posters)
          console.log(videos)
//        this.videoPoster = posters
//        this.videoSource = videos
        }
      })
    },
    getAlbums:function () {
      this.$http.get('api/open/album/all').then(res => {
        if(res.status === 200) {
          let data = res.data.result
          let albums = data.map(item => item.ALBUM_COVER)
          var len = Math.round(albums.length / 8)
          for (var i = 0, j = 0, lens = albums.length; i < lens, j < len + 1; i += len,j++) {
            this.$set(this.albums,j,albums.slice(i, i + len))
          }
        }
      })
    },
    //video.js
    onPlayerPlay(player) {
      // console.log('player play!', player)
    },
    onPlayerPause(player) {
      debugger
       console.log('player pause!', player)
    },
    onPlayerEnded(player) {
       console.log('player ended!', player)
    },
    onPlayerLoadeddata(player) {
      // console.log('player Loadeddata!', player)
    },
    onPlayerWaiting(player) {
      // console.log('player Waiting!', player)
    },
    onPlayerPlaying(player) {
      // console.log('player Playing!', player)
    },
    onPlayerTimeupdate(player) {
      // console.log('player Timeupdate!', player.currentTime())
    },
    onPlayerCanplay(player) {
      // console.log('player Canplay!', player)
    },
    onPlayerCanplaythrough(player) {
      // console.log('player Canplaythrough!', player)
    },
    // or listen state event
    playerStateChanged(playerCurrentState) {
      // console.log('player current update state', playerCurrentState)
    },
    // player is ready
    playerReadied(player) {
      // seek to 10s
      console.log('example player 1 readied', player)
//      player.currentTime(10)
      // console.log('example 01: the player is readied', player)
    }
  },
  mounted(){
    this.getBanner()
    this.getAlbums()
  }
}
</script>

<style lang="less">
.popup-layer{
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,1);
  /*.videobox{*/
    /*position: fixed;*/
    /*z-index:20;*/
    /*top:15%;*/
    /*left:15%;*/
  /*}*/
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
      height: 250px;
      display: inline-block;
    padding:18px;
    overflow:hidden;
      .el-carousel{
        border-radius: 5px;
      }
      img{
        /*border-radius: 5px;*/
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

/* video */
.vjs-custom-skin{
  position:relative;
  top:15%;
}
.vjs-custom-skin > .video-js {
  width: 100%;
  font-family: "PingFang SC","Helvetica Neue","Hiragino Sans GB","Segoe UI","Microsoft YaHei","微软雅黑",sans-serif;
}

.vjs-custom-skin > .video-js .vjs-menu-button-inline.vjs-slider-active,.vjs-custom-skin > .video-js .vjs-menu-button-inline:focus,.vjs-custom-skin > .video-js .vjs-menu-button-inline:hover,.video-js.vjs-no-flex .vjs-menu-button-inline {
  width: 10em
}

.vjs-custom-skin > .video-js .vjs-controls-disabled .vjs-big-play-button {
  display: none!important
}

.vjs-custom-skin > .video-js .vjs-control {
  width: 3em
}

.vjs-custom-skin > .video-js .vjs-control.vjs-live-control{
  width: auto;
  padding-left: .5em;
  letter-spacing: .1em;
}

.vjs-custom-skin > .video-js .vjs-menu-button-inline:before {
  width: 1.5em
}

.vjs-menu-button-inline .vjs-menu {
  left: 3em
}

.vjs-paused.vjs-has-started.vjs-custom-skin > .video-js .vjs-big-play-button,.video-js.vjs-ended .vjs-big-play-button,.video-js.vjs-paused .vjs-big-play-button {
  display: block
}

.vjs-custom-skin > .video-js .vjs-load-progress div,.vjs-seeking .vjs-big-play-button,.vjs-waiting .vjs-big-play-button {
  display: none!important
}

.vjs-custom-skin > .video-js .vjs-mouse-display:after,.vjs-custom-skin > .video-js .vjs-play-progress:after {
  padding: 0 .4em .3em
}

.video-js.vjs-ended .vjs-loading-spinner {
  display: none;
}

.video-js.vjs-ended .vjs-big-play-button {
  display: block !important;
}

.video-js.vjs-ended .vjs-big-play-button,.video-js.vjs-paused .vjs-big-play-button,.vjs-paused.vjs-has-started.vjs-custom-skin > .video-js .vjs-big-play-button {
  display: block
}

.vjs-custom-skin > .video-js .vjs-big-play-button {
  top: 50%;
  left: 50%;
  margin-left: -1.5em;
  margin-top: -1em
}

.vjs-custom-skin > .video-js .vjs-big-play-button {
  background-color: rgba(0,0,0,0.45);
  font-size: 3.5em;
  /*border-radius: 50%;*/
  height: 2em !important;
  line-height: 2em !important;
  margin-top: -1em !important
}

.video-js:hover .vjs-big-play-button,.vjs-custom-skin > .video-js .vjs-big-play-button:focus,.vjs-custom-skin > .video-js .vjs-big-play-button:active {
  background-color: rgba(36,131,213,0.9)
}

.vjs-custom-skin > .video-js .vjs-loading-spinner {
  border-color: rgba(36,131,213,0.8)
}

.vjs-custom-skin > .video-js .vjs-control-bar2 {
  background-color: #000000
}

.vjs-custom-skin > .video-js .vjs-control-bar {
  /*background-color: rgba(0,0,0,0.3) !important;*/
  color: #ffffff;
  font-size: 14px;
  width:1200px;
  margin:0 auto;
}

.vjs-custom-skin > .video-js .vjs-play-progress,.vjs-custom-skin > .video-js  .vjs-volume-level {
  background-color: #2483d5
}

.vjs-custom-skin > .video-js .vjs-play-progress:before {
  top: -0.3em;
}

.vjs-custom-skin > .video-js .vjs-progress-control:hover .vjs-progress-holder {
  font-size: 1.3em;
}

.vjs-menu-button-popup.vjs-volume-menu-button-vertical .vjs-menu {
  left: 0em;
}

.vjs-custom-skin > .video-js .vjs-menu li {
  padding: 0;
  line-height: 2em;
  font-size: 1.1em;
  font-family: "PingFang SC","Helvetica Neue","Hiragino Sans GB","Segoe UI","Microsoft YaHei","微软雅黑",sans-serif;
}

.vjs-custom-skin > .video-js .vjs-time-tooltip,
.vjs-custom-skin > .video-js .vjs-mouse-display:after,
.vjs-custom-skin > .video-js .vjs-play-progress:after {
  border-radius: 0;
  font-size: 1em;
  padding: 0;
  width: 3em;
  height: 1.5em;
  line-height: 1.5em;
  top: -3em;
}

.vjs-custom-skin > .video-js .vjs-menu-button-popup .vjs-menu {
  width: 5em;
  left: -1em;
}

.vjs-custom-skin > .video-js .vjs-menu-button-popup.vjs-volume-menu-button-vertical .vjs-menu {
  left: 0;
}

.vjs-custom-skin > .video-js .vjs-control-bar .vjs-resolution-button .vjs-menu {
  /*order: 4;*/
}

/*排序顺序*/
.vjs-custom-skin > .video-js .vjs-control-bar .vjs-play-control {
  order: 0;
}

.vjs-custom-skin > .video-js .vjs-control-bar .vjs-time-control {
  min-width: 1em;
  padding: 0;
  margin: 0 .1em;
  text-align: center;
  display: block;
  order: 1;
}

.vjs-custom-skin > .video-js .vjs-control-bar .vjs-playback-rate .vjs-playback-rate-value{
  font-size: 1.2em;
  line-height: 2.4;
}

.vjs-custom-skin > .video-js .vjs-progress-control.vjs-control {
  order: 2;
}

.vjs-custom-skin > .video-js .vjs-control-bar .vjs-volume-menu-button {
  order: 3;
}

.vjs-custom-skin > .video-js .vjs-control-bar .vjs-resolution-button {
  order: 4;
}

.vjs-custom-skin > .video-js .vjs-control-bar .vjs-resolution-button .vjs-resolution-button-label {
  display: block;
  line-height: 3em;
}

.vjs-custom-skin > .video-js .vjs-control-bar .vjs-playback-rate {
  order: 5;
}

.vjs-custom-skin > .video-js .vjs-control-bar .vjs-fullscreen-control {
  order: 6;
}

</style>


