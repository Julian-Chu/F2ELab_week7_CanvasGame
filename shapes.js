function Shape(ctx, x, y, angle) {
  this.ctx = ctx;
  this.postionX = x || 0;
  this.postionY = y || 0;
  this.angle = angle || 0;
  this.deg = Math.PI / 180;
}

// Object.defineProperty(Shape, 'deg', {
//     value: Math.PI / 180
// })

function Enemy(ctx, x, y) {
  Object.getPrototypeOf(Shape.prototype).constructor.call(this);
  Shape.apply(this, arguments);

  this.draw = function () {

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

function Triangle(ctx, x, y, angle) {
  Object.getPrototypeOf(Shape.prototype).constructor.call(this);
  Shape.apply(this, arguments);

  this.draw = function () {
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

function Meteor(ctx, x, y, angle) {
  Object.getPrototypeOf(Shape.prototype).constructor.call(this);
  Shape.apply(this, arguments);


  this.draw = function () {
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