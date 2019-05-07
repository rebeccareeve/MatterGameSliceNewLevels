var config = {
type: Phaser.Auto,
width: 64*10,
height: 64*14,
pixelArt: false,

physics: {
  default: 'matter',
  matter: {
    debug: false,
    gravity: {
      x: 0,
      y: 1.5
    }
  }
},

  scene: [SceneA, SceneB, SceneC, SceneD],

  plugins: {
     scene: [{
         plugin: PhaserMatterCollisionPlugin, // The plugin class
         key: "matterCollision", // Where to store in Scene.Systems, e.g. scene.sys.matterCollision
         mapping: "matterCollision" // Where to store in the Scene, e.g. scene.matterCollision
       }]
   },
   callbacks: {
       postBoot: function () {
           resize();
       }
   }
}

var game = new Phaser.Game(config);

function resize() {
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = game.config.width / game.config.height;

    if (windowRatio < gameRatio) {
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else {
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}
