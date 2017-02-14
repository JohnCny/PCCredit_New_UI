<!--各机构逾期不良情况-->
<template>
  <div id="echart3" style="height:400px;"></div>
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
        var myChart3 = echarts.init(document.getElementById('echart3'))
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
                       title: {
                        text: '贷款逾期情况',
                        subtext: ''
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['逾期客户数','不良客户数','逾期率','不良率']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            dataView: {readOnly: false},
                            magicType: {type: ['line', 'bar']},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    xAxis:  {
                        type: 'category',
                        boundaryGap: false,
                        data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                    series: [
                        {
                            name:'逾期客户数',
                            type:'line',
                            data:[11, 11, 15, 13, 12, 13, 10 , 15 , 16 , 8 , 39 , 15],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name:'不良客户数',
                            type:'line',
                            data:[1, 13, 2, 5, 3, 2, 0, 5, 6, 9, 19, 34],
                            markPoint: {
                                data: [
                                    {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'},
                                    [{
                                        symbol: 'none',
                                        x: '90%',
                                        yAxis: 'max'
                                    }, {
                                        symbol: 'circle',
                                        label: {
                                            normal: {
                                                position: 'start',
                                                formatter: '最大值'
                                            }
                                        },
                                        type: 'max',
                                        name: '最高点'
                                    }]
                                ]
                            }
                        },
                         {
                            name:'逾期率',
                            type:'line',
                            data:[18, 11, 25, 13, 16, 23, 19 , 12 , 13 , 5 , 31 , 22],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name:'不良率',
                            type:'line',
                            data:[26, 21, 16, 26, 24, 12, 9 , 3 , 26 , 36 , 14 , 16],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        },
                    ]
                  }
            myChart3.setOption(option)
             window.addEventListener("resize",function(){
                myChart3.resize()
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
