const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timerDisplay = document.querySelector('#time');
const board = document.querySelector('#board');

const MAX_CIRCLE_SIZE = 25;
const MIN_CIRCLE_SIZE = 10;
const colors = ['#c95858','#dee059','#6ecf56','#73c7a4','#7291d3','#4417af','#d801b4','#f1a10b'];
let time = 0;
let score = 0;

getRandomNumber = (min, max) => Math.round(Math.random() * (max - min) + min);

const createRandomCircleStyle = circle => {
    const size = getRandomNumber(MIN_CIRCLE_SIZE, MAX_CIRCLE_SIZE);
    const color = colors[getRandomNumber(0, colors.length - 1)];
    const {width, height} = board.getBoundingClientRect();
    const xOffset = getRandomNumber(0, width - size);
    const yOffset = getRandomNumber(0, height - size);

    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.background = `${color}`;
    circle.style.top = `${yOffset}px`;
    circle.style.left = `${xOffset}px`;
}

const createRandomCircle = () => {
    const circle = document.createElement('div');
    circle.classList.add('circle');
    createRandomCircleStyle(circle);
    board.append(circle);
}

const finishGame = () => {
    clearInterval(window.timeTicker);
    timerDisplay.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Счёт: <span class="primary">${score}</span></h1><a href="#" class="again" id="again">Ещё раз</a>`;
    const again = board.querySelector('#again');
    again.addEventListener('click', evt => {
        evt.preventDefault();
        time = 0;
        score = 0;
        screens[0].classList.remove('up');
        screens[1].classList.remove('up');
        board.innerHTML = '';
        timerDisplay.parentNode.classList.remove('hide');
    });
}

const setTime = value => timerDisplay.innerHTML = `00:${value}`;

const decreaseTime = () => {
    if (time === 0) {
        finishGame();
    } else {
        let current = --time;
        if (current < 10)
            current = `0${current}`;
        setTime(current);
    }
}

const startGame = () => {
    createRandomCircle();
    setTime(time);
    let timeTicker = setInterval(decreaseTime, 1000);
    setTimeout(() => clearInterval(timeTicker), (time + 1) * 1000);
}

startBtn.addEventListener('click', evt => {
    evt.preventDefault();
    screens[0].classList.add('up');
});

timeList.addEventListener('click', evt => {
    if (evt.target.classList.contains('time-btn')) {
        time = parseInt(evt.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
});

board.addEventListener('click', evt => {
    if (evt.target.classList.contains('circle')) {
        evt.target.remove();
        score++;
        createRandomCircle();
    }
});
