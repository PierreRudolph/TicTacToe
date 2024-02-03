function computerTimeoutBeforeAct() {
    const timeout = fields.length == 0 ? 3000 : 1500;
    let soundTimeout = timeout - 1200;
    activateComputerName();
    setTimeout(function () { playAnySound('computer-processing-short') }, soundTimeout);
    setTimeout(computer, timeout);
}


function computer() {
    computerAction();
    checkForWinner();
    playerTimeout('Spieler-1');
}


function activateComputerName() {
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
    if (!(look4twoX >= 1 || look4twoO >= 1))
        return generateNum(1, 9);
    if (look4twoX >= 1)
        return look4twoX;
    if (look4twoO >= 1)
        return look4twoO;
}


function checkFieldNum9Times(fieldNum) {
    let checkedNum;
    for (let i = 0; i < 9; i++) {
        checkedNum = checkField(fieldNum);
        fieldNum = ifZeroPushAndNewNum(fieldNum, checkedNum);
    }
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


function generateNum(min, max) {
    let random;
    while (!random) {
        /*erzeugt eine Nummer zwischen min und max, ausgenommen Nummern die in der excluded List sind*/
        const x = Math.floor(Math.random() * (max - min + 1)) + min;
        if (excludedNumbers.indexOf(x) === -1) random = x;
    }
    return random;
}


function checkForBestField(cycleOrX) {
    let horNum = checkForHorizontalOptions(cycleOrX);
    let verNum = checkForVerticalOptions(cycleOrX);
    let querNum = checkForQuerOptions(cycleOrX);
    return threeValuesTester(horNum, verNum, querNum);
}


function checkForHorizontalOptions(cycleOrX) {
    let upperRow = checkUpperHorizontal(cycleOrX);
    let middleRow = checkMiddleHorizontal(cycleOrX);
    let lowerRow = checkLowerHorizontal(cycleOrX);
    return threeValuesTester(upperRow, middleRow, lowerRow);
}


function checkForVerticalOptions(cycleOrX) {
    let leftRow = checkForLeftVertikal(cycleOrX);
    let middleRow = checkForMiddleVertikal(cycleOrX);
    let rightRow = checkForRightVertikal(cycleOrX);
    return threeValuesTester(leftRow, middleRow, rightRow);
}


function checkForQuerOptions(cycleOrX) {
    let topLeToBotRi = checkForTopLeToBotRi(cycleOrX);
    let botLeToTopRi = checkForBotLeToTopRi(cycleOrX);
    return threeValuesTester(topLeToBotRi, botLeToTopRi, 0);
}


function checkUpperHorizontal(cycleOrX) {
    let optionOne = checkFieldOptions(0, 1, 3, cycleOrX);
    let optionTwo = checkFieldOptions(0, 2, 2, cycleOrX);
    let optionThree = checkFieldOptions(1, 2, 1, cycleOrX);
    return threeValuesTester(optionOne, optionTwo, optionThree);
}


function checkMiddleHorizontal(cycleOrX) {
    let optionOne = checkFieldOptions(3, 4, 6, cycleOrX);
    let optionTwo = checkFieldOptions(3, 5, 5, cycleOrX);
    let optionThree = checkFieldOptions(4, 5, 4, cycleOrX);
    return threeValuesTester(optionOne, optionTwo, optionThree);
}


function checkLowerHorizontal(cycleOrX) {
    let optionOne = checkFieldOptions(6, 7, 9, cycleOrX);
    let optionTwo = checkFieldOptions(6, 8, 8, cycleOrX);
    let optionThree = checkFieldOptions(7, 8, 7, cycleOrX);
    return threeValuesTester(optionOne, optionTwo, optionThree);
}


function checkForLeftVertikal(cycleOrX) {
    let optionOne = checkFieldOptions(0, 3, 7, cycleOrX);
    let optionTwo = checkFieldOptions(0, 6, 4, cycleOrX);
    let optionThree = checkFieldOptions(3, 6, 1, cycleOrX);
    return threeValuesTester(optionOne, optionTwo, optionThree);
}


function checkForMiddleVertikal(cycleOrX) {
    let optionOne = checkFieldOptions(1, 4, 8, cycleOrX);
    let optionTwo = checkFieldOptions(1, 7, 5, cycleOrX);
    let optionThree = checkFieldOptions(4, 7, 2, cycleOrX);
    return threeValuesTester(optionOne, optionTwo, optionThree);
}


function checkForRightVertikal(cycleOrX) {
    let optionOne = checkFieldOptions(2, 5, 9, cycleOrX);
    let optionTwo = checkFieldOptions(2, 8, 6, cycleOrX);
    let optionThree = checkFieldOptions(5, 8, 3, cycleOrX);
    return threeValuesTester(optionOne, optionTwo, optionThree);
}


function checkForTopLeToBotRi(cycleOrX) {
    let optionOne = checkFieldOptions(0, 4, 9, cycleOrX);
    let optionTwo = checkFieldOptions(0, 8, 5, cycleOrX);
    let optionThree = checkFieldOptions(4, 8, 1, cycleOrX);
    return threeValuesTester(optionOne, optionTwo, optionThree);
}


function checkForBotLeToTopRi(cycleOrX) {
    let optionOne = checkFieldOptions(6, 4, 3, cycleOrX);
    let optionTwo = checkFieldOptions(6, 2, 5, cycleOrX);
    let optionThree = checkFieldOptions(4, 2, 7, cycleOrX);
    return threeValuesTester(optionOne, optionTwo, optionThree);
}


function checkFieldOptions(fieldsOne, fieldsTwo, fieldToCheck, cycleOrX) {
    if (fields[fieldsOne] == `${cycleOrX}` && fields[fieldsTwo] == `${cycleOrX}`) {
        number = checkField(fieldToCheck);
        if (number >= 1) {
            return fieldToCheck;
        } else {
            return 0;
        }
    } else {
        return 0;
    }
}


function threeValuesTester(valueOne, valueTwo, valueThree) {
    if (!(valueOne > 0 || valueTwo > 0 || valueThree > 0))
        return 0;
    if (valueOne > 0)
        return valueOne;
    if (valueTwo > 0)
        return valueTwo;
    if (valueThree > 0)
        return valueThree;
}
