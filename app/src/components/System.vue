<template>
  <index></index>
</template>
<script>
  import Index from './home/index.vue'
  export default{
    components: {
      Index
    },
    route: {
      canReuse: function () {
        return false
      }
    },
    ready: function () {
      this.init()
    },
    methods: {
      init: function () {

      }
    }
  }
</script>
