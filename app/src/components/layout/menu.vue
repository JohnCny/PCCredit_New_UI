<template>
  <!--侧导航 start-->
  <ul class="nav nav-pills nav-stacked custom-nav"  id="leftNav" v-for="menu in menuList">
    <li v-if="menu.menuList|length" class="menu-list">
      <a v-on:click="setMenuName(menu)" href="${menu.menuUrl}">
        <i class="${menu.menuPicture}"></i>
        <span>${menu.menuNameZh}</span>
      </a>
      <ul v-for="menuSmall in menu.menuList" >
         <li><a v-on:click="setMenuName(menuSmall)" href="${menuSmall.menuUrl}"> ${menuSmall.menuNameZh}</a></li>
      </ul>
    </li>
    <li v-else><a v-on:click="setMenuName(menu)" href="${menu.menuUrl}"><i class="${menu.menuPicture}"></i><span>${menu.menuNameZh}</span></a></li>

  </ul>
  <!--侧导航 end-->
</template>
<style scoped>

</style>

<script>
  import QK from '../../QK'

  export default{
    components: {

    },
     data(){
      return {
        menuList: [],
        menuName: {
          "name": " "
        },
      }
    },
    ready: function () {
      this.showMenu()
    },
    methods: {
      getMenuName : function(){
        var that = this
        var menuName = localStorage.url?localStorage.url:"javaScript:;"
        that.menuName.name = menuName
      },
      setMenuName : function(menu){
        localStorage.url = menu.menuUrl
      },
      showMenu: function () {
        var that = this
        that.$http.get(QK.SERVER_URL+'/api/menu/all').then(function(res){
          var data = jQuery.parseJSON(res.body)
          console.log(data.data.menus)
          that.menuList = data.data.menus
        })
      }
    }
  }

</script>
