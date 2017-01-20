<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="portlet box blue-steel">
        <div class="portlet-body">
          <div class="table-responsive">
            <template v-for="var in vars">
              <div class="col-lg-12 col-md-12 col-sm-12 model-div-title">${var.groupName}</div>
              <template v-for="item in var.groups">
                <div class="col-lg-3 col-md-3 col-sm-6 model-name">${item.groupName}</div>
                <div class="col-lg-2 col-md-2 col-sm-4 model-div"></div>
              </template>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scope>
</style>
<script>
    import QK from '../../../QK'
    export default{
        data(){
            return{
              vars:[{
                  groupName:''  ,
              groups:[{
                  groupName:''
                  }]
               }]

            }
        },
        ready :function(){
             this.init()
        },
        methods:{
           init:function() {
              var that = this
               var applicationId = that.$route.params.aId
               var templateId = that.$route.params.templateId
               console.log(applicationId)
              that.$http.get(QK.SERVER_URL+'/api/application/ipc/'+applicationId+'/'+templateId, true).then(function (data) {
                var data = $.parseJSON(data.body);
                var result = QK.getStateCode(that, data.code)
                if (result.state) {
                  that.$set("vars", data.data)
                }
             })
          }
        }

    }
</script>
