function NewArticle() {
  return {
    Id: "",
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

function NewUser () {
  return {
    Id: "",
    userName: "", // 用户名
    headPortrait: "", // 头像
    clockInDay: "", // 打卡天数
    clockInDeadline: "" // 打卡Deadline
  }
}

function NewRecord () {
  return {
    Id: "",
    userId: "",
    recordDatetime: "",
    answerRight: "",
    answerDuration: "",
    score: "",
    questionTotal: "",
    questionIdList: "",
    answerList: "",
    clockInDeadline: ""
  }
}
