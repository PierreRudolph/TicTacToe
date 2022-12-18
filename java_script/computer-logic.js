function computerTimeoutBeforeAct() {
    setTimeout(function () {
        if (fields.length == 0) {
            setTimeout(computer, 3000);
        } else {
            setTimeout(computer, 1500);
        }
    }, 500);
}


function computer() {
    player = 'Spieler 2';
    let fieldNum = calculateField();

    td = document.getElementById(fieldNum);

    getFieldinnerHtml(td, 'x');
    fields[fieldNum - 1] = 'x';
    checkForWinner();
    setTimeout(function () { player = 'Spieler 1', 1000 });
    pointerYesOrNo(0);
}


function calculateField() {
    let fieldNum;
    let number1 = checkForBestField('x');
    let number2 = checkForBestField('kreis');
    fieldNum = checkIfCrossOrCycle(fieldNum, number1, number2);
    fieldNum = checkFieldNum9Times(fieldNum);
    return fieldNum;
}


function checkIfCrossOrCycle(fieldNum, number1, number2) {
    if (number1 >= 1) {
        fieldNum = number1;
    } else {
        if (number2 >= 1) {
            fieldNum = number2;
        } else {
            fieldNum = 1;
        }
    }
    return fieldNum;
}


function checkFieldNum9Times(fieldNum) {
    fieldNum = checkField(fieldNum);
    fieldNum = ifZeroPushAndNewNum(fieldNum);

    fieldNum = checkField(fieldNum);
    fieldNum = ifZeroPushAndNewNum(fieldNum);

    fieldNum = checkField(fieldNum);
    fieldNum = ifZeroPushAndNewNum(fieldNum);

    fieldNum = checkField(fieldNum);
    fieldNum = ifZeroPushAndNewNum(fieldNum);

    fieldNum = checkField(fieldNum);
    fieldNum = ifZeroPushAndNewNum(fieldNum);

    fieldNum = checkField(fieldNum);
    fieldNum = ifZeroPushAndNewNum(fieldNum);

    fieldNum = checkField(fieldNum);
    fieldNum = ifZeroPushAndNewNum(fieldNum);

    fieldNum = checkField(fieldNum);
    fieldNum = ifZeroPushAndNewNum(fieldNum);

    fieldNum = checkField(fieldNum);
    fieldNum = ifZeroPushAndNewNum(fieldNum);

    return fieldNum;
}


function ifZeroPushAndNewNum(fieldNum) {
    fieldNum = ifZeroPushExcludedList(fieldNum);
    fieldNum = ifZeroGenerateNewNum(fieldNum);
    return fieldNum;
}


function ifZeroGenerateNewNum(num) {
    if (num == 0) {
        return num = generateNum(1, 9);
    } else {
        return num;
    }
}


function ifZeroPushExcludedList(num) {
    if (num == 0) {
        excludedNumbers.push(num);
        return num = generateNum(1, 9);
    } else {
        return num;
    }
}


function checkForBestField(cycleOrX) {
    let number;

    if (checkForHorizontalOptions(cycleOrX) >= 0) {
        number = checkForHorizontalOptions(cycleOrX);
        return number + 1;
    } else {
        if (checkForVerticalOptions(cycleOrX) >= 0) {
            number = checkForVerticalOptions(cycleOrX);
            return number + 1;
        } else {
            if (checkForQuerOptions(cycleOrX) >= 0) {
                number = checkForQuerOptions(cycleOrX);
                return number + 1;
            } else {
                return 0;
            }
        }
    }
}


