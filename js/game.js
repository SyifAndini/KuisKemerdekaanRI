const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = {};

let questions = [];

fetch("questions.json").then(res => {
    return res.json();
}).then(loadedQuestions => {
    questions = loadedQuestions;
    startGame();
});

// CONSTANTS
const MAX_QUESTIONS = 20;
const CORRECT_BONUS = 100/MAX_QUESTIONS;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if(questionCounter >= MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score);
        // go to the end page
        return window.location.assign("end.html");
    }
    questionCounter++;
    progressText.innerText = "Soal " + questionCounter + " dari " + MAX_QUESTIONS;
    // Update the progress bar
    progressBarFull.style.width = `${questionCounter/MAX_QUESTIONS *100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice"+ number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        const rightAnswer = choices[currentQuestion.answer - 1]; // take from an array

        // Checking the user's answer
        let classtoApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if(classtoApply == 'correct'){
            // if correct, they got bonus score
            incrementScore(CORRECT_BONUS);
        } else {
            // If incorrect, we'll show the right answer, so the user can learn from their mistake
            rightAnswer.parentElement.classList.add("correct");
        }

        selectedChoice.parentElement.classList.add(classtoApply);

        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classtoApply);
            rightAnswer.parentElement.classList.remove("correct");
            getNewQuestion();
        }, 1000);

        
    })
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}