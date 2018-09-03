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
    let lang = sessionStorage.getItem('lang')
    if (lang === 'CN') {
      this.$i18n.locale = 'zh-CN'
    } else {
      this.$i18n.locale = 'en-US'
    }
  }
}
</script>
