let player = 'Spieler 1';
let fields = [];
let player1Counter = 0;
let player2Counter = 0;
let undecidedCounter = 0;
let gameMode = 0;
let excludedNumbers = [];

function showGameModePopover() {
    let dimDisplay = document.getElementById('dim-display');
    dimDisplay.classList.remove('d-none');
}

function changeGameMode() {
    if (gameMode == 0) {
        changeGameModeImg('twoplayer');
        gameModeNumberinnerHTML(2);
        gameMode = 1;
    } else {
        changeGameModeImg('singleplayer');
        gameModeNumberinnerHTML(1);
        gameMode = 0;
    }
    closeGameModePopover();
}

function gameModeNumberinnerHTML(ModeNumber) {
    let number = document.getElementById('user-number');
    number.innerHTML = ModeNumber;
}

function changeGameModeImg(img) {
    let img = document.getElementById('user-img');
    img.src = `img/${img}.png`;
}

function closeGameModePopover() {
    let dimDisplay = document.getElementById('dim-display');
    dimDisplay.classList.add('d-none');
}

function gameStart(i) {
    if (gameMode == 0) {
        showImgVsPc(i);
    } else {
        showImg(i);
    }
}


function showImg(i) {
    let td = document.getElementById(`${i}`);

    if (td.getElementsByTagName('img').length > 0) { } else {

        if (player == 'Spieler 1') {
            getFieldinnerHtml(td, 'kreis');
            fields[i - 1] = 'kreis';
            player = 'Spieler 2'
            checkForWinner();
        } else {

            if (player == 'Spieler 2') {
                getFieldinnerHtml(td, 'x')
                fields[i - 1] = 'x';
                player = 'Spieler 1';
                checkForWinner();
            } else { }
        }
    }
}


function showImgVsPc(i) {
    let td = document.getElementById(`${i}`);

    if (td.getElementsByTagName('img').length > 0) { } else {

        if (player == 'Spieler 1') {
            pointerYesOrNo(1);
            getFieldinnerHtml(td, 'kreis');
            fields[i - 1] = 'kreis';
            checkForWinner();
            computerTimeoutBeforeAct();

        } else { }
    }
}


function getFieldinnerHtml(td, img) {
    td.innerHTML =/*html*/`<img src="img/${img}.png" class="cycle">`;
}


function checkField(number) {
    let td = document.getElementById(`${number}`);
    if (td.getElementsByTagName('img').length > 0) {
        return 0;
    } else {
        return number;
    }
}


function clearField() {
    for (let i = 1; i <= 9; i++) {
        let td = document.getElementById(`${i}`);
        td.innerHTML = '';
    }
}


function nextRound(i) {
    fields.length = '';
    excludedNumbers.length = '';
    updateCounter(i);
    setTimeout(clearField, 2000);
}


function checkForWinner() {
    checkQuerOfThree();
    checkVertikalofThree();
    checkHorizontalOfThree();
    checkIfUndicided();
}


function checkIfUndicided() {
    /*.reduce ignoriert leere stellen im Array. Dass zwischen den klammern war schon so.*/
    let realLength = fields.reduce((acc, cv) => (cv) ? acc + 1 : acc, 0);
    console.log(`länge ist ${realLength}`)
    /*unentschieden abfrage*/
    if (realLength == 9) {
        nextRound('undicided')
    } else { console.log(`nicht 9`) }
}


function checkQuerOfThree() {
    /*Quer abfragen*/
    if (fields[0] == fields[4] && fields[4] == fields[8] && fields[0]) {
        nextRound()
    } else { }

    if (fields[2] == fields[4] && fields[4] == fields[6] && fields[2]) {
        nextRound()
    } else { }
}


function checkVertikalofThree() {
    /*horizontale abfragen*/
    if (fields[0] == fields[1] && fields[1] == fields[2] && fields[0]) {
        nextRound()
    } else { }

    if (fields[3] == fields[4] && fields[4] == fields[5] && fields[3]) {
        nextRound()
    } else { }

    if (fields[6] == fields[7] && fields[7] == fields[8] && fields[6]) {
        nextRound()
    } else { }
}


function checkHorizontalOfThree() {

    /*vertikale abfragen*/
    if (fields[0] == fields[3] && fields[3] == fields[6] && fields[0]) {
        nextRound()
    } else { }

    if (fields[1] == fields[4] && fields[4] == fields[7] && fields[1]) {
        nextRound()
    } else { }

    if (fields[2] == fields[5] && fields[5] == fields[8] && fields[2]) {
        nextRound()
    } else { }
}


function updateCounter(undecidedI) {
    let p1Counter = document.getElementById('player1');
    let p2Counter = document.getElementById('player2');
    let undicided = document.getElementById('undecided');
    console.log(undecidedI);

    if (undecidedI == 'undicided') {
        undecidedCounter++;
        undicided.innerHTML = undecidedCounter;
    } else {
        if (player == 'Spieler 1') {
            player1Counter++;
            p1Counter.innerHTML = player1Counter;
        }
        if (player == 'Spieler 2') {
            player2Counter++;
            p2Counter.innerHTML = player2Counter;
        }
    }

}


function pointerYesOrNo(YesNo) {
    let mainDiv = document.getElementById('main-div');
    if (YesNo == 1) {
        mainDiv.classList.add('pointer-none');
    } else { }
    if (YesNo == 0) {
        mainDiv.classList.remove('pointer-none');
    } else { }
}