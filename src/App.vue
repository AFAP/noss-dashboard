<template>
  <div id="app" :style="{height: documentClientHeight +'px'}">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  data() {
    return {
      documentClientHeight: 0,
    }
  },
  created() {
  },
  mounted() {
    this.documentClientHeight = document.documentElement["clientHeight"];
  },
  methods: {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
