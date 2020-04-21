const state = {
  chinaTotalObj: {}, // 中国的总体信息
  provinceName: '', // 首页选择的省份名称汉字
  provinceNameEn: '', // 首页选择的省份名称拼音
  noDataProvince: [], // 首页不能选择的省份名称
  provinceMapData: [], // 各个省份的地图疫情数据
  provinceCardData: [], // 各个省份的卡片数据
  selectProvinceMapData: [], // 选中省份的地图疫情数据
  selectProvinceCardData: [], // 选中省份的卡片数据
  lastUpdateTime: '', // 最近更新时间
  chooseRumorId: '', // 选择的谣言id
  mapProvinceCityInfo: {}, // 百度地图的省份和城市信息
  mapCenterData: {}, // 地图中心点位置
  isModalShow: false // 联系我们弹窗是否显示
}
const getters = {
  chinaTotalObj (state) {
    state.chinaTotalObj = JSON.parse(localStorage.getItem('chinaTotalObj'))
    return state.chinaTotalObj
  },
  provinceName (state) {
    state.provinceName = localStorage.getItem('provinceName')
    return state.provinceName
  },
  provinceNameEn (state) {
    state.provinceNameEn = localStorage.getItem('provinceNameEn')
    return state.provinceNameEn
  },
  noDataProvince (state) {
    state.noDataProvince = JSON.parse(localStorage.getItem('noDataProvince'))
    return state.noDataProvince
  },
  provinceMapData (state) {
    state.provinceMapData = JSON.parse(localStorage.getItem('provinceMapData'))
    return state.provinceMapData
  },
  provinceCardData (state) {
    state.provinceCardData = JSON.parse(localStorage.getItem('provinceCardData'))
    return state.provinceCardData
  },
  selectProvinceMapData (state) {
    state.selectProvinceMapData = JSON.parse(localStorage.getItem('selectProvinceMapData'))
    return state.selectProvinceMapData
  },
  selectProvinceCardData (state) {
    state.selectProvinceCardData = JSON.parse(localStorage.getItem('selectProvinceCardData'))
    return state.selectProvinceCardData
  },
  lastUpdateTime (state) {
    state.lastUpdateTime = localStorage.getItem('lastUpdateTime')
    return state.lastUpdateTime
  },
  chooseRumorId (state) {
    state.chooseRumorId = localStorage.getItem('chooseRumorId')
    return state.chooseRumorId
  },
  mapProvinceCityInfo (state) {
    state.mapProvinceCityInfo = JSON.parse(localStorage.getItem('mapProvinceCityInfo'))
    return state.mapProvinceCityInfo
  },
  mapCenterData (state) {
    state.mapCenterData = JSON.parse(localStorage.getItem('mapCenterData'))
    return state.mapCenterData
  },
  isModalShow (state) {
    state.isModalShow = JSON.parse(sessionStorage.getItem('isModalShow'))
    return state.isModalShow
  }
}
const mutations = {
  // 更新中国的信息
  CHANGE_CHINA_OBJ_INFO (state, { chinaTotalObj = {} }) {
    state.chinaTotalObj = chinaTotalObj
    localStorage.setItem('chinaTotalObj', JSON.stringify(chinaTotalObj))
  },
  // 更新点击省份的名称
  CHANGE_PROVINCE_NAME (state, { provinceName = '' }) {
    state.provinceName = provinceName
    localStorage.setItem('provinceName', provinceName)
  },
  // 更新点击省份的名称拼音
  CHANGE_PROVINCE_NAME_EN (state, { provinceNameEn = '' }) {
    state.provinceNameEn = provinceNameEn
    localStorage.setItem('provinceNameEn', provinceNameEn)
  },
  // 更新不能下钻的省份名称
  CHANGE_NO_DATA_PROVINCE_NAME (state, { noDataProvince = [] }) {
    state.noDataProvince = noDataProvince
    localStorage.setItem('noDataProvince', JSON.stringify(noDataProvince))
  },
  // 各个省份地图的疫情数据
  CHANGE_PROVINCE_MAP_DATA (state, { provinceMapData = [] }) {
    state.provinceMapData = provinceMapData
    localStorage.setItem('provinceMapData', JSON.stringify(provinceMapData))
  },
  // 各个省份的六个卡片疫情数据
  CHANGE_PROVINCE_CARD_DATA (state, { provinceCardData = [] }) {
    state.provinceCardData = provinceCardData
    localStorage.setItem('provinceCardData', JSON.stringify(provinceCardData))
  },
  // 选中的省份地图的疫情数据
  CHANGE_SELECT_PROVINCE_MAP_DATA (state, { selectProvinceMapData = [] }) {
    state.selectProvinceMapData = selectProvinceMapData
    localStorage.setItem('selectProvinceMapData', JSON.stringify(selectProvinceMapData))
  },
  // 选中的省份的六个卡片疫情数据
  CHANGE_SELECT_PROVINCE_CARD_DATA (state, { selectProvinceCardData = [] }) {
    state.selectProvinceCardData = selectProvinceCardData
    localStorage.setItem('selectProvinceCardData', JSON.stringify(selectProvinceCardData))
  },
  // 更换最近更新时间
  CHANGE_LAST_UPDATE_TIME (state, { lastUpdateTime = '' }) {
    state.lastUpdateTime = lastUpdateTime
    localStorage.setItem('lastUpdateTime', lastUpdateTime)
  },
  // 更新谣言id
  CHANGE_CHOOSE_RUMOR_ID (state, { chooseRumorId = '' }) {
    state.chooseRumorId = chooseRumorId
    localStorage.setItem('chooseRumorId', chooseRumorId)
  },
  // 更换省份和城市信息
  CHANGE_PROVINCE_CITY_MAP (state, { mapProvinceCityInfo = {} }) {
    state.mapProvinceCityInfo = mapProvinceCityInfo
    localStorage.setItem('mapProvinceCityInfo', JSON.stringify(mapProvinceCityInfo))
  },
  // 更换地图中心点位置
  CHANGE_MAP_CENTER_DATA (state, { mapCenterData = {} }) {
    state.mapCenterData = mapCenterData
    localStorage.setItem('mapCenterData', JSON.stringify(mapCenterData))
  },
  // 更新是否显示联系我们弹窗的信息
  CHANGE_IS_MODAL_SHOW_INFO (state, { isModalShow = false }) {
    state.isModalShow = isModalShow
    sessionStorage.setItem('isModalShow', JSON.stringify(isModalShow))
  }
}
const moduleProvince = {
  state,
  getters,
  mutations
}
export default moduleProvince
