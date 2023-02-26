const getTodayQuestion = (userQuestions) => {
  let currentDate = dateFormat(new Date());
  const todayQuestionsId = userQuestions
    .filter((ques) => {
      return compareTwoDates(currentDate, ques.dateReminder);
    })
    .map((ques) => ques.questionId);
  return todayQuestionsId;
};
const compareTwoDates = (currentDate, dates) => {
  let bool = false;
  for (let date of dates) {
    let formatedDate = dateFormat(new Date(date));
    if (formatedDate === currentDate) {
      bool = true;
    }
  }
  return bool;
};
const dateFormat = (date) => {
  let formatedDate =
    date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
  return formatedDate;
};
module.exports = getTodayQuestion;
