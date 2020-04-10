import * as API from './'
export const getTotalDataOne = params => {
  return API.GET('/ncov/statistics/totalDataOne', params)
}
