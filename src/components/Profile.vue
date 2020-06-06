<template>
  <e-charts :initOptions="option" :options="option" :autoresize="true" />
</template>
<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/custom'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/dataZoom'

export default {
  components:{ECharts},
  data(){
    return {
      data:[],
      dataCount : 10,
      startTime : 0,
      categories : ['categoryA', 'categoryB', 'categoryC'],
      colors: ['#7b9ce1','#bd6d6c','#75d874'],
      types : [
          {name: 'JS Heap', color: '#7b9ce1'},
          {name: 'Documents', color: '#bd6d6c'},
          {name: 'Nodes', color: '#75d874'},
          {name: 'Listeners', color: '#e0bc78'},
          {name: 'GPU Memory', color: '#dc77dc'},
          {name: 'GPU', color: '#72b362'}
      ],
      option: {
        tooltip: {
            formatter: function (params) {
                return params.marker + params.name + ': ' + params.value[3] + ' ms';
            }
        },
        dataZoom: [{
            type: 'slider',
            filterMode: 'weakFilter',
            showDataShadow: false,
            height: 10,
            borderColor: 'transparent',
            backgroundColor: '#e2e2e2',
            handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z', // jshint ignore:line
            handleSize: 20,
            handleStyle: {
                shadowBlur: 6,
                shadowOffsetX: 1,
                shadowOffsetY: 2,
                shadowColor: '#aaa'
            },
            labelFormatter: ''
        }, {
            type: 'inside',
            filterMode: 'weakFilter'
        }],
        grid:{
          bottom:'15%',
          left:'15%',
          right:'10%',
          height:'30%'
        },
        xAxis: {
            min: 0,
            scale: true,
            axisLabel: {
                formatter: function (val) {
                    return Math.max(0, val - 0) + ' ms';
                }
            }
        },
        yAxis: {
            data: this.categories
        },
        series: [{
            type: 'custom',
            renderItem: this.renderItem,
            itemStyle: {
                opacity: 0.8
            },
            encode: {
                x: [1, 2],
                y: 0
            },
            data: this.data
        }]
      }
    }
  },
  methods:{
    renderItem(params, api) {
      var categoryIndex = api.value(0);
      var start = api.coord([api.value(1), categoryIndex]);
      var end = api.coord([api.value(2), categoryIndex]);
      var height = api.size([0, 1])[1] * 0.6;

      var rectShape = ECharts.graphic.clipRectByRect({
          x: start[0],
          y: start[1] - height / 2,
          width: end[0] - start[0],
          height: height
      }, {
          x: params.coordSys.x,
          y: params.coordSys.y,
          width: params.coordSys.width,
          height: params.coordSys.height
      });

      return rectShape && {
          type: 'rect',
          shape: rectShape,
          style: api.style()
      };
    },
    sample() {
      this.categories.forEach((category,index)=>{
        var baseTime = this.startTime;
        for (var i = 0; i < this.dataCount; i++) {
            var typeItem = this.types[Math.round(Math.random() * (this.types.length - 1))];
            var duration = Math.round(Math.random() * 10000);
            this.data.push({
                name: typeItem.name,
                value: [
                    index,
                    baseTime,
                    baseTime += duration,
                    duration
                ],
                itemStyle: {
                    normal: {
                        color: this.colors[index]
                    }
                }
            });
            baseTime += Math.round(Math.random() * 2000);
        }
      })
    }
  },
  mounted(){
    this.sample()
    this.option.yAxis.data = this.categories
    this.option.series[0].data = this.data
  }
}
</script>
<style>
.echarts {
  width: 100%;
  height: 100%;
}
</style>