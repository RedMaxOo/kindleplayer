<template>
  <div class="case-wrapper clearfix">
    <div class="case-item" v-for="(item, index) in caseData" :key="index">
      <div class="img-box">
        <div class="overlay"></div>
        <img :src="item.img_path" alt="" width="360px" height="170px">
        <el-button  type="text" icon="icon-play-btn" @click="popup(index)"></el-button>
        <!-- <div class="time is-play">
           <i class="icon-plays"></i>
            {{currentDes}}
        </div> -->
      </div>
      <div class="case-infor">
        <div class="diliver"></div>
        <h3>{{item.title}}</h3>
      </div>
      <div class="description">
          <span>{{item.description}}</span>
      </div>
    </div>
    <div class="popup-layer" v-show="isShowVideo" @click="hideModal">
            <div @click.stop="" class="video-box">
              <video-player
                               class="vjs-custom-skin"
                               ref="videoPlayer"
                               :options="playerOptions"
                               :playsinline="true">
                </video-player>
            </div>
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
      margin-right: 10px;
      &:nth-child(3n){
        margin-right: 0;
      }
      .img-box{
        position: relative;
        width: 360px;
        height: 175px;
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
            height: 170px;
        }
        img{
          border-radius: 4px;
        }
        .el-button{
          position: absolute;
          top: 50px;
          left: 146px;
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
        margin: 11px 0;
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
          line-height: 22px;
          color: #666666;
        }
      }
      .description{
          width: 350px;
          height: 30px;
          margin-bottom: 5px;
          overflow: scroll;
          font-size: 12px;
          text-indent: 0.2em;
          color: #666666;
          line-height: 16px;
          &:before{
            content: '';
            display: inline-block;
            width: 20px;
            height: 20px;
            vertical-align: middle;
            background: url("../../assets/icons/music.png") no-repeat center;
          }
          span{
            width:350px;
          }
      }
  }
  }
</style>
