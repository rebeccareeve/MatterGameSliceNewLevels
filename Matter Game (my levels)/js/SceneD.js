class SceneD extends BaseScene {
    constructor () {
      super('SceneD');
      this.tileDataKey = 'Level4'
      this.tileDataSource = 'assets/Level4.json'
  }

  preload() {
    super.preload();
  }

  create() {
    super.create();
    this.keys = this.input.keyboard.addKeys({
            space: Phaser.Input.Keyboard.KeyCodes.SPACE
    });
    this.exit.x = 750;
    this.exit.y = 160;
  }

  update(time, delta) {
        super.update(time, delta);
      }
    }
