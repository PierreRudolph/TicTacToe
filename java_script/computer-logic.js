function computerTimeoutBeforeAct() {
    const timeout = fields.length == 0 ? 3000 : 1500;
    let soundTimeout = timeout - 1200;
    setTimeout(function () { playAnySound('computer-processing-short') }, soundTimeout);

    setTimeout(computer, timeout);
}


function computer() {
    computerActivate();
    computerAction();
    checkForWinner();
    playerTimeout('Spieler-1');
}


function computerActivate() {
    playerNameInactive(player);
    player = 'Spieler-2';
    playerNameActive(player);
}


function computerAction() {
    let fieldNum = calculateField();
    td = document.getElementById(`field-${fieldNum}`);
    playAnySound(`${player}-sound`);
    getFieldinnerHtml(fieldNum, td, 'x');
    fields[fieldNum - 1] = 'x';
}


function calculateField() {
    let fieldNum;
    let look4twoX = checkForBestField('x');
    let look4twoO = checkForBestField('kreis');
    fieldNum = checkIfCrossOrCycle(look4twoX, look4twoO);
    fieldNum = checkFieldNum9Times(fieldNum);
    return fieldNum;
}


function checkIfCrossOrCycle(look4twoX, look4twoO) {
    /*das ist eine if false abfrage*/
    if (!(look4twoX >= 1 || look4twoO >= 1))
        return generateNum(1, 9);

    if (look4twoX >= 1)
        return look4twoX;
    if (look4twoO >= 1)
        return look4twoO;
}


function checkFieldNum9Times(fieldNum) {
    let checkedNum;
    checkedNum = checkField(fieldNum);
    fieldNum = ifZeroPushAndNewNum(fieldNum, checkedNum);

    checkedNum = checkField(fieldNum);
    fieldNum = ifZeroPushAndNewNum(fieldNum, checkedNum);

    checkedNum = checkField(fieldNum);
    fieldNum = ifZeroPushAndNewNum(fieldNum, checkedNum);

    checkedNum = checkField(fieldNum);
    fieldNum = ifZeroPushAndNewNum(fieldNum, checkedNum);

    checkedNum = checkField(fieldNum);
    fieldNum = ifZeroPushAndNewNum(fieldNum, checkedNum);

    checkedNum = checkField(fieldNum);
    fieldNum = ifZeroPushAndNewNum(fieldNum, checkedNum);

    checkedNum = checkField(fieldNum);
    fieldNum = ifZeroPushAndNewNum(fieldNum, checkedNum);

    checkedNum = checkField(fieldNum);
    fieldNum = ifZeroPushAndNewNum(fieldNum, checkedNum);

    checkedNum = checkField(fieldNum);
    fieldNum = ifZeroPushAndNewNum(fieldNum, checkedNum);

    return fieldNum;
}


function checkField(number) {
    let td = document.getElementById(`field-${number}`);
    if (td.getElementsByTagName('img').length > 0) {
        return 0;
    } else {
        return number;
    }
}


function ifZeroPushAndNewNum(fieldNum, checkedNum) {
    ifZeroPushExcludedList(fieldNum, checkedNum);
    checkedNum = ifZeroGenerateNewNum(checkedNum);
    return checkedNum;
}


function ifZeroGenerateNewNum(fieldNum) {
    if (fieldNum == 0) {
        return fieldNum = generateNum(1, 9);
    } else {
        return fieldNum;
    }
}


function ifZeroPushExcludedList(fieldNum, checkedNum) {
    if (checkedNum == 0) {
        excludedNumbers.push(fieldNum);
    }
}


function checkForBestField(cycleOrX) {
    let horNum = checkForHorizontalOptions(cycleOrX);
    let verNum = checkForVerticalOptions(cycleOrX);
    let querNum = checkForQuerOptions(cycleOrX);

    if (!(horNum > 0 || verNum > 0 || querNum > 0))
        return 0;

    if (horNum > 0)
        return horNum;

    if (verNum > 0)
        return verNum;

    if (querNum > 0)
        return querNum;
}


function generateNum(min, max) {
    let random;
    while (!random) {
        /*erzeugt eine Nummer zwischen min und max, ausgenommen Nummern die in der excluded List sind*/
        const x = Math.floor(Math.random() * (max - min + 1)) + min;
        if (excludedNumbers.indexOf(x) === -1) random = x;
    }
    return random;
}


function checkForHorizontalOptions(cycleOrX) {
    let upperRow = checkUpperHorizontal(cycleOrX);
    let middleRow = checkMiddleHorizontal(cycleOrX);
    let lowerRow = checkLowerHorizontal(cycleOrX);
    if (!(upperRow > 0 || middleRow > 0 || lowerRow > 0))
        return 0;

    if (upperRow > 0)
        return upperRow;

    if (middleRow > 0)
        return middleRow;

    if (lowerRow > 0)
        return lowerRow;
}


function checkForVerticalOptions(cycleOrX) {
    let leftRow = checkForLeftVertikal(cycleOrX);
    let middleRow = checkForMiddleVertikal(cycleOrX);
    let rightRow = checkForRightVertikal(cycleOrX);
    if (!(leftRow > 0 || middleRow > 0 || rightRow > 0))
        return 0;

    if (leftRow > 0)
        return leftRow;

    if (middleRow > 0)
        return middleRow;

    if (rightRow > 0)
        return rightRow;
}


