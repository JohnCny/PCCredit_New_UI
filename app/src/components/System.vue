<template>
  <index></index>
</template>
<script>
  import Index from './home/index.vue'
  export default{
    components: {
      Index
    },
    ready: function () {
      this.init()
    },
    methods: {
      init: function () {
        //console.log('当前地址：' + window.location.href)
      }
    }
  }
</script>
