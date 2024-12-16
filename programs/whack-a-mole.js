let score = 0;
let timeLeft = 30;
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const holes = document.querySelectorAll('.hole');

// Function to randomly select a hole
function randomHole() {
  holes.forEach(hole => hole.innerHTML = ''); // Clear previous moles
  const randomIndex = Math.floor(Math.random() * holes.length);
  const mole = document.createElement('div');
  mole.classList.add('mole');
  holes[randomIndex].appendChild(mole);

  // Add click event to mole
  mole.addEventListener('click', () => {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    mole.remove(); // Remove mole on click
  });
}

function startGame() {
  const moleInterval = setInterval(randomHole, 1000);
  const timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time: ${timeLeft}`;
    if (timeLeft <= 0) {
      clearInterval(moleInterval);
      clearInterval(timerInterval);
      alert(`Game Over! Your score is ${score}`);
    }
  }, 1000);
}

startGame();
