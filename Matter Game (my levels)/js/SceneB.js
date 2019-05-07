class SceneB extends BaseScene {
    constructor () {
      super('SceneB');
      this.tileDataKey = 'Level2'
      this.tileDataSource = 'assets/Level2.json'
  }

  preload() {
    super.preload();
  }

  create() {
    super.create();
  this.keys = this.input.keyboard.addKeys({
            space: Phaser.Input.Keyboard.KeyCodes.SPACE
    });
    this.exit.x = 900;
    this.exit.y = 32;
  }

  update(time, delta) {
        super.update(time, delta);
      }
    }
