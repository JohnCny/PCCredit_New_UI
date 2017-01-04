<template>
  <!--侧导航 start-->
  <ul class="nav nav-pills nav-stacked custom-nav"  id="leftNav" >
    <li v-for="menu in menuList" class="menu-list">
      <a href="${menu.menuUrl}">
        <i class=""></i>
        <span>${menu.menuNameZh}</span>
      </a>
      <ul v-if="menu.menuLists.length > 0" class="sub-menu-list">
        <template v-for="menuSmall in menu.menuLists">
          <li class="dropdown more-dropdown-sub">
            <a href="${menuSmall.menuUrl}"> ${menuSmall.menuNameZh}</a>
          </li>
        </template>
      </ul>
    </li>
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
      }
    },
    ready: function () {
      this.showMenu()
    },
    methods: {
      showMenu: function () {
        var that = this
        that.$http.get(QK.SERVER_URL+'/api/menu/all').then(function(res){
          var data = jQuery.parseJSON(res.body)
          console.log(data.data.menus)
          that.menuList = data.data.menus
        }).then(function(){
          var locationUrl = window.location.href
          var arr = locationUrl.split('#')
          var partUrl = arr[1]
          $('.sub-menu-list > li a').each(function(){
            if($(this).data('url') == partUrl){
              $(this).parent().addClass('active')
              $(this).parents('.menu-list').addClass('nav-active')
            }
          })
        })
      }
    }
  }

</script>
