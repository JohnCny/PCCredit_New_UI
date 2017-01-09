<template>
  <div class="col-sm-3">
    <org-tree></org-tree>
  </div>
</template>
<script>
     import ztree from 'ztree'
     import OrgTree from '../tree/orgTree.vue'
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        components:{
            'other-component':OtherComponent,
            HeaderComponent,
        }
    }
</script>
