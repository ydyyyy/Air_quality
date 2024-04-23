import Mock from "mockjs";
import data from "./mockServeData/data";


// Mock.mock('/api/permission/getProjects', permission.getProjects)
// Mock.mock('/api/permission/getFiles', permission.getFiles)
// Mock.mock('/api/permission/getFileTree', 'post',permission.getFileTree)
// Mock.mock('/api/permission/getFileById', 'post',permission.getFileById)
// Mock.mock('/api/permission/getTypeFiles', 'post',permission.getTypeFiles)
// Mock.mock('/api/permission/sendToServer', 'post',permission.sendToServer)
// Mock.mock('/api/permission/updateFileById', 'post',permission.updateFileById)

Mock.mock('/api/data/getGeoCoordMap',data.getGeoCoordMap)

Mock.mock('/api/data/getPredictForCO',data.getPredictForCO)
Mock.mock('/api/data/getPredictForNO2',data.getPredictForNO2)
Mock.mock('/api/data/getPredictForO3',data.getPredictForO3)
Mock.mock('/api/data/getPredictForPM10',data.getPredictForPM10)
Mock.mock('/api/data/getPredictForPM2',data.getPredictForPM2)
Mock.mock('/api/data/getPredictForSO2',data.getPredictForSO2)
Mock.mock('/api/data/getPredictForAQI',data.getPredictForAQI)
