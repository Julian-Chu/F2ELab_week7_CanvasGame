function Shape(ctx, x, y, angle) {
  this.ctx = ctx;
  // this.initX = x || 0;
  // this.initY = y || 0;
  this.initPos = {
    x: x || 0,
    y: y || 0
  }
  this.angle = angle || 0;
  this.deg = Math.PI / 180;
}

Shape.prototype.update = function (x, y, angle) {
  this.initPos.x = x;
  this.initPos.y = y;
  this.angle = angle;
}

// Object.defineProperty(Shape, 'deg', {
//     value: Math.PI / 180
// })

function Enemy(ctx, x, y) {
  Object.getPrototypeOf(Enemy.prototype).constructor.call(this);
  Shape.apply(this, arguments);
  this.currentPos = {
    x: this.initPos.x,
    y: this.initPos.y
  }
  this.radius = 40;
  this.draw = () => {
    this.ctx.beginPath();
    this.ctx.save();
    this.ctx.translate(this.currentPos.x, this.currentPos.y);
    this.ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fillStyle = "#F5AF5F";
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.restore();
    this.ctx.closePath();
  }
}

Enemy.prototype = Object.create(Shape.prototype);

function Triangle(ctx, x, y, angle) {
  Object.getPrototypeOf(Triangle.prototype).constructor.call(this);
  Shape.apply(this, arguments);

  this.draw = () => {
    //blue triangle
    this.ctx.beginPath();
    this.ctx.save();
    this.ctx.translate(this.initPos.x, this.initPos.y);
    this.ctx.rotate(this.angle * this.deg);
    let r = 40;
    this.ctx.rotate(30 * this.deg);
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(r, 0)

    this.ctx.rotate(120 * this.deg);
    this.ctx.lineTo(r, 0)

    this.ctx.rotate(120 * this.deg);
    this.ctx.lineTo(r, 0)

    this.ctx.rotate(120 * this.deg);
    this.ctx.lineTo(r, 0);
    this.ctx.fillStyle = "#3676BB";
    this.ctx.fill();
    this.ctx.restore();
    this.ctx.closePath();
  }
}

Triangle.prototype = Object.create(Shape.prototype);

function Meteor(ctx, x, y, angle) {
  Object.getPrototypeOf(Shape.prototype).constructor.call(this);
  Shape.apply(this, arguments);

  this.draw = () => {
    //red meteor
    this.ctx.save();
    this.ctx.translate(this.initPos.x, this.initPos.y);
    this.ctx.rotate(this.angle * this.deg)
    this.ctx.beginPath();
    this.ctx.moveTo(50, 0);
    this.ctx.lineTo(0, 50);
    this.ctx.lineTo(0, 110);
    this.ctx.lineTo(50, 130);
    this.ctx.lineTo(90, 100);
    this.ctx.lineTo(90, 50);
    this.ctx.closePath();
    this.ctx.fillStyle = "#E7465D";
    this.ctx.fill();
    this.ctx.restore();
  }
}

Meteor.prototype = Object.create(Shape.prototype);

function BatteryWithTitle(ctx, x, y, angle) {
  // Battery
  Object.getPrototypeOf(Shape.prototype).constructor.call(this);
  Shape.apply(this, arguments);

  this.draw = function () {
    this.ctx.save();
    this.ctx.translate(this.initPos.x, this.initPos.y);
    this.ctx.fillStyle = "#F5AF5F";
    this.ctx.fillRect(0, 10, 40, 70);
    this.ctx.fillRect(0, 85, 40, 5);

    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.fillRect(10, 0, 20, 10)

    this.ctx.beginPath(); //lighting
    this.ctx.moveTo(20, 25);
    this.ctx.lineTo(10, 48);
    this.ctx.lineTo(22, 48);
    this.ctx.lineTo(20, 65);
    this.ctx.lineTo(30, 42);
    this.ctx.lineTo(17, 42);
    this.ctx.closePath();
    this.ctx.fill();


    this.ctx.font = "30px Arial";
    this.ctx.fillText("Radio Defence", -20, 120);
    this.ctx.font = "150px Arial";
    this.ctx.fillText("R", 55, 90);

    this.ctx.restore();
  }
}

BatteryWithTitle.prototype = Object.create(Shape.prototype);


