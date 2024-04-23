<!--
 描述: 金字塔趋势
 作者: Jack Chen
 日期: 2020-04-18
-->

<template>
  <div class="wrap-container">
    <div class="chartsdom" id="chart_ptrend"></div>
  </div>
</template>

<script>
export default {
  name: "pyramidTrend",
  data() {
    return {
      option: null,
      dataMap: {},
      data: {},
      cityList:[
        "北京市",
        "上海市",
        "广州市",
        "成都市",
        "重庆市",
        "沈阳市",
        "合肥市",
        "贵阳市",
        "西安市",
        "拉萨市",
        "南宁市",
        "海口市",
        "兰州市",
        "银川市",
      ]
    };
  },
  props: ["geoCoordMap"],
  watch: {
    // 监听 props 的变化
    geoCoordMap: {
      handler(newValue, oldValue) {
        // 当 props 变化时重新绘制图表
        console.log("城市污染物指数对比变化");
        this.convertData(newValue);
        console.log("什么鬼",this.data);
        this.getEchart();
      },
      immediate: true, // 立即执行 handler
    },
  },
  mounted() {
    this.getEchart();
  },
  methods: {
    convertData(data) {
      let result = {};
      // 初始化数据结构
      for (let i = 0; i < 6; i++) {
        result[i] = [];
      }

      // 遍历选定的城市，按照PM2.5, PM10, SO2, NO2, CO, O3的顺序填充数据
      this.cityList.forEach(city => {
        if (data[city]) {
          const temp = data[city];
          for (let i = 3; i < 9; i++) {  // 从数据数组的第三个元素开始取
            result[i - 3].push(temp[i]);
          }
        }
      });

      this.data = result;

    },
    dataFormatter(obj) {
      let pList = this.cityList;
      let temp;
      for (let x = 0; x < 5; x++) {
        let max = 0;
        let sum = 0;
        temp = obj[x];
        for (let i = 0, l = temp.length; i < l; i++) {
          max = Math.max(max, temp[i]);
          sum += temp[i];
          obj[x][i] = {
            name: pList[i],
            value: temp[i],
          };
        }
        obj[x + "max"] = Math.floor(max / 100) * 100;
        obj[x + "sum"] = sum;
      }
      return obj;
    },
    getEchart() {
      let myChart = echarts.init(document.getElementById("chart_ptrend"));
      let itemStyle = {
        barBorderRadius: [15, 0],
        color: "#0084ff",
      };

      this.dataMap.dataType = this.dataFormatter(this.data);

      this.option = {
        baseOption: {
          timeline: {
            top: "83%",
            axisType: "category",
            autoPlay: true,
            playInterval: 3000,
            data: ["PM2.5", "PM10", "SO2", "NO2", "CO", "O3"],
            left: 80,
            right: 80,
            bottom: 5,
            lineStyle: {
              color: "#179bf1",
            },
            label: {
              color: "#fff",
              fontWeight: "bold", // 加粗字体
              fontSize: 16,
            },
            checkpointStyle: {
              color: "#01d8ff",
              symbolSize: 10,
              borderColor: "rgba(1, 216, 255, 0.5)",
              borderWidth: 5,
            },
            controlStyle: {
              show: false,
            },
            itemStyle: {
              borderColor: "#004b85",
              borderWidth: 1,
              shadowColor: "rgba(1, 216, 225, 0.5)",
              shadowBlur: 5,
            },
            emphasis: {
              label: {
                color: "#01d8ff",
                show: false,
              },
              checkpointStyle: {
                color: "#01d8ff",
                borderColor: "rgba(1, 216, 255, 0.5)",
                borderWidth: 5,
              },
              itemStyle: {
                color: "#01d8ff",
                borderColor: "rgba(1, 216, 225, 0.5)",
                borderWidth: 5,
              },
            },
          },
          calculable: true,
          grid: {
            top: "10%",
            bottom: "25%",
          },
          xAxis: [
            {
              type: "category",
              axisLabel: {
                interval: 0,
                fontSize: 14,
              },
              data: [
                "北京",
                "上海",
                "广州",
                "成都",
                "重庆",
                "沈阳",
                "合肥",
                "贵阳",
                "西安",
                "拉萨",
                "南宁",
                "海口",
                "兰州",
                "银川",
              ],
              splitLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: "#2867a8",
                },
              },
            },
          ],
          yAxis: [
            {
              type: "value",
              name: "μg/m3",
              splitLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: "#2867a8",
                },
              },
            },
          ],
          series: [
            {
              name: "PM2.5",
              type: "bar",
              barWidth: 15,
              legendHoverLink: true,
              label: {
                show: true,
                position: "top",
                color: "#fff",
                fontSize: 16,
              },
            },
          ],
        },
        options: [
          {
            series: [
              {
                data: this.dataMap.dataType["0"],
                itemStyle: itemStyle,
              },
            ],
          },
          {
            series: [
              {
                data: this.dataMap.dataType["1"],
                itemStyle: itemStyle,
              },
            ],
          },
          {
            series: [
              {
                data: this.dataMap.dataType["2"],
                itemStyle: itemStyle,
              },
            ],
          },
          {
            series: [
              {
                data: this.dataMap.dataType["3"],
                itemStyle: itemStyle,
              },
            ],
          },
          {
            series: [
              {
                data: this.dataMap.dataType["4"],
                itemStyle: itemStyle,
              },
            ],
          },
          {
            series: [
              {
                data: this.dataMap.dataType["5"],
                itemStyle: itemStyle,
              },
            ],
          },
        ],
      };

      myChart.setOption(this.option, true);

      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
  },
  beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
.wrap-container {
  width: 570px;
  height: 350px;
  .chartsdom {
    width: 100%;
    height: 100%;
  }
}
</style>
