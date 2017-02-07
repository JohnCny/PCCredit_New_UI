<style src='../../../../static/css/Tabs.css'></style>
<template>
  <my-tab></my-tab>
  <div class="row">
    <div class="col-sm-12 col-lg-12 col-md-12 col-sm-12">
      <ul class="myTab1" id="menu1">
        <template v-for="ipc in ipcMenu">
          <li v-on:click="setTab2" v-bind:data-id="ipc.menuId" v-bind:class="ipc.classname">${ipc.menuName}</li>
        </template>
      </ul>
      <section class="panel">
        <div class="panel-body">
          <div class="table-responsive">
            <div id="zcfz" class="tabContent"><zcfz></zcfz></div>
            <div id="jcjy" class="tabContent"><jcjy></jcjy></div>
            <div id="xjl"  class="tabContent"><xjl></xjl></div>
          </div>
        </div>
      </section>
    </div>
    <div class="col-xs-12 col-md-offset-5 contain" style="margin-bottom:10px;">
      <button v-on:click="nextStep" class="btn btn-success">下一步</button>
      <button v-on:click="cancel"  class="btn btn-info">返回上一步</button>
    </div>
  </div>
</template>
<style scoped>
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
  import QK from '../../../QK'
  import zcfz from './zcfz.vue'
  import jcjy from './jcjy.vue'
  import xjl from './xjl.vue'
  import myTab from '../myTab.vue'
  export default{
    components: {
      zcfz,
      jcjy,
      xjl,
      myTab
    },
    data(){
      return{
        ipcMenu:[],
        ids:[]
      }
    },
    ready:function(){
      this.ipcTab()
      this.init()
      this.initActive()
    },
    methods:{
      init: function(){
        var that = this
        $("#zcfz").show().siblings("div.tabContent").hide()
        $("#menu1 li").eq(0).addClass('active')
        //that.ipcMenu.each(function(i,v){
          //that.ids.push($(v)[0].menuId)
        //})
        //for(var i =0;i<$("div.tabContent").length;i++){
          //$("div.tabContent")[i].addClass("tabContent"+that.ids[i])
        //}
      },
      ipcTab:function() {
        var that = this
        var id = that.$route.params.appliId
        that.$http.get(QK.SERVER_URL+'/api/application/ipc/menu/'+id, true).then(function (data) {
          var data = $.parseJSON(data.body)
          var result = QK.getStateCode(that, data.code)
          if (result.state){
            that.$set("ipcMenu", data.data)
            //var templateId = data.data.templateId
            console.log(that.ipcMenu)
          }
        })
      },
     initActive: function(){
        $(".ipcNormal,.xzkhNormal,.sqbNormal").css({"background":"url(../../../static/images/stepActive.png) no-repeat left center","color":"#fff"})
      },
      setTab2:function(){
        var that = this
          $(event.currentTarget).addClass("active").siblings("li").removeClass("active")
          var id = $(event.currentTarget).data("id")
          console.log(id)
          //$("div.tabContent"+id).show().siblings("div.tabContent").hide()
          if(id == '1'){
            $("#zcfz").show().siblings("div.tabContent").hide()
          }else if(id == '4'){
            $("#jcjy").show().siblings("div.tabContent").hide()
          }else if(id == '6'){
            $("#xjl").show().siblings("div.tabContent").hide()
        }
      },
      nextStep: function(){
         var that = this
         var id = that.$route.params.appliId
         this.$router.go({path:"/system/application/picture/"+id})
      },
      cancel :function(){
         window.history.back()
      }
    }
 }
</script>
