let score = JSON.parse(localStorage.getItem('score')) || {wins: 0, losses: 0, ties: 0};


document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  });

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
      playGame('rock');
    } else if (event.key === 'p') {
      playGame('paper');
    } else if (event.key === 's') {
      playGame('scissors');
    }
  });

function playGame(playerMove){
    const computerMove = getComputerMove();
    let result = '';

    if(playerMove == computerMove){
        result = 'tie';
        score.ties += 1;
    }
    else if(playerMove == 'rock' && computerMove == 'scissors'){
        result = 'win';
        score.wins += 1;
    }
    else if(playerMove == 'paper' && computerMove == 'rock'){
        result = 'win';
        score.wins += 1;

    }
    else if(playerMove == 'scissors' && computerMove == 'paper'){
        result = 'win';
        score.wins += 1;
    }
    
    else{
        result = 'lose';
        score.losses += 1;
    }

    document.querySelector('.js-result').innerHTML = `You ${result}!`;
    document.querySelector('.js-moves').innerHTML = `You chose ${playerMove}, computer chose ${computerMove}.`;
    updateScoreElement();
}

function updateScoreElement(){
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
    localStorage.setItem('score', JSON.stringify(score));
}

function getComputerMove(){
    const moves = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    return moves[randomIndex];
}


let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = getComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;

  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}
