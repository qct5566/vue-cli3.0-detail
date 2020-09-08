<!-- 所有页面的入口组件 -->
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {}
  },
  created () {
    // console.log(this.$bus)
  },
  methods: {}
}
</script>
