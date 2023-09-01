let secretNumber = Math.trunc(20 * Math.random() + 1);
let highscore = 0;
let time = [0, 0];
let timerInterval;

document.querySelector('.again').addEventListener('click', function () {
    time = [0, 0];
    secretNumber = Math.trunc(20 * Math.random() + 1);
    document.querySelector('.score').textContent = '20';
    document.querySelector('.guess').value = '';
    document.getElementById('timer').innerHTML = '';
    document.querySelector('.check').style.backgroundColor = '#f1356d';

    // Clear the timer interval when starting a new game
    clearInterval(timerInterval);

    // Clear the message
    document.querySelector(".message").textContent = "Start guessing...";
});

document.querySelector('.check').addEventListener('click', () => {
    let guess = Number(document.querySelector('.guess').value);

    // Start the timer when the "Check!" button is clicked
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            time[1]++;
            if (time[1] % 60 === 0) {
                time[0]++;
            }
            document.getElementById('timer').innerHTML = `${time[0]}:${time[1]}`;
        }, 1000);
    }

    if (!guess) {
        document.querySelector(".message").textContent = "Not a valid input";
    } else if (guess === secretNumber) {
        document.querySelector(".message").textContent = "You guessed it right!";
        document.querySelector('.number').style.width = '30rem';
        document.querySelector("body").style.backgroundColor = 'green';
        document.querySelector('.number').textContent = secretNumber;
        if (highscore < Number(document.querySelector('.score').textContent)) {
            highscore = Number(document.querySelector('.score').textContent);
        }
        document.querySelector('.highscore').textContent = highscore;
    } else if (guess > secretNumber) {
        document.querySelector(".message").textContent = "Too high";
        document.querySelector('.score').textContent--;
    } else {
        document.querySelector(".message").textContent = "Too low";
        document.querySelector('.score').textContent--;
    }

    if (Number(document.querySelector('.score').textContent) <= 0) {
        document.querySelector(".message").textContent = "You lost the game";
        clearInterval(timerInterval);
        document.getElementById('timer').innerHTML = '';
        document.getElementById('hiddenResult').textContent = secretNumber;
        document.querySelector('.check').style.backgroundColor = '#f1356d';
    }
});

// Start the timer when the page loads
window.addEventListener('load', () => {
    document.querySelector('.message').textContent = "Start guessing...";
});
