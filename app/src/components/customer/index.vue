<template>
  <section class="panel">
    <header class="panel-heading custom-tab">
      <ul class="nav nav-tabs">
        <li class="active">
          <a data-toggle="tab" href="#home3">
            <i class="fa fa-user"></i>
            个人客户列表
          </a>
        </li>
        <li class="">
          <a data-toggle="tab" href="#about3">
            <i class="fa fa-university"></i>
            企业客户列表
          </a>
        </li>
      </ul>
    </header>
    <div class="panel-body">
      <div class="tab-content">
        <div id="home3" class="tab-pane active">
          <index-cus></index-cus>
        </div>
        <div id="about3" class="tab-pane">
          <index-enterprise></index-enterprise>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
    import QK from '../../QK'
    import indexCus from './indexCus.vue'
    import indexEnterprise from './indexEnterprise.vue'
    export default{
        data(){
            return{
            }
        },
        ready: function () {

        },
        components: {
            'index-cus': indexCus,
            'index-enterprise': indexEnterprise
        },
        methods:{

        }
    }
</script>
