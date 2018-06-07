<!--<template>-->
  <!--<div>-->
    <!--<div>-->
      <!--<img src="/src/assets/img/logo.png.">-->
      <!--<div>-->
          <!--<a href="">yy</a>-->
      <!--</div>-->
    <!--</div>-->
  <!--</div>-->
<!--</template>-->
<!--<script>-->
<!--export default {-->
  <!--name: 'XHeader'-->
<!--}-->
<!--</script>-->
<template>
  <ul class="bread-crumb">
    <li v-for="(item,index) in breadData" v-bind:key="index"><span v-if="index!=0">></span>{{item}}</li>
  </ul>
</template>

<script>
export default {
  name: 'BreadCrumb',
  data () {
    return {
      breadData: ['首页', '内容']
    }
  }
}
</script>
