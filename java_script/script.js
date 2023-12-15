let excludedNumbers = [];
let fields = [];
let player = 'Spieler-1';
let player1Counter = 0;
let player2Counter = 0;
let undecidedCounter = 0;
let gameMode = 0;


function gameStart(position) {
    if (gameMode == 0) {
        showImgVsPc(position);
    } else {
        showImgVsHuman(position);
    }
}


function showImgVsHuman(position) {
    let td = document.getElementById(`field-${position}`);

    if (checkPlayerAndIfFieldFree(td, 'Spieler-1')) {
        playerAction(position, td, 'kreis');
        playerTimeout('Spieler-2')
    }
    if (checkPlayerAndIfFieldFree(td, 'Spieler-2')) {
        playerAction(position, td, 'x');
        playerTimeout('Spieler-1')
    }
}


function showImgVsPc(position) {
    let td = document.getElementById(`field-${position}`);
    if (checkPlayerAndIfFieldFree(td, 'Spieler-1')) {
        playerNameActive(player);
        playerAction(position, td, 'kreis');
        computerTimeoutBeforeAct();
    }
}


function checkPlayerAndIfFieldFree(td, playerName) {
    if (td.getElementsByTagName('img').length <= 0 && player == `${playerName}`)
        return 1;
}


function playerTimeout(playerName) {
    const timeout = fields.length == 0 ? 2100 : 500;
    setTimeout(function () { playerActivate(playerName) }, timeout);
}


function playerActivate(playerName) {
    playerNameInactive(player);
    pointerYesOrNo('yes');
    player = playerName;
    playerNameActive(player)
}


function playerAction(position, td, cycleOrX) {
    playAnySound(`${player}-sound`)
    pointerYesOrNo('no');
    fields[position - 1] = cycleOrX;
    getFieldinnerHtml(position, td, cycleOrX);
    checkForWinner();
}


function getFieldinnerHtml(position, td, cycleOrX) {
    td.innerHTML =/*html*/`<img id="img-${position}" src="img/${cycleOrX}.png" class="cycle">`;
}


function nextRound(i) {
    fields.length = '';
    excludedNumbers.length = '';
    updateCounter(i);
    setTimeout(clearFields, 2000);
}


function checkForWinner() {
    checkQuerOfThree();
    checkVertikalOfThree();
    checkHorizontalOfThree();
    checkIfUndicided();
}


function checkIfUndicided() {
    /*.reduce ignoriert leere stellen im Array. Dass zwischen den klammern war schon so.*/
    let realLength = fields.reduce((acc, cv) => (cv) ? acc + 1 : acc, 0);
    /*unentschieden abfrage*/
    if (realLength == 9) {
        highlightUndecided();
        nextRound('undicided')
    }
}


function checkHorizontalOfThree() {
    /*horizontale abfragen*/
    checkIfThreeInARow(0, 1, 2);
    checkIfThreeInARow(3, 4, 5);
    checkIfThreeInARow(6, 7, 8);
}


function checkVertikalOfThree() {
    /*vertikale abfragen*/
    checkIfThreeInARow(0, 3, 6);
    checkIfThreeInARow(1, 4, 7);
    checkIfThreeInARow(2, 5, 8);
}


function checkQuerOfThree() {
    /*Quer abfragen*/
    checkIfThreeInARow(0, 4, 8);
    checkIfThreeInARow(2, 4, 6);
}


function checkIfThreeInARow(fieldOne, fieldTwo, fieldThree) {
    if (checkIfFieldDefined(fieldOne) && (fields[fieldOne] == fields[fieldTwo] && fields[fieldTwo] == fields[fieldThree])) {
        highlightWinner(fieldOne + 1, fieldTwo + 1, fieldThree + 1);
        nextRound();
    }
}

function checkIfFieldDefined(fieldOne) {
    if (fields[fieldOne])
        return true;
}

function clearFields() {
    for (let i = 1; i <= 9; i++) {
        let td = document.getElementById(`field-${i}`);
        td.innerHTML = '';
    }
}


function highlightWinner(fieldOne, fieldTwo, fieldThree) {
    let field1 = document.getElementById(`img-${fieldOne}`);
    let field2 = document.getElementById(`img-${fieldTwo}`);
    let field3 = document.getElementById(`img-${fieldThree}`);
    field1.classList.add('blinking-winner');
    field2.classList.add('blinking-winner');
    field3.classList.add('blinking-winner');
    setTimeout(function () { removeHighlightWinner(field1, field2, field3) }, 1500);
}


function removeHighlightWinner(field1, field2, field3) {
    field1.classList.remove('blinking-winner');
    field2.classList.remove('blinking-winner');
    field3.classList.remove('blinking-winner');
}


function highlightUndecided() {
    for (let i = 1; i <= 9; i++) {
        let field = document.getElementById(`img-${i}`);
        field.classList.add('blinking-winner');
    }
    setTimeout(removeHighlightUndecided, 1500);
}


function removeHighlightUndecided() {
    for (let i = 1; i <= 9; i++) {
        let field = document.getElementById(`img-${i}`);
        field.classList.remove('blinking-winner');
    }
}


function updateCounter(undecided) {
    if (undecided == 'undicided') {
        undecidedCounter++;
        undicidedCounterinnerHTML();
        return;
    }

    if (player == 'Spieler-1') {
        playAnySound('winning-sound');
        player1Counter++;
        p1CounterinnerHTML();
        return;
    }

    if (player == 'Spieler-2') {
        checkIfComputerOrPlayerSound();
        player2Counter++;
        p2CounterinnerHTML();
    }
}


function checkIfComputerOrPlayerSound() {
    if (gameMode == 1) {
        playAnySound('winning-sound');
    } else {
        playAnySound('winning-sound-reverse');
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
        activateGameMode('Spieler-2', 'twoplayer', 1);
    } else {
        activateGameMode('Spieler-1', 'singleplayer', 0);
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
    clearFields();
    clearCounterinnerHTML();
    player1Counter = 0;
    player2Counter = 0;
    undecidedCounter = 0;
    excludedNumbers.length = 0;
    fields.length = 0;
}


function secondPlayerNameinnerHTML(playerName) {
    let playerNameSpan = document.getElementById('Spieler-2');
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
    bodyOverflowOnOff(1);
}


function closeImpressumOrPrivacyPolicy(imp_pri) {
    let impPri = document.getElementById(`${imp_pri}`);
    impPri.classList.add('d-none');
    bodyOverflowOnOff(0);
}

function bodyOverflowOnOff(onOff) {
    let body = document.getElementById('body');
    if (onOff == 1) {
        body.classList.add('overflow-hidden');
    }
    if (onOff == 0) {
        body.classList.remove('overflow-hidden');
    }
}

function playerNameActive() {
    let playerSpan = document.getElementById(`${player}`);
    playerSpan.classList.add('player-active');
}


function playerNameInactive() {
    let playerSpan = document.getElementById(`${player}`);
    playerSpan.classList.remove('player-active');
}


function playBackgroundMusic() {
    let music = document.getElementById('background-music');
    music.volume = 0.3;
    music.load();
    music.play();
    music.loop = true;
}


function playAnySound(soundName) {
    let sound = new Audio(src = `sound/${soundName}.mp3`);
    sound.volume = 0.6;
    sound.load();
    sound.play();
}


async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}
