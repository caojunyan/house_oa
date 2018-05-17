<template>
    <div class="bar">
      <div class="content-car">
        <h1>车抵贷</h1>
        <div class="info">
          <span>本周业务 <b>70.00</b>万</span>
          <span>本月 <b>70.00</b>万</span>
          <span>本季度 <b>70.00</b>万</span>
          <span>今年 <b>70.00</b>万</span>
        </div>
      </div>
      <div class="table">
        <div id="carBar" :style="{width: '500px', height: '300px'}"></div>
        <div id="carLine" :style="{width: '500px', height: '300px'}"></div>
      </div>
    </div>
</template>

<script>
  export default {
    data () {
      return {

      }
    },
    mounted(){
      this.drawBar();
      this.drawLine()
    },
    methods: {
      drawBar(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('carBar'))
        // 绘制图表
        myChart.setOption({
          title: { text: '海创' },
          tooltip: {},
          legend: {
            data:['']
          },
          xAxis: {
            data: ["本周业绩","本月业绩","本季度业绩","本年业绩"]
          },
          yAxis: {},
          series: [{
            name: '业绩',
            type: 'bar',
            data: [5, 20, 36, 10],
            itemStyle: {   //配置样式，设置每个柱子的颜色
              normal: {
                color: function (params) {
                  var colorList = ['#f54882', '#47d1de', '#8058bd', '#ffd84f'];
                  return colorList[params.dataIndex];
                }
              },
            }

          }],
        });
      },
      drawLine(){
        var myChart = this.$echarts.init(document.getElementById("carLine"));
        var option = {
          title: {
            text: '海创',
            subtext: ''
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {//鼠标滑过的线条样式
              type: 'line',
              lineStyle: {
                color: 'red',//颜色
                width: 1,//宽度
                type: 'solid'//实线
              }
            },
            formatter: function(value) {//鼠标滑过时显示内容的格式化
              var template = "";
              template += 'Value1：' + value[0].axisValue + "<br/>";
              template += 'Value2：' + value[0].data;
              return template;
            }
          },
          //右上角工具条
          toolbox: {
            show: true,
            feature: {
              mark: { show: true },//目前还不知道有啥用
              dataView: { show: true, readOnly: true },//数据视图
              magicType: { show: true, type: ['line', 'bar'] },//折线与柱状的切换
              restore: { show: true },//重置
              saveAsImage: { show: true }//保存为图片
            }
          },
          calculable: true,
          xAxis: [{//x轴的数据
            type: 'category',
            name:'x轴标题',
            boundaryGap: false,//若为true,则x轴的值不在刻度上.
            data: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
            axisLabel: {//y轴的内容格式化,很有用的属性
              formatter: '{value} xUnit'
            }
          }],
          yAxis: [{
            type: 'value',
            name: "y轴标题",
            axisLabel: {//y轴的内容格式化,很有用的属性
              formatter: '{value} yUnit'
            }
          }],
          legend: {
            data: ['legend_data']//要与series中的name一致
          },
          series: [{
            itemStyle: {
              normal: {
                lineStyle: {
                  color: '#3399ff'//控制折线颜色
                }
              }
            },
            name: 'legend_data',
            type: 'line',
            data: [11, 11, 15, 13, 12, 13, 10],
            markPoint: {
              data: [/*显示最值*/
                { type: 'max'},
                { type: 'min'},
              ]
            },
            markLine: {
              data: [
                { type: 'average'}//显示平均值
              ]
            }
          }]
        };

        // 为echarts对象加载数据
        myChart.setOption(option);
      }
    }
  }
</script>

<style scoped lang="stylus">
  .bar
    width 80%
    margin-left 40px
    margin-top 30px
    .content-car
      width 100%
      h1
        font-size 18px
        height 30px
        line-height 30px
      .info
        width 800px
        border 1px solid #000
        height 150px
        display table-cell
        vertical-align middle
        span
          width 24%
          display inline-block
          text-align: center
          b
            font-size 20px
    .table
      display flex
</style>
