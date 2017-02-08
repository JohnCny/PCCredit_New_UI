<template>
  <div class="row">
    <div class="col-md-12">
      <section class="panel">
        <div class="panel-body">
          <div class="row">
            <div class="col-md-5 col-sm-6 col-xs-12">
              <div class="form-ground">
                <label for=""style="font-size:18px;color:#49586e;">各机构进件情况</label>
                <div class="input-icon right">
                  <div id="echart1" style="height:350px;"></div>
                </div>
              </div>
            </div>
            <div class=" col-md-5 col-md-offset-1 col-sm-6 col-xs-12">
              <div class="form-ground">
                <label for=""style="font-size:18px;color:#49586e;">各机构贷款情况</label>
                <div class="input-icon right">
                  <div id="echart2" style="height:350px;"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-5  col-sm-6 col-xs-12">
              <div class="form-ground">
                <label for=""style="font-size:18px;color:#49586e;">各机构逾期不良情况</label>
                <div class="input-icon right">
                  <div id="echart3" style="height:350px;"></div>
                </div>
              </div>
            </div>
            <div class="col-md-5 col-md-offset-1 col-sm-6 col-xs-12">
              <div class="form-ground">
                <label for=""style="font-size:18px;color:#49586e;">各机构逾期率不良率统计</label>
                <div class="input-icon right">
                  <div id="echart4" style="height:350px;"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12  col-sm-12 col-xs-12">
              <div class="form-ground">
                <label for=""style="font-size:18px;color:#49586e;">各机构（团队）绩效金额</label>
                <div class="input-icon right">
                  <table class="table table-striped">
                    <thead>
                    <th>团队1</th>
                    <th>团队2</th>
                    <th>团队3</th>
                    </thead>
                    <tbody>
                    <tr>
                      <td>300</td>
                      <td>500</td>
                      <td>600</td>
                    </tr>
                    </tbody>

                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
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
            var myChart2 = echarts.init(document.getElementById('echart2'))
            var myChart3 = echarts.init(document.getElementById('echart3'))
            var myChart4 = echarts.init(document.getElementById('echart4'))
           var option = {
                      tooltip : {
                          trigger: 'axis',
                          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                          }
                      },
                      legend: {
                          data:['全部进件','审批中的进件','拒件']
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
                              data : ['机构1','机构2','机构3','机构4','机构5','机构6','机构7']
                          }
                      ],
                      yAxis : [
                          {
                              type : 'value'
                          }
                      ],
                      series : [
                          {
                              name:'全部进件',
                              type:'bar',
                              data:[320, 332, 301,320, 332, 301,300]
                          },
                          {
                              name:'审批中的进件',
                              type:'bar',
                              data:[120, 132, 101,320, 332, 301,300]
                          },
                          {
                              name:'拒件',
                              type:'bar',
                              data:[220, 182, 191,320, 332, 301,300]
                          },
                      ]
                  }
            myChart2.setOption(option)
            myChart3.setOption(option)
            myChart4.setOption(option)
             window.addEventListener("resize",function(){
                myChart2.resize()
                myChart3.resize()
                myChart4.resize()
            });
      },
      getDataOne: function () {
        var myChart1 = echarts.init(document.getElementById('echart1'))
        //myChart3['thisTime'] = new Date();
        //myChart3['thisMonth'] = myChart3.thisTime.getMonth();
        //myChart3['xtime'] = [];
        //for (var i = 0; i < 12; i++) {
         // myChart3.xtime[i] = ((myChart3.thisMonth + i + 1) % 12).toString() + '月';
        //}
        var that = this
        that.$http.get(QK.SERVER_URL + '/api/index').then(function (data) {
          var data = jQuery.parseJSON(data.body)
          var result = QK.getStateCode(that, data.code)
          if (result.state) {
            console.log(result.msg)
            var data = data.data
            var option = {
              title: {
                text: data.textNameOne
              },
              tooltip: {
                trigger: 'axis'
              },
              toolbox: {
                feature: {
                  dataView: {show: true, readOnly: false},
                  magicType: {show: true, type: ['line']},
                  restore: {show: true},
                  saveAsImage: {show: true}
                }
              },
              legend: {
                data: data.textNameOne
              },
              xAxis: {
                data: data.timeArrayOne
              },
              yAxis: [
                {
                  type: 'value',
//                        name: data.textNameOne,
//                        min: 0,
//                        max: 250,
//                        interval: 50,
                  axisLabel: {
                    formatter: '￥{value}'
                  }
                },
              ],
              series: [
                {
                  name: data.textNameOne,
                  type: 'bar',
                  data: data.dataArrayOne
                },

              ]

            };
            myChart3.setOption(option)
          }
          else {
            console.log("**************************************" + result.msg)
          }
        })
      }
    }

  }
</script>
