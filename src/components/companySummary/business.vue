<!--
 描述: 业务范围
 作者: Jack Chen
 日期: 2020-05-09
-->

<template>
  <div class="business-container">
    <div class="chart" id="chart_left1"></div>
  </div>
</template>

<script>
export default {
  name: "business",
  data() {
    return {
      charts: {
        cityList: [],
        cityData: [],
      },
    };
  },
  props: ["geoCoordMap"],
  watch: {
    // 监听 props 的变化
    geoCoordMap: {
      handler(newValue, oldValue) {
        // 当 props 变化时重新绘制图表
        console.log("空气质量指数排名变化");
        this.covertData(newValue);
        this.getEchartLeft1();
      },
      immediate: true, // 立即执行 handler
    },
  },
  mounted() {
    this.getEchartLeft1();
  },
  methods: {
    covertData(data) {
      // 将对象转换为数组
      const dataArray = Object.entries(data);

      // 使用 sort 方法排序数组
      dataArray.sort((a, b) => b[1][2] - a[1][2]); // 按照第三个值从大到小排序

      // 截取前7个数据
      const top7DataArray = dataArray.slice(0, 7);

      // 将排序后的数组转换为所需的格式
      const cityList = top7DataArray.map((item) => item[0]);
      const cityData = top7DataArray.map((item) => item[1][2]);

      this.charts = { cityList, cityData };
    },
    getEchartLeft1() {
      // 实例化对象
      let myChart = echarts.init(document.getElementById("chart_left1"));

      let top10CityList = this.charts.cityList;
      let top10CityData = this.charts.cityData;
      let color = [
        "rgba(14,109,236",
        "rgba(255,91,6",
        "rgba(100,255,249",
        "rgba(248,195,248",
        "rgba(110,234,19",
        "rgba(255,168,17",
        "rgba(218,111,227",
      ];

      let lineY = [];
      for (let i = 0; i < this.charts.cityList.length; i++) {
        let x = i;
        if (x > color.length - 1) {
          x = color.length - 1;
        }
        let data = {
          name: this.charts.cityList[i],
          color: color[x] + ")",
          value: top10CityData[i],
          itemStyle: {
            normal: {
              show: true,
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                1,
                0,
                [
                  {
                    offset: 0,
                    color: color[x] + ", 0.3)",
                  },
                  {
                    offset: 1,
                    color: color[x] + ", 1)",
                  },
                ],
                false
              ),
              barBorderRadius: 10,
            },
            emphasis: {
              shadowBlur: 15,
              shadowColor: "rgba(0, 0, 0, 0.1)",
            },
          },
        };
        lineY.push(data);
      }

      // 指定配置和数据
      let option = {
        color: color,
        tooltip: {
          trigger: "item",
        },
        grid: {
          borderWidth: 0,
          top: "5%",
          left: "2%",
          right: "2%",
          bottom: "0%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "value",
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
          },
        ],
        yAxis: [
          {
            type: "category",
            inverse: true,
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              inside: false,
              textStyle: {
                color: "#b3ccf8",
                fontSize: 13,
              },
            },
            data: top10CityList,
          },
          {
            type: "category",
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: true,
              inside: false,
              textStyle: {
                color: "#b3ccf8",
                fontSize: 13,
              },
              formatter: (val) => {
                return `${val}`;
              },
            },
            splitArea: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            data: top10CityData.reverse(),
          },
        ],
        series: [
          {
            name: "",
            type: "bar",
            zlevel: 2,
            barWidth: "10px",
            data: lineY,
            animationDuration: 1500,
            label: {
              normal: {
                color: "#b3ccf8",
                show: false,
                position: [0, "-15px"],
                textStyle: {
                  fontSize: 13,
                },
                formatter: (a, b) => {
                  return a.name;
                },
              },
            },
          },
        ],
      };

      // 把配置给实例对象
      myChart.setOption(option, true);
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
  },
  beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
.business-container {
  .chart {
    height: 3rem;
  }
}
</style>
