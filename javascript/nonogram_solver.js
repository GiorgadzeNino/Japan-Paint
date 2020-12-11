const EASY_DIFFICULTY = 'easy';
const MEDIUM_DIFFICULTY = 'medium';
const HARD_DIFFICULTY = 'hard';
const DEFAULT_DIFFICULTY = MEDIUM_DIFFICULTY;

const sizeError = document.getElementById('sizeError');
const colHints = document.getElementById('column-hints');
const rowHints = document.getElementById('row-hints');
const picture = document.getElementById('picture');

let game = {
    colHints: [],
    rowHints: [],
    solution: []
}

let showTable = false;
document.getElementById("puzzle").style.display = "none"
var userSolution

function fillZero() { // ივსება 0-ით  userSolution
    userSolution = new Array(game.solution.length);
    console.log(userSolution)
    for (var i = 0; i < userSolution.length; i++) {
        userSolution[i] = 0;
    }
}

// window.onLoad = e => {
//     var el = document.getElementById("squares").appendChild(document.createElement(div))
//     el.classList.add("square")
// }

document.getElementById('start-easy').addEventListener('click',
    () => {
        showTable = true;
        start(EASY_DIFFICULTY);
        startGame();
    });
document.getElementById('start-medium').addEventListener('click',
    () => {
        showTable = true;
        start(MEDIUM_DIFFICULTY);
        startGame();
    });
document.getElementById('start-hard').addEventListener('click',
    () => {
        showTable = true;
        start(HARD_DIFFICULTY);
        startGame();
    });
document.getElementById('reset-game').addEventListener('click',
    () => {
        startGame();
    });


//  მთლიანი პაზლის დახატვა
function drawPuzzle() {
    drawColHints();
    drawRowHints();
    drawGrid();
}

// სვეტების  რიცხვების დახატვა/ჩაწერა
function drawColHints() {
    colHints.innerHTML = ""; // ყველა უჯრას სვეტებისას შევავსებთ  ""-ით

    //სვეტებში იწერება რიცხვები.
    for (col = 0; col < game.colHints.length; col++) {
        let currCol = colHints.appendChild(document.createElement('div'));
        currCol.id = `hintsCol${col}`;
        currCol.classList.add('hint-group');

        // სპეციალური ქეისი თუ სვეტში არის ცარიელი  მასივი
        if (game.colHints[col].length == 0) {
            currHint = currCol.appendChild(document.createElement('div'));
            currHint.id = `hintCol${col}Blank`;
            currHint.classList.add('element', 'blank');
        }
        //  ლუპი სათითაოდ სვეტისთვის უკვე
        else {
            for (elm = 0; elm < game.colHints[col].length; elm++) {
                currHint = currCol.appendChild(document.createElement('div'));
                currHint.id = `hintCol${col}Elm${elm}`;
                currHint.classList.add('element');
                currHint.innerText = game.colHints[col][elm];
            }
        }
    }
}

// დავხატოთ სტრიქონები და ჩავწეროთ რიცხვები
function drawRowHints() {
    rowHints.innerHTML = "";

    for (row = 0; row < game.rowHints.length; row++) {
        let currRow = rowHints.appendChild(document.createElement('div'));
        currRow.id = `hintsRow${row}`;
        currRow.classList.add('hint-group');
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

// var black = false;

function checkWin() {
    // debugger
    console.log(game.solution)
    console.log(userSolution)
    if (JSON.stringify(game.solution) == JSON.stringify(userSolution)) {
        window.location.assign("./win.html")
        console.log("win")
    }
}

function checkLose() {
    if (JSON.stringify(game.solution) != JSON.stringify(userSolution)) {
        window.location.assign("./lose.html")
        console.log("lose")
    }
}

function checkWinner() {
    console.log(game.solution)
    console.log(userSolution)
    checkWin();
    checkLose();

    console.log(game.solution);
    console.log(userSolution);
}

//  function some() {




//////                           gaferadeba

window.onmousedown = e => {
    document.getElementById("check").disabled = false;
    if (e.target.classList.contains("element") && !e.target.parentNode.classList.contains("hint-group")) {
        var x = e.target.id.substr(10, ); //achris pictureCol-s da abrunebs ricxvs  stringad
        var y = e.target.parentNode.id.substr(10, ) //abrunebs strings  id="pictureRow10"  achris pictureRow-s
        console.log(y)
        var index = game.colHints.length * Number(y) + Number(x);

        console.log(index)
            // if (!black) {
        console.log(userSolution[index] == undefined)

        if (userSolution[index] == undefined || userSolution[index] == "0") {
            userSolution[index] = 1;
            e.target.style.background = "white"
        } else {
            userSolution[index] = 0;
            e.target.style.background = "transparent"
        }
        checkWin()
    }
    if (e.target.classList.contains("element") && e.target.parentNode.classList.contains("hint-group")) {
        e.target.style.background == "gray" ? e.target.style.background = "transparent" : e.target.style.background = "gray"
    }

}




function startGame() {
    fillZero();
    document.getElementById("reset-game").disabled = false;
    document.getElementById("puzzle").style.display = "grid"
    drawPuzzle();
    drawGrid();
}

function start(difficulty) {
    switch (difficulty) {
        case EASY_DIFFICULTY:
            // percentSpots = EASY_PERCENT;
            game = {
                colHints: [
                    [2],
                    [3, 2, 2],
                    [2, 3, 2],
                    [5],
                    [3]
                ],
                rowHints: [
                    [3],
                    [5],
                    [2, 2],
                    [2],
                    [2],
                    [2],
                    [2],
                    [0],
                    [2],
                    [2]
                ],
                solution: [
                    0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0
                ]
            }
            break;
        case MEDIUM_DIFFICULTY:
            // percentSpots = MEDIUM_PERCENT;
            game = {
                colHints: [
                    [2],
                    [4],
                    [4],
                    [8],
                    [1, 1],
                    [1, 1],
                    [1, 1, 2],
                    [1, 1, 4],
                    [1, 1, 4],
                    [9]
                ],
                rowHints: [
                    [3],
                    [2, 1],
                    [2, 3],
                    [1, 2, 1],
                    [2, 1],
                    [1, 1],
                    [1, 3],
                    [3, 4],
                    [4, 4],
                    [4, 2],
                    [2]
                ],
                solution: [
                    0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0
                ]
            }
            break;
        case HARD_DIFFICULTY:
            console.log(game)
                // percentSpots = HARD_PERCENT;
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
        default:
            start(DEFAULT_DIFFICULTY);
            break;
    }


}