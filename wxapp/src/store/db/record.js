import { GetCollection } from './base'
import { LoginUser } from './user'

export function NewRecord () {
  return {
    userId: "", // 用户ID
    recordDatetime: "", // 打卡时间
    answerRight: "", // 答对题数
    answerDuration: "", // 答题时间
    score: "", // 得分
    questionTotal: "", // 总题数
    questionIdList: "", // 问题id列表
    answerList: "", // 答案列表
    clockInDeadline: "" // 打卡Deadline
  }
}

export function CreateRecord(record) {
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

export function GetUserRecord(nowDate) {
  return new Promise((resolve, reject) => {
    let recordCol = GetCollection('record')
    recordCol.where({
      userId: LoginUser.userId,
      clockInDeadline: nowDate
    }).get({
      success: resolve,
      fail: reject
    })
  })
}
