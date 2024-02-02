/*----- constants -----*/
const SIDES = {
    1: '&#x2680;',
    2: '&#x2681;',
    3: '&#x2682;',
    4: '&#x2683;',
    5: '&#x2684;',
    6: '&#x2685;',
};

/*----- state variable -----*/
const state = {
    player: '',
    totalPoints: {
        player1: 0,
        player2: 0
    },
    points: 0,
    rolls: []
};

/*----- cached elements  -----*/
// An object that caches our frequently used DOM nodes
const elements = {
    dice: document.getElementById('dice'),
    points: document.getElementById('points'),
    player1TotalPoints: document.querySelector('.player1 .totalPoints'),
    player2TotalPoints: document.querySelector('.player2 .totalPoints'),
    player1Section: document.querySelector('.player1'),
    player2Section: document.querySelector('.player2'),
    // It might not be worth cacheing these (they're only used once)
    player1Roll: document.querySelector('.player1 button.roll'),
    player2Roll: document.querySelector('.player2 button.roll') ,
    player1Hold: document.querySelector('.player1 button.hold'),
    player2Hold: document.querySelector('.player2 button.hold') ,
};

/*----- event listeners -----*/
elements.player1Roll.addEventListener('click', function () {
    rollPair();
});

elements.player2Roll.addEventListener('click', function () {
    rollPair();
});

elements.player1Hold.addEventListener('click', function () {
    hold('player1');
});

elements.player2Hold.addEventListener('click', function () {
    hold('player2');
});


/*----- functions -----*/
const init = function () {
    state.player = 'player1';
    state.totalPoints.player1 = 0;
    state.totalPoints.player2 = 0;
    state.points = 0;
    state.rolls = [rollDie(), rollDie()];
    render();
};

// a function is just a thing inside a variable
const render = function () {
    elements.dice.innerHTML = SIDES[ state.rolls[0] ] + ' ' + SIDES[ state.rolls[1] ]; 
    elements.points.innerText = state.points;
    elements.player1TotalPoints.innerText = state.totalPoints.player1; 
    elements.player2TotalPoints.innerText = state.totalPoints.player2;
    if (state.player === 'player1') {
        elements.player1Section.classList.add('currentPlayer');
        elements.player2Section.classList.remove('currentPlayer');
    } else {
        elements.player2Section.classList.add('currentPlayer');
        elements.player1Section.classList.remove('currentPlayer');
    }
};

const switchPlayer = function () {
    if (state.player === 'player1') {
        state.player = 'player2';
    } else {
        state.player = 'player1';
    }
};

const rollDie = function () {
    // round up to an integer between 1 and 6 inclusive
    return Math.ceil(  Math.random() * 6 );
};

const rollPair = function () {
    state.rolls = [rollDie(), rollDie()]; // the actual dice rolls, ready to render
    state.points = state.points + (state.rolls[0] + state.rolls[1]);
    // TODO: should we check for making bacon here?
    render();
};

const hold = function (currentPlayer) {
    state.totalPoints[currentPlayer] += state.points;
    state.points = 0;
    switchPlayer();
    render();
}

init();