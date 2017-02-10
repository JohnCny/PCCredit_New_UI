<template>
  <my-tab></my-tab>
  <div class="row">
    <div class="col-sm-12 col-lg-12 col-md-12 col-sm-12">
      <ul class="myTab1" id="menu1">
        <template v-for="(index,ipc) in ipcMenu">
          <li v-bind:data-id="ipc.templateId" v-bind:data-menuid="ipc.menuId" v-bind:class="{ active: !index}" v-on:click="setTab2" >${ipc.menuName}</li>
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
      <button v-on:click="nextStep()" class="btn btn-success">下一步</button>
      <button v-on:click="cancel()"  class="btn btn-info">返回上一步</button>
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
</style>
<script>
  import QK from '../../../QK'
  import myTab from '.././myTab.vue'
  import zcfz from './zcfz.vue'
  import jcjy from './jcjy.vue'
  import xjl from './xjl.vue'
  export default{
    data(){
      return{
        varsArr:[],
        ipcMenu:[],
        ids:[],
        index:0,
      }
    },
    components: {
      "my-tab": myTab,
      zcfz,
      jcjy,
      xjl
    },
    ready:function(){
      this.init()
    },
    methods:{
      getVarsArr: function(){
        return this.varsArr
      },
      init:function() {
        var that = this
        //第一个财务报表显示其余的隐藏
        $("div.tabContent").eq(0).show().siblings("div.tabContent").hide()
        //当前页进度条样式
        $(".xzkhNormal,.sqbNormal,.ipcNormal").css({"background":"url(../../../static/images/stepActive.png) no-repeat left center","color":"#fff"})
        //进件Id
        var applicationId = that.$route.params.appliId
        //获取该进件下的所有申请项
        that.$http.get(QK.SERVER_URL+'/api/application/ipc/menu/'+applicationId, true).then(function (data) {
          var data = $.parseJSON(data.body);
          var result = QK.getStateCode(that, data.code)
          if (result.state){
            that.$set("ipcMenu", data.data)
            $(that.ipcMenu).each(function(i,v){
              that.ids.push($(v)[0].templateId)
            })
            var divs = $("div.tabContent")
            for(var i =0;i<divs.length;i++){
              $(divs[i]).addClass("tabContent"+that.ids[i])
            }
            that.getArr()
          }
        }).then(function(){
          QK.getActive("/system/application/new")
        })
      },
      getArr: function(){
        var that = this
        if(that.index>=that.ids.length){
          QK.vector.$emit('getfromcwbb', that.getVarsArr())
          return
        }
        var applicationId = that.$route.params.appliId
        that.$http.get(QK.SERVER_URL+'/api/application/ipc/'+applicationId+'/'+that.ids[that.index]).then(function (data) {
          var data = $.parseJSON(data.body)
          var result = QK.getStateCode(that, data.code)
          if (result.state) {
            that.varsArr.push(data.data)
            that.index++
            that.getArr()
          }
        })
      },
      setTab2:function(){
        var that = this
        $(event.currentTarget).addClass("active").siblings("li").removeClass("active")
        var applicationId = that.$route.params.appliId
        var templateId = $(event.currentTarget).data("id")?$(event.currentTarget).data("id"):that.ids[0]
        $("div.tabContent"+templateId).show().siblings("div.tabContent").hide()
      },
      nextStep: function(){
        var that = this
        var id = that.$route.params.appliId
        that.$router.go({path:"/system/application/picture/"+id})
      },
      cancel :function(){
         window.history.back()
      }
    }
 }
</script>