function checkForQuerOptions(cycleOrX) {
    let topLeToBotRi = checkForTopLeToBotRi(cycleOrX);
    let botLeToTopRi = checkForBotLeToTopRi(cycleOrX);
    if (!(topLeToBotRi > 0 || botLeToTopRi > 0))
        return 0;

    if (topLeToBotRi > 0)
        return topLeToBotRi;

    if (botLeToTopRi > 0)
        return botLeToTopRi;
}


function checkUpperHorizontal(cycleOrX) {
    if (fields[0] == `${cycleOrX}` && fields[1] == `${cycleOrX}`) {
        number = checkField(2 + 1);
        if (number >= 1)
            return 2 + 1;
    }
    if (fields[0] == `${cycleOrX}` && fields[2] == `${cycleOrX}`) {
        number = checkField(1 + 1);
        if (number >= 1)
            return 1 + 1;
    }
    if (fields[1] == `${cycleOrX}` && fields[2] == `${cycleOrX}`) {
        number = checkField(0 + 1);
        if (number >= 1)
            return 0 + 1;
    }
    return 0;
}


function checkMiddleHorizontal(cycleOrX) {
    if (fields[3] == `${cycleOrX}` && fields[4] == `${cycleOrX}`) {
        number = checkField(5 + 1);
        if (number >= 1)
            return 5 + 1;

    }
    if (fields[3] == `${cycleOrX}` && fields[5] == `${cycleOrX}`) {
        number = checkField(4 + 1);
        if (number >= 1)
            return 4 + 1;

    }
    if (fields[4] == `${cycleOrX}` && fields[5] == `${cycleOrX}`) {
        number = checkField(3 + 1);
        if (number >= 1)
            return 3 + 1;

    }
    return 0;
}


function checkLowerHorizontal(cycleOrX) {
    if (fields[6] == `${cycleOrX}` && fields[7] == `${cycleOrX}`) {
        number = checkField(8 + 1);
        if (number >= 1)
            return 8 + 1;
    }
    if (fields[6] == `${cycleOrX}` && fields[8] == `${cycleOrX}`) {
        number = checkField(7 + 1);
        if (number >= 1)
            return 7 + 1;
    }
    if (fields[7] == `${cycleOrX}` && fields[8] == `${cycleOrX}`) {
        number = checkField(6 + 1);
        if (number >= 1)
            return 6 + 1;
    }
    return 0;
}


function checkForLeftVertikal(cycleOrX) {
    if (fields[0] == `${cycleOrX}` && fields[3] == `${cycleOrX}`) {
        number = checkField(6 + 1);
        if (number >= 1)
            return 6 + 1;
    }
    if (fields[0] == `${cycleOrX}` && fields[6] == `${cycleOrX}`) {
        number = checkField(3 + 1);
        if (number >= 1)
            return 3 + 1;
    }
    if (fields[3] == `${cycleOrX}` && fields[6] == `${cycleOrX}`) {
        number = checkField(0 + 1);
        if (number >= 1)
            return 0 + 1;
    }
    return 0;
}


function checkForMiddleVertikal(cycleOrX) {
    if (fields[1] == `${cycleOrX}` && fields[4] == `${cycleOrX}`) {
        number = checkField(7 + 1);
        if (number >= 1)
            return 7 + 1;
    }
    if (fields[1] == `${cycleOrX}` && fields[7] == `${cycleOrX}`) {
        number = checkField(4 + 1);
        if (number >= 1)
            return 4 + 1;
    }
    if (fields[4] == `${cycleOrX}` && fields[7] == `${cycleOrX}`) {
        number = checkField(1 + 1);
        if (number >= 1)
            return 1 + 1;
    }
    return 0;
}


function checkForRightVertikal(cycleOrX) {
    if (fields[2] == `${cycleOrX}` && fields[5] == `${cycleOrX}`) {
        number = checkField(8 + 1);
        if (number >= 1)
            return 8 + 1;
    }
    if (fields[2] == `${cycleOrX}` && fields[8] == `${cycleOrX}`) {
        number = checkField(5 + 1);
        if (number >= 1)
            return 5 + 1;
    }
    if (fields[5] == `${cycleOrX}` && fields[8] == `${cycleOrX}`) {
        number = checkField(2 + 1);
        if (number >= 1)
            return 2 + 1;
    }
    return 0;
}


function checkForTopLeToBotRi(cycleOrX) {
    if (fields[0] == `${cycleOrX}` && fields[4] == `${cycleOrX}`) {
        number = checkField(8 + 1);
        if (number >= 1)
            return 8 + 1;
    }
    if (fields[0] == `${cycleOrX}` && fields[8] == `${cycleOrX}`) {
        number = checkField(4 + 1);
        if (number >= 1)
            return 4 + 1;
    }
    if (fields[4] == `${cycleOrX}` && fields[8] == `${cycleOrX}`) {
        number = checkField(0 + 1);
        if (number >= 1)
            return 0 + 1;
    }
    return 0;
}


function checkForBotLeToTopRi(cycleOrX) {
    if (fields[6] == `${cycleOrX}` && fields[4] == `${cycleOrX}`) {
        number = checkField(2 + 1);
        if (number >= 1)
            return 2 + 1;
    }
    if (fields[6] == `${cycleOrX}` && fields[2] == `${cycleOrX}`) {
        number = checkField(4 + 1);
        if (number >= 1)
            return 4 + 1;
    }
    if (fields[4] == `${cycleOrX}` && fields[2] == `${cycleOrX}`) {
        number = checkField(6 + 1);
        if (number >= 1)
            return 6 + 1;
    }
    return 0;
}