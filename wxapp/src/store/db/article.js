import { GetCollection } from './base'
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

export function GetArticle() {
  return new Promise((resolve, reject) => {
    let articleCol = GetCollection('article')
    articleCol.get({
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
