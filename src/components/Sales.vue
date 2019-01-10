<template>
    <div>
      <div style="border-bottom: 1px solid #ccc;">
        <span class="tit">统计信息</span>
      </div>
      <div style="width:100%;height:380px" id="chartThree"></div>
    </div>
</template>

<script>
    var echarts = require('echarts');
    export default {
        name: "Sales",
        data:function () {
            return {
              data3:[],
              data4:[]
            }
        },
        methods:{
          echartsThree(){
            let myChart = echarts.init(document.getElementById('chartThree'));
            this.$axios.get('http://localhost/annual')
              .then((res)=>{
                let a=res.data;
                this.data3=[a[0].years,a[1].years,a[2].years,a[3].years,a[4].years];
                this.data4=[a[0].income,a[1].income,a[2].income,a[3].income,a[4].income];
                // console.log(res.data)
                myChart.setOption({
                  title: {
                    text: '2014-2018年度销售总额统计表单位（w）',
                    sublink: 'http://e.weibo.com/1341556070/AiEscco0H',
                    textStyle:{
                      color:'#bb9c7a',
                      fontWeight:'normal'
                    }
                  },
                  color: ['#3398DB'],
                  tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                      type : ''        // 默认为直线，可选为：'line' | 'shadow'
                    }
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
                      // data : ['2014年', '2015年', '2016年', '2017年', '2018年'],
                      data:this.data3,
                      axisTick: {
                        alignWithLabel: true
                      }
                    }
                  ],
                  yAxis : [
                    {
                      type : 'value',
                      splitLine: {show: false},
                      min:0,
                      max:100,
                      minInterval : 1,
                      boundaryGap : [ 0, 0.1 ],
                      data:[0,'25w','50w','75w']
                    }
                  ],
                  series : [
                    {
                      name:'年度统计',
                      type:'bar',
                      barWidth: '35%',
                      // data:[23, 54, 46, 48, 56]
                      data:this.data4
                    }
                  ]
                })

              });

          }
        },
        mounted(){
          this.echartsThree();
        }
    }
</script>

<style scoped>
  #chartThree{
  top:100px;
  }
  .tit{
    font-size: 20px;
    width: 100px;
    height: 50px;
    line-height: 50px;
    color: #909399;
  }
</style>
