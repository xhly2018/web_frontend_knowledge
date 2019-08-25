import { CMD, GetCollection } from './base'
import { Shuffle } from '../tools'
function NewArticle() {
  return {
    type: "", // 题型：css,html,vue,js之类的
    questionType: "",// 0:单选 1:多选
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    answer: "",
    problemPicture: "",
    optionPictureA: "",
    optionPictureB: "",
    optionPictureC: "",
    optionPictureD: "",
    analysis: ""
  }
}

export function InitArticles() {
  return new Promise((resolve, reject) => {
    let articleCol = GetCollection('article')

    let records = []
    records.push({
      type: "JS",
      questionType: "0",
      question: "[ [3,2,1].reduce(Math.pow), [].reduce(Math.pow)]",
      optionA: "an error",
      optionB: "[9, 0]",
      optionC: "[9, NaN]",
      optionD: "[9, undefined]",
      answer: "A",
      problemPicture: "",
      optionPictureA: "",
      optionPictureB: "",
      optionPictureC: "",
      optionPictureD: "",
      analysis: "12121"
    })

    for (let i in records) {
      articleCol.add(
        {
          data: records[i],
        }
      )
    }
  })
}

export function GetTodayArticle() {
  return new Promise((resolve, reject) => {
    let articleCol = GetCollection('article')
    articleCol.limit(10).get({
      success: function(res) {
        Shuffle(res.data)
        let articles = []
        for (let i in res.data) {
          articles.push(res.data[i])
          if (articles.length === 2) {
            break
          }
        }
        resolve(articles)
      },
      fail: reject
    })
  })
}

export function GetArticles(articleIds) {
  return new Promise((resolve, reject) => {
    let articleCol = GetCollection('article')
    articleCol.where({
      _id: CMD.in(articleIds)
    }).get({
      success: resolve,
      fail: reject
    })
  })
}

export function GetArticleMain(articleId) {
  return new Promise((resolve, reject) => {
    let articleCol = GetCollection('article')
    articleCol.doc(articleId).get({
      success: resolve,
      fail: reject
    })
  })
}
