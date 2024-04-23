import http from "@/utils/request";

export const getGeoCoordMap = () => {
  return http.get("/data/getGeoCoordMap");
};
