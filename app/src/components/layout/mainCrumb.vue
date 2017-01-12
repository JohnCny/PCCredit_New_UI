<template>
  <div class="page-heading">
    <h3>
      ${crumbData.currentLocalData}
    </h3>
    <ul class="breadcrumb">
      <li>
        当前位置：<a href="#">${crumbData.currentLocal}</a>
      </li>
      <li class="active"> ${crumbData.currentUser}</li>
    </ul>
  </div>
</template>
<script>
  import QK from '../../QK'
  export default{
    data(){
      return {
        crumbData: {
          currentLocal: '',
          currentLocalData: '',
          currentUser: '',
        }
      }
    },
    created: function(){
      QK.vector.$on('getfromCrumb',this.bindCrumbData)
    },
    beforeDestroy: function(){
      QK.vector.$off('getfromCrumb',this.bindCrumbData)
    },
    ready: function () {

    },
    methods: {
      bindCrumbData: function(data){
        this.$set('crumbData.currentLocal', data.currentLocal)
        this.$set('crumbData.currentLocalData', data.currentLocalData)
        this.$set('crumbData.currentUser', data.currentUser)
      },
    }
  }
</script>
