<!--
 描述: 客户分布
 作者: Jack Chen
 日期: 2020-05-09
-->

<template>
  <div class="distribution-container">
    <div class="chart" id="chart_right2"></div>
  </div>
</template>

<script>
export default {
  name: "distribution",
  data() {
    return {
      data: [],
    };
  },
  props: ["geoCoordMap"],
  watch: {
    // 监听 props 的变化
    geoCoordMap: {
      handler(newValue, oldValue) {
        // 当 props 变化时重新绘制图表
        console.log("空气质量指数分布变化");
        this.convertData(newValue);
        this.getEchartRight2();
      },
      immediate: true, // 立即执行 handler
    },
  },
  mounted() {
    this.getEchartRight2();
  },
  methods: {
    convertData(geoData) {
      // 初始化空气质量分类对象
      const airQuality = {
        优: 0,
        良: 0,
        轻度污染: 0,
        中度污染: 0,
        重度污染: 0,
        严重污染: 0,
      };

      // 遍历城市数据，根据 PM2.5 指数将城市分类
      Object.values(geoData).forEach((cityInfo) => {
        const pm25 = cityInfo[2]; // 获取城市的 PM2.5 指数

        // 根据 PM2.5 指数将城市分到对应的空气质量分类中
        if (pm25 <= 50) {
          airQuality["优"]++;
        } else if (pm25 <= 100) {
          airQuality["良"]++;
        } else if (pm25 <= 150) {
          airQuality["轻度污染"]++;
        } else if (pm25 <= 200) {
          airQuality["中度污染"]++;
        } else if (pm25 <= 300) {
          airQuality["重度污染"]++;
        } else {
          airQuality["严重污染"]++;
        }
      });

      // 将空气质量分类对象转换为你想要的格式
      const result = Object.entries(airQuality).map(([name, value]) => ({
        name,
        value,
      }));
      this.data = result;
    },
    getEchartRight2() {
      let myChart = echarts.init(document.getElementById("chart_right2"));
      let option = {
        color: [
          "#008000",
          "#FFFF00",
          "#FFA500",
          "#FF0000",
          "#800080",
          "#8B0000",
        ],
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)",
        },
        polar: {},
        angleAxis: {
          interval: 1,
          type: "category",
          data: [],
          z: 10,
          axisLine: {
            show: false,
            lineStyle: {
              color: "#0B4A6B",
              width: 5,
              type: "solid",
            },
          },
          axisLabel: {
            interval: 0,
            show: true,
            color: "#0B4A6B",
            margin: 8,
            fontSize: 16,
          },
        },
        radiusAxis: {
          min: 40,
          max: 120,
          interval: 20,
          axisLine: {
            show: false,
            lineStyle: {
              color: "#0B3E5E",
              width: 1,
              type: "solid",
            },
          },
          axisLabel: {
            formatter: "{value} %",
            show: false,
            padding: [0, 0, 20, 0],
            color: "#0B3E5E",
            fontSize: 16,
          },
          splitLine: {
            lineStyle: {
              color: "#0B3E5E",
              width: 2,
              type: "solid",
            },
          },
        },
        calculable: true,
        series: [
          {
            type: "pie",
            radius: ["6%", "10%"],
            hoverAnimation: false,
            labelLine: {
              normal: {
                show: false,
                length: 30,
                length2: 50,
              },
              emphasis: {
                show: false,
              },
            },
            tooltip: {
              show: false,
            },
            data: [
              {
                name: "",
                value: 0,
                itemStyle: {
                  normal: {
                    color: "#0B4A6B",
                  },
                },
              },
            ],
          },
          {
            type: "pie",
            radius: ["90%", "95%"],
            hoverAnimation: false,
            labelLine: {
              normal: {
                show: false,
                length: 30,
                length2: 50,
              },
              emphasis: {
                show: false,
              },
            },
            tooltip: {
              show: false,
            },
            data: [
              {
                name: "",
                value: 0,
                itemStyle: {
                  normal: {
                    color: "#0B4A6B",
                  },
                },
              },
            ],
          },
          {
            stack: "a",
            type: "pie",
            radius: ["20%", "80%"],
            roseType: "area",
            zlevel: 10,
            label: {
              normal: {
                show: true,
                formatter: "{b}",
                textStyle: {
                  fontSize: 16,
                  color: "#fff",
                },
                position: "outside",
              },
              emphasis: {
                show: false,
              },
            },
            labelLine: {
              normal: {
                show: true,
                length: 15,
                length2: 50,
                lineStyle: {
                  type: "dotted",
                },
              },
              emphasis: {
                show: true,
              },
            },
            data: this.data,
          },
        ],
      };

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
.distribution-container {
  .chart {
    height: 3rem;
  }
}
</style>
