ENGINE.Bullet = function(args) {

  Utils.extend(this, {

    direction: 0,
    speed: 300,
    lifespan: 2
  }, args);

  this.radius = 3;

};

ENGINE.Bullet.prototype = {

  constructor: ENGINE.Bullet,

  zIndex: 3,

  collidable: true,

  collision: function(entity) {

    if (entity.hit) {

      if (entity.team !== this.team) {
        entity.hit(this);
        this.collection.remove(this);
      }

    }

  },

  step: function(delta) {

    /* lifespan */

    if ((this.lifespan -= delta) < 0) this.collection.remove(this);

    /* movement */

    this.x += Math.cos(this.direction) * this.speed * delta;
    this.y += Math.sin(this.direction) * this.speed * delta;

    /* wrap */

    app.game.wrap(this);
  },

  render: function() {
    var bulletimg = new Image()
    bulletimg.src = "/Users/mgokhale/code/unfinished-asteroids/images/spritesheet.png"
    app.layer.drawImage(bulletimg, 20 + this.team * 23, 53, 6, 6, this.x - 4, this.y - 4, 8, 8);

  }

};
