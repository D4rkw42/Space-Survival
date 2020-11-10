class Missile {
    constructor(x, y, velY, damage) {
        this.damage= damage;
        this.velY= velY;
        this.x= x;
        this.y= y;
        this.currentFrame= 1;
        this.life= 50;
        this.count= 0;
    };
    draw() {
        let mis= document.getElementById("mis" + this.currentFrame.toString());
        context.drawImage(mis, this.x, this.y);
        this.y+= this.velY;
        this.count+= 10;
        if (this.count>= 1000) {
            this.count= 0;
            this.currentFrame++;
        };
        if (this.currentFrame> 3) this.currentFrame= 1;
    };
};