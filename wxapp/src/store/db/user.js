import {CMD, GetCollection} from './base'

function newUser() {
  return {
    userId: '', // 用户ID
    userName: "", // 用户名
    headPortrait: "", // 头像
    clockInDay: 0 // 打卡天数
  }
}

export function GetUser(userId) {
  return new Promise((resolve, reject) => {
    let userCol = GetCollection('user')
    userCol.where({userId: userId}).get({
      success: resolve,
      fail: reject
    })
  });
}

export function CreateUser(accountInfo, userInfo) {
  return new Promise((resolve, reject) => {
    let userCol = GetCollection('user')

    let user = newUser()
    user.userId = accountInfo.miniProgram.appId
    user.userName = userInfo.nickName
    user.headPortrait = userInfo.avatarUrl

    userCol.add({
      data: user,
      success: resolve,
      fail: reject
    })
  })
}

export function IncrUserClockInDay(userId) {
  return new Promise((resolve, reject) => {
    GetUser(userId).then(function (user) {
      let userCol = GetCollection('user')
      userCol.doc(user.data[0]._id).update({
        // data 传入需要局部更新的数据
        data: {
          clockInDay: CMD.inc(1)
        },
        success: resolve
      })
    })
  });

}
