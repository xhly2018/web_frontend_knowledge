import { GetCollection } from './base'

export var Setting = {}

export function InitSetting() {
  return new Promise((resolve, reject) => {
    let settingCol = GetCollection('setting')
    settingCol.get({
      success: function(res) {
        Setting = res.data
        resolve(true)
      },
      fail: reject
    })
  });
}
