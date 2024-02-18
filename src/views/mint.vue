<template>
  <div>
    <div id="chat-noss" :style="{'height': tableHeight + 'px'}"></div>
    <div id="chat-rank" :style="{'height': tableHeight + 'px','margin-top':'40px'}"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";


let myChart1;
let myChart2;

export default {
  data() {
    return {
      date: '2024-01-01',
      list: []
    }
  },
  computed: {
    tableHeight() {
      let documentClientHeight = document.documentElement['clientHeight'];
      let tableHeight = documentClientHeight * 0.6;
      return tableHeight;
    }
  },
  mounted() {
    // if (location.href.includes("date=")) {
    //   this.date = location.href.split("date=")[1];
    // }
    this.init();
  },
  methods: {
    init() {
      console.log("init")
      let chartDom1 = document.getElementById("chat-noss");
      if (myChart1 != null && myChart1 != "" && myChart1 != undefined) {
        myChart1.dispose(); //销毁
      }
      myChart1 = echarts.init(chartDom1, null, {
        renderer: 'canvas',
        useDirtyRect: false
      });
      let chartDom2 = document.getElementById("chat-rank");
      if (myChart2 != null && myChart2 != "" && myChart2 != undefined) {
        myChart2.dispose(); //销毁
      }
      myChart2 = echarts.init(chartDom2, null, {
        renderer: 'canvas',
        useDirtyRect: false
      });


      // this.getList();
      let list = this.$nossData.list;
      var xAxisData = [];
      var data = [];
      list.forEach(element => {
        xAxisData.push(element.t);
        data.push(element.v);
      });
      this.renderChart(xAxisData, data);

      let list2 = this.$nossData.rank;
      var xAxisData2 = [];
      var data2 = [];
      list2.forEach(element => {
        xAxisData2.push(element.pubkey);
        data2.push(element.count);
      });
      this.renderChart2(xAxisData2, data2);
    },
    // getList() {
    //   let params = { 'date': this.date };
    //   this.$http({
    //     url: '/web3/noss/list',
    //     method: 'post',
    //     data: this.$http.adornData(params)
    //   }).then(res => {
    //     console.log(res)
    //     if (res && res.code === 0) {

    //     }
    //   })
    // },
    renderChart(xAxisData, data1) {
      xAxisData = xAxisData.map(element => {
        return element.substring(5)
      });
      let option = {
        dataZoom: [{
          type: 'slider',
          start: 0,
          end: 50,
        }],
        title: {
          left: 'center',
          text: 'NOSS MINT 全记录',
          subtext: "共Mint 1,095,102 次， 10,946,498 个NOSS",
        },
        subtitle: {
          left: 'center',
          text: 'NOSS MINT 全记录'
        },
        toolbox: {
          // y: 'bottom',
          feature: {
            magicType: {
              type: ['stack']
            },
            dataView: {},
            saveAsImage: {
              pixelRatio: 2
            }
          }
        },
        tooltip: {},
        xAxis: {
          data: xAxisData,
          splitLine: {
            show: false
          }
        },
        yAxis: {},
        series: [
          {
            name: 'mint',
            type: 'bar',
            data: data1,
            emphasis: {
              focus: 'series'
            },
            animationDelay: function (idx) {
              return idx * 0;
            }
          }
        ],
        // animationEasing: 'elasticOut',
        // animationDelayUpdate: function (idx) {
        //   return idx * 5;
        // }
      };
      myChart1.setOption(option, true);
      window.addEventListener('resize', myChart1.resize);
    },
    renderChart2(xAxisData, data1) {
      let option = {
        dataZoom: [{
          type: 'slider',
          start: 0,
          end: 50,
        }],
        title: {
          left: 'center',
          text: 'NOSS MINT 排名前100'
        },
        toolbox: {
          feature: {
            magicType: {
              type: ['stack']
            },
            dataView: {},
            saveAsImage: {
              pixelRatio: 2
            }
          }
        },
        tooltip: {},
        xAxis: {
          data: xAxisData,
          splitLine: {
            show: false
          },
          show: false
        },
        yAxis: {},
        series: [
          {
            name: '地址/张数',
            type: 'bar',
            data: data1,
            emphasis: {
              focus: 'series'
            },
            animationDelay: function (idx) {
              return idx * 0;
            }
          }
        ],
        // animationEasing: 'elasticOut',
        // animationDelayUpdate: function (idx) {
        //   return idx * 5;
        // }
      };
      myChart2.setOption(option, true);
      window.addEventListener('resize', myChart2.resize);
    },
  }
}
</script>
<style scoped>
.aaa {
  color: #ffffff;
}
</style>