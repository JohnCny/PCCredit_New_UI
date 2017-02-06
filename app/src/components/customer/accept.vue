<template>
  <section class="panel">
    <header class="panel-heading custom-tab">
      <ul class="nav nav-tabs">
        <li class="active">
          <a data-toggle="tab" href="#home3">
            <i class="fa fa-user"></i>
            个人客户接受
          </a>
        </li>
        <li class="">
          <a data-toggle="tab" href="#about3">
            <i class="fa fa-university"></i>
            企业客户接受
          </a>
        </li>
      </ul>
    </header>
    <div class="panel-body">
      <div class="tab-content">
        <div id="home3" class="tab-pane active">
          <accept-cus></accept-cus>
        </div>
        <div id="about3" class="tab-pane">
          <accept-enterprise></accept-enterprise>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  import QK from '../../QK'
  import acceptCus from './acceptCus.vue'
  import acceptEnterprise from './acceptEnterprise.vue'
  export default{
     data(){
      return{
      }
    },
    ready: function () {
    },
    components: {
       'accept-cus': acceptCus,
       'accept-enterprise': acceptEnterprise
    },
    methods:{

    }
  }
</script>
