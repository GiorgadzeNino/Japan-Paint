// const colHints.length = document.getElementById('colHints.length');
// const rowHints.length = document.getElementById('rowHints.length');
const EASY_PERCENT = 92;
const MEDIUM_PERCENT = 82;
const HARD_PERCENT = 72;
const EASY_DIFFICULTY = 'easy';
const MEDIUM_DIFFICULTY = 'medium';
const HARD_DIFFICULTY = 'hard';
const STATE_UNSELECTED = 0;
const STATE_SELECTED = 1;
const STATE_MARKED = 2;
const DEFAULT_DIFFICULTY = MEDIUM_DIFFICULTY;

const sizeError = document.getElementById('sizeError');
const colHints = document.getElementById('column-hints');
const rowHints = document.getElementById('row-hints');
const picture = document.getElementById('picture');
console.log(picture);
let game = {
        colHints: [],
        rowHints: [],
        solution: []
    }
    // User inputs
    // NOTE: Initial values are mostly for testing.
    //       5x5 grid is ok for production, but I think the hints should be empty to start
    // start()
console.log(`Initial game:`);
console.log(game);
let column;
let row;
// Initial puzzle draw
// drawPuzzle();

let showTable = false;
document.getElementById("puzzle").style.display = "none"
    // start()
var userSolution
    // = new Array(game.solution.length);
    // console.log(userSolution)
    // for (var i = 0; i < userSolution.length; i++) {
    // userSolution[i] = 0;
    // }
function fillZero() {
    userSolution = new Array(game.solution.length);
    console.log(userSolution)
    for (var i = 0; i < userSolution.length; i++) {
        userSolution[i] = 0;
    }
}
console.log(userSolution)
document.getElementById('start-easy').addEventListener('click',
    () => {
        showTable = true;
        start(EASY_DIFFICULTY);
        document.getElementById("start-game").disabled = false;
        fillZero();
        startGame();
    });
document.getElementById('start-medium').addEventListener('click',
    () => {
        showTable = true;
        start(MEDIUM_DIFFICULTY);
        document.getElementById("start-game").disabled = false;
        fillZero();
        startGame();
    });
document.getElementById('start-hard').addEventListener('click',
    () => {
        showTable = true;
        start(HARD_DIFFICULTY);
        document.getElementById("start-game").disabled = false;
        fillZero()
        startGame();
    });
document.getElementById('start-game').addEventListener('click',
    () => {
        fillZero();
        startGame();
    });
// Catch when the user types a value into one of the size inputs

// Function to draw entire puzzle
function drawPuzzle() {
    // clearPuzzle();
    drawColHints();
    drawRowHints();
    drawGrid();
}

// function clearPuzzle() {
// }

// Function to redraw the column hints
function drawColHints() {
    // First clear out the current hints
    console.log('Clearing out column hints');
    colHints.innerHTML = "";

    // Iterate over the hints, creating elements along the way
    console.log('Starting column loop');
    console.log(game.colHints)
    for (col = 0; col < game.colHints.length; col++) {
        let currCol = colHints.appendChild(document.createElement('div'));
        currCol.id = `hintsCol${col}`;
        currCol.classList.add('hint-group');
        console.log('Starting element loop');
        console.log(game.colHints[col]);
        console.log(game.colHints[col].length);

        // Special case if the column hints is an empty array
        if (game.colHints[col].length == 0) {
            currHint = currCol.appendChild(document.createElement('div'));
            currHint.id = `hintCol${col}Blank`;
            currHint.classList.add('element', 'blank');
        }
        // Otherwise iterate over the elements in column hints
        else {
            for (elm = 0; elm < game.colHints[col].length; elm++) {
                currHint = currCol.appendChild(document.createElement('div'));
                currHint.id = `hintCol${col}Elm${elm}`;
                currHint.classList.add('element');
                currHint.innerText = game.colHints[col][elm];
            }
        }
    }
    // this.column = col;
}

// Function to redraw the row hints
function drawRowHints() {
    // First clear out the current hints
    console.log('Clearing out row hints');
    rowHints.innerHTML = "";

    // Iterate over the hints, creating elements along the way
    console.log('Starting row loop');
    console.log(game.rowHints)
    for (row = 0; row < game.rowHints.length; row++) {
        let currRow = rowHints.appendChild(document.createElement('div'));
        currRow.id = `hintsRow${row}`;
        currRow.classList.add('hint-group');
        console.log('Starting element loop');
        console.log(game.rowHints[row]);
        console.log(game.rowHints[row].length);

        // Special case if the row hints is an empty array
        if (game.rowHints[row].length == 0) {
            currHint = currRow.appendChild(document.createElement('div'));
            currHint.id = `hintRow${row}Blank`;
            currHint.classList.add('element', 'blank');
        }
        // Otherwise iterate over the elements in row hints
        else {
            for (elm = 0; elm < game.rowHints[row].length; elm++) {
                currHint = currRow.appendChild(document.createElement('div'));
                currHint.id = `hintRow${row}Elm${elm}`;
                currHint.classList.add('element');
                currHint.innerText = game.rowHints[row][elm];
            }
        }
    }
    // this.row = row;
}

