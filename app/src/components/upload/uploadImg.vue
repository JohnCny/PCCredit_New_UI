<template>
  <div class="col-md-12">
    <section class="panel">
      <header class="panel-heading">
        图像上传
      </header>
      <div class="panel-body">
        <div id="app">
          <a class="btn" @click="toggleShow">设置头像</a>
          <my-upload  v-model="show" field="files" :width="64" :height="64" url="/api/files" :params="params" :value.sync="show" img-format="png"></my-upload>
          <img :src="imgDataUrl">
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import QK from '../../QK'
  import myUpload from 'vue-image-crop-upload'
    export default{
       data(){
        return{
          userSession:{},
          show: false,
          params: {
              token: '',
              name: 'filename'
          },
          imgDataUrl: ''// the datebase64 url of created image
        }
      },
      ready: function () {
      },
      components: {
         'my-upload': myUpload
      },
      methods:{
        toggleShow: function(){
            this.show = !this.show
        }
      },
      events: {
            /**
             * crop success
             * [param] imgDataUrl
             * [param] field
             */
            cropSuccess(imgDataUrl, field){
                console.log('-------- crop success --------');
                this.imgDataUrl = imgDataUrl;
            },
            /**
             * upload success
             * [param] jsonData   server api return data, already json encode
             * [param] field
             */
            cropUploadSuccess(jsonData, field){
                console.log('-------- upload success --------');
                console.log(jsonData);
                console.log('field: ' + field);
            },
            /**
             * upload fail
             * [param] status    server api return error status, like 500
             * [param] field
             */
            cropUploadFail(status, field){
                console.log('-------- upload fail --------');
                console.log(status);
                console.log('field: ' + field);
            }
        }
    }





</script>
