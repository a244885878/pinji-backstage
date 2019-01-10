<template>
    <div>
      <div style="border-bottom: 1px solid #ccc;">
        <span class="tit">销售信息</span>
      </div>
      <div style="width:100%;height:296px" id="chartTwo"></div>
    </div>
</template>

<script>
    var echarts = require('echarts');
    export default {
        name: "Essential",
        data:function () {
            return {

            }
        },
        methods:{
          echartsTwo(){
            let myChart = this.$echarts.init(document.getElementById('chartTwo'));
            var placeHoledStyle = {
              normal:{
                barBorderColor:'rgba(0,0,0,0)',
                color:'rgba(0,0,0,0)'
              },
              emphasis:{
                barBorderColor:'rgba(0,0,0,0)',
                color:'rgba(0,0,0,0)'
              }
            };
            var dataStyle = {
              normal: {
                label : {
                  show: true,
                  position: 'insideLeft',
                  formatter: '{c}%'
                }
              }
            };
            myChart.setOption({
              title: {
                text: '蛋糕主题类季度统计比例图',
                sublink: 'http://e.weibo.com/1341556070/AiEscco0H',
                textStyle:{
                  color:'#bb9c7a',
                  fontWeight:'normal'
                }
              },
              tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                  type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter : '{b}<br/>{a0}:{c0}%<br/>{a2}:{c2}%<br/>{a4}:{c4}%<br/>{a6}:{c6}%'
              },
              legend: {
                y: 55,
                itemGap : document.getElementById('chartTwo').offsetWidth / 8,
                data:['第一季度', '第二季度','第三季度', '第四季度']
              },
              toolbox: {
                show : true,
                feature : {
                  mark : {show: true},
                  dataView : {show: true, readOnly: false},
                  restore : {show: true},
                  saveAsImage : {show: true}
                }
              },
              grid: {
                y: 80,
                y2: 30
              },
              xAxis : [
                {
                  type : 'value',
                  position: 'top',
                  splitLine: {show: false},
                  axisLabel: {show: false}
                }
              ],
              yAxis : [
                {
                  type : 'category',
                  splitLine: {show: false},
                  data : [ '招牌小熊', '翻糖蛋糕', '乳络', '甜品']
                }
              ],
              series : [
                {
                  name:'第一季度',
                  type:'bar',
                  stack: '总量',
                  itemStyle : dataStyle,
                  data:[38, 50, 33, 72]
                },
                {
                  name:'第一季度',
                  type:'bar',
                  stack: '总量',
                  itemStyle: placeHoledStyle,
                  data:[62, 50, 67, 28]
                },
                {
                  name:'第二季度',
                  type:'bar',
                  stack: '总量',
                  itemStyle : dataStyle,
                  data:[61, 41, 42, 30]
                },
                {
                  name:'第二季度',
                  type:'bar',
                  stack: '总量',
                  itemStyle: placeHoledStyle,
                  data:[39, 59, 58, 70]
                },
                {
                  name:'第三季度',
                  type:'bar',
                  stack: '总量',
                  itemStyle : dataStyle,
                  data:[37, 35, 44, 60]
                },
                {
                  name:'第三季度',
                  type:'bar',
                  stack: '总量',
                  itemStyle: placeHoledStyle,
                  data:[63, 65, 56, 40]
                },
                {
                  name:'第四季度',
                  type:'bar',
                  stack: '总量',
                  itemStyle : dataStyle,
                  data:[71, 50, 31, 39]
                },
                {
                  name:'第四季度',
                  type:'bar',
                  stack: '总量',
                  itemStyle: placeHoledStyle,
                  data:[29, 50, 69, 61]
                }
              ]

            });
          },

        },
        mounted(){
          this.echartsTwo();
        }
    }
</script>

<style scoped>
  #chartTwo{
    top:110px;
  }
  .tit{
    font-size: 20px;
    width: 100px;
    height: 50px;
    line-height: 50px;
    color: #909399;
  }
</style>
