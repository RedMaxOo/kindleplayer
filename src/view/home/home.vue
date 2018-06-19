<template>
    <div>
        <div class="searchbox">
            <div class="searchlogo">
              <!--<input placeholder="请输入内容" class="searchinput" v-model="searchcontent">-->
            </div>
            <div class="searchinput">
              <el-input v-model="searchValue" placeholder="请输入内容" suffix-icon="el-icon-search"
                      ><el-button slot="append" icon="el-icon-search" @click="goSearch"></el-button></el-input>
            </div>
        </div>
        <div class="banner">
            <el-carousel height="500px" style="width:100%;">
                <el-carousel-item v-for="(item,index) in videoPoster" :key="item">
                    <img :src="item" width=100% height=500 @click="popup(index)">
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
            <div class="album-title">MUSIC ALBUM</div>
            <ul class="album-list">
              <li v-for="items in albums">
                <el-carousel width="240px" height="250px" arrow="never" :interval="5000" indicator-position="none">
                  <el-carousel-item v-for="item in items" :key="item">
                    <img :src="item" @click="goSearch">
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
      isShowVideo: false,
      videoPoster: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528041454300&di=ddc102fa8a65769f76694565a542169f&imgtype=0&src=http%3A%2F%2Fdl.zhuansoo.com%2FuserHead%2F8%2F9%2F3%2F89344e0c0f065d6ddb4defd5c312e0fc.jpg','https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529352273000&di=630545ceadb022627fc64fa6beadab4d&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F018b1255437b400000019ae9238ea6.jpg'],
      videoSource: [],
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
          src: "http://vjs.zencdn.net/v/oceans.mp4"
        }],
        poster: "",
      }
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
//      this.playerOptions.poster = this.videoPoster[index]
    },
    hideModal(){
//      this.playerOptions.sources[0].src = ""
      this.player.pause()
      this.isShowVideo = false
    },
    getBanner(){
      this.$http.get('api/open/hp/banner').then(res=>{
        if(res.status === 200) {
          let data = res.data.result
          let posters = data.map(item => item.img_path)
          let videos = data.map(item => item.video_path)
          this.videoSource = videos
          //this.videoPoster = posters
          console.log(posters)
          console.log(videos)
        }
      })
    },
    getAlbums(){
      this.$http.get('api/open/album/all').then(res => {
        if(res.status === 200) {
          let data = res.data.result
          let albums = data.map(item => item.album_cover)
//          this.albums = albums.slice(0,8)
          for(var j=0;j<8;j++){
            this.$set(this.albums,j,[albums[j]])
          }
          for (var i = 8, j = 0, lens = albums.length; i < lens, j < 8; i++,j++) {
//            this.$set(this.albums,j,albums.slice(i, i + len))
            this.albums[j].push(albums[i])
            this.$set(this.albums,j,this.albums[j])
            if(j===7){j=0}
            if(i===lens-1){break}
          }
          console.log(this.albums)
        }
      })
    },
    goSearch(){
      this.$router.push({path:'/search',query:{searchValue:this.searchValue}})
    },
    //video.js
    onPlayerPlay(player) {
      // console.log('player play!', player)
    },
    onPlayerPause(player) {
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
.video-box{
  margin:auto;
  width:1000px;
  height:500px;
  position: relative;
  top:15%;
}
</style>


