export default class Nim extends Phaser.State {
    const ROW_COUNT = 3;
    const MAX_COINS_IN_ROW_COUNT = 5;
    const HAND_X = 400;
    const HAND_Y = 250;
    const COIN_X = 100;
    const COIN_Y = 100;
    const COIN_OFFSET = 50;
    let coins = [];
    let digitCoins = [];
    let currentLine = 0;
    let counter = 0;
    let hand;

    create() {
        hand = this.add.sprite(HAND_X, HAND_Y, 'hand');
        hand.inputEnabled = true;
        hand.events.onInputDown.add(handListener, this);
        
        for (let i = ROW_COUNT - 1; i > -1; i--){
            digitCoins[i] = [];
            coins[i] = [];
            
            for (let j = 0; j < MAX_COINS_IN_ROW_COUNT - i; j++) {
                digitCoins[i][j] = 1;
                coins[i][j] = game.add.sprite(COIN_X + COIN_OFFSET * j, COIN_Y + COIN_OFFSET * (ROW_COUNT - i), 'coin');
                coins[i][j].inputEnabled = true;
                coins[i][j].events.onInputDown.add(coinsListener, this);
            }
        }
    }

    coinsListener(...args) {
        if (currentLine === 0 || currentLine === args[0].position.y) {
            currentLine = args[0].position.y;
            hand.loadTexture('hand-active', 0);
            
            if (args[0].key === 'coin') {
                args[0].loadTexture('coin-selected', 0);
                counter++;
            } else {
                args[0].loadTexture('coin', 0);  
                counter--;
            }    
            
            if (counter === 0) {
                currentLine = 0;
                hand.loadTexture('hand', 0);
            }     
        }
    }


    handListener() {
        if (hand.key === 'hand-active') {
            let line = ROW_COUNT - (currentLine - COIN_Y) / COIN_OFFSET;
            
            coins[line].map((x, index) => {
                if (x.key === 'coin-selected'){
                    x.destroy();
                    digitCoins[line][index] = 0;
                }
            })

            currentLine = 0;
            hand.loadTexture('hand', 0);
        }   
    }
}