function checkForHorizontalOptions(cycleOrX) {
    let number;
    if (fields[0] == `${cycleOrX}` && fields[1] == `${cycleOrX}`) {
        number = checkField(2 + 1);
        if (number >= 1) {
            return 2;
        }

    }
    if (fields[0] == `${cycleOrX}` && fields[2] == `${cycleOrX}`) {
        number = checkField(1 + 1);
        if (number >= 1) {
            return 1;
        }
    }
    if (fields[1] == `${cycleOrX}` && fields[2] == `${cycleOrX}`) {
        number = checkField(0 + 1);
        if (number >= 1) {
            return 0;
        }
    }


    if (fields[3] == `${cycleOrX}` && fields[4] == `${cycleOrX}`) {
        number = checkField(5 + 1);
        if (number >= 1) {
            return 5;
        }
    }
    if (fields[3] == `${cycleOrX}` && fields[5] == `${cycleOrX}`) {
        number = checkField(4 + 1);
        if (number >= 1) {
            return 4;
        }
    }
    if (fields[4] == `${cycleOrX}` && fields[5] == `${cycleOrX}`) {
        number = checkField(3 + 1);
        if (number >= 1) {
            return 3;
        }
    }


    if (fields[6] == `${cycleOrX}` && fields[7] == `${cycleOrX}`) {
        number = checkField(8 + 1);
        if (number >= 1) {
            return 8;
        }
    }
    if (fields[6] == `${cycleOrX}` && fields[8] == `${cycleOrX}`) {
        number = checkField(7 + 1);
        if (number >= 1) {
            return 7;
        }
    }
    if (fields[7] == `${cycleOrX}` && fields[8] == `${cycleOrX}`) {
        number = checkField(6 + 1);
        if (number >= 1) {
            return 6;
        }
    }
}


function checkForVerticalOptions(cycleOrX) {
    let number;
    if (fields[0] == `${cycleOrX}` && fields[3] == `${cycleOrX}`) {
        number = checkField(6 + 1);
        if (number >= 1) {
            return 6;
        }
    }
    if (fields[0] == `${cycleOrX}` && fields[6] == `${cycleOrX}`) {
        number = checkField(3 + 1);
        if (number >= 1) {
            return 3;
        }
    }
    if (fields[3] == `${cycleOrX}` && fields[6] == `${cycleOrX}`) {
        number = checkField(0 + 1);
        if (number >= 1) {
            return 0;
        }
    }


    if (fields[1] == `${cycleOrX}` && fields[4] == `${cycleOrX}`) {
        number = checkField(7 + 1);
        if (number >= 1) {
            return 7;
        }
    }
    if (fields[1] == `${cycleOrX}` && fields[7] == `${cycleOrX}`) {
        number = checkField(4 + 1);
        if (number >= 1) {
            return 4;
        }
    }
    if (fields[4] == `${cycleOrX}` && fields[7] == `${cycleOrX}`) {
        number = checkField(1 + 1);
        if (number >= 1) {
            return 1;
        }
    }


    if (fields[2] == `${cycleOrX}` && fields[5] == `${cycleOrX}`) {
        number = checkField(8 + 1);
        if (number >= 1) {
            return 8;
        }
    }
    if (fields[2] == `${cycleOrX}` && fields[8] == `${cycleOrX}`) {
        number = checkField(5 + 1);
        if (number >= 1) {
            return 5;
        }
    }
    if (fields[5] == `${cycleOrX}` && fields[8] == `${cycleOrX}`) {
        number = checkField(2 + 1);
        if (number >= 1) {
            return 2;
        }
    }
}


function checkForQuerOptions(cycleOrX) {
    let number;
    /*von Links oben nach Rechts unten Abfragen*/
    if (fields[0] == `${cycleOrX}` && fields[4] == `${cycleOrX}`) {
        number = checkField(8 + 1);
        if (number >= 1) {
            return 8;
        }
    }
    if (fields[0] == `${cycleOrX}` && fields[8] == `${cycleOrX}`) {
        number = checkField(4 + 1);
        if (number >= 1) {
            return 4;
        }
    }
    if (fields[4] == `${cycleOrX}` && fields[8] == `${cycleOrX}`) {
        number = checkField(0 + 1);
        if (number >= 1) {
            return 0;
        }
    }

    /*von Links unten nach Rechts oben Abfragen*/
    if (fields[6] == `${cycleOrX}` && fields[4] == `${cycleOrX}`) {
        number = checkField(2 + 1);
        if (number >= 1) {
            return 2;
        }
    }
    if (fields[6] == `${cycleOrX}` && fields[2] == `${cycleOrX}`) {
        number = checkField(4 + 1);
        if (number >= 1) {
            return 4;
        }
    }
    if (fields[4] == `${cycleOrX}` && fields[2] == `${cycleOrX}`) {
        number = checkField(6 + 1);
        if (number >= 1) {
            return 6;
        }
    }
}


function generateNum(min, max) {
    let random;
    while (!random) {
        /*erzeugt Nummer zwischen min und max, ausgenommen, Nummern die in der excluded List sind*/
        const x = Math.floor(Math.random() * (max - min + 1)) + min;
        if (excludedNumbers.indexOf(x) === -1) random = x;
    }
    return random;
}