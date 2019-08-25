import {CMD, GetCollection} from './base'

export var LoginUser = {}

function newUser() {
  return {
    _id: '',
    userId: '', // 用户ID
    userName: "", // 用户名
    headPortrait: "", // 头像
    clockInDay: 0 // 打卡天数
  }
}

export function Login(openId, userInfoRes) {
  return new Promise((resolve, reject) => {
    getUser(openId).then(function(res) {
      if(res.data.length === 0) {
        createUser(openId, userInfoRes).then(function(user) {
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

function createUser(openId, userInfoRes) {
  return new Promise((resolve, reject) => {
    let userCol = GetCollection('user')

    let user = newUser()
    user.userId = openId
    user.userName = userInfoRes.userInfo.nickName
    user.headPortrait = userInfoRes.userInfo.avatarUrl

    userCol.add({
      data: user,
      success: function(res) {
        user._id = res._id
        resolve(user)
      },
      fail: reject
    })
  })
}

export function IncrUserClockInDay() {
  return new Promise((resolve, reject) => {
    let userCol = GetCollection('user')
    userCol.doc(LoginUser._id).update({
      // data 传入需要局部更新的数据
      data: {
        clockInDay: CMD.inc(1)
      },
      success: function(res) {
        LoginUser.clockInDay ++
        resolve(res)
      }
    })
  });

}
