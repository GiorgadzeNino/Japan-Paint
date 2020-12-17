const EASY_DIFFICULTY = 'easy';
const MEDIUM_DIFFICULTY = 'medium';
const HARD_DIFFICULTY = 'hard';
const DEFAULT_DIFFICULTY = MEDIUM_DIFFICULTY;


const colHints = document.getElementById('column-hints');
const rowHints = document.getElementById('row-hints');
const picture = document.getElementById('picture');

let game = {
    colHints: [],
    rowHints: [],
    solution: []
}

document.getElementById("puzzle") ? document.getElementById("puzzle").style.display = "none" : null
document.getElementById("show-solution").disabled = true

var userSolution

var count = 0;
var userCount = 0;

function fillZero() { // ივსება 0-ით  userSolution
    userSolution = new Array(game.solution.length);
    for (var i = 0; i < userSolution.length; i++) {
        userSolution[i] = 0;
    }
}


document.getElementById('start-easy').addEventListener('click',
    () => {
        start(EASY_DIFFICULTY);
        startGame();
    });
document.getElementById('start-medium').addEventListener('click',
    () => {
        start(MEDIUM_DIFFICULTY);
        startGame();
    });
document.getElementById('start-hard').addEventListener('click',
    () => {
        start(HARD_DIFFICULTY);
        startGame();
    });
document.getElementById('reset-game').addEventListener('click',
    () => {
        document.getElementById("check").disabled = true;
        document.getElementById("reset-game").disabled = true;
        userCount = 0;
        startGame();
    });

document.getElementById('show-solution').addEventListener('click',
    () => {
        document.getElementById("puzzle").style.cursor = "not-allowed";
        showSolution();
    })

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
        } else {
            for (elm = 0; elm < game.rowHints[row].length; elm++) {
                currHint = currRow.appendChild(document.createElement('div'));
                currHint.id = `hintRow${row}Elm${elm}`;
                currHint.classList.add('element');
                currHint.innerText = game.rowHints[row][elm];
            }
        }
    }
}

// გრიდის დახატვა
function drawGrid() {
    picture.innerHTML = ""; //შევავსებთ ""-ით ყველა უჯრას

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

function checkWin() {
    if (JSON.stringify(game.solution) == JSON.stringify(userSolution)) {
        window.location.assign("./win.html")
    }
}

function checkLose() {
    if (JSON.stringify(game.solution) != JSON.stringify(userSolution)) {
        window.location.assign("./lose.html")
    }
}

function checkWinner() {
    checkWin();
    checkLose();
}



window.onclick = e => {

    if (document.getElementById("puzzle").style.cursor == "pointer" && e.target.classList.contains("element") && !e.target.parentNode.classList.contains("hint-group")) {
        var checked = (element) => element === 1;

        var x = e.target.id.substr(10, ); //აჭრის pictureCol-ს და აბრუნებს რიცხვს სტრინგად
        var y = e.target.parentNode.id.substr(10, ) //აბრუნებს სტრინგს  id="pictureRow10"  აჭრის pictureRow-ს
        var index = game.colHints.length * Number(y) + Number(x);
        if (userSolution[index] == undefined || userSolution[index] == "0") {

            if (userCount < count) {
                userSolution[index] = 1;
                e.target.style.background = "white"
                userCount++
            }
        } else {
            userSolution[index] = 0;
            e.target.style.background = "transparent"
            userCount--
        }
        if (userSolution.some(checked)) {
            document.getElementById("check").disabled = false;
            document.getElementById("reset-game").disabled = false;
        } else {
            document.getElementById("check").disabled = true;
            document.getElementById("reset-game").disabled = true;
        }
    }

    checkWin()

    if (document.getElementById("puzzle").style.cursor == "pointer" && e.target.classList.contains("element") && e.target.parentNode.classList.contains("hint-group")) {
        e.target.style.background == "gray" ? e.target.style.background = "transparent" : e.target.style.background = "gray"
    }
}



function startGame() {
    userCount = 0;
    fillZero();
    document.getElementById("show-solution").disabled = false;
    document.getElementById("puzzle").style.display = "grid"
    document.getElementById("puzzle").style.cursor = "pointer";
    checkMaxCount();
    drawPuzzle();
    drawGrid();
}

function start(difficulty) {
    switch (difficulty) {
        case EASY_DIFFICULTY:
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
show = false;

function showSolution() {
    show = !show;
    if (show) {
        document.getElementById("reset-game").disabled = false;
        for (let i = 0; i < game.solution.length; i++) {
            var y = Math.floor(i / game.colHints.length) // ვიღებთ გასაფერადებელი უჯრის x და y კოორდინატებს
            var x = i % game.colHints.length;
            if (game.solution[i] == 1) {
                document.getElementById(`pictureRow${y}`).childNodes[x].style.background = "white"
            } else {
                document.getElementById(`pictureRow${y}`).childNodes[x].style.background = "transparent"
            }
        }
    } else {
        userCount = 0;
        var elements = document.getElementsByClassName("element");
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.background = "transparent"
        }
        document.getElementById("reset-game").disabled = true;
        document.getElementById("puzzle").style.cursor = "pointer"
        document.getElementById("check").disabled = true;
    }

}

function checkMaxCount() {
    count = 0;
    for (let i = 0; i < game.solution.length; i++) {
        if (game.solution[i] == 1) {
            count++;
        }
    }

}