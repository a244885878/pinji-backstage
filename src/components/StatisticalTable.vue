<template>
    <div>
      <!--统计-->
      <div style="border-bottom: 1px solid #ccc;">
        <span class="tit">基本信息</span>
      </div>
      <ul>
        <li class="S-li">
          <p><span class="S-font">收入</span><span class="S-time">&nbsp;&nbsp;月&nbsp;&nbsp;</span></p>
          <hr class="S-line">
          <p class="income">{{arr}}</p>
          <p><span class="gross ">总收入</span><span class="percentage">&nbsp;&nbsp;98%&nbsp;&nbsp;</span></p>
        </li>
        <li class="S-li">
          <p><span class="S-font">订单</span><span class="S-year">&nbsp;&nbsp;全年&nbsp;&nbsp;</span></p>
          <hr class="S-lineTwo">
          <p class="income">{{arr2}}</p>
          <p><span class="gross ">新订单</span><span class="percentage-two">&nbsp;&nbsp;20%&nbsp;&nbsp;</span></p>
        </li>
        <li class="S-li">
          <p><span class="S-font">客户总数</span><span class="S-today">&nbsp;&nbsp;今天&nbsp;&nbsp;</span></p>
          <hr class="S-lineThree">
          <p class="income">{{arr3}}</p>
          <p><span class="gross ">新访客</span><span class="percentage-three">&nbsp;&nbsp;44%&nbsp;&nbsp;</span></p>

        </li>
      </ul>
      <div style="width:100%;height:390px" id="chart"></div>
      <!--<div style="width:100%;height:296px" id="chartTwo"></div>-->
      <!--<div style="width:100%;height:380px" id="chartThree"></div>-->

    </div>
</template>

