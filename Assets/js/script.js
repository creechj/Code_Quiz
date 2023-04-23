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
    "Question5",
    "Question6",
    "Question7",
    "Question8",
    "Question9",
    "Question10",
    "Question11",
    "Question12",
    "Question13",
    "Question14",
    "Question15",
    "Question16",
    "Question17",
    "Question18",
    "Question19",
    "Question20",
];

// array with correct answers to corresponding questions
var answers = [
    "AnswertoQ1",
    "AnswertoQ2",
    "AnswertoQ3",
    "AnswertoQ4",
    "AnswertoQ5",
    "AnswertoQ6",
    "AnswertoQ7",
    "AnswertoQ8",
    "AnswertoQ9",
    "AnswertoQ10",
    "AnswertoQ11",
    "AnswertoQ12",
    "AnswertoQ13",
    "AnswertoQ14",
    "AnswertoQ15",
    "AnswertoQ16",
    "AnswertoQ17",
    "AnswertoQ18",
    "AnswertoQ19",
    "AnswertoQ20",
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

//call initialze function here 
initializePage()

// function to check if correct answer was selected, increment score or decrement time, display message, increment question
var checkResponse = function(btnClicked){
    if (btnClicked == qnumber) {
        result.innerHTML = "Correct!";
        currentScore++;
    } else {
        result.innerHTML = "Wrong Answer";
        // deduct time from clock
    }
    
    // INSERT IF TO END GAME HERE

    choices.replaceChildren()
    result.innerHTML = ""
    qnumber++
    questionGenerator(qnumber)
    console.log(qnumber);
    console.log(`Score: ${currentScore}`);
}

// selects question by index and displays options
var questionGenerator = function(qnumber){
    
    // selects and displays question by number
    question.textContent = questions[qnumber];

    // randomly assigns false answers to variables; reruns if selections match
    var falseAnswer1
    var falseAnswer2
    var falseAnswer3

    var falseChooser = function(){
        falseAnswer1 = falseAnswers[Math.floor(Math.random()*falseAnswers.length)];
        falseAnswer2 = falseAnswers[Math.floor(Math.random()*falseAnswers.length)];
        falseAnswer3 = falseAnswers[Math.floor(Math.random()*falseAnswers.length)];
        if (falseAnswer1 == falseAnswer2 || falseAnswer1 == falseAnswer3 || falseAnswer2 == falseAnswer3) {
            falseChooser();
        };
    }
    falseChooser()

    // array with stored answers for assignment to li's as options
    var randAnswers = [answers[qnumber], falseAnswer1, falseAnswer2, falseAnswer3];

    // loop to create li buttons for responses and assign answers
    for (i = 0; i < 4; i++) {
        var option = document.createElement("li");
        var optionBtn = document.createElement("button");
        option.appendChild(optionBtn);
        choices.appendChild(option);

        // assigns correct answer to 1 li and 3 false answers to others
        var randAnswer = Math.floor(Math.random() * randAnswers.length)
        optionBtn.textContent = randAnswers[randAnswer];
        randAnswers.splice(randAnswer, 1);
        optionBtn.setAttribute("id", `option${i}`);
    };

    // add event listeners for 4 buttons. compare button id to index of correct answer in answers array via checkResponse function
    var option1 = document.getElementById("option0")
    option1.addEventListener("click", function(){
        var btnClicked = answers.indexOf(option1.textContent);
        checkResponse(btnClicked)
    })
    var option2 = document.getElementById("option1")
    option2.addEventListener("click", function(){
        var btnClicked = answers.indexOf(option2.textContent);
        checkResponse(btnClicked)
    })
    var option3 = document.getElementById("option2")
    option3.addEventListener("click", function(){
        var btnClicked = answers.indexOf(option3.textContent);
        checkResponse(btnClicked)
    })
    var option4 = document.getElementById("option3")
    option4.addEventListener("click", function(){
        var btnClicked = answers.indexOf(option4.textContent);
        checkResponse(btnClicked)
    })
};

// event listener for start button - hides/reveals quiz elements; resets score and question number
start.addEventListener("click", function(){
    start.setAttribute("data-state", "hidden");
    question.setAttribute("data-state", "visible");
    choices.setAttribute("data-state", "visible");
    result.setAttribute("data-state", "visible");
    score.setAttribute("data-state", "hidden");
    currentScore = 0
    qnumber = 0
    questionGenerator(qnumber)
})