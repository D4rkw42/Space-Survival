class PowerUp {
    constructor() {
        this.x= random(20, width);
        this.y= random(-50, -20);
        this.catched= false;
        this.effect= ["strength", "strength", "life"][random(0, 2)];
        this.velY= random(3, 6) / 10;
    };
    draw() {
        if (this.effect=="strength") {
            context.fillStyle="rgba(255, 0, 0, 0.3)";
        } else {
            context.fillStyle="rgba(0, 255, 0, 0.3)";
        };
        for (let i= 1;i<= 5;i++) {
            context.fillRect(random(this.x - 10, this.x + 10), random(this.y - 10, this.y + 10), 5, 5);
        };
        this.y+= this.velY;
    };
};