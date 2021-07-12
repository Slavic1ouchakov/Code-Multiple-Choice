//declare the variables to access all elements from the html
var timerDisplay = document.querySelector("#timer");
var mainEl = document.querySelector("main");
var quizBox = document.querySelector(".quizBox");
var myButton = document.querySelector(".myButton");
var highScore = document.querySelector(".highScore");
var answerOptions = document.querySelector(".answerButtons");
var result = document.querySelector("#result");
var score = document.querySelector("#score");
var gameOverScreen = document.querySelector(".gameOver");

//Created variable which is array of all questions and answers
var theQuestions = [
     {question: "How can you create an Array in JavaScript?",
      choice1: "()",
      choice2: "[]",
      choice3: "{}",
      choice4: "<p>",
      answer: "[]"
     },
     {question: "How do you call a function named untiltedFunction?",
      choice1: "{}",
      choice2: "untitledFunction()",
      choice3: "Function",
      choice4: "()",
      answer: "untitledFunction()"
     },
     {question: "How do you create a function in JavaScript?",
     choice1: "function myFunction()", 
     choice2: "myFunction()", 
     choice3:" my Function[]", 
     choice4: "Java Function",
     answer: "function myFunction()"
     },           
     {question: "How do you write a ‘logical or’ in Javascript code?",
     choice1: "//",
     choice2: "$$",
     choice3: "%",
     choice4: "||",
     answer: "||"
     },             
     {question: "Which of the following functions of String object returns the character at the specified index?",
     choice1: "subscript()",
     choice2: "indexOf()",
     choice3: "charAt()",
     choice4: "forEach()",
     answer: "charAt()"
     }             
     ];

rulesFirst ();


//set current index for questions to zero, set wins to zero
var currentIndex = 0;
var wins = 0;

//Create button and append them
var option1 = document.createElement("button");
var option2 = document.createElement("button");
var option3 = document.createElement("button");
var option4 = document.createElement("button");

option1.classList.add("btn");
option2.classList.add("btn");
option3.classList.add("btn");
option4.classList.add("btn");

answerOptions.appendChild(option1);
answerOptions.appendChild(option2);
answerOptions.appendChild(option3);
answerOptions.appendChild(option4);


//onloading page, this function will be called
function rulesFirst() {
     //create p element to hold rules, append it to quizBox
     var rulesFirst = document.createElement("p");
     rulesFirst.setAttribute("style", "margin-bottom: 10px");
     rulesFirst.setAttribute("id", "rulesFirst");
     rulesFirst.textContent = "Test your knowledge and answer the following Javascript related questions within the given time limit. Any incorrect answers will substract 5 seconds from the timer!";
     quizBox.appendChild(rulesFirst);
     //create start button, append it to quizBox and add click event
     var startButton = document.createElement("button");
     startButton.innerHTML = "Start Quiz";
     startButton.setAttribute("id", "startButton");
     //add styling to button using exisiting class in CSS
     startButton.classList.add("btn");
     myButton.appendChild(startButton);
     startButton.addEventListener("click", startQuiz);

}


//Set countdown timer to 30 seconds, start countdown function
var timeLeft = 30;
function updateTimer() {
     timerInterval = setInterval(function () {
//when timer reaches zero or less, clear interval function and display game over
        if (timeLeft <= 0) {
               clearInterval(timerInterval);
               gameOver();
          } 
          else {
               timeLeft--;
               timerDisplay.textContent = timeLeft + " seconds left";
           }
    }, 1000);
}

