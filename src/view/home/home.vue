<template>
    <div>
        <div class="searchbox">
            <div class="searchlogo">
              <div class="title">{{$t('m.searchicon')}}</div>
              <!--<input placeholder="请输入内容" class="searchinput" v-model="searchcontent">-->
            </div>
            <div class="searchinput">
              <el-input v-model="searchValue" :placeholder="$t('m.seachplace')" suffix-icon="el-icon-search"
                      ><el-button slot="append" icon="el-icon-search" @click="goSearch"></el-button></el-input>
            </div>
        </div>
        <div class="banner">
            <el-carousel height="620px" style="width: 1100px;margin:auto;"  ref="cars" :interval="5000" :autoplay="false" v-on:change="changeFun" indicator-position="none">
                <el-carousel-item v-for="(item,index) in videoSource" :key="index">
                <video-player
                               class="vjs-custom-skin"
                               ref="videoPlayer"
                               :id="getId(index)"
                               :options="item"
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
                </el-carousel-item>
            </el-carousel>
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
      albumList:[],
      activeIndex:0
    }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    }
  },
  watch:{
    activeIndex(next,prev){
      this.$refs.videoPlayer[prev].player.pause()
      this.$refs.videoPlayer[next].player.play()
    }
  },
  methods: {
    changeFun(){
      this.activeIndex = this.$refs.cars.activeIndex
    },
    getId(index){
      return index+'_video'
    },
    popup(index) {
      this.isShowVideo = true
      this.playerOptions.sources[0].src = this.videoSource[index]
      // this.playerOptions.poster = this.videoPoster[index]
    },
    hideModal(){
      this.player.pause()
      this.isShowVideo = false
    },
    getBanner(){
      this.$http.get(this.baseUrl + 'open/hp/banner').then(res=>{
        if(res.status === 200) {
          let data = res.data.result
          this.videoSource = data.map((item,index) => {
            return {
              // width:1100,
              // height: 620,
              autoplay: index==0?true:false,
              muted: false,
              // loop: true,
              preload: 'auto', 
              language: 'zh-CN',
              aspectRatio: '16:9', 
              fluid: true,
              language: 'en',
              sources: [{
                type: "video/mp4",
                src: item.video_path
              }],
              poster: item.img_path
            }
          })
          // this.videoPoster = posters
        }
      })
    },
    getAlbums(){
      this.$http.get(this.baseUrl + 'open/album/all').then(res => {
        if(res.status === 200) {
          this.albumList = res.data.result
          let albums = this.albumList.map(item => item.album_cover)
          // var len = Math.round(albums.length / 8)
          for (var i = 0, j = 0, lens = albums.length; i < lens, j < 8; i += 8,j++) {
            this.$set(this.albums,j,albums.slice(i, i + 8))
          }
        }
      })
    },
    goSearch(){
      if(this.searchValue == ""){
        this.$message({
          message: this.$t('m.errortips.content'),
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
      this.$refs.cars.next()
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
.close-video{
    cursor:pointer;
    position:absolute;
    top:9.5%;
    right:19%;
    width:30px;
    height:30px;
    background: url("../../assets/icons/exit1.png") no-repeat center;
    &:hover{
      background: url("../../assets/icons/exit2.png") no-repeat center;
    }
  }
.searchbox{
    width:1098px;
    margin:10px auto;
    height:50px;
}
.searchlogo{
    width: 180px;
    height: 50px;
    background: url('../../../static/img/binder.png') no-repeat 0 center;
    float: left;
    text-align:center;
    border-radius: 4px;
    .title{
      display: inline-block;
      font-family: Segoe UI;
      font-size: 20px;
      color: rgb(255, 255, 255);
      line-height:50px;
    }
}
.searchinput {
    width: 700px;
    height: 50px;
    line-height:50px;
    float: left;
    margin-left:20px;
    .el-input__suffix-inner {
      margin-right: 20px;
    }

    .el-input__inner {
      width: 900px;
      height: 50px;
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
    font-family: Segoe UI;
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
