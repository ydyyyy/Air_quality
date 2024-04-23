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
    };
  },
  mounted() {
    this.getEchart();
  },
  methods: {
    getEchart() {
      let myChart = echarts.init(document.getElementById("chart_bp"));

      let itemStyleJR = { color: "#d6d638" };
      let itemStyleZW = { color: "#00c86c" };
      let itemStyleYL = { color: "#07d8ff" };
      let itemStyleIT = { color: "#0c71cf" };
      let itemStyleCY = { color: "#FFA500" };

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
            data: ["PM2.5", "PM10", "SO2", "NO2", "O3"],
            splitLine: { show: false },
            axisTick: { show: false },
            axisLine: {
              show: true,
              lineStyle: { color: "#2867a8" },
            },
            axisLabel: {
              color: "#FFFFFF", // 设置X轴标签的字体颜色为白色
              fontSize: 14,
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
            data: [
              { value: 120, itemStyle: itemStyleJR },
              { value: 200, itemStyle: itemStyleZW },
              { value: 150, itemStyle: itemStyleYL },
              { value: 80, itemStyle: itemStyleIT },
              { value: 80, itemStyle: itemStyleCY },
            ],
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
            data: [
              { value: 335, name: "PM2.5", itemStyle: itemStyleJR },
              { value: 310, name: "PM10", itemStyle: itemStyleZW },
              { value: 234, name: "SO2", itemStyle: itemStyleYL },
              { value: 135, name: "NO2", itemStyle: itemStyleIT },
              { value: 1548, name: "O3", itemStyle: itemStyleCY },
            ],
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
