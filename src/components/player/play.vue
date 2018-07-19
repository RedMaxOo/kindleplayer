
<template>
  <div class="ml-player"  :class="{'aplayer-hide': hidePlayer}">
    <div class="bottom-tab" @click="hidePlayerFun"></div>
    <div class="ml-payer-body">
      <div class="player-header">
        <div class="player-pic"><img :src="currentMusic? currentMusic.img: ''" alt=""></div>
        <div class="player-control">
          <div class="player-tit">
            <h3>{{currentMusic?currentMusic.title:''}}</h3>
            <p>{{currentMusic?currentMusic.album:''}}</p>
          </div>
          <div class="player-bnt-group">
            <button @click="playPrev"><i class="icon-prev"></i></button>
            <button @click="toggle"><i :class="isPlaying?'icon-pause':'icon-play'"></i></button>
            <button @click="playNext"><i class="icon-next"></i></button>
            <span></span>
            <span class="horn">
              <i class="icon-horn"></i>
              <el-slider
                v-model="volume"
                vertical
                @change="changeVolume"
                height="80px">
              </el-slider>
            </span>
          </div>
        </div>
      </div>
      <div class="player-info">
        <div id="waveform" class="container"></div>
      </div>
    </div>
  </div>
</template>
<script>
import WaveSurfer from 'wavesurfer.js'
import Aplayer from '@/components/player/play'
let waveOption
export default {
  components: {Aplayer},
  props: ['isPlayOne', 'musicList'],
  data () {
    return {
      hidePlayer: true,
      isPlaying: false,
      playIndex: this.$store.state.isPlayOne,
      volume: 0,
      listState: false
    }
  },
  methods: {
    changeVolume (val) {
      waveOption.setVolume( val / 100)
    },
    hidePlayerFun () {
      this.hidePlayer = !this.hidePlayer
    },
    toggle () {
      this.isPlaying = !this.isPlaying
      waveOption.playPause()
    },
    play () {
      this.isPlaying = true
      if (this.isPlaying) {
        waveOption.play()
        this.hidePlayer = false
      }
    },
    pause () {
      this.isPlaying = false
      if (!this.isPlaying) {
        waveOption.pause()
      }
    },
    playPrev () {
      waveOption.empty()
      if (this.playIndex && this.playIndex <= this.musicList.length) {
        this.playIndex--
      } else {
        this.playIndex = this.musicList.length - 1
      }
      this.$store.commit('changePlaying', this.playIndex)
      this.loadMusic(this.currentMusic.src)
    },
    playNext () {
      waveOption.empty()
      if (this.playIndex < this.musicList.length - 1) {
        this.playIndex++
      } else {
        this.playIndex = 0
      }
      this.$store.state.isPlayOne = this.playIndex
      this.$store.commit('changePlaying', this.playIndex)
      this.loadMusic(this.currentMusic.src)
    },
    loadMusic (curMusric) {
      let _this = this
      waveOption.empty()
      waveOption.load(curMusric)
      if (this.isPlaying) {
        waveOption.on('ready', function () {
          waveOption.play()
        })
      }
      waveOption.on('finish', function () {
        _this.pause ()
        _this.playNext()
        _this.play()
      })
    }
  },
  computed: {
    // sync music
    currentMusic: {
      get () {
        return this.musicList[this.playIndex]
      },
      set (val) {
        this.$emit('update:music', val)
      }
    }
  },
  watch: {
    isPlayOne (val) {
      this.playIndex = val
      this.currentMusic = this.musicList[val]
      this.loadMusic(this.currentMusic.src)
      this.$emit('update:isPlayOne', val)
    },
    musicList (val) {
      if (val.length > 0) {
        this.loadMusic(this.currentMusic.src)
      }
    }
  },
  mounted () {
    const params = {
      container: '#waveform',
      waveColor: 'violet',
      barWidth: 2,
      height: 110,
      progressColor: 'purple'
    }
    var wavesurfer = new WaveSurfer(params)
    wavesurfer.init()
    waveOption = wavesurfer
    this.volume = waveOption.getVolume() * 100
  }
}
</script>

