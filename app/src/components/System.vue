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
      this.showMenuHight()
    },
    methods: {
      showMenuHight: function () {
        //console.log('当前地址：' + window.location.href)
      }
    }
  }
</script>
