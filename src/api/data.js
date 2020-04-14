import * as API from './'
export const getTotalDataOne = params => {
  return API.GET('statistics/totalDataOne', params)
}
