<!--各机构逾期不良情况-->
<template>
  <div id="echart2" style="height:200px;"></div>
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
            //var message = data.data.indexOrgApplicationInfoList
            //for(var i = 0;i <= message.length-1;i++){
             // that.orgname.push(message[i].orgName)
            //  that.passnum.push(message[i].indexApplicationInfoList[3].count)
            //  that.ingnum.push(message[i].indexApplicationInfoList[0].count)
            //  that.refusenum.push(message[i].indexApplicationInfoList[4].count)
           // }
            var option = {
                       tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                     color:['#11C2EE', '#F70997','yellow','blueviolet'],
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data:['当前未提交进件','当前审批中进件','已退回进件']
                    },
                    series: [
                        {
                            name:'访问来源',
                            type:'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '14',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[
                                {value:235, name:'当前未提交进件'},
                                {value:135, name:'当前审批中进件'},
                                {value:154, name:'已退回进件'}
                            ]
                        }
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
