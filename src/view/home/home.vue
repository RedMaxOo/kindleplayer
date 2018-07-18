<template>
    <div>
        <div class="searchbox">
            <div class="searchlogo">
              <div class="title">Behind The Moon</div>
              <!--<input placeholder="请输入内容" class="searchinput" v-model="searchcontent">-->
            </div>
            <div class="searchinput">
              <el-input v-model="searchValue" :placeholder="$t('m.seachplace')" suffix-icon="el-icon-search"
                      ><el-button slot="append" icon="el-icon-search" @click="goSearch"></el-button></el-input>
            </div>
        </div>
        <div class="banner">
            <el-carousel height="450px" style="width: 1098px;margin:auto;">
                <el-carousel-item v-for="(item,index) in videoPoster" :key="index">
                    <img :src="item" width="1098" height="450" @click="popup(index)">
                </el-carousel-item>
            </el-carousel>
            <div class="popup-layer" v-show="isShowVideo" @click="hideModal">
              <div @click.stop="" class="video-box">
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
        </div>
        <div class="album">
            <div class="album-title">{{$t('m.indextit')}}</div>
            <ul class="album-list">
              <li v-for="(items,index) in albums" :key="index">
                <el-carousel width="240px" height="250px" arrow="never" :interval="5000" indicator-position="none">
                  <el-carousel-item v-for="(item,index) in items" :key="index">
                    <img :src="item" @click="goAlbum(item)">
                  </el-carousel-item>
                </el-carousel>
              </li>
            </ul>
        </div>

    </div>
</template>
<script>
  import 'video.js/dist/video-js.css'
  import 'vue-video-player/src/custom-theme.css'
  import { videoPlayer } from 'vue-video-player'
  export default {
  name: 'Banner',
  components: {
    videoPlayer
  },
  data () {
    return {
      centerDialogVisible: true,
      isShowVideo: false,
      videoPoster: [],
      videoSource: [],
      searchValue: '',
      albums:[],
      playerOptions: {
        width:'800',
        height: '500',
        autoplay: false,
        muted: false,
        language: 'en',
        sources: [{
          type: "video/mp4",
          src: ""
        }],
        poster: "",
      },
      albumList:[]
    }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    }
  },
  methods: {
    popup(index) {
      this.isShowVideo = true
      this.playerOptions.sources[0].src = this.videoSource[index]
      // this.playerOptions.poster = this.videoPoster[index]
    },
    hideModal(){
//      this.playerOptions.sources[0].src = ""
      this.player.pause()
      this.isShowVideo = false
    },
    getBanner(){
      // console.log(this.baseUrl)
      this.$http.get(this.baseUrl + 'open/hp/banner').then(res=>{
        if(res.status === 200) {
          let data = res.data.result
          let posters = data.map(item => item.img_path)
          let videos = data.map(item => item.video_path)
          this.videoSource = videos
          this.videoPoster = posters
          // console.log(posters)
          // console.log(videos)
        }
      })
    },
    getAlbums(){
      this.$http.get(this.baseUrl + 'open/album/all').then(res => {
        if(res.status === 200) {
          this.albumList = res.data.result
          let albums = this.albumList.map(item => item.album_cover)
          var len = Math.round(albums.length / 8)
          for (var i = 0, j = 0, lens = albums.length; i < lens, j < len + 1; i += len,j++) {
            this.$set(this.albums,j,albums.slice(i, i + len))
          }

        }
      })
    },
    goSearch(){
      if(this.searchValue == ""){
        this.$message({
          message: '请输入查询内容',
          type: 'warning'
        })
      }else {
        this.searchValue = this.searchValue.replace('，', ',')
        this.$router.push({path: '/search', query: {searchValue: this.searchValue}})
      }
    },
    goAlbum(src){
      var code = this.albumList.filter(item => item.album_cover == src)[0].album_code
      if(code) {
        this.$router.push({path: '/search', query: {albumCode: code}})
      }
    },
    //video.js
    onPlayerPlay(player) {
      // console.log('player play!', player)
    },
    onPlayerPause(player) {
       // console.log('player pause!', player)
    },
    onPlayerEnded(player) {
       // console.log('player ended!', player)
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
      // console.log('example player 1 readied', player)
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

.searchbox{
    width:1098px;
    margin:auto;
    height:105px;
}
.searchlogo{
    width: 380px;
    height: 105px;
    background: url('../../../static/img/binder.png') no-repeat 0 center;
    float: left;
    .title{
      display: inline-block;
      font-family: Avenir-Heavy;
      font-size: 20px;
      color: rgb(255, 255, 255);
      margin-top: 40px;
      margin-left: 20px;
    }
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
      width: 700px;
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
    background: none !important;
    width:100%;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-content: space-between;
    margin-top:-20px;
    margin-bottom:60px;
    li {
      width: 240px;
      height: 250px;
      margin-top:20px;
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
  .el-carousel__indicator{padding: 10px;}
  .is-active{
    .el-carousel__button{background: #D53575;}
  }
}
</style>
