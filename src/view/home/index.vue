<template>
  <div>
    <x-header></x-header>
    <router-view/>
    <x-footer></x-footer>
  </div>
</template>
<script>
import XHeader from '@/view/home/header.vue'
import XFooter from '@/view/home/footer.vue'
export default {
  components: {XHeader,XFooter},
  data () {
    return {}
  },
  methods: {

  },
  mounted () {

  }
}
</script>