// Function to redraw the picture grid
function drawGrid() {
    // First clear out the current picture
    picture.innerHTML = "";

    // Iterate over rows and columns, creating elements along the way
    for (rowY = 0; rowY < game.rowHints.length; rowY++) {
        let currRow = picture.appendChild(document.createElement('div'));
        currRow.id = `pictureRow${rowY}`;
        currRow.classList.add('picture-row');
        for (colX = 0; colX < game.colHints.length; colX++) {
            currCol = currRow.appendChild(document.createElement('div'));
            currCol.id = `pictureCol${colX}`;
            currCol.classList.add('element');
        }
    }
}

var black = false;



function checkWinner() {
    if (JSON.stringify(game.solution) == JSON.stringify(userSolution)) {
        window.open("./images/win.png", "_self")
    } else {
        window.open("./images/lose.jpg", "_self")
            // console.log(userSolution);
    }
    console.log(game.solution);
    console.log(userSolution);
}

//  function some() {




//////                           gaferadeba

window.onclick = e => {
    // debugger
    document.getElementById("check").disabled = false;
    if (e.target.classList.contains("element") && !e.target.parentNode.classList.contains("hint-group")) {
        var x = e.target.id.slice(-1); //abrunebs  strings 
        var y = e.target.parentNode.id.slice(-1); //abrunebs strings
        var index = game.colHints.length * Number(y) + Number(x);
        console.log(index)
            // if (!black) {
        console.log(userSolution[index] == undefined)

        if (userSolution[index] == undefined || userSolution[index] == "0") {
            userSolution[index] = 1;
            e.target.style.background = "black"
        } else {
            userSolution[index] = 0;
            e.target.style.background = "white"
        }
    }
    if (e.target.classList.contains("element") && e.target.parentNode.classList.contains("hint-group")) {
        e.target.style.background == "gray" ? e.target.style.background = "white" : e.target.style.background = "gray"
    }
}


// for (let i = 0; i < elements.length; i++) {
//     el = elements[i];

// el.addEventListener('click', function (event) {
//     alert('Hi!');
// });
// }

function startGame() {
    // debugger
    document.getElementById("start-game").disabled = false;
    document.getElementById("puzzle").style.display = "grid"
    drawPuzzle();
    drawGrid();
    // setHints();
    // reset();
}

function start(difficulty) {
    switch (difficulty) {
        case EASY_DIFFICULTY:
            percentSpots = EASY_PERCENT;
            game = {
                colHints: [
                    [2, 2],
                    [2, 3],
                    [2, 4],
                    [5, 2],
                    [4, 1, 1],
                    [5, 2],
                    [2, 4],
                    [2, 3],
                    [2, 2]

                ],
                rowHints: [
                    [5],
                    [9],
                    [2, 3, 2],
                    [3],
                    [2, 2],
                    [2, 1, 2],
                    [4, 4],
                    [9]
                ],
                solution: [
                    0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1,
                    1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1,
                    0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1
                ]
            }
            break;
        case MEDIUM_DIFFICULTY:
            percentSpots = MEDIUM_PERCENT;
            game = {
                colHints: [
                    [5, 2],
                    [2, 3],
                    [2, 4],
                    [5, 2],
                    [4, 1, 1],
                    [5, 2],
                    [2, 4],
                    [2, 3],
                    [2, 2]

                ],
                rowHints: [
                    [5],
                    [9],
                    [2, 3, 2],
                    [3],
                    [2, 2],
                    [2, 1, 2],
                    [4, 4],
                    [9]
                ],
                solution: [
                    1, 0, 1, 0, 1, 0, 1, 0
                ]
            }
            break;
        case HARD_DIFFICULTY:
            console.log(game)
            percentSpots = HARD_PERCENT;
            game = {
                colHints: [
                    [6, 2],
                    [2, 3],
                    [2, 4],
                    [5, 2],
                    [4, 1, 1],
                    [5, 2],
                    [2, 4],
                    [2, 3],
                    [2, 2]

                ],
                rowHints: [
                    [5],
                    [9],
                    [2, 3, 2],
                    [3],
                    [2, 2],
                    [2, 1, 2],
                    [4, 4],
                    [9]
                ],
                solution: [
                    1, 0, 1, 0, 1, 0, 1, 0
                ]
            }
            break;
        default:
            start(DEFAULT_DIFFICULTY);
            break;
    }


}