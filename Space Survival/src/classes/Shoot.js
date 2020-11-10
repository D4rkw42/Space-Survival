class Shoot {
    constructor(x, y, velY, origin, color) {
        this.x= x;
        this.y= y;
        this.velY= velY;
        this.damage= 2;
        this.origin= origin;
        this.color= color;
    };
    draw() {
        this.y+= this.velY;
        context.fillStyle= this.color;
        context.fillRect(this.x, this.y, 3, 20);
    };
};