<template>
  <div class="aplayer-header">
    <div
      class="aplayer-pic"
      :style="currentPicStyleObj"
    >
      <!--<div class="aplayer-button" :class="playing ? 'aplayer-pause' : 'aplayer-play'">-->
        <!--<icon-button-->
          <!--:icon="playing ? 'pause' : 'play'"-->
          <!--:class="playing ? 'aplayer-icon-pause' : 'aplayer-icon-play'"-->
        <!--/>-->
      <!--</div>-->
    </div>
    <div class="aplayer-control">
      <div class="aplayer-tit">
        <h3>{{title}}</h3>
        <p>{{artist}}</p>
        <div class="player-bnt-group">
          <button><i class="icon-prev"></i></button>
          <button @click="onClick"><i :class="playing ? 'icon-pause' : 'icon-play'"></i></button>
          <button><i class="icon-next"></i></button>
          <span>{{secondToTime(stat.playedTime)}}</span>
          <span class="horn"><i class="icon-horn"></i></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IconButton from './aplayer-iconbutton.vue'

export default {
  components: {
    IconButton,
  },
  props: {
    pic: String,
    title: String,
    artist: String,
    theme: String,
    stat: Object,
    playing: {
      type: Boolean,
      default: false,
    },
    enableDrag: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      hasMovedSinceMouseDown: false,
      dragStartX: 0,
      dragStartY: 0
    }
  },
  computed: {
    currentPicStyleObj () {
      if (!this.pic) return {}
      return {
        backgroundImage: `url(${this.pic})`,
        backgroundColor: this.theme
      }
    },
  },
  methods: {
    onDragBegin (e) {
      if (this.enableDrag) {
        this.hasMovedSinceMouseDown = false
        this.$emit('dragbegin')
        this.dragStartX = e.clientX
        this.dragStartY = e.clientY
        document.addEventListener('mousemove', this.onDocumentMouseMove)
        document.addEventListener('mouseup', this.onDocumentMouseUp)
      }
    },
    onDocumentMouseMove (e) {
      this.hasMovedSinceMouseDown = true
      this.$emit('dragging', {offsetLeft: e.clientX - this.dragStartX, offsetTop: e.clientY - this.dragStartY})
    },
    onDocumentMouseUp (e) {
      document.removeEventListener('mouseup', this.onDocumentMouseUp)
      document.removeEventListener('mousemove', this.onDocumentMouseMove)

      this.$emit('dragend')
    },
    secondToTime (second) {
      if (isNaN(second)) {
        return '00:00'
      }
      const pad0 = (num) => {
        return num < 10 ? '0' + num : '' + num
      }

      const min = Math.trunc(second / 60)
      const sec = Math.trunc(second - min * 60)
      const hours = Math.trunc(min / 60)
      const minAdjust = Math.trunc((second / 60) - (60 * Math.trunc((second / 60) / 60)))
      return second >= 3600 ? pad0(hours) + ':' + pad0(minAdjust) + ':' + pad0(sec) : pad0(min) + ':' + pad0(sec)
    },
    onClick () {
      if (!this.hasMovedSinceMouseDown) {
        this.$emit('toggleplay')
      }
    }
  }
}
</script>

<style lang="less">
  @import "../less/variables";
  .aplayer-header{
    display: flex;
  }
  .aplayer-float {
    .aplayer-pic:active {
      cursor: move;
    }
  }

  .aplayer-pic {
    flex-shrink: 0;

    position: relative;
    height: @aplayer-height;
    width: @aplayer-height;
    background-image: url(../default.jpg);
    background-size: cover;
    transition: all 0.3s ease;
    cursor: pointer;
    &:hover {
      .aplayer-button {
        opacity: 1;
      }
    }
    .aplayer-button {
      position: absolute;
      border-radius: 50%;
      opacity: 0.8;
      text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
      background: rgba(0, 0, 0, 0.2);
      transition: all 0.1s ease;

      .aplayer-fill {
        fill: #fff;
      }
    }

    .aplayer-play {
      width: 26px;
      height: 26px;
      border: 2px solid #fff;
      bottom: 50%;
      right: 50%;
      margin: 0 -15px -15px 0;
      .aplayer-icon-play {
        position: absolute;
        top: 3px;
        left: 4px;
        height: 20px;
        width: 20px;
      }
    }

    .aplayer-pause {
      width: 16px;
      height: 16px;
      border: 2px solid #fff;
      bottom: 4px;
      right: 4px;
      .aplayer-icon-pause {
        position: absolute;
        top: 2px;
        left: 2px;
        height: 12px;
        width: 12px;
      }
    }
  }
  .aplayer-control {
    width: 206px;
    padding: 0 10px;
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
      }
    }
  }
</style>
