<!--
 描述: 酷屏首页模板
 作者: Jack Chen
 日期: 2020-04-29
-->

<template>
  <div class="home-container">
    <div class="wrap" ref="editor">
      <div class="top"></div>
      <h2>{{ this.cityName }}市空气污染预测</h2>

      <!-- <sinan />
      <seamless />

      <scrollArc />
      <szBar />

      <ringPin />
      <rotateColorful />
      <circleRunway />
      <scanRadius /> -->

      <cakeLinkage />
      <gauge />
      
      <div class="container">
        <!-- Button One -->
        <div class="btn-perspective">
          <button class="btn btn-3d btn-one">CO预测</button>
        </div>

        <!-- Button Two -->
        <div class="btn-perspective">
          <button class="btn btn-3d btn-two">PM2.5预测</button>
        </div>

        <!-- Button Three -->
        <div class="btn-perspective">
          <button class="btn btn-3d btn-three">PM10预测</button>
        </div>

        <!-- Button Four -->
        <div class="btn-perspective">
          <button class="btn btn-3d btn-four">SO2预测</button>
        </div>

        <div class="btn-perspective">
          <button class="btn btn-3d btn-five">NO2预测</button>
        </div>

        <div class="btn-perspective">
          <button class="btn btn-3d btn-six">O3预测</button>
        </div>

        <div class="btn-perspective">
          <button class="btn btn-3d btn-seven">AQI预测</button>
        </div>
      </div>

      <scrollArc />

      <!-- <dynamicLine />

      <staffMix />
      <flashCloud />
      <ringPie />
      <colorfulRadar />

      <dynamicList />
      <bar3d />
      <colorfulArea />

      <rainbow />
      <gauge />
      <waterPolo />
      <circleNesting /> -->

      <div class="divider"></div>
    </div>
  </div>
</template>

<script>
import { screenSize } from "@/assets/js/utils";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      cityName: "哈尔滨",
    };
  },
  computed: {},
  created() {},
  mounted() {
    screenSize(this.$refs.editor);
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.home-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  .wrap {
    transform-origin: 0px 0px 0px;
    background: url(../assets/img/bg-1.png) no-repeat;
    background-size: contain;
    background-position: 50% 0;
    background-color: rgb(0, 0, 0);
    min-width: auto;
    width: 1920px;
    min-height: auto;
    height: 1080px;
    overflow: auto;
    .top {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100px;
      background-color: transparent;
      background: url(../assets/img/brand/head_bg2.png) no-repeat;
      background-position: 65% 0;
      border: none;
      overflow: hidden;
      background-size: 100% 80%;
    }
    h2 {
      color: #7ef0ff; /* 保持原有颜色 */
      font-size: 0.6rem; /* 从0.475rem调整到1.5rem，根据需要适当调整 */
      text-align: center; /* 保持居中对齐 */
      line-height: 1rem; /* 调整行高为2rem */
      letter-spacing: 1px; /* 字母间距保持不变 */
      font-weight: bold; /* 增加字体粗细为粗体 */
    }
    .divider {
      position: absolute;
      left: 50px;
      top: 3253px;
      width: 90%;
      height: 50px;
      width: 300px;
      border: none;
      background: transparent;
    }
  }
}
</style>

<style>
/* Basic */
* {
  box-sizing:border-box;
}

body, html {
    height: 100%;
    width: 100%;
    margin: 0;
    font-family: Arial, sans-serif;
    overflow: hidden;
    background: #eaf6ff;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    width: 680px;
    position: relative;
    left: 1230px;
    top: 45px;
}

/* Buttons */
.btn {
  border: none;
    position: relative;
    background: none;
    padding: 28px; /* 如果需要，可以调整padding，但它会影响按钮内部文字的位置 */
    width: 280px; /* 设置统一的宽度，例如150px */
    display: inline-block;
    text-transform: uppercase;
    margin: 15px;
    color: inherit;
    letter-spacing: 2px;
    font-size: 1.7em;
    outline: none;
    transition: all 0.4s;
    cursor: pointer;
}

.btn:after {
    content: "";
    position: absolute;
    z-index: -1;
    transition: all 04.s;
}

.btn-perspective {
    perspective: 800px;
    display: inline-block;
}

.btn-3d {
    color: #fff;
    display: block;
    outline: 1px solid transparent;
    transform-style: preserve-3d;
}


/* Button One */
.btn-one {
    background-color: #E74C3C;
}
.btn-one:after {
    width: 100%;
    height: 42%;
    left: 0;
    top: -40%;
    background: #C0392D;
    transform-origin: 0% 100%;
    transform: rotateX(90deg);
}
.btn-one:hover {
    transform: rotateX(-45deg);   
}

/* Button Two */
.btn-two {
    background-color: #FFA500;
}
.btn-two:after {
    width: 100%;
    height: 42%;
    left: 0;
    top: -40%;
    background: #d6d638;
    transform-origin: 0% 100%;
    transform: rotateX(90deg);
}
.btn-two:hover {
    transform: rotateX(-45deg);   
}

/* Button Three */
.btn-three {
    background-color: #3498DB;
}
.btn-three:after {
    width: 20%;
    height: 100%;
    left: -20%;
    top: 0;
    background: #2980D9;
    transform-origin:100% 0%;
    transform: rotateY(-90deg);
}
.btn-three:hover {
    transform: rotateY(25deg);   
}

/* Button Four */
.btn-four {
    background-color: #b159b6;
}
.btn-four:after {
    width: 20%;
    height: 100%;
    left: 100%;
    top: 0;
    background: #8E44AD;
    transform-origin: 0% 0%;
    transform: rotateY(90deg);
}
.btn-four:hover {
    transform: rotateY(-25deg);
}

/* Button Five */
.btn-five {
    background-color: #d6d638;
}
.btn-five:after {
    width: 20%;
    height: 100%;
    left: -20%;
    top: 0;
    background: #FFFF00;
    transform-origin:100% 0%;
    transform: rotateY(-90deg);
}
.btn-five:hover {
    transform: rotateY(25deg);     
}

/* Button Six */
.btn-six {
    background-color: #1ABC9C;
}
.btn-six:after {
    width: 20%;
    height: 100%;
    left: 100%;
    top: 0;
    background: #16A085;
    transform-origin: 0% 0%;
    transform: rotateY(90deg);
}
.btn-six:hover {
    transform: rotateY(-25deg);   
}

/* Button Seven */
.btn-seven {
    background-color: #3477db;
    width: 590px;
}
.btn-seven:after {
    width: 100%;
    height: 40%;
    left: 0;
    top: 100%;
    background: #2972d9;
    transform-origin: 0% 0%;
    transform: rotateX(-90deg);
}
.btn-seven:hover {
    transform: rotateX(35deg);   
}
</style>