import { GetCollection, CMD } from './base'
import { LoginUser } from './user'

export function NewRecord () {
  return {
    user: null, // 用户信息
    recordDatetime: "", // 打卡时间
    answerRight: "", // 答对题数
    answerDuration: "", // 答题时间
    score: "", // 得分
    questionTotal: "", // 总题数
    questionIdList: "", // 问题id列表
    answerList: "", // 答案列表
    clockInDeadline: "", // 打卡Deadline
  }
}

function getNowDate() {
  let date = new Date()
  let nowMonth = date.getMonth() + 1
  let strDate = date.getDate()
  if (nowMonth >= 1 && nowMonth <= 9) {
    nowMonth = '0' + nowMonth
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  return date.getFullYear() + nowMonth + strDate
}

export function CreateRecord(record) {
  record.user = {
    userId: LoginUser.userId,
    userName: LoginUser.userName,
    headPortrait: LoginUser.headPortrait,
    clockInDay: LoginUser.clockInDay
  }

  return new Promise((resolve, reject) => {
    let recordCol = GetCollection('record')
    recordCol.add({
      data: record,
      success: resolve,
      fail: reject
    })
  })
}

export function GetRecord(recordId) {
  return new Promise((resolve, reject) => {
    let recordCol = GetCollection('record')
    recordCol.doc(recordId).get({
      success: resolve,
      fail: reject
    })
  })
}

export function GetUserRecord() {
  return new Promise((resolve, reject) => {
    let recordCol = GetCollection('record')
    recordCol.where({
      'user.userId': LoginUser.userId,
      clockInDeadline: getNowDate()
    }).get({
      success: resolve,
      fail: reject
    })
  })
}

export function GetOtherRecord() {
  return new Promise((resolve, reject) => {
    let recordCol = GetCollection('record')
    recordCol.where({
      clockInDeadline: getNowDate(),
      'user.userId': CMD.neq(LoginUser.userId)
    }).get({
      success: resolve,
      fail: reject
    })
  })
}
