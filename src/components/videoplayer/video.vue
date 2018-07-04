<temlate>
    <div class="video-box">
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
</temlate>

<script>
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import { videoPlayer } from 'vue-video-player'
export default {
  components: {videoPlayer},
  props: ['playerOptions', 'musicList'],
  data () {
    return {
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
        }
    }
  },
  methods: {
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
  }
}