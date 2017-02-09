<!--各机构逾期不良情况-->
<template>
  <div id="echart1" style="height:200px;"></div>
</template>
<script>
  import QK from '../../QK'
  import echarts from 'echarts'
  export default{
    data(){
      return {
       nosub:'',
       approval:'',
       refuse:'',
       userApplicationInfoAllCount:'',
       other:{
        userApplicationInfoAllCount:'',
        userApplicationInfoApproveAmountSum:'',
        userApplicationInfoMonth:'',
       }
      }
    },
    components: {},
     ready() {
      this.getDataOne()
     },
    methods: {
      getOther:function(){
        return this.other
      },
      getDataOne: function () {
        var myChart1 = echarts.init(document.getElementById('echart1'))
        var that = this
        that.$http.get(QK.SERVER_URL + '/api/index').then(function (data) {
          var data = jQuery.parseJSON(data.body)
          var result = QK.getStateCode(that, data.code)
          if (result.state) {
              that.nosub = data.data.indexApplicationInfo[0].count
              that.approval = data.data.indexApplicationInfo[2].count
              that.refuse = data.data.indexApplicationInfo[4].count

              that.$set("other.userApplicationInfoAllCount", data.data.userApplicationInfoAllCount)
              that.$set("other.userApplicationInfoApproveAmountSum", data.data.userApplicationInfoApproveAmountSum)
              that.$set("other.userApplicationInfoMonth", data.data.userApplicationInfoMonth)

              QK.vector.$emit('getfromchild', that.getOther())

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
                                {value:that.nosub, name:'当前未提交进件'},
                                {value:that.approval, name:'当前审批中进件'},
                                {value:that.refuse, name:'已退回进件'}
                            ]
                        }
                    ]
                  }
            myChart1.setOption(option)
             window.addEventListener("resize",function(){
                myChart1.resize()
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
