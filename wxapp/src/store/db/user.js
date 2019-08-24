import {CMD, GetCollection} from './base'

export var LoginUser = {}

function newUser() {
  return {
    userId: '', // 用户ID
    userName: "", // 用户名
    headPortrait: "", // 头像
    clockInDay: 0 // 打卡天数
  }
}

export function Login(userInfoRes) {
  return new Promise((resolve, reject) => {
    getUser(userInfoRes.userInfo.nickName).then(function(res) {
      if(res.data.length === 0) {
        createUser(userInfoRes).then(function(user) {
          LoginUser = user
          resolve(user)
        })
      } else {
        LoginUser = res.data[0]
        resolve(res.data[0])
      }
    })
  })
}

function getUser(userId) {
  return new Promise((resolve, reject) => {
    let userCol = GetCollection('user')
    userCol.where({userId: userId}).get({
      success: resolve,
      fail: reject
    })
  });
}

function createUser(userInfoRes) {
  return new Promise((resolve, reject) => {
    let userCol = GetCollection('user')

    let user = newUser()
    user.userId = userInfoRes.userInfo.nickName
    user.userName = userInfoRes.userInfo.nickName
    user.headPortrait = userInfoRes.userInfo.avatarUrl

    userCol.add({
      data: user,
      success: function() {
        resolve(user)
      },
      fail: reject
    })
  })
}

export function IncrUserClockInDay(userId) {
  return new Promise((resolve, reject) => {
    getUser(userId).then(function (user) {
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
