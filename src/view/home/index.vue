<template>
  <div>
    <x-header></x-header>
    <router-view/>
  </div>
</template>
<script>
import XHeader from '@/view/home/header.vue'
export default {
  components: {XHeader},
  data () {
    return {}
  },
  methods: {

  },
  mounted () {

  }
}
</script>
