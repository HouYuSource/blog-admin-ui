<template>
    <div>
      <div :id="id" :style="{width: width, height: height}"></div>
    </div>
</template>

<script>
  import echarts from 'echarts'
  import westeros from './theme/westeros'

  export default {
    name: 'lineEcharts',
    props: {
      id: {
        type: String,
        default: 'myChart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '100%'
      },
      dateArray: {
        type: Array,
        default:[]
      },
      dataArray: {
        type: Array,
        default:[]
      }

    },
    data() {
      return {
        chart: null
      }
    },
    mounted() {
      this.initChart()
    },
    methods: {
      initChart() {
        this.chart = echarts.init(document.getElementById(this.id),'westeros')

        this.chart.setOption({
          title: {
            text: '一周访问量'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:['最近7天访问量']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.dateArray
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name:'访问量',
              type:'line',
              stack: '总量',
              data: this.dataArray
            }
          ]
        })
      }
    }
  }
</script>

<style scoped>

</style>
