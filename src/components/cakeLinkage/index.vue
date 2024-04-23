<!--
 描述: 柱饼组合联动
 作者: Jack Chen
 日期: 2020-04-30
-->

<template>
  <div class="wrap-container sn-container">
    <div class="sn-content">
      <div class="sn-title">空气污染实时数据</div>
      <div class="sn-body">
        <div class="wrap-container">
          <div class="chartsdom" id="chart_bp"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cakeLinkage",
  data() {
    return {
      option: null,
      dataMap: {},
      data:[
              { value: this.$store.state.cityInfo[3], name: "PM2.5", itemStyle: { color: "#d6d638" } },
              { value: this.$store.state.cityInfo[4], name: "PM10", itemStyle: { color: "#00c86c" } },
              { value: this.$store.state.cityInfo[5], name: "SO2", itemStyle: { color: "#07d8ff" } },
              { value: this.$store.state.cityInfo[6], name: "NO2", itemStyle: { color: "#0c71cf" } },
              { value: this.$store.state.cityInfo[7], name: "CO", itemStyle: { color: "#E74C3C" } },
              { value: this.$store.state.cityInfo[8], name: "O3", itemStyle: { color: "#FFA500" } },
            ]
    };
  },
  mounted() {
    this.getEchart();
  },
  methods: {
    getEchart() {
      let myChart = echarts.init(document.getElementById("chart_bp"));
      this.option = {
        tooltip: {
          // 启用 tooltip
          trigger: "item",
        },
        grid: {
          bottom: "20%",
          right: "42%",
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: ["PM2.5", "PM10", "SO2", "NO2", "CO", "O3"],
            splitLine: { show: false },
            axisTick: { show: false },
            axisLine: {
              show: true,
              lineStyle: { color: "#2867a8" },
            },
            axisLabel: {
              color: "#FFFFFF", // 设置X轴标签的字体颜色为白色
              fontSize: 11,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "污染量（μg/m3）",
            nameTextStyle: {
              color: "#FFFFFF", // 设置字体颜色为白色
              fontSize: 14, // 设置字体大小
              fontWeight: "bold", // 可选，如果你想让字体更粗
            },
            splitLine: { show: false },
            axisTick: { show: false },
            axisLine: {
              show: true,
              lineStyle: { color: "#2867a8" },
            },
            axisLabel: {
              color: "#FFFFFF", // 设置X轴标签的字体颜色为白色
              fontSize: 16,
            },
          },
        ],
        series: [
          {
            type: "bar",
            data: this.data,
            barMaxWidth: 15,
            center: ["20%", "65%"],
            seriesLayoutBy: "row",
            label: {
              // 启用数据标签显示
              show: true,
              position: "top",
              color: "#FFFFFF",
              fontSize: 16,
            },
            markPoint: {
              symbol: "pin",
              itemStyle: {
                normal: {
                  color: "#eb9b44",
                  shadowColor: "#eb9b44",
                  shadowBlur: 15,
                },
              },
            },
          },
          {
            name: "应用占比",
            type: "pie",
            data: this.data,
            center: ["76%", "20%"],
            radius: "28%",
            z: 100,
            label: {
              normal: {
                show: true,
                position: "outside",
                color: "#FFFFFF", // 设置饼状图切片标签的字体颜色为白色
                fontSize: 16,
              },
            },
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
.sn-container {
  left: 50px;
  top: 145px;
  width: 586px;
  height: 400px;
  .chartsdom {
    width: 100%;
    height: 100%;
  }
}
</style>
