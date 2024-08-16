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

let questions = [
    {
        question: "Siapa tokoh yang mengetik naskah proklamasi?",
        choice1: "Ir. Soekarno",
        choice2: "Sayuti Melik",
        choice3: "Drs. Moh. Hatta",
        choice4: "Muhammad Yamin",
        answer: 2
    },
    {
        question: "Apa tujuan kaum muda menculik Soekarno-Hatta ke Rengasdengklok?",
        choice1: "Menyegerakan kemerdekaan Indonesia karena Jepang sudah menyerah kepada sekutu",
        choice2: "Melindungi Soekarno-Hatta dari serangan Jepang",
        choice3: "Melindungi Soekarno-Hatta dari pengaruh Jepang untuk menunda kemerdekaan",
        choice4: "Kaum muda tidak setuju dengan tindakan Soekarno-Hatta untuk menunggu janji kemerdekaan dari Jepang",
        answer: 3
    },
    {
        question: "Siapa tokoh yang menjahit bendera Merah Putih?",
        choice1: "Ir. Soekarno",
        choice2: "Sayuti Melik",
        choice3: "Drs. Moh. Hatta",
        choice4: "Fatmawati",
        answer: 4
    }
];

// CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score);
        // go to the end page
        return window.location.assign("/html/end.html");
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

        let classtoApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if(classtoApply == 'correct'){
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classtoApply);

        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classtoApply);
            getNewQuestion();
        }, 1000);

        
    })
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame();