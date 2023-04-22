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
]

// selects question by index and displays appropriate options
var questionGenerator = function(qnumber){
    // selects and displays question by number
    question.textContent = questions[qnumber]
    // array with correct answer & 3 random false answers to randomly assign to li's
    var randAnswers = [answers[qnumber],
    falseAnswers[Math.floor(Math.random()*falseAnswers.length)],
    falseAnswers[Math.floor(Math.random()*falseAnswers.length)],
    falseAnswers[Math.floor(Math.random()*falseAnswers.length)]
    ]
    // loop to create li's for responses and assign answers
    for (i = 0; i < randAnswers.length; i++) {
        var option = document.createElement("li")
        choices.appendChild(option)
        // needs to assign correct answer to 1 li and 3 false answers to others (currently completely random per randAnswers)
        option.textContent = randAnswers[Math.floor(Math.random() * 4)]
        // may not need this dependent on above solution
        option.setAttribute("id", `option${i}`)
    }
}

questionGenerator(3)