class SceneC extends BaseScene {
    constructor () {
      super('SceneC');
      this.tileDataKey = 'Level3'
      this.tileDataSource = 'assets/Level3.json'
  }

  preload() {
    super.preload();
  }

  create() {
    super.create();
    this.keys = this.input.keyboard.addKeys({
            space: Phaser.Input.Keyboard.KeyCodes.SPACE
    });
  }

  update(time, delta) {
        super.update(time, delta);
      }
}
