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
