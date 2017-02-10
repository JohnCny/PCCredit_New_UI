<!--各机构贷款情况-->
<template>
  <div class="col-md-5 col-md-offset-1 col-sm-6 col-xs-12">
    <div class="form-group">
      <label for=""style="font-size:18px;color:#49586e;">各机构贷款情况</label>
      <div class="input-icon right">
        <div id="echart2" style="height:350px;"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import QK from '../../QK'
  import echarts from 'echarts'
  export default{
    data(){
      return {
        orgname:[],
        passnum:[],
        ingnum:[],
        refusenum:[]
      }
    },
    components: {},
     ready() {
      this.getDataOne()
     },
    methods: {
      getDataOne: function () {
        var myChart2 = echarts.init(document.getElementById('echart2'))
        var that = this
        that.$http.get(QK.SERVER_URL + '/api/index').then(function (data) {
          var data = jQuery.parseJSON(data.body)
          var result = QK.getStateCode(that, data.code)
          if (result.state) {
            console.log(result.msg)
            var message = data.data.indexOrgApplicationInfoList
            for(var i = 0;i <= message.length-1;i++){
              that.orgname.push(message[i].orgName)
              that.passnum.push(message[i].indexApplicationInfoList[3].count)
              that.ingnum.push(message[i].indexApplicationInfoList[0].count)
              that.refusenum.push(message[i].indexApplicationInfoList[4].count)
            }
            var option = {
                      tooltip : {
                          trigger: 'axis',
                          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                          }
                      },
                      legend: {
                          data:['已通过进件','审批中的进件','拒件']
                      },
                      grid: {
                          left: '3%',
                          right: '4%',
                          bottom: '3%',
                          containLabel: true
                      },
                      xAxis : [
                          {
                              type : 'category',
                              data : that.orgname
                          }
                      ],
                      yAxis : [
                          {
                              type : 'value'
                          }
                      ],
                      series : [
                          {
                              name:'已通过进件',
                              type:'bar',
                              data: [12,26,13,26,26]
                          },
                          {
                              name:'审批中的进件',
                              type:'bar',
                              data:[8,9,16,14,16]
                          },
                          {
                              name:'拒件',
                              type:'bar',
                              data:[11,19,12,15,16]
                          },
                      ]
                  }
            myChart2.setOption(option)
             window.addEventListener("resize",function(){
                myChart2.resize()
            });
          }
          else {
            console.log("**************************************" + result.msg)
          }
        })
      }
    }
  }
</script>
