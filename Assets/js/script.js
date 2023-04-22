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

var currentScore
var qnumber

// array with questions to cycle through
var questions = [
    "Question1",
    "Question2",
    "Question3",
    "Question4",
];
// array with correct answers to corresponding questions
var answers = [
    "AnswertoQ1",
    "AnswertoQ2",
    "AnswertoQ3",
    "AnswertoQ4",
];
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
];

// sets load state of page. also used for reset
var initializePage = function() {
    start.setAttribute("data-state", "visible");
    question.setAttribute("data-state", "hidden");
    choices.setAttribute("data-state", "hidden");
    result.setAttribute("data-state", "hidden");
    score.setAttribute("data-state", "visible");
    initials.setAttribute("data-state", "hidden");
    submit.setAttribute("data-state", "hidden");
}

// selects question by index and displays options
var questionGenerator = function(qnumber){
    
    // selects and displays question by number
    question.textContent = questions[qnumber];
    score.innerHTML = ""
    // assigns 1 false answer to a variable and then removes that answer as an option to be selected for the next variable
    var falseAnswer1 = falseAnswers[Math.floor(Math.random()*falseAnswers.length)];
    var falseAnswers1 = falseAnswers;
    falseAnswers1.splice(falseAnswers1.indexOf(falseAnswer1), 1);
    var falseAnswer2 = falseAnswers1[Math.floor(Math.random()*falseAnswers1.length)];
    var falseAnswers2 = falseAnswers1;
    falseAnswers2.splice(falseAnswers2.indexOf(falseAnswer2), 1);
    var falseAnswer3 = falseAnswers2[Math.floor(Math.random()*falseAnswers2.length)];

    // array with stored answers for assignment to li's as options
    var randAnswers = [answers[qnumber],
    falseAnswer1, falseAnswer2, falseAnswer3];
    
    // loop to create li buttons for responses and assign answers
    for (i = 0; i < 4; i++) {
        var option = document.createElement("li");
        var optionBtn = document.createElement("button");
        option.appendChild(optionBtn);
        choices.appendChild(option);
        // assigns correct answer to 1 li and 3 false answers to others
        var randAnswer = Math.floor(Math.random() * randAnswers.length)
        optionBtn.textContent = randAnswers[randAnswer];
        optionBtn.setAttribute("id", `option${i}`);
        randAnswers.splice(randAnswer, 1);
    };
};

// function to check if correct answer was selected, increment score or decrement time, display message, increment question
var checkResponse = function(btnClicked){
    if (btnClicked == qnumber) {
        score.innerHTML = "Correct!";
        currentScore++;
        console.log(`Score: ${currentScore}`)
    } else {
        score.innerHTML = "Wrong Answer";
        // deduct time from clock
    }
}

// event listener for start button - hides/reveals quiz elements; resets score and question number
start.addEventListener("click", function(){
    currentScore = 0
    qnumber = 0
    questionGenerator(qnumber)
    start.setAttribute("data-state", "hidden");
    question.setAttribute("data-state", "visible");
    choices.setAttribute("data-state", "visible");
    result.setAttribute("data-state", "visible");
    score.setAttribute("data-state", "hidden");
})