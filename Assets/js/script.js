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
var timer = document.querySelector("#timer");
var timerSpan = document.querySelector("#timerSpan");
var topScoreslot1 = document.querySelector("#topScore1");
var topScoreslot2 = document.querySelector("#topScore2");
var topScoreslot3 = document.querySelector("#topScore3");
var initialsForm = document.querySelector("#initialsForm");

var currentScore
var currentInitials
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

// sets load state of page
var initializePage = function() {
    start.setAttribute("data-state", "visible");
    question.setAttribute("data-state", "hidden");
    choices.setAttribute("data-state", "hidden");
    result.setAttribute("data-state", "hidden");
    score.setAttribute("data-state", "visible");
    initials.setAttribute("data-state", "hidden");
    submit.setAttribute("data-state", "hidden");
    timer.setAttribute("data-state", "hidden");
}

//call initialze function 
initializePage()

// function to store and display scores; offer to retake quiz
var endGame = function(){
    choices.setAttribute("data-state", "hidden");
    result.setAttribute("data-state", "visible");
    score.setAttribute("data-state", "visible");
    timer.setAttribute("data-state", "hidden");

    var topScore1 = localStorage.getItem("topScore1");
    var topScore2 = localStorage.getItem("topScore2");
    var topScore3 = localStorage.getItem("topScore3");
    var topScores = [topScore1, topScore2, topScore3]
    var topInitials1 = localStorage.getItem("topInitials1");
    var topInitials2 = localStorage.getItem("topInitials2");
    var topInitials3 = localStorage.getItem("topInitials3");
    var topInitials = [topInitials1, topInitials2, topInitials3]

    // check if current score is within top scores; update top score array
    if (currentScore > topScores[0]) {
        localStorage.setItem("topScore1", currentScore)
        localStorage.setItem("topInitials1", currentInitials)
        localStorage.setItem("topScore2", topScores[0])
        localStorage.setItem("topInitials2", topInitials[0])
        localStorage.setItem("topScore3", topScores[1])
        localStorage.setItem("topInitials3", topInitials[1])
    } else if (currentScore > topScores[1]) {
        localStorage.setItem("topScore2", currentScore)
        localStorage.setItem("topInitials2", currentInitials)
        localStorage.setItem("topScore3", topScores[1])
        localStorage.setItem("topInitials3", topInitials[1])
    } else if (currentScore > topScores[2]) {
        localStorage.setItem("topScore3", currentScore)
        localStorage.setItem("topInitials3", currentInitials)
    }

    // get topScores and initials from local storage and display in ol 
    topScoreslot1.textContent = `${topInitials[0]}: ${localStorage.getItem("topScore1")}`
    topScoreslot2.textContent = `${topInitials[1]}: ${localStorage.getItem("topScore2")}`
    topScoreslot3.textContent = `${topInitials[2]}: ${localStorage.getItem("topScore3")}`

    start.setAttribute("data-state", "visible")
    question.innerHTML = "Start Again?"
}

// function to check if correct answer was selected, increment score or decrement time, display message, increment question
var checkResponse = function(btnClicked){
    // checks if last question has been answered or time has run out
    var nextStep = function() { 
        // add check against timer to if !!!
        if (qnumber == questions.length - 1) {
            choices.replaceChildren()
            result.innerHTML = ""
            initials.setAttribute("data-state", "visible");
            submit.setAttribute("data-state", "visible");
            // function to capture initials from form
            initialsForm.addEventListener("submit", function(event){
                event.preventDefault()
                // this needs passed to endGame function
                currentInitials = initials.textContent
                initials.setAttribute("data-state", "hidden");
                submit.setAttribute("data-state", "hidden");
                initials.textContent = ""
                endGame()
            })
        } else{
            choices.replaceChildren()
            result.innerHTML = ""
            qnumber++
            questionGenerator(qnumber)
            console.log(qnumber);
            console.log(`Score: ${currentScore}`);
        }
    } 

    if (btnClicked == qnumber) {
        result.innerHTML = "Correct!";
        currentScore++;
        nextStep()
    } else {
        result.innerHTML = "Wrong Answer";
        // deduct time from clock
        nextStep()
    }   
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

    // event listeners for 4 buttons. compare button id to index of correct answer in answers array via checkResponse function
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
    timer.setAttribute("data-state", "visible");
    initials.setAttribute("data-state", "hidden");
    submit.setAttribute("data-state", "hidden");

    currentScore = 0
    qnumber = 0
    result.innerHTML = ""

    // initialize scores for comparison on first 3 rounds
    if (localStorage.getItem("topScore1") == null) {
        localStorage.setItem("topScore1", 0)
        localStorage.setItem("topInitials1", "")
    }
    if (localStorage.getItem("topScore2") == null) {
        localStorage.setItem("topScore2", 0)
        localStorage.setItem("topInitials2", "")
    }
    if (localStorage.getItem("topScore3") == null) {
        localStorage.setItem("topScore3", 0)
        localStorage.setItem("topInitials3", "")
    }

    questionGenerator(qnumber)

    // add call for interval function !!!
})