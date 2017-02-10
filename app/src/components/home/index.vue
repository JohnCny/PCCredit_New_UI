<template>
  <left></left>
  <main></main>
</template>
<script>
  import Left from '../layout/left.vue'
  import Main from '../layout/main.vue'
  export default{
    data(){
      return {
        msg: 'hello vue'
      }
    },
    components: {
      Left,
      Main,
    }
  }
</script>
