<template>
  <div class="row">
    <div class="col-md-12">
      <section class="panel">
        <div class="panel-body">
          <div class="row">
            <div class="col-md-4 col-sm-6 col-xs-12">
              <div class="form-ground backgrounds colorone">
                <label for=""style="font-size:18px;color:#fff;">进件情况</label>
                <div class="input-icon right">
                  <div id="echart1" style="height:200px;"></div>
                </div>
              </div>
            </div>
            <div class=" col-md-4 col-sm-6 col-xs-12">
              <div class="form-ground backgrounds colortwo">
                <label for=""style="font-size:18px;color:#fff;">贷款情况</label>
                <div class="input-icon right">
                  <div id="echart2" style="height:200px;"></div>
                </div>
              </div>
            </div>
            <div class=" col-md-4 col-sm-6 col-xs-12">
              <div class="form-ground">
                <div class="input-icon right">
                  <div class="colorthree backgrounds">
                    <h3 style="margin-top: 0px;">当前贷款余额</h3>
                    <h4>￥6500</h4>
                  </div>
                  <div style="height:10px;"></div>
                  <div class="colorfour backgrounds">
                    <h3 style="margin-top: 0px;">绩效情况</h3>
                    <p>当月新申请进件<b>10</b></p>
                    <p>当前进件数<b>20</b></p>
                    <p>当月新增已放款金额<b>100000</b></p>
                    <p>当月绩效<b>10000</b></p>
                  </div>
                </div>
            </div>
            </div>
          </div>
          <div class="row" style="margin-top:30px">
            <div class="col-md-12  col-sm-12 col-xs-12">
              <div class="form-ground">
                <div class="input-icon right">
                  <div id="echart3" style="height:400px;"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<style>
  .backgrounds{width:100%;height:100%;padding:15px;border-radius:10px;box-shadow:0 5px 0 #5f7cab;}
  .colorone{background:#6a8abe}
  .colortwo{background:#49586e}
  .colorthree{background:#5ab6df;height:100px;}
  .colorfour{background:#4acacb;margintop:10px;height:140px;}
  .backgrounds p{margin: 0 0;}
  .backgrounds b{float:right}
</style>
<script>
  import QK from '../../QK'
  import echarts from 'echarts'
  export default{
    data(){
      return {
        msg: 'hello vue'
      }
    },
    components: {},
     ready() {
      this.getData()
     },
    methods: {
      getData: function () {
            var that = this
            var myChart1 = echarts.init(document.getElementById('echart1'))
            var myChart2 = echarts.init(document.getElementById('echart2'))
            var myChart3 = echarts.init(document.getElementById('echart3'))
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
             var options = {
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
                };

            myChart1.setOption(option)
            myChart2.setOption(option)
            myChart3.setOption(options)
             window.addEventListener("resize",function(){
                myChart1.resize()
                myChart2.resize()
                myChart3.resize()
            });

      }
    }

  }
</script>
