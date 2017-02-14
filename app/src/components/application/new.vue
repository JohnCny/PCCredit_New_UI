<style src='../../../static/css/Tabs.css'></style>
<template>
  <my-tab></my-tab>
  <div class="col-sm-12 col-lg-12 col-md-12 col-sm-12">
    <ul class="nav nav-tabs">
      <li class="active">
        <a data-toggle="tab" href="#home3">
          <i class="fa fa-user"></i>
          个人产品列表
        </a>
      </li>
      <li class="">
        <a data-toggle="tab" href="#about3">
          <i class="fa fa-user"></i>
          企业产品列表
        </a>
      </li>
    </ul>
  </div>
  <div class="panel-body">
    <div class="tab-content">
      <div id="home3" class="tab-pane active">
        <person-product></person-product>
      </div>
      <div id="about3" class="tab-pane">
        <team-product></team-product>
      </div>
    </div>
  </div>

</template>
<style scoped>
    .nav > li > a:hover, .nav > li > a:focus {
      text-decoration: none;
      background-color: #fff;
    }
    active{
     background:#eff0f4;
    }
    .myTab1 {
      margin:0;
    }
    .myTab1 li{
      display:inline-block;
      list-style:none;
      background:#fff;
      border:1px solid #eff0f4;
      color:#bbb;
      padding:7px 15px;
      border-radius:5px 5px 0 0;
      margin-right:1px;
      cursor:pointer;
    }
    .myTab1 .active{
      color:#fff;background: #65cea7!important;
      border:1px solid #65cea7;
    }
  .myTab li{
    width: 150px;
    float: left;
    text-align: center;
    list-style: none;
    line-height: 50px;
    margin-bottom:10px;
  }
  .activePro{
     background-color: #dff0d8 !important;
     border:1px solid
  }
</style>
<script>
    import QK from '../../QK'
    import myTab from './myTab.vue'
    import personProduct from './personProduct.vue'
    import teamProduct from './teamProduct.vue'
    export default{
        data(){
            return{

            }
        },
        ready: function () {

        },
        methods:{

    },
        components: {
            personProduct,
            teamProduct,
            myTab
        }
    }
</script>
