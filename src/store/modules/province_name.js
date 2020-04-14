const state = {
  provinceName: '', // 首页选择的省份名称汉字
  provinceNameEn: '', // 首页选择的省份名称拼音
  noDataProvince: [], // 首页不能选择的省份名称
  provinceMapData: [], // 各个省份的地图疫情数据
  provinceCardData: [], // 各个省份的卡片数据
  selectProvinceMapData: [], // 选中省份的地图疫情数据
  selectProvinceCardData: [], // 选中省份的卡片数据
  lastUpdateTime: '' // 最近更新时间
}
const getters = {
  provinceName: ({ provinceName }) => provinceName,
  provinceNameEn: ({ provinceNameEn }) => provinceNameEn,
  noDataProvince: ({noDataProvince}) => noDataProvince,
  provinceMapData: ({provinceMapData}) => provinceMapData,
  provinceCardData: ({ provinceCardData }) => provinceCardData,
  selectProvinceMapData: ({selectProvinceMapData}) => selectProvinceMapData,
  selectProvinceCardData: ({ selectProvinceCardData }) => selectProvinceCardData,
  lastUpdateTime: ({lastUpdateTime}) => lastUpdateTime

}
const mutations = {
  // 更新点击省份的名称
  CHANGE_PROVINCE_NAME (state, { provinceName = '' }) {
    state.provinceName = provinceName
  },
  // 更新点击省份的名称拼音
  CHANGE_PROVINCE_NAME_EN (state, { provinceNameEn = '' }) {
    state.provinceNameEn = provinceNameEn
  },
  // 更新不能下钻的省份名称
  CHANGE_NO_DATA_PROVINCE_NAME (state, { noDataProvince = [] }) {
    state.noDataProvince = noDataProvince
  },
  // 各个省份地图的疫情数据
  CHANGE_PROVINCE_MAP_DATA (state, { provinceMapData = [] }) {
    state.provinceMapData = provinceMapData
  },
  // 各个省份的六个卡片疫情数据
  CHANGE_PROVINCE_CARD_DATA (state, { provinceCardData = [] }) {
    state.provinceCardData = provinceCardData
  },
  // 选中的省份地图的疫情数据
  CHANGE_SELECT_PROVINCE_MAP_DATA (state, { selectProvinceMapData = [] }) {
    state.selectProvinceMapData = selectProvinceMapData
  },
  // 选中的省份的六个卡片疫情数据
  CHANGE_SELECT_PROVINCE_CARD_DATA (state, { selectProvinceCardData = [] }) {
    state.selectProvinceCardData = selectProvinceCardData
  },
  // 更换最近更新时间
  CHANGE_LAST_UPDATE_TIME (state, { lastUpdateTime = [] }) {
    state.lastUpdateTime = lastUpdateTime
  }

}
const moduleProvince = {
  state,
  getters,
  mutations
}
export default moduleProvince
