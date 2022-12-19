let excludedNumbers = [];
let fields = [];

let player = 'Spieler 1';
let player1Counter = 0;
let player2Counter = 0;
let undecidedCounter = 0;
let gameMode = 0;


function gameStart(i) {
    if (gameMode == 0) {
        showImgVsPc(i);
    } else {
        showImgVsHuman(i);
    }
}


function showImgVsHuman(i) {
    let td = document.getElementById(`${i}`);
    if (td.getElementsByTagName('img').length > 0) { } else {

        if (player == 'Spieler 1') {
            pointerYesOrNo('no');
            playerAction(i, td, 'kreis');
            playerTiemeout('Spieler 2')
        } else {
            if (player == 'Spieler 2') {
                pointerYesOrNo('no');
                playerAction(i, td, 'x');
                playerTiemeout('Spieler 1')
            }
        }
    }
}


function playerTiemeout(playerName) {
    if (fields.length == 0) {
        setTimeout(function () { pointerYesOrNo('yes'), player = playerName }, 2100);
    } else {
        setTimeout(function () { pointerYesOrNo('yes'), player = playerName }, 500);
    }
}



function showImgVsPc(i) {
    let td = document.getElementById(`${i}`);
    if (td.getElementsByTagName('img').length > 0) { } else {

        if (player == 'Spieler 1') {
            pointerYesOrNo('no');
            playerAction(i, td, 'kreis');
            computerTimeoutBeforeAct();
        } else { }
    }
}


function playerAction(i, td, cycleOrX) {
    getFieldinnerHtml(td, cycleOrX);
    fields[i - 1] = cycleOrX;
    checkForWinner();
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
    /*unentschieden abfrage*/
    if (realLength == 9) {
        nextRound('undicided')
    } else { }
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
    if (undecidedI == 'undicided') {
        undecidedCounter++;
        undicidedCounterinnerHTML();
    } else {
        if (player == 'Spieler 1') {
            player1Counter++;
            p1CounterinnerHTML();
        }
        if (player == 'Spieler 2') {
            player2Counter++;
            p2CounterinnerHTML();
        }
    }
}


function undicidedCounterinnerHTML() {
    let undicided = document.getElementById('undecided');
    undicided.innerHTML = undecidedCounter;
}


function p1CounterinnerHTML() {
    let p1Counter = document.getElementById('player1');
    p1Counter.innerHTML = player1Counter;

}


function p2CounterinnerHTML() {
    let p2Counter = document.getElementById('player2');
    p2Counter.innerHTML = player2Counter;

}


function pointerYesOrNo(YesNo) {
    let mainDiv = document.getElementById('main-div');
    if (YesNo == 'no') {
        mainDiv.classList.add('pointer-none');
    }
    if (YesNo == 'yes') {
        mainDiv.classList.remove('pointer-none');
    }
}


function showGameModePopover() {
    let dimDisplay = document.getElementById('dim-display');
    dimDisplay.classList.remove('d-none');
}


function changeGameMode() {
    if (gameMode == 0) {
        activateGameMode('Spieler 2', 'twoplayer', 1);
    } else {
        activateGameMode('Spieler 1', 'singleplayer', 0);
    }
    closeGameModePopover();
}


function activateGameMode(playerName, imgName, modeNum) {
    clearGameStatus();
    secondPlayerNameinnerHTML(`${playerName}`)
    changeGameModeImg(`${imgName}`);
    gameModeNumberinnerHTML(modeNum + 1);
    gameMode = modeNum;
}


function clearGameStatus() {
    clearField();
    clearCounterinnerHTML();
    player1Counter = 0;
    player2Counter = 0;
    undecidedCounter = 0;
    excludedNumbers.length = 0;
    fields.length = 0;
}


function secondPlayerNameinnerHTML(playerName) {
    let playerNameSpan = document.getElementById('second-player');
    playerNameSpan.innerHTML = `${playerName}`;
}


function gameModeNumberinnerHTML(ModeNumber) {
    let number = document.getElementById('user-number');
    number.innerHTML = ModeNumber;
}


function changeGameModeImg(imgName) {
    let img = document.getElementById('user-img');
    img.src = `img/${imgName}.png`;
}


function closeGameModePopover() {
    let dimDisplay = document.getElementById('dim-display');
    dimDisplay.classList.add('d-none');
}


function clearCounterinnerHTML() {
    let p1Counter = document.getElementById('player1');
    let p2Counter = document.getElementById('player2');
    let undicided = document.getElementById('undecided');

    p1Counter.innerHTML = 0;
    p2Counter.innerHTML = 0;
    undicided.innerHTML = 0;
}

function showImpressumOrPrivacyPolicy(imp_pri) {
    let impPri = document.getElementById(`${imp_pri}`);
    impPri.classList.remove('d-none');
}


function closeImpressumOrPrivacyPolicy(imp_pri) {
    let impPri = document.getElementById(`${imp_pri}`);
    impPri.classList.add('d-none');
}