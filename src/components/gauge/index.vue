<!--
 描述: 仪表盘
 作者: Jack Chen
 日期: 2020-05-03
-->

<template>
  <div class="wrap-container sn-container">
    <div class="sn-content">
      <div class="sn-body">
        <div class="wrap-container">
          <div class="chartsdom" id="chart_gauge"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "gauge",
  data() {
    return {
      option: null,
      timer: null,
    };
  },
  mounted() {
    this.getEchart();
  },
  methods: {
    getEchart() {
      let myChart = echarts.init(document.getElementById("chart_gauge"));
      this.option = {
        tooltip: {
          formatter: "{a} <br/>{c} {b}",
        },
        series: [
          {
            name: "AQI",
            type: "gauge",
            min: 0,
            max: 400,
            splitNumber: 8,
            // radius: '50%',
            axisLine: {
              lineStyle: {
                width: 10,
                color: [
                  [50 / 400, "#008000"], // 0-50 优 绿色
                  [100 / 400, "#FFFF00"], // 51-100 良 黄色
                  [150 / 400, "#FFA500"], // 101-150 轻度污染 橙色
                  [200 / 400, "#FF0000"], // 151-200 中度污染 红色
                  [300 / 400, "#800080"], // 201-300 重度污染 紫色
                  [1, "#8B0000"], // 301-400 严重污染 深红色
                ],
              },
            },
            axisLabel: {
              // 坐标轴小标记
              fontWeight: "bolder",
              color: "#fff",
              shadowColor: "#fff", //默认透明
              shadowBlur: 10,
            },
            axisTick: {
              // 坐标轴小标记
              length: 15, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: "auto",
                shadowColor: "#fff", //默认透明
                shadowBlur: 10,
              },
            },
            splitLine: {
              // 分隔线
              length: 25, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                width: 3,
                color: "#fff",
                shadowColor: "#fff", //默认透明
                shadowBlur: 10,
              },
            },
            pointer: {
              // 分隔线
              shadowColor: "#fff", //默认透明
              shadowBlur: 5,
            },
            title: {
              textStyle: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: "bolder",
                fontSize: 25,
                color: "#fff",
                shadowColor: "#fff", //默认透明
                shadowBlur: 10,
              },
            },
            detail: {
              // backgroundColor: 'rgba(30,144,255,0.8)',
              // borderWidth: 1,
              // borderColor: '#fff',
              // shadowColor: '#fff', //默认透明
              // shadowBlur: 5,
              offsetCenter: [0, "50%"], // x, y，单位px
              textStyle: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: "bolder",
                fontSize: 25,
                color: "#fff",
              },
            },
            data: [
              {
                value: this.$store.state.cityInfo[2],
                name: "AQI",
              },
            ],
          },
        ],
      };

      myChart.setOption(this.option, true);

      window.addEventListener("resize", () => {
        myChart.resize();
      });

      this.timer = setInterval(() => {
        // 获取基础值
        const baseValue = this.$store.state.cityInfo[2];
        // 生成一个 [-5, 5] 范围内的随机浮动值
        const randomFluctuation = (Math.random() * 2 - 1).toFixed(2); 
        // 计算新的值，确保它在 0 到 400 的范围内
        const newValue = Math.max(
          0,
          Math.min(400, baseValue + parseFloat(randomFluctuation))
        );
        // 更新仪表盘数据
        this.option.series[0].data[0].value = newValue;
        myChart.setOption(this.option, true);
      }, 2000);
    },
  },

  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style lang="scss" scoped>
.sn-container {
  left: 730px;
  top: 145px;
  width: 432px;
  height: 400px;
  .chartsdom {
    width: 120%;
    height: 120%;
    left: -40px;
    top: -40px;
  }
}
</style>
