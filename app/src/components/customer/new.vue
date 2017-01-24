<template>
  <section class="panel">
    <header class="panel-heading custom-tab">
      <ul class="nav nav-tabs">
        <li class="active">
          <a data-toggle="tab" href="#home3">
            <i class="fa fa-user"></i>
            新建个人客户
          </a>
        </li>
        <li class="">
          <a data-toggle="tab" href="#about3">
            <i class="fa fa-university"></i>
            新建企业客户
          </a>
        </li>
      </ul>
    </header>
    <div class="panel-body">
      <div class="tab-content">
        <div id="home3" class="tab-pane active">
          <new-cus></new-cus>
        </div>
        <div id="about3" class="tab-pane">
          <new-enterprise></new-enterprise>
        </div>

      </div>
    </div>
  </section>
</template>
<script>
  import QK from '../../QK'
  import newCus from './newCus.vue'
  import newEnterprise from './newEnterprise.vue'
  export default{
      data(){
          return{
          }
      },
      ready: function () {

      },
      components: {
         'new-cus': newCus,
         'new-enterprise': newEnterprise
      },
      methods:{

      }
  }
</script>
