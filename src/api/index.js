import http from "@/utils/request";

export const getGeoCoordMap = () => {
  return http.get("/weather");
};

export const getPredictForCO = () => {
  return http.get("/data/getPredictForCO");
};

export const getPredictForNO2 = () => {
  return http.get("/data/getPredictForNO2");
}

export const getPredictForO3 = () => {
  return http.get("/data/getPredictForO3");
} 

export const getPredictForPM10 = () => {
  return http.get("/data/getPredictForPM10");
}

export const getPredictForPM2 = () => {
  return http.get("/data/getPredictForPM2");
}

export const getPredictForSO2 = () => {
  return http.get("/data/getPredictForSO2");
}

export const getPredictForAQI = () => {
  return http.get("/data/getPredictForAQI");
}
