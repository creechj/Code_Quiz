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
var initialsForm = document.querySelector("#initialsForm");

var currentScore;
var currentInitials;
var qnumber;

// array with questions to cycle through
var questions = [
    "In JavaScript, what separator should be used between For Loop parameters?",
    "Which operator returns the remainder of a division equation?",
    "What symbol is used to reference an HTML id attribute?",
    "What comparison do these characters represent || ?",
    "What character can be used to generate a basic HTML framework using Emmet?",
    "What characters should surround CSS properties?",
    "What abbreviation for text size is equal to 1 M for the current font?",
    "What event should be 'listened' for from a form?",
    "If used in an HTML document, what tag should JavaScript code be incapsulated in?",
    "Which of the following can be used to declare a variable?"
];

// array with correct answers to corresponding questions
var answers = [
    "Semicolon",
    "%",
    "Hashtag",
    "or",
    "Exclamation Point",
    "Curly Brackets",
    "em",
    "submit",
    "script",
    "var"
];

// array with filler answers
var falseAnswers = [
    "Comma",
    "Dash",
    "Underscore",
    "Boolean",
    "Network",
    "jQuery",
    "JSON",
    "Period",
    "Concatenate",
    "Delete",
    "GitHub",
    "XML",
    "hoisting",
    "falsey"
];

// sets load state of page
var initializePage = function() {
    start.setAttribute("data-state", "visible");
    question.setAttribute("data-state", "visible");
    choices.setAttribute("data-state", "hidden");
    result.setAttribute("data-state", "visible");
    score.setAttribute("data-state", "visible");
    initials.setAttribute("data-state", "hidden");
    submit.setAttribute("data-state", "hidden");
    timer.setAttribute("data-state", "hidden");
}

question.innerHTML = "Coding Quiz"
result.innerHTML = "You will have 5 minutes to select the best answer for 10 questions. 5 seconds will be deducted for each wrong answer. The time remaining is displayed in the upper-right. Click Start to begin."

//call initialze function 
initializePage();

// function to display countdown
var timerOn
var quizTime
var fnctTimer  = function() {
    if (quizTime > 0) {
        quizTime = quizTime - 1000;
        timer.innerHTML = `Time Remaining: ${Math.floor(quizTime/1000/60)}:${Math.floor(quizTime/1000) % 60}`;
        console.log(quizTime);
    } else {
        clearInterval(timerOn);
        checkResponse();
    }
}

// function to store and display scores; offer to retake quiz
var endGame = function(){
    initials.value = "";
    
    initials.setAttribute("data-state", "hidden");
    submit.setAttribute("data-state", "hidden");
    choices.setAttribute("data-state", "hidden");
    result.setAttribute("data-state", "visible");
    score.setAttribute("data-state", "visible");
    timer.setAttribute("data-state", "hidden");

    // retrieves scores from local storage and sorts desc. on score property
    var topScores = [];
    topScores = JSON.parse(localStorage.getItem("scores"));
    function sortScores(a, b) {
        return parseInt(b.score) - parseInt(a.score);
    }
    topScores.sort(sortScores);

    // create li's for each score and display in desc. order 
    for (i = 0; i < topScores.length; i++){
        var scoreLi = document.createElement("li");
        score.appendChild(scoreLi);
        scoreLi.innerHTML = `${topScores[i].initials} - ${topScores[i].score}`;
    }
    console.log(quizTime)
    start.setAttribute("data-state", "visible");
    question.innerHTML = "Start Again?";
    result.innerHTML = "Score History:";
    start.addEventListener("click", startFunction);
}

// function to check if correct answer was selected, increment score or decrement time, display message, increment question
var checkResponse = function(btnClicked){
    // checks if last question has been answered or time has run out
    var nextStep = function() { 
        if (qnumber == questions.length - 1 || quizTime == 0) {
            choices.replaceChildren();
            result.innerHTML = "";
            question.innerHTML = `You answered ${currentScore} questions correctly. Please enter your initials below:`;
            initials.setAttribute("data-state", "visible");
            submit.setAttribute("data-state", "visible");
            // function to capture initials from form
            var submitScore = function(event) {
                event.preventDefault();
                currentInitials = initials.value;
                // object to push initials & score to scores array for localstorage
                scores = JSON.parse(localStorage.getItem("scores"));
                if (JSON.parse(localStorage.getItem("scores")) == null) {
                    var scores = [];
                };
                var newUser = {
                    "initials": currentInitials.toUpperCase(),
                    "score": currentScore
                };
                scores.push(newUser);
                localStorage.setItem("scores", JSON.stringify(scores));
                initialsForm.removeEventListener("submit", submitScore);
                endGame();
            }
            initialsForm.addEventListener("submit", submitScore)
        } else{
            choices.replaceChildren()
            qnumber++;
            questionGenerator(qnumber);
            setTimeout(() => {result.innerHTML = "";}, 1000)
        }
    } 

    if (btnClicked == qnumber) {
        result.innerHTML = "Correct!";
        currentScore++;
        console.log(result.innerHTML)
        nextStep();
    } else {
        result.innerHTML = "Wrong Answer";
        if (quizTime > 5000) {
            quizTime = quizTime - 5000
        }
        console.log(result.innerHTML)
        nextStep();
    }   
}


// selects question by index and displays options
var questionGenerator = function(qnumber){
    // selects and displays question by number
    question.textContent = questions[qnumber];

    // randomly assigns false answers to variables; reruns if selections match
    var falseAnswer1;
    var falseAnswer2;
    var falseAnswer3;

    var falseChooser = function(){
        falseAnswer1 = falseAnswers[Math.floor(Math.random()*falseAnswers.length)];
        falseAnswer2 = falseAnswers[Math.floor(Math.random()*falseAnswers.length)];
        falseAnswer3 = falseAnswers[Math.floor(Math.random()*falseAnswers.length)];
        if (falseAnswer1 == falseAnswer2 || falseAnswer1 == falseAnswer3 || falseAnswer2 == falseAnswer3) {
            falseChooser();
        };
    }
    falseChooser();

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
var startFunction = function(){
    start.setAttribute("data-state", "hidden");
    question.setAttribute("data-state", "visible");
    choices.setAttribute("data-state", "visible");
    result.setAttribute("data-state", "visible");
    score.setAttribute("data-state", "hidden");
    timer.setAttribute("data-state", "visible");
    initials.setAttribute("data-state", "hidden");
    submit.setAttribute("data-state", "hidden");

    currentScore = 0;
    qnumber = 0;
    result.innerHTML = "";
    score.replaceChildren();
    start.removeEventListener("click", startFunction)
    quizTime = 300000
    timerOn = setInterval(fnctTimer, 1000);
    questionGenerator(qnumber);
};
start.addEventListener("click", startFunction);