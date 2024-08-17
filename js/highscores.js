const highScoresList = document.getElementById('highScoresList');
const highScores = JSON.parse(localStorage.getItem('highScores') || "[]");
const message = document.getElementById('message');
const scoreTitle = document.getElementById('scoreTitle');
const emptyImg = document.getElementById('emptyImg');

if (highScores.length === 0){
    scoreTitle.innerText = "Kosong?"
    emptyImg.innerHTML = `<img src="image/empty.png" alt="Ilustrasi Kosong">`
    message.innerText = "Oops! Sepertinya Anda belum mencoba kuis ini \n Silakan mulai kuis dulu!"
} else {
    highScoresList.innerHTML = highScores.map(score => {
        return `<li class="high-score">${score.name} - ${score.score}</li>`;
    }).join("");
}
