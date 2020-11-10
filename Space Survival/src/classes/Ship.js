class Ship {
    constructor(x, y, ship) {
        this.x= x;
        this.y= y;
        this.lastX= this.x;
        this.lastY= this.y;
        this.ship= document.getElementById(ship);
        this.maxLife= 300;
        this.life= this.maxLife;
    };
    draw() {
        if (this.life> 0) context.drawImage(this.ship, this.x, this.y);
        context.fillStyle="yellow";
        this.lastX= this.x;
        this.lastY= this.y;
    };
};