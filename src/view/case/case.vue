<template>
  <div class="case-wrapper clearfix">
    <div class="case-item" v-for="(item, index) in caseData" :key="index">
      <div class="img-box">
        <div class="overlay"></div>
        <img :src="item.img_path" alt="" width="360px" height="202px">
        <el-button  type="text" icon="icon-play-btn" @click="popup(index)"></el-button>
        <!-- <div class="time is-play">
           <i class="icon-plays"></i>
            {{currentDes}}
        </div> -->
      </div>
      <div class="case-infor">
        <div class="diliver"></div>
        <h3 :title="item.title">{{item.title}}</h3>
      </div>
      <div class="description">
          <span>{{item.description}}</span>
      </div>
    </div>
    <div class="popup-layer" v-show="isShowVideo">
            <div @click.stop="" class="video-box">
              <video-player
                               class="vjs-custom-skin"
                               ref="videoPlayer"
                               :options="playerOptions"
                               :playsinline="true">
                </video-player>
            </div>
            <div class="close-video" @click="hideModal"></div>
            <div class="desbox">
            <span>{{currentDes}}</span>
            </div>
        </div>
  </div>
</template>
<script>
  import 'video.js/dist/video-js.css'
  import 'vue-video-player/src/custom-theme.css'
  import { videoPlayer } from 'vue-video-player'

export default {
  components:{videoPlayer},
  data () {
    return {
      isShowVideo:false,
      caseData: [],
      playerOptions: {
        width:'880',
        height: '500',
        autoplay: true,
        muted: false,
        language: 'en',
        sources: [{
          type: "video/mp4",
          src: ""
        }],
        poster: "",
      },
      currentDes:''
    }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    }
  },
  methods: {
     onPlayerPause(player) {
       // console.log('player pause!', player)
    },
    getCases(){
        this.$http.post(this.baseUrl+'open/hp/examples').then(res=>{
          if(res.status === 200) {
            this.caseData = res.data.result || []
            var lang = sessionStorage.getItem('lang')
            if(lang=='EN'){
              this.caseData.forEach(item=>{item.des = item.descriptionen})
            }
            else{
              this.caseData.forEach(item=>{item.des = item.description})
            }
          }
        })
     },
    popup(index) {
      this.isShowVideo = true
      this.currentDes = this.caseData[index].description
      this.playerOptions.sources[0].src = this.caseData[index].video_path
      // this.playerOptions.poster = this.caseData[index].img_path
      // this.playerOptions.poster = this.videoPoster[index]
    },
    hideModal(){
//      this.playerOptions.sources[0].src = ""
      this.$refs.videoPlayer.player.pause()
      this.isShowVideo = false
    },
  },
  mounted () {
    this.getCases()
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
  .desbox{
    position:relative;
    color:white;
    top:130px;
    word-break:break-all;
    width:800px;
    text-align:center;
    margin:0 auto;
  }
  .case-wrapper{
    width: 1100px;
    margin: 30px auto 50px;
    .case-item{
      float: left;
      height:270px;
      padding-right: 5px;
      &:nth-child(3n){
        margin-right: 0;
      }
      .img-box{
        position: relative;
        width: 360px;
        height: 205px;
        border-radius: 4px;
        .overlay{
            position: absolute;
            top: 0;
            right: 0;
            display: inline-block;
            left: 0;
            bottom: 0;
            background: rgba(0,0,0,0.3);
            width: 360px;
            height: 202px;
        }
        img{
          border-radius: 4px;
        }
        .el-button{
          position: absolute;
          top: 65px;
          left: 155px;
        }
        .time{
          display: flex;
          position: absolute;
          right: 10px;
          bottom: 10px;
          font-size: 12px;
          color: #fff;
          .icon-plays{
            margin-right: 6px;
          }
        }
      }
      .case-infor{
        width:350px;
        position: relative;
        padding-left: 10px;
        // margin: 11px 0;
        .diliver{
          position: absolute;
          left: 0;
          top:0;
          height: 100%;
          width: 4px;
          background-image: linear-gradient(45deg, #4634A9 0%, #F63669 100%);
          opacity: .4;
        }
        h3{
          margin: 0 0 5px;
          font-size: 16px;
          white-space: nowrap;
          line-height: 22px;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #666666;
        }
      }
      .description{
        position: relative;
        width: 360px;
        margin-bottom: 5px;
        overflow: hidden;
        font-size: 12px;
        // padding-right: 20px;
        padding-left: 22px;
        text-indent: 0.2em;
        color: #666666;
        text-overflow: ellipsis;
        line-height: 16px;
        box-sizing: border-box;
        &:before{
          position: absolute;
          left: 0;
          top: 0px;
          content: '';
          display: inline-block;
          width: 20px;
          height: 20px;
          vertical-align: middle;
          background: url("../../assets/icons/music.png") no-repeat center;
        }
        span{
          width:360px;
        }
      }
  }
  }
</style>