<style lang="less">
  @import "./variables";
  .ml-player {
    position: fixed;
    bottom: -5px;
    left: -5px;
    background: #000;
    width: 100%;
    z-index: 10;
    background-image: linear-gradient(-225deg, #212939 0%, #161A24 100%);
    -webkit-box-shadow: 0 -2px 5px 0 rgba(91, 180, 219, 0.5);
    box-shadow: 0 -2px 5px 0 rgba(91, 180, 219, 0.5);
    font-family: Arial, Helvetica, sans-serif;
    color: #000;
    margin: 5px;
    border-radius: 2px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    line-height: initial;
    -webkit-transition: all .5s;
    transition: all .5s;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    &.aplayer-hide{
      bottom: -170px;
      transition: all .5s;
      transform: translate3d(0,0,0);
    }
    .ml-payer-body {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      width: 1098px;
      margin: 0 auto;
      padding: 20px 0;
      position: relative;
      color: #fff;
    }
    .bottom-tab{
      width: 99px;
      height: 18px;
      margin: 0 auto;
      background: url('./assets/bottom-tab.png') no-repeat center;
      text-align: center;
      cursor: pointer;
      position: absolute;
      top: -18px;
      left: 50%;
      margin-left: -50px;
    }
    /*thumb*/
    .player-header{
      display: flex;
      .player-float {
        .player-pic:active {
          cursor: move;
        }
      }

      .player-pic {
        flex-shrink: 0;

        position: relative;
        height: @player-height;
        width: @player-height;
        background-image: url(./assets/default.jpg);
        background-size: cover;
        transition: all 0.3s ease;
        cursor: pointer;
        img{
          width: 100%;
          height: 100%;
        }
        &:hover {
          .player-button {
            opacity: 1;
          }
        }
        .player-button {
          position: absolute;
          border-radius: 50%;
          opacity: 0.8;
          text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
          box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
          background: rgba(0, 0, 0, 0.2);
          transition: all 0.1s ease;

          .player-fill {
            fill: #fff;
          }
        }

        .player-play {
          width: 26px;
          height: 26px;
          border: 2px solid #fff;
          bottom: 50%;
          right: 50%;
          margin: 0 -15px -15px 0;
          .player-icon-play {
            position: absolute;
            top: 3px;
            left: 4px;
            height: 20px;
            width: 20px;
          }
        }

        .player-pause {
          width: 16px;
          height: 16px;
          border: 2px solid #fff;
          bottom: 4px;
          right: 4px;
          .player-icon-pause {
            position: absolute;
            top: 2px;
            left: 2px;
            height: 12px;
            width: 12px;
          }
        }
      }
    }

    .player-control {
      width: 206px;
      padding: 0 10px;
      background: #282828;
      h3{
        margin: 25px 0 5px;
        font-size: 20px;
      }
      p{
        font-size: 12px;
        margin: 0;
      }
      h3,p{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .player-tit{
        height: 42px;
      }
      .player-bnt-group{
        position: relative;
        display: flex;
        margin-top: 27px;
        height: 28px;
        justify-content: space-around;
        background-image: linear-gradient(-45deg, #F63669 0%, #4634A9 100%);
        button{
          display: flex;
          border: none;
          line-height: 28px;
          background-color: transparent;
          outline: none;
          cursor: pointer;
        }
        span{
          line-height: 28px;
          font-size: 12px;
          margin-right: 30px;
        }
        .horn{
          margin-right:0px;
          right: 0;
          top:-12px;
          position: absolute;
          cursor: pointer;
          z-index: 1;
          .el-slider{
            position: absolute;
            right: -5px;
            top: -79px;
            display: none;
            z-index: -1;
            .el-slider__button{
              width: 12px;
              height: 12px;
              border: 1px solid #409EFF;
            }
          }
          &:hover{
            .el-slider{
              display: block;
            }
          }
        }
      }
    }
    .player-info {
      -webkit-box-flex: 1;
      -ms-flex-positive: 1;
      flex-grow: 1;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
      text-align: start;
      padding: 14px 7px 0 10px;
      height: 110px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      overflow: hidden;
      .container{
        width: 100%;
        margin: 0;
      }
    }
  }
</style>
