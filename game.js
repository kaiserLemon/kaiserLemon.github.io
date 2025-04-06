const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#301934', // Dark purple
    parent: 'game-container',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 600 },
        debug: false,
      },
    },
    scene: {
      preload: preload,
      create: create,
      update: update,
    },
  };
  
  const game = new Phaser.Game(config);
  
  let player, platforms, collectibles, enemies, dragon, magicWand;
  let score = 0;
  let hasWand = false;
  let dragonPresent = false;
  let scoreText, wandText;
  
  function preload() {
    // Load assets
    this.load.image('player', "wednesday.png");
    this.load.image('platform', 'assets/images/column.png');
    this.load.image('collectible', 'assets/images/book.png');
    this.load.image('enemy', 'assets/images/monster.png');
    this.load.image('dragon', 'assets/images/dragon.png');
    this.load.image('wand', 'assets/images/fire.png');
  }
  
  function create() {
    // Add platforms
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 500, 'platform').setScale(0.5).refreshBody();
    platforms.create(600, 350, 'platform').setScale(0.5).refreshBody();
    platforms.create(200, 200, 'platform').setScale(0.5).refreshBody();
  
    // Add player
    player = this.physics.add.sprite(100, 450, 'player').setScale(0.5);
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
  
    // Add collectibles
    collectibles = this.physics.add.group({
      key: 'collectible',
      repeat: 5,
      setXY: { x: 200, y: 0, stepX: 150 },
    });
  
    // Add enemies
    enemies = this.physics.add.group();
  
    // Add magic wand
    magicWand = this.physics.add.sprite(700, 100, 'wand').setScale(0.5);
  
    // Add dragon (hidden initially)
    dragon = this.physics.add.sprite(800, -200, 'dragon').setScale(0.5);
    dragon.setVisible(false);
  
    // Add collisions
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(collectibles, platforms);
    this.physics.add.collider(enemies, platforms);
    this.physics.add.collider(player, collectibles, collectItem, null, this);
    this.physics.add.collider(player, magicWand, collectWand, null, this);
    this.physics.add.collider(player, enemies, hitEnemy, null, this);
    this.physics.add.collider(player, dragon, encounterDragon, null, this);
  
    // Add score text
    scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '16px', fill: '#fff' });
    wandText = this.add.text(10, 30, 'Magic Wand: Not Collected', { fontSize: '16px', fill: '#fff' });
  }
  
  function update() {
    const cursors = this.input.keyboard.createCursorKeys();
  
    // Player movement
    if (cursors.left.isDown) {
      player.setVelocityX(-160);
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);
    } else {
      player.setVelocityX(0);
    }
  
    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-330);
    }
  
    // Dragon appearance
    if (score >= 10 && !dragonPresent) {
      dragon.setVisible(true);
      dragonPresent = true;
    }
  }
  
  function collectItem(player, collectible) {
    collectible.disableBody(true, true);
    score += 1;
    scoreText.setText('Score: ' + score);
  }
  
  function collectWand(player, wand) {
    wand.disableBody(true, true);
    hasWand = true;
    wandText.setText('Magic Wand: Collected');
  }
  
  function hitEnemy(player, enemy) {
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
    gameOver = true;
  }
  
  function encounterDragon(player, dragon) {
    if (hasWand) {
      dragon.disableBody(true, true);
      this.add.text(300, 250, 'You Win!', { fontSize: '32px', fill: '#fff' });
    } else {
      this.physics.pause();
      player.setTint(0xff0000);
      this.add.text(300, 250, 'Game Over!', { fontSize: '32px', fill: '#fff' });
    }
  }