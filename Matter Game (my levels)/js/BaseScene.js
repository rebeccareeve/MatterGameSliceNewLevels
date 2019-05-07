class BaseScene extends Phaser.Scene {
constructor(id) {
  super(id)
  this.id = id;
  this.tileDataKey;
  this.tileDataSource;
  this.emojiCount = 0;
  this.emojiTime = 0;
  }
  preload() {
    this.load.tilemapTiledJSON(this.tileDataKey, this.tileDataSource);
  }
  create() {
    const map = this.make.tilemap({key: this.tileDataKey});
    const tileset = map.addTilesetImage('kenney-tileset-64px-extruded', 'tileset');
    this.background = map.createStaticLayer('background', tileset, 0, 0);
    this.decorations = map.createStaticLayer('decorations', tileset, 0, 0);
    this.platforms = map.createStaticLayer('platforms', tileset, 0, 0);

    this.platforms.setCollisionByProperty({collides: true});
    this.matter.world.convertTilemapLayer(this.platforms);

    this.player = new Player (this, 64, map.heightInPixels - 128);
    //this.player = new Player (this, 50, 128); // Debug position
    this.player.sprite.label = 'player';
    this.exit = this.matter.add.sprite(800, 97, 'exit');
    this.exit.setStatic(true);
    this.exit.label = 'exit';

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.matter.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player.sprite, false, 0.5, 0.5);
    this.matter.world.on('collisionstart', this.handleCollision, this);
    this.matter.world.on('collisionactive', this.handleCollision, this);

  }
  update(time, delta) {
    if(Phaser.Input.Keyboard.JustDown(this.keys.space)){
        switch(this.id) {
          case 'SceneA':
          this.scene.switch('SceneB');
          break;
          case 'SceneB':
          this.scene.switch('SceneC');
          break;
          case 'SceneC':
          this.scene.switch('SceneD');
          break;
          case 'SceneD':
          this.scene.switch('SceneA');
          break;
        }
      }
      if(this.emojiCount < 25 && this.emojiTime == 0) {
        this.createEmoji();
        this.emojiCount++;
        this.emojiTime = time;
      } else if (time > this.emojiTime + 1000) {
        this.emojiTime = 0;
      }
      this.player.update();
  }
  handleCollision(event) {
    event.pairs.forEach(this.matchCollisionPair, this);
  }
  matchCollisionPair(pair) {
    const bodyA = pair.bodyA;
    const bodyB = pair.bodyB;
    let myPair = [null, null];
    if (bodyA.gameObject && bodyA.gameObject.label) {
      this.sortCollisionObjects(bodyA.gameObject.label, myPair)
    }
    if (bodyB.gameObject && bodyB.gameObject.label) {
      this.sortCollisionObjects(bodyB.gameObject.label, myPair)
    }
    if (myPair[0] == 'player' && myPair[1] == 'exit') {
      this.changeScene();
    }
  }
  sortCollisionObjects(label, arr) {
    switch (label) {
      case 'player':
        arr[0] = 'player';
        break
      case 'exit':
        arr[1] = 'exit';
        break
    }
  }
  changeScene() {
    switch(this.id) {
      case 'SceneA':
      this.scene.start('SceneB');
      break
      case 'SceneB':
      this.scene.start('SceneC');
      break
      case 'SceneC':
      this.scene.start('SceneD');
      break
      case 'SceneD':
      this.scene.start('SceneA');
      break
    }
  }
  createEmoji() {
    const frameNames = Object.keys(this.cache.json.get('emoji').frames);
    const frame = Phaser.Utils.Array.GetRandom(frameNames);
    let emoji = this.matter.add.image(150, 32, 'emoji', frame, {
      restitution : 1,
      friction: 0.5,
      density: 0.01,
      shape: 'circle'
    });
    emoji.setScale(0.5);
  }
}
