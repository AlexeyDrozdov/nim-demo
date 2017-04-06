const MAX_COUNT_BIT = 3;

function chooseMove(){
    let j = 0;
    let k = 0;  
    let countCoinsInRow = getCountCoinsInRow(digitCoins);
    let countCoinsBit = countCoinsInRow.map( x => toBinary(x));
    let sumBits = getSumBit(countCoinsBit);
    let i = sumBits.indexOf(1);
    if (i < 0){
        while (countCoinsInRow[j] === 0){
            j++;
        }
        k = 1;
    }
    else {
        while (countCoinsBit[j][i] === 0){
            j++;
        }

        countCoinsBit = countCoinsBit.map(x => inverse(x));
    }
}

function getCountCoinsInRow(coins){
    let countCoinsInRow = [];
    coins.forEach( (x, index) => {
        let count = 0;
        x.forEach( y => {
            if (y === 1)
                count++; 
        } )
        countCoinsInRow[index] = count;
    } )
    return countCoinsInRow;
}

function toBinary(num){
    num = num.toString(2);
    if (num.length < MAX_COUNT_BIT){
        let temp = '0'.repeat(MAX_COUNT_BIT - num.length);
        num = temp.concat(num);       
    }
    return num.split('').map( x => Number(x));
}

function getSumBit(binaryCountsCoins){
    let sumBits = [];
    for (let i = 0; i < MAX_COUNT_BIT; i++){
        sumBits[i] = 0;
        for (let j = 0; j < binaryCountsCoins.length; j++){
            sumBits[i] = sumBits[i] ^ binaryCountsCoins[j][i];
        }
    }
    return sumBits;
}

function inverse(binaryNumber){
    return binaryNumber.map( x => Number(!x));
}
