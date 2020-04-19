import * as API from './'
// 全国疫情数据
export const getTotalDataOne = params => {
  return API.GET('statistics/totalDataOne', params)
}
// 图表所需数据
export const getNcovMapsData = params => {
  return API.GET('dnalysis/ncovMaps', params)
}
// 根据省的名字获取该省的历史数据
export const getProvinceHistoryList = params => {
  return API.GET('statistics/getProvinceHistoryList', params)
}
// 获取世界数据
export const getTotalDataTwo = params => {
  return API.GET('statistics/totalDataTwo', params)
}
// 获取谣言
export const getRumorList = params => {
  return API.GET('rumor/getRumorList', params)
}
// 根据谣言id获取谣言详情
export const getRumorDetail = params => {
  return API.GET('rumor/getRumorDetail', params)
}
// 获取口罩信息
export const getGauzeMask = params => {
  return API.GET('mask/gauzeMask', params)
}
// 获取所有同乘车辆数据
export const getSameRideAll = params => {
  return API.GET('sameRide/getSameRideAll', params)
}
// 根据日期和车号查询
export const getSameRide1 = params => {
  return API.GET('sameRide/getSameRide1', params)
}