function Fighter(ctx, x, y, angle) {
  Object.getPrototypeOf(Fighter.prototype).constructor.call(this);
  Shape.apply(this, arguments);
  this.radius = 40;
  this.update = (angle) => {
    this.angle = angle;
    this.bullets.map(bullet => {
      bullet.update();
    })
  }

  this.bullets = [];
  this.draw = () => {
    this.ctx.save();
    this.ctx.translate(this.initPos.x, this.initPos.y);
    this.ctx.rotate(this.angle * this.deg);

    // inner circle
    this.ctx.beginPath();
    this.ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
    this.ctx.lineWidth = 5;
    this.ctx.strokeStyle = "#ffffff";
    this.ctx.stroke();

    // Benz 
    this.ctx.save()
    this.ctx.beginPath();
    this.ctx.lineWidth = 2;
    // this.ctx.rotate(30 * this.deg);
    for (let i = 0; i < 3; i++) {
      this.ctx.moveTo(0, 0);
      this.ctx.lineTo(this.radius, 0);
      this.ctx.rotate(120 * this.deg);
    }
    this.ctx.stroke();
    // this.ctx.closePath();
    this.ctx.restore()

    // gun
    this.ctx.beginPath();
    this.ctx.fillStyle = "#ffffff";
    // this.ctx.fillRect(7.5, -(this.radius + 5), -15, -25);
    this.ctx.fillRect((this.radius + 5), -7.5, 25, 15);
    // this.ctx.closePath();

    //shield
    this.ctx.beginPath();
    this.ctx.arc(0, 0, this.radius + 25, 140 * this.deg, 220 * this.deg);
    this.ctx.lineWidth = 3;
    this.ctx.stroke();
    // this.ctx.closePath();

    //dash line circle
    this.ctx.beginPath();
    this.ctx.lineWidth = 1;
    this.ctx.setLineDash([4, 3]);
    this.ctx.arc(0, 0, this.radius + 15, 0, 360 * this.deg);
    this.ctx.stroke();
    this.ctx.setLineDash([]);
    // this.ctx.closePath();

    this.ctx.restore();

    this.bullets.map((bullet) => {
      bullet.draw();
    })
  }

  this.shoot = () => {
    let bullet = new Bullet(this.ctx, this.initPos.x, this.initPos.y, this.angle, this);
    this.bullets.push(bullet);
  }

  this.removeBullet = (bullet) => {
    let index = Array.indexOf(this.bullets, bullet);
    this.bullets.splice(index, 1);
  }
}

Fighter.prototype = Object.create(Shape.prototype);

function Bullet(ctx, x, y, angle, fighter) {

  Object.getPrototypeOf(Bullet.prototype).constructor.call(this);
  Shape.apply(this, arguments);
  this.velocity = 10;
  this.radius_init = fighter.radius + 30;
  this.bulletLength = 10;
  this.bulletWidth = 10;
  this.step = 0;
  this.currentPos = Object.assign({}, {
    x: this.initPos.x + this.radius_init * Math.cos(this.angle * this.deg),
    y: this.initPos.y + this.radius_init * Math.sin(this.angle * this.deg)
  });

  this.fighter = fighter;

  this.update = () => {
    // remove bullet when out of canvas
    if (this.currentPos.x > 1000 || this.currentPos.x < 0 || this.currentPos.y > 800 || this.currentPos.y < 0) {
      this.fighter.removeBullet(this);
    }
    this.step++;
    let distanceFromZero = this.radius_init + this.step * this.velocity;
    this.currentPos.x = this.initPos.x + distanceFromZero * Math.cos(this.angle * this.deg);
    this.currentPos.y = this.initPos.y + distanceFromZero * Math.sin(this.angle * this.deg);

  }

  this.draw = () => {
    this.ctx.save();
    // this.ctx.translate(this.initPos.x, this.initPos.y);

    //shape of bullet
    this.ctx.beginPath();
    this.ctx.fillStyle = "red";
    this.ctx.translate(this.currentPos.x, this.currentPos.y);
    this.ctx.rotate(this.angle * this.deg);
    this.ctx.fillRect(0, 0 - this.bulletWidth / 2, this.bulletLength, this.bulletWidth);


    this.ctx.restore();
  }
}

Bullet.prototype = Object.create(Shape.prototype);