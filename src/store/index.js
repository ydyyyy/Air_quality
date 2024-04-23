import Vue from 'vue'
import Vuex from 'vuex'
import { getGeoCoordMap } from "../api";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cityName: '',
    cityInfo: [], // 当前选中城市信息
    geoCoordMap: {},
    predictData: []
  },
  mutations: {
    updateGeoCoordMap(state, newMap) {
      state.geoCoordMap = newMap; // 这里更新状态
    },
    updateCityInfo(state, cityInfo) {
      state.cityInfo = cityInfo;
      console.log(state.cityInfo);
    },
    updateCityName(state, cityName) {
      state.cityName = cityName;
      console.log(state.cityName);
    },
    updatePredictData(state, data) {
      state.predictData = data;
    }
  },
  actions: {
    startGeoUpdate({ commit }) {
      setInterval(() => {
        getGeoCoordMap().then(({ data }) => {
          console.log("计时器工作了");
          commit('updateGeoCoordMap', data);
        });
      }, 100000); 
    },
    initGeoCoordMap({ commit }) {
      getGeoCoordMap().then(({ data }) => {
        commit('updateGeoCoordMap', data);
      });
    }
  },
  modules: {
  }
})
