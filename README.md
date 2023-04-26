# Code_Quiz

Coding assessment using JavaScript and API's

## Description

Basic quiz on HTML, CSS, and JavaScript code fundamentals. Users answer as many questions as they can in the alotted time. Users can save their score with thier initials to compare against other users.


## Usage

This quiz application was developed as an exercise in basic API functionality using JavaScript.

At page load, users are presented with a description of how the quiz will work.  
After clicking the start button, the contents of the page will switch to dispaly a question, resoponses to this question in the form of buttons, and a timer (counting down from 5 minutes) in the upper right corner.  
After responding to a question, a message indicating whether the response was correct or incorrect appears below the options and the next question appears on the page.  
Once all 10 questions are answered, or the timer runs out, the user is provided with their score total and a form for submitting thier initals.  
After clicking submit, a list of all scores logged (in the browsers local storage only) appears, sorted highest to lowest so users can compare their scores to those achieved previously.  
The option to retake the quiz is provided and clicking start at this stage repeats the quiz procedure.


The site can be viewed at: https://creechj.github.io/Code_Quiz/

GitHub repository for the site can be found here: https://github.com/creechj/Code_Quiz

![Screenshot of Quiz Start View](assets/JS_CodeQuiz_Screenshot.png)

## Credits

Several resources were used for specific areas of this project: 

replaceChildren method to clear options when switching to next question: 
https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript 

array sort for ranking highscores array from localstorage: 
https://www.freecodecamp.org/newsjavascript-array-of-objects-tutorial-how-to-create-update-and-loop-through-objects-using-js-array-methods/ 

parseInt used within array sort: 
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt 

setInterval syntax (and clearInterval placement): 
https://developer.mozilla.org/en-US/docs/Web/API/setInterval 

timer display: 
https://stackoverflow.com/questions/21294302/converting-milliseconds-to-minutes-and-seconds-with-javascript 

timeout function for response messages:
https://developer.mozilla.org/en-US/docs/Web/API/setTimeout

## License

Please refer to LICENSE included in repository