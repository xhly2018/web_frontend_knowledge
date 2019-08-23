export default function GetDB() {
  wx.cloud.init()
  return wx.cloud.database()
}

export function GetCollection(collection) {
  return GetDB().collection(collection)
}

export const CMD = GetDB().command
