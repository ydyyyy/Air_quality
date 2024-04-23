<!--
 描述: 人才队伍
 作者: Jack Chen
 日期: 2020-05-09
-->

<template>
  <div class="talent-container">
    <div class="chart" id="chart_left2"></div>
  </div>
</template>

<script>
export default {
  name: "talent",
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
        console.log("主要污染物占比变化");
        this.covertData(newValue);
        this.getEchartLeft2();
      },
      immediate: true, // 立即执行 handler
    },
  },
  mounted() {
    this.getEchartLeft2();
  },
  methods: {
    covertData(data) {
      const avgData = [];
      // 计算每个指标的平均值
      for (let i = 3; i < 9; i++) {
        const sum = Object.values(data).reduce((acc, cur) => acc + cur[i], 0);
        const avg = sum / Object.keys(data).length;
        avgData.push({
          name:
            i === 3
              ? "PM2.5"
              : i === 4
              ? "PM10"
              : i === 5
              ? "SO2"
              : i === 6
              ? "NO2"
              : i === 7
              ? "CO"
              : "O3",
          value: avg.toFixed(2), // 取两位小数
        });
        this.data = avgData;
      }
    },
    getEchartLeft2() {
      let myChart = echarts.init(document.getElementById("chart_left2"));
      let scaleData = this.data;
      let rich = {
        white: {
          color: "#ddd",
          align: "center",
          padding: [3, 0],
        },
      };
      let placeHolderStyle = {
        normal: {
          label: {
            show: false,
          },
          labelLine: {
            show: false,
          },
          color: "rgba(0, 0, 0, 0)",
          borderColor: "rgba(0, 0, 0, 0)",
          borderWidth: 0,
        },
      };
      let data = [];
      let color = [
        "#00ffff",
        "#00cfff",
        "#006ced",
        "#ffe000",
        "#ffa800",
        "#ff5b00",
        "#ff3000",
      ];
      for (let i = 0; i < scaleData.length; i++) {
        data.push(
          {
            value: scaleData[i].value,
            name: scaleData[i].name,
            itemStyle: {
              normal: {
                borderWidth: 6,
                shadowBlur: 10,
                borderColor: color[i],
                shadowColor: color[i],
              },
            },
          },
          {
            value: 2,
            name: "",
            itemStyle: placeHolderStyle,
          }
        );
      }

      let option = {
        series: [
          {
            name: "",
            type: "pie",
            clockWise: false,
            radius: ["66%", "68%"],
            center: ["50%", "50%"],
            hoverAnimation: false,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: "outside",
                  color: "#ddd",
                  formatter: (params) => {
                    let percent = 0;
                    let total = 0;
                    for (let i = 0; i < scaleData.length; i++) {
                      total += parseFloat(scaleData[i].value); // 使用 parseFloat 转换为浮点数
                    }
                    percent = ((params.value / total) * 100).toFixed(0);
                    if (params.name !== "") {
                      return (
                        params.name + "\n{white|" + "占比" + percent + "%}"
                      );
                    } else {
                      return "";
                    }
                  },
                  rich: rich,
                },
                labelLine: {
                  length: 10,
                  length2: 30,
                  show: true,
                  color: "#00ffff",
                },
              },
            },
            data: data,
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
.talent-container {
  .chart {
    height: 3rem;
  }
}
</style>
