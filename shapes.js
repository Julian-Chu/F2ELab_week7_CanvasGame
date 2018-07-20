function Shape(ctx, x, y, angle) {
  this.ctx = ctx;
  this.postionX = x || 0;
  this.postionY = y || 0;
  this.angle = angle || 0;
  this.deg = Math.PI / 180;
}

Shape.prototype.update = function (x, y, angle) {
  this.postionX = x;
  this.postionY = y;
  this.angle = angle;
}

// Object.defineProperty(Shape, 'deg', {
//     value: Math.PI / 180
// })

function Enemy(ctx, x, y) {
  Object.getPrototypeOf(Enemy.prototype).constructor.call(this);
  Shape.apply(this, arguments);
  this.draw = () => {

    this.ctx.beginPath();
    this.ctx.save();
    this.ctx.translate(this.postionX, this.postionY);
    this.ctx.arc(0, 0, 50, 0, Math.PI * 2);
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
    this.ctx.translate(this.postionX, this.postionY);
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
  console.log(this);
  console.log(this.ctx);

  this.draw = () => {
    console.log(this);
    console.log(this.ctx);
    //red meteor
    this.ctx.save();
    this.ctx.translate(this.postionX, this.postionY);
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

function Fighter(ctx, x, y, angle) {

  Object.getPrototypeOf(Fighter.prototype).constructor.call(this);
  Shape.apply(this, arguments);

  this.radius = 40;

  this.update = (angle) => {
    this.angle = angle;
  }

  this.draw = () => {
    this.ctx.save();
    this.ctx.translate(x, y);
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
    this.ctx.rotate(30 * this.deg);
    for (let i = 0; i < 3; i++) {
      this.ctx.rotate(120 * this.deg);
      this.ctx.moveTo(0, 0);
      this.ctx.lineTo(this.radius, 0);
    }
    this.ctx.stroke();
    // this.ctx.closePath();
    this.ctx.restore()

    // gun
    this.ctx.beginPath();
    this.ctx.fillStyle = "#ffffff";
    this.ctx.fillRect(7.5, -(this.radius + 5), -15, -25);
    // this.ctx.closePath();

    //shield
    this.ctx.beginPath();
    this.ctx.arc(0, 0, this.radius + 25, 50 * this.deg, 130 * this.deg);
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
  }
}

Fighter.prototype = Object.create(Shape.prototype);