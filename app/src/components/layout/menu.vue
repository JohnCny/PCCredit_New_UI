<template>
  <!--侧导航 start-->
  <ul class="nav nav-pills nav-stacked custom-nav" id="leftNav">
    <li v-for="menu in menuList" class="menu-list">
      <a href="${menu.menuUrl}">
        <i class="fa fa-home"></i>
        <span>${menu.menuNameZh}</span>
      </a>
      <ul v-if="menu.menuLists.length > 0" class="sub-menu-list">
        <template v-for="menuSmall in menu.menuLists">
          <li class="dropdown more-dropdown-sub">
            <a class="dropdowna" href="${menuSmall.menuUrl}" @click="navTabClick(menuSmall.menuUrl)"> ${menuSmall.menuNameZh}</a>
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
  import nicescroll from 'jquery.nicescroll'
  export default{
    components: {},
    data(){
      return {
        menuList: [],
      }
    },
    ready: function () {
      this.init()
    },
    methods: {
      init: function () {
        var that = this
        $('body').css({'background': '#424f63'})
        that.$http.get(QK.SERVER_URL + '/api/menu/all').then(function (res) {
          var data = $.parseJSON(res.body)
          that.menuList = data.data.menus
        }).then(function () {
          var locationUrl = window.location.href
          var partUrl = locationUrl.split('system/')[1]
          $('.sub-menu-list > li a').each(function () {
            var tempA = $(this).attr('href');
            if (tempA.indexOf('system/') != -1) {
              if (tempA.split('system/')[1] == partUrl) {
                $(this).parent().addClass('active')
                $(this).parents('.menu-list').addClass('nav-active')
              }
            }
          })
        })
      },
      navTabClick: function (url) {
        var that = this
        if(url == '/system/products'){
          url = '/system/products/'+localStorage.role
        }
        if(url == '/system/managers/parameter/list'){
          url = '/system/managers/parameter/'+localStorage.role+'/list'
        }
        that.$router.go({path: url})
      },
    }
  }

</script>
