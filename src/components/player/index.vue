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
      isPlaying: {
        title: 'htifoipri ',
        artist: 'Silent Siren',
        src: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.mp3',
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
