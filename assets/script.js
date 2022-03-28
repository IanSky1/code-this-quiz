// Questions and Answers for array
var questions = [
{   question: "Commonly used data types do NOT include:",
    choices: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: "3. alerts"
},

{   question: "The condition in an if/else statement is enclosed with:",
    choices: ["1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"],
    answer: "3. parentheses"
},

{   question: "Arrays in Javascript can be used to store:",
    choices: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
    answer: "4. all of the above"
},

{   question: "String values must be enclosed within ____ when being assigned to variables.",
    choices: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    answer: "3. quotes"
},

{   question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["1. Javascript", "2. terminal / bash", "3. for loops", "4. console log"],
    answer: "4. console log"
},
];

// Declared variables
var score = 0;
var questionIndex = 0;
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startButton");
var intro = document.querySelector("#intro");
var wrapper = document.querySelector("#wrapper");


var secondsLeft = 76;
var holdInterval = 0;

var penalty = 10;
var ulCreate = document.createElement("ul");

timer.addEventListener("click", function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

    if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

 
function render(questionIndex) { 
    intro.innerHTML = "";
    ulCreate.innerHTML = "";
    var userQuestion = questions[questionIndex].question;
    var userChoices = questions[questionIndex].choices;
    intro.textContent = userQuestion;

    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        intro.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

function compare(event) {
    var element = event.target;
    
    if (element.matches("li")) {
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        
    if (element.textContent == questions[questionIndex].answer) {
        score++;
        createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
             
    } else {
            
    secondsLeft = secondsLeft - penalty;
    createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
    }

    }
    
    questionIndex++;
    if (questionIndex >= questions.length) {
        allDone();
        createDiv.textContent = "This is the end of the quiz!!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    intro.appendChild(createDiv);

}

function allDone() {
    intro.innerHTML = "";
    currentTime.innerHTML = "";

    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    intro.appendChild(createH1);

    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    intro.appendChild(createP);

    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        intro.appendChild(createP2);
    }

    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    intro.appendChild(createLabel);

    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    intro.appendChild(createInput);

    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    intro.appendChild(createSubmit);

    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            
            window.location.replace("./highScores.html");
        }
    });

}






