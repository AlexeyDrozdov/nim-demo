import Phaser from 'phaser-ce';

export default class Preload extends Phaser.State {
    init() {}

    preload() {
        this.load.image('coin', 'assets/images/coin.png');
        this.load.image('coin-selected', 'assets/images/coin-selected.png');
        this.load.image('hand', 'assets/images/hand-no-active.png');
        this.load.image('hand-active', 'assets/images/hand-active.png');
        this.load.image('nim-background', 'assets/images/nim-background.png');
        this.load.audio('nim-get-coins', 'assets/audio/sounds/nim-get-coins.wav');
    }

    create() {
        this.state.start('Nim');
    }
}