<script>
  var echarts = require('echarts');
  export default {
        data: function () {
            return {
              arr:[],
              arr2:[],
              arr3:[],
              data:[],
              data2:[],
            }
        },
        created(){
          this.$axios.get('http://localhost/income')
            .then((res)=>{
              this.arr=res.data.data[0].num;
              // console.log(res.data)
            });
          this.$axios.get('http://localhost/order')
            .then((res)=>{
              this.arr2=res.data.data[0].num;
              // console.log(res.data)
            });
          this.$axios.get('http://localhost/customer')
            .then((res)=>{
              this.arr3=res.data.data[0].num;
              // console.log(res.data)
            });
          // this.$axios.get('http://localhost/selling')
          //   .then((res)=>{
          //     let a=res.data;
          //     this.data=[a[0].num,a[1].num,a[2].num];
          //     // console.log(this.data)
          //
          //   })
        },


        methods: {
          echartsOne(){
            let myChart = echarts.init(document.getElementById('chart'));
            this.$axios.get('http://localhost/selling')
              .then((res)=>{
                let a=res.data;
                this.data=[a[0].num,a[1].num,a[2].num,a[3].num,a[4].num,a[5].num,a[6].num,a[7].num,a[8].num,a[9].num,a[10].num];
                this.data2=[a[0].volume,a[1].volume,a[2].volume,a[3].volume,a[4].volume,a[5].volume,a[6].volume,a[7].volume,a[8].volume,a[9].volume,a[10].volume];
                myChart.setOption({
                  title: {
                    x: 'left',
                    text: '蛋糕月份热销图 单位 (份)',
                    link: 'http://echarts.baidu.com/doc/example.html',
                    textStyle:{
                      color:'#bb9c7a',
                      fontWeight:'normal'
                    }
                  },
                  tooltip: {
                    trigger: 'item'
                  },
                  toolbox: {
                    show: true,
                    feature: {
                      dataView: {show: true, readOnly: false},
                      restore: {show: true},
                      saveAsImage: {show: true}
                    }
                  },
                  calculable: true,
                  grid: {
                    borderWidth: 0,
                    y: 80,
                    y2: 60
                  },
                  xAxis: [
                    {
                      type: 'category',
                      show: false,
                      // data: ['蘑菇森林', '彩虹小熊', '樱桃公主', '告白情书', '小猪佩奇', '粉红心语', '芒芒之约', '莓你不可', '招牌小熊', '网红爆浆', '告白气球']
                      data:this.data,
                    }
                  ],
                  yAxis: [
                    {
                      type: 'value',
                      show: false
                    }
                  ],
                  series: [
                    {
                      name: '蛋糕月份热销个数统计',
                      type: 'bar',
                      barWidth: '60%',
                      itemStyle: {
                        normal: {
                          color: function(params) {
                            // build a color map as your need.
                            var colorList = [
                              '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                              '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                              '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                            ];
                            return colorList[params.dataIndex]
                          },
                          label: {
                            show: true,
                            position: 'top',
                            formatter: '{b}\n{c}'
                          }
                        }
                      },
                      // data: [12,21,10,4,12,5,6,5,25,23,7],
                      data:this.data2,
                      markPoint: {
                        tooltip: {
                          trigger: 'item',
                          backgroundColor: 'rgba(0,0,0,0)',
                          formatter: function(params){
                            return '<img src="'
                              + params.data.symbol.replace('image://', '')
                              + '"/>';
                          }
                        },
                        // data: [
                        //   {xAxis:0, y: 350, name:'蘑菇森林', symbolSize:20, symbol: 'image://../asset/ico/折线图.png'},
                        //   {xAxis:1, y: 350, name:'彩虹小熊', symbolSize:20, symbol: 'image://../asset/ico/柱状图.png'},
                        //   {xAxis:2, y: 350, name:'樱桃公主', symbolSize:20, symbol: 'image://../asset/ico/散点图.png'},
                        //   {xAxis:3, y: 350, name:'告白情书', symbolSize:20, symbol: 'image://../asset/ico/K线图.png'},
                        //   {xAxis:4, y: 350, name:'小猪佩奇', symbolSize:20, symbol: 'image://../asset/ico/饼状图.png'},
                        //   {xAxis:5, y: 350, name:'粉红心语', symbolSize:20, symbol: 'image://../asset/ico/雷达图.png'},
                        //   {xAxis:6, y: 350, name:'芒芒之约', symbolSize:20, symbol: 'image://../asset/ico/和弦图.png'},
                        //   {xAxis:7, y: 350, name:'莓你不可', symbolSize:20, symbol: 'image://../asset/ico/力导向图.png'},
                        //   {xAxis:8, y: 350, name:'招牌小熊', symbolSize:20, symbol: 'image://../asset/ico/地图.png'},
                        //   {xAxis:9, y: 350, name:'网红爆浆', symbolSize:20, symbol: 'image://../asset/ico/仪表盘.png'},
                        //   {xAxis:10, y: 350, name:'告白气球', symbolSize:20, symbol: 'image://../asset/ico/漏斗图.png'},
                        // ]
                      }
                    }
                  ]
                });


              });
            // myChart.setOption({
            //   title: {
            //     x: 'left',
            //     text: '蛋糕月份热销图 单位 (份)',
            //     link: 'http://echarts.baidu.com/doc/example.html',
            //     textStyle:{
            //       color:'#bb9c7a',
            //       fontWeight:'normal'
            //     }
            //   },
            //   tooltip: {
            //     trigger: 'item'
            //   },
            //   toolbox: {
            //     show: true,
            //     feature: {
            //       dataView: {show: true, readOnly: false},
            //       restore: {show: true},
            //       saveAsImage: {show: true}
            //     }
            //   },
            //   calculable: true,
            //   grid: {
            //     borderWidth: 0,
            //     y: 80,
            //     y2: 60
            //   },
            //   xAxis: [
            //     {
            //       type: 'category',
            //       show: false,
            //       // data: ['蘑菇森林', '彩虹小熊', '樱桃公主', '告白情书', '小猪佩奇', '粉红心语', '芒芒之约', '莓你不可', '招牌小熊', '网红爆浆', '告白气球']
            //       data:this.data,
            //     }
            //   ],
            //   yAxis: [
            //     {
            //       type: 'value',
            //       show: false
            //     }
            //   ],
            //   series: [
            //     {
            //       name: '蛋糕月份热销个数统计',
            //       type: 'bar',
            //       itemStyle: {
            //         normal: {
            //           color: function(params) {
            //             // build a color map as your need.
            //             var colorList = [
            //               '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
            //               '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
            //               '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
            //             ];
            //             return colorList[params.dataIndex]
            //           },
            //           label: {
            //             show: true,
            //             position: 'top',
            //             formatter: '{b}\n{c}'
            //           }
            //         }
            //       },
            //       data: [12,21,10,4,12,5,6,5,25,23,7],
            //       markPoint: {
            //         tooltip: {
            //           trigger: 'item',
            //           backgroundColor: 'rgba(0,0,0,0)',
            //           formatter: function(params){
            //             return '<img src="'
            //               + params.data.symbol.replace('image://', '')
            //               + '"/>';
            //           }
            //         },
            //         // data: [
            //         //   {xAxis:0, y: 350, name:'蘑菇森林', symbolSize:20, symbol: 'image://../asset/ico/折线图.png'},
            //         //   {xAxis:1, y: 350, name:'彩虹小熊', symbolSize:20, symbol: 'image://../asset/ico/柱状图.png'},
            //         //   {xAxis:2, y: 350, name:'樱桃公主', symbolSize:20, symbol: 'image://../asset/ico/散点图.png'},
            //         //   {xAxis:3, y: 350, name:'告白情书', symbolSize:20, symbol: 'image://../asset/ico/K线图.png'},
            //         //   {xAxis:4, y: 350, name:'小猪佩奇', symbolSize:20, symbol: 'image://../asset/ico/饼状图.png'},
            //         //   {xAxis:5, y: 350, name:'粉红心语', symbolSize:20, symbol: 'image://../asset/ico/雷达图.png'},
            //         //   {xAxis:6, y: 350, name:'芒芒之约', symbolSize:20, symbol: 'image://../asset/ico/和弦图.png'},
            //         //   {xAxis:7, y: 350, name:'莓你不可', symbolSize:20, symbol: 'image://../asset/ico/力导向图.png'},
            //         //   {xAxis:8, y: 350, name:'招牌小熊', symbolSize:20, symbol: 'image://../asset/ico/地图.png'},
            //         //   {xAxis:9, y: 350, name:'网红爆浆', symbolSize:20, symbol: 'image://../asset/ico/仪表盘.png'},
            //         //   {xAxis:10, y: 350, name:'告白气球', symbolSize:20, symbol: 'image://../asset/ico/漏斗图.png'},
            //         // ]
            //       }
            //     }
            //   ]
            // });
          },

          // echartsTwo(){
          //   let myChart = this.$echarts.init(document.getElementById('chartTwo'));
          //   var placeHoledStyle = {
          //     normal:{
          //       barBorderColor:'rgba(0,0,0,0)',
          //       color:'rgba(0,0,0,0)'
          //     },
          //     emphasis:{
          //       barBorderColor:'rgba(0,0,0,0)',
          //       color:'rgba(0,0,0,0)'
          //     }
          //   };
          //   var dataStyle = {
          //     normal: {
          //       label : {
          //         show: true,
          //         position: 'insideLeft',
          //         formatter: '{c}%'
          //       }
          //     }
          //   };
          //   myChart.setOption({
          //     title: {
          //       text: '蛋糕主题类季度统计比例图',
          //       sublink: 'http://e.weibo.com/1341556070/AiEscco0H',
          //       textStyle:{
          //         color:'#bb9c7a',
          //         fontWeight:'normal'
          //       }
          //     },
          //     tooltip : {
          //       trigger: 'axis',
          //       axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          //         type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          //       },
          //       formatter : '{b}<br/>{a0}:{c0}%<br/>{a2}:{c2}%<br/>{a4}:{c4}%<br/>{a6}:{c6}%'
          //     },
          //     legend: {
          //       y: 55,
          //       itemGap : document.getElementById('chartTwo').offsetWidth / 8,
          //       data:['第一季度', '第二季度','第三季度', '第四季度']
          //     },
          //     toolbox: {
          //       show : true,
          //       feature : {
          //         mark : {show: true},
          //         dataView : {show: true, readOnly: false},
          //         restore : {show: true},
          //         saveAsImage : {show: true}
          //       }
          //     },
          //     grid: {
          //       y: 80,
          //       y2: 30
          //     },
          //     xAxis : [
          //       {
          //         type : 'value',
          //         position: 'top',
          //         splitLine: {show: false},
          //         axisLabel: {show: false}
          //       }
          //     ],
          //     yAxis : [
          //       {
          //         type : 'category',
          //         splitLine: {show: false},
          //         data : [ '招牌小熊', '翻糖蛋糕', '乳络', '甜品']
          //       }
          //     ],
          //     series : [
          //       {
          //         name:'第一季度',
          //         type:'bar',
          //         stack: '总量',
          //         itemStyle : dataStyle,
          //         data:[38, 50, 33, 72]
          //       },
          //       {
          //         name:'第一季度',
          //         type:'bar',
          //         stack: '总量',
          //         itemStyle: placeHoledStyle,
          //         data:[62, 50, 67, 28]
          //       },
          //       {
          //         name:'第二季度',
          //         type:'bar',
          //         stack: '总量',
          //         itemStyle : dataStyle,
          //         data:[61, 41, 42, 30]
          //       },
          //       {
          //         name:'第二季度',
          //         type:'bar',
          //         stack: '总量',
          //         itemStyle: placeHoledStyle,
          //         data:[39, 59, 58, 70]
          //       },
          //       {
          //         name:'第三季度',
          //         type:'bar',
          //         stack: '总量',
          //         itemStyle : dataStyle,
          //         data:[37, 35, 44, 60]
          //       },
          //       {
          //         name:'第三季度',
          //         type:'bar',
          //         stack: '总量',
          //         itemStyle: placeHoledStyle,
          //         data:[63, 65, 56, 40]
          //       },
          //       {
          //         name:'第四季度',
          //         type:'bar',
          //         stack: '总量',
          //         itemStyle : dataStyle,
          //         data:[71, 50, 31, 39]
          //       },
          //       {
          //         name:'第四季度',
          //         type:'bar',
          //         stack: '总量',
          //         itemStyle: placeHoledStyle,
          //         data:[29, 50, 69, 61]
          //       }
          //     ]
          //
          //   });
          // },
          // echartsThree(){
          //   let myChart = echarts.init(document.getElementById('chartThree'));
          //   myChart.setOption({
          //     title: {
          //       text: '2014-2018年度销售总额统计表单位（w）',
          //       sublink: 'http://e.weibo.com/1341556070/AiEscco0H',
          //       textStyle:{
          //         color:'#bb9c7a',
          //         fontWeight:'normal'
          //       }
          //     },
          //     color: ['#3398DB'],
          //     tooltip : {
          //       trigger: 'axis',
          //       axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          //         type : ''        // 默认为直线，可选为：'line' | 'shadow'
          //       }
          //     },
          //     grid: {
          //       left: '3%',
          //       right: '4%',
          //       bottom: '3%',
          //       containLabel: true
          //     },
          //     xAxis : [
          //       {
          //         type : 'category',
          //         data : ['2014年', '2015年', '2016年', '2017年', '2018年'],
          //         axisTick: {
          //           alignWithLabel: true
          //         }
          //       }
          //     ],
          //     yAxis : [
          //       {
          //         type : 'value',
          //         splitLine: {show: false},
          //         min:0,
          //         max:100,
          //         minInterval : 1,
          //         boundaryGap : [ 0, 0.1 ],
          //         data:[0,'25w','50w','75w']
          //       }
          //     ],
          //     series : [
          //       {
          //         name:'年度统计',
          //         type:'bar',
          //         barWidth: '35%',
          //         data:[23, 54, 46, 48, 56]
          //       }
          //     ]
          //   })
          // }

        },
        mounted () {
          this.echartsOne();
          // this.echartsTwo();
          // this.echartsThree()
        }


  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  *{
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .S-time{
    margin-left: 130px;
    background-color: #1C84C6;
    font-size: 12px;
    color: white;
  }
  .S-font{
    font-size: 14px;
    margin-left: 30px;
    color: #676A6C;

  }
  .S-line{
    width: 230px;
    margin-top: 10px;
    height: 1px;
    border: none;
    background-color: #EBEDEF;

  }
  .S-lineTwo{
    width: 240px;
    margin-top: 10px;
    height: 1px;
    border: none;
    background-color: #EBEDEF;
  }
  .S-lineThree{
    width: 270px;
    margin-top: 10px;
    height: 1px;
    border: none;
    background-color: #EBEDEF;
  }
  .income{
    font-size: 20px;
    margin-top: 10px;
    color: #676A6C;
    margin-left: 20px;
  }
  .gross{
    font-size: 12px;
    margin-left: 20px;
    color: #676A6C;
  }
  .percentage{
    font-size:12px;
    color: #1C84C6;
    margin-left: 130px;
    font-weight: bolder;
  }
  .percentage-two{
    font-size:12px;
    color: #23C6C8;
    margin-left: 130px;
    font-weight: bolder;
  }
  .percentage-three{
    font-size:12px;
    color:  #1AB394;
    margin-left: 160px;
    font-weight: bolder;
  }
  .S-year{
    margin-left: 130px;
    background-color: #23C6C8;
    font-size: 12px;
    color: white;
  }
  .S-today{
    margin-left: 130px;
    background-color: #1AB394;
    font-size: 12px;
    color: white;
  }
  .S-li{
    float: left;
    margin-right: 54px;
  }
  ul{
    margin-left: 50px;
    margin-top: 10px;
  }
  .line-long{
    margin-top: 16px;
    height: 1px;
    border: none;
    background-color: #CCCCCC;
  }
  .reportForm{
    color: #bb9c7a;
  }
  #chart{
    top: 110px;
  }
  /*#chartTwo{*/
    /*top:230px;*/
  /*}*/
  /*#chartThree{*/
    /*top:290px;*/
  /*}*/
  .tit{
    font-size: 20px;
    width: 100px;
    height: 50px;
    line-height: 50px;
    color: #909399;
  }
</style>
