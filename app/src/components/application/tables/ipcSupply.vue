<style src='../../../../static/css/Tabs.css'></style>
<template>
  <ul class="myTab">
    <template v-for="todo in infoData">
      <li v-bind:data-id="todo.id" v-bind:class="todo.classname">${todo.text}</li>
    </template>
  </ul>
  <div class="row">
    <div class="col-sm-12 col-lg-12 col-md-12 col-sm-12">
      <ul class="myTab1" id="menu1">
        <template v-for="ipc in ipcMenu">
          <li v-on:click="setTab2" value="${ipc.menuId}" v-bind:data-id="ipc.menuId" v-bind:class="ipc.classname">${ipc.menuName}</li>
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
      <button id="btn_submit" v-on:click="nextStep()" class="btn btn-success">下一步</button>
      <a v-on:click="cancel()"  type="reset" class="btn btn-info">返回上一步</a>
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
   .stepActive{
     color:#fff;
     background:url(../../../../static/images/stepActive.png) no-repeat left center;
   }
  .stepActiveL{
     color:#fff;
     background:url(../../../../static/images/stepActiveL.png) no-repeat left center;
  }
  .stepActiveR{
     color:#fff;
     background:url(../../../../static/images/stepActiveR.png) no-repeat left center;
  }
  .stepLast{
     background:url(../../../../static/images/stepLast.png) no-repeat left center;
  }
  .stepNormal{
     background:url(../../../../static/images/stepNormal.png) no-repeat left center;
  }
</style>
<script>
    import QK from '../../../QK'
    import zcfz from './zcfz.vue'
    import jcjy from './jcjy.vue'
    import xjl from './xjl.vue'

    export default{
      components: {
                zcfz,
                jcjy,
                xjl
           },
        data(){
            return{
              infoData:[
                {id:'sqcp',text:'选择申请产品',classname:'stepActiveL'},
                {id:'xzkh',text:'选择申请客户',classname:'stepActive'},
                {id:'sqb',text:'填写申请表',classname:'stepActive'},
                {id:'ipc',text:'填写IPC调查报告',classname:'stepActive'},
                {id:'dctp',text:'上传调查图片',classname:'stepNormal'},
                {id:'zxbg',text:'上传征信报告',classname:'stepNormal'},
                {id:'xxzl',text:'信息总览',classname:'stepLast'}
                ],
              ipcMenu:[
              {menuId: '1',menuName: '',classname:'active'}
              ],
            }
        },
         ready:function(){
           this.ipcTab()
           this.init()
        },
      methods:{
          init: function(){
           $("#zcfz").show().siblings("div.tabContent").hide()
           $("#menu1").eq(0).addClass('active')
          },
          ipcTab:function() {
              var that = this
               var id = that.$route.params.aId
              that.$http.get(QK.SERVER_URL+'/api/application/ipc/menu/'+id, true).then(function (data) {
                var data = $.parseJSON(data.body);
                var result = QK.getStateCode(that, data.code)
                if (result.state){
                  that.$set("ipcMenu", data.data)
                  var templateId = data.data.templateId

                }
              })
            },
            setTab2:function(){
                var that = this
                  $(event.currentTarget).addClass("active").siblings("li").removeClass("active")
                  var id = $(event.currentTarget).data("id")
                  console.log(id)
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
               var id = that.$route.params.aId
              that.$http.get(QK.SERVER_URL+'/api/applicationInvestPicture/ifFileNext/'+id, true).then(function (data) {
                var data = $.parseJSON(data.body);
                var result = QK.getStateCode(that, data.code)
                if (result.state){
                   that.$router.go({path:"/system/application/picture/"+id})
                }
              })
            },
            cancel :function(){
               window.history.back()
            }
       }
   }
</script>
