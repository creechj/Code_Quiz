// on start button click:
// while questions !last && timer !zero
// display question w/ 4 answer options
// if answer is correct: add 1 to score; display message; display next question
// else display message; display next question; deduct extra time
// once questions == last || timer == zero: display form to add initials w/ score
// display initials with scores ranked
// offer repeat - scores must persist

// query selectors for html elements
var start = document.querySelector("#start");
var question = document.querySelector("#question");
var choices = document.querySelector("#choices");
var result = document.querySelector("#result");
var score = document.querySelector("#score");
var initials = document.querySelector("#initials");
var submit = document.querySelector("#submit");

// array with questions to cycle through
var questions = [
    "Question1",
    "Question2",
    "Question3",
    "Question4",
]
// array with correct answers to corresponding questions
var answers = [
    "AnswertoQ1",
    "AnswertoQ2",
    "AnswertoQ3",
    "AnswertoQ4",
]
// array with filler answers
var falseAnswers = [
    "FalseAnswer1",
    "FalseAnswer2",
    "FalseAnswer3",
    "FalseAnswer4",
    "FalseAnswer5",
    "FalseAnswer6",
    "FalseAnswer7",
    "FalseAnswer8",
    "FalseAnswer9",
    "FalseAnswer10",
]

// selects question by index and displays options
var questionGenerator = function(qnumber){
    
    // selects and displays question by number
    question.textContent = questions[qnumber]

    // assigns 1 false answer to a variable and then removes that answer as an option to be selected for the next variable
    var falseAnswer1 = falseAnswers[Math.floor(Math.random()*falseAnswers.length)]
    var falseAnswers1 = falseAnswers
    falseAnswers1.splice(falseAnswers1.indexOf(falseAnswer1), 1)
    var falseAnswer2 = falseAnswers1[Math.floor(Math.random()*falseAnswers1.length)]
    var falseAnswers2 = falseAnswers1
    falseAnswers2.splice(falseAnswers2.indexOf(falseAnswer2), 1)
    var falseAnswer3 = falseAnswers2[Math.floor(Math.random()*falseAnswers2.length)]
    
    console.log(falseAnswer1)
    console.log(falseAnswers1)
    console.log(falseAnswer2)
    console.log(falseAnswers2)
    console.log(falseAnswer3)

    // array with stored answers for assignment to li's as options
    var randAnswers = [answers[qnumber],
    falseAnswer1, falseAnswer2, falseAnswer3]
    
    // loop to create li's for responses and assign answers
    for (i = 0; i < 4; i++) {
        var option = document.createElement("li")
        choices.appendChild(option)
        // assigns correct answer to 1 li and 3 false answers to others
        var randAnswer = Math.floor(Math.random() * randAnswers.length)
        option.textContent = randAnswers[randAnswer]
        // may not need this dependent on above solution
        option.setAttribute("id", `option${i}`)
        randAnswers.splice(randAnswer, 1)
    }
}

questionGenerator(2)