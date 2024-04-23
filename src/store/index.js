import Vue from 'vue'
import Vuex from 'vuex'
import { getGeoCoordMap } from "../api";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cityName: '', // 当前选中城市
    geoCoordMap: {},
  },
  mutations: {
    updateGeoCoordMap(state, newMap) {
      state.geoCoordMap = newMap; // 这里更新状态
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
