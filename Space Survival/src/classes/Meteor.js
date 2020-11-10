class Meteor {
    constructor(x, y, velY) {
        this.x= x;
        this.y= y;
        this.velY= velY;
        this.currentFrame= 1;
        this.count= 0;
        this.life= 18;
    };
    draw() {
        let meteor= document.getElementById("m" + this.currentFrame.toString());
        context.drawImage(meteor, this.x, this.y);
        this.count+= 10;
        if (this.count>= 300) {
            this.count= 0;
            this.currentFrame++;
        };
        this.y+= this.velY;
        if (this.currentFrame> 3) this.currentFrame= 1;
    };
};