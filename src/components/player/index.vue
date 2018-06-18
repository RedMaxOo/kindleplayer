<template>
  <aplayer controls :float='fixed'
    :music='isPlaying'
  />
</template>
<script>
import Aplayer from '@/components/vue-aplayer/src/vue-aplayer'
export default {
  components: {Aplayer},
  data () {
    return {
      fixed: true,
      lists: [],
      isPlaying: {
        title: 'htifoipri ',
        artist: 'Silent Siren',
        src: 'https://kindlemusic.blob.core.chinacloudapi.cn/prods3/music/AMT04_TK206_MOON_PATROL_Paul_Dinletir_(ASCAP)_NAOMIVILLE_MUSIC.mp3', // https://kindlemusic.blob.core.chinacloudapi.cn/prods3/music/AMP01_TK18_SPYRE_HUNTERS_Paul_Dinletir_(ASCAP)_NAOMIVILLE_MUSIC.mp3
        pic: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.jpg'
      }
    }
  },
  methods: {

  },
  mounted () {

  }
}
</script>