//function to clear display and display game over when timer runs out or questions are finished
function gameOver() {
   timerDisplay = '';
    var gameOver = document.createElement("p");
    var yourScore = document.createElement("p");
    var inputWhat = document.createElement("span");
    var userInput = document.createElement("input");
    var submitButton = document.createElement("button");

    submitButton.classList.add("btn");

     userInput.type = "text";
     userInput.value = "";
     userInput.classList.add("userInput");

     gameOver.textContent = "Game Over!"
     yourScore.textContent = "Your final score is: " + wins;
     inputWhat.textContent = "Enter initials: ";
     submitButton.innerHTML = "Submit";

    gameOverScreen.appendChild(gameOver);
    gameOverScreen.appendChild(yourScore);
    gameOverScreen.appendChild(inputWhat);
    gameOverScreen.appendChild(userInput); 
    myButton.appendChild(submitButton);


//     submitButton.addEventListener("click", function (event){
//          event.preventDefault();
//          if (userInput.value.length === 0) {
//               alert("Please enter initials before submitting");
//          } else {
//           highScore = Math.max(score, highScore);
//           localStorage.setItem(userInput, highScore);



//      //     localStorage.setItem("name", userInput.value);
//      //     localStorage.setItem("score", wins);
//      //      var highScore = "highscore.html";
//          }
//     });

     answerOptions.remove();
     quizBox.remove();
}

// save Score function 
function saveScore() {
     var user_Initials = userName.value;
     if (user_Initials !== "") {
       var highScores = JSON.parse(localStorage.getItem("scores")) || [];
       var newScore = {
         score: secondsLeft,
         name: user_Initials,
       };
       highScores.push(newScore);
       localStorage.setItem("scores", JSON.stringify(highScores));
   
     }
     displayHighScore();
   }
   
   // function for get the score from the local Storage
   function displayHighScore() {
     var highScores = JSON.parse(localStorage.getItem("scores")) || [];
     // console.log(highScores);
     highScores.sort(function (a, b) {
       return b.score - a.score;
   
     });
     highScores.forEach(function (score) {
       var liTag = document.createElement("li");
       liTag.textContent = score.name + " - " + score.score;
       var loTag = document.getElementById("final_score");
       loTag.appendChild(liTag);
     });
     endScreen.style.display = "none";
     highScoreScreenEL.style.visibility = "visible";
   }
   
   // function for show the high using view high score Btn
   function showHighScroe() {
     startQuiz.style.display = "none";
     questionScetion.style.display = "none";
     endScreen.style.display = "none";
     highScoreScreenEL.style.visibility = "visible";
     displayHighScore();
   }
   
   // funtion for clear the high score 
   var clearAns = function(event) {
     event.preventDefault
     localStorage.removeItem("scores")
     window.location.reload();
   }
   


//function to start quiz
function startQuiz() {
     //start timer, remove the rules and start button created earlier
   updateTimer();
   var rules = document.querySelector("#rulesFirst");
   rules.remove();
   var startButton = document.querySelector("#startButton");
   startButton.remove();
   //call function that will call the questions
   getQuestion();
}

//function to go through all the questions
function getQuestion () {
      currentQuestion = theQuestions[currentIndex];
      quizBox.textContent = currentQuestion.question;

      //make answer buttons visible, add text content and click event
     answerOptions.classList.remove("visibility");

     option1.textContent = currentQuestion.choice1;
     option2.textContent = currentQuestion.choice2;
     option3.textContent = currentQuestion.choice3;
     option4.textContent = currentQuestion.choice4;

     option1.addEventListener("click", selectAnswer);
     option2.addEventListener("click", selectAnswer);
     option3.addEventListener("click", selectAnswer);
     option4.addEventListener("click", selectAnswer);
        }


//function to be called when answer buttons are clicked
function selectAnswer (event) {
     //set variable for the current target of the click event
   var clicked = event.currentTarget.textContent;

   if (clicked === currentQuestion.answer) {
        result.textContent = "Correct Answer!";
        wins++;
        score.textContent = "Score: " + wins;
   }   
   else {
        result.textContent = "Wrong answer!";
        timeLeft -= 5;
   }
   //if statement to stop looping through questions and end game if all questions have been looped through
   if (currentIndex === theQuestions.length - 1) {
      //gameOver();
      timeLeft = 0
   } 
   else {
        currentIndex++
        getQuestion()
   }

}

