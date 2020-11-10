class Explosion {
    constructor(x, y) {
        this.x= x;
        this.y= y;
        this.currentFrame= 1;
        this.count= 0;
        this.delete= false;
    };
    draw() {
        let explosion= document.getElementById("e" + this.currentFrame.toString());
        this.count+= 10;
        context.drawImage(explosion, this.x, this.y);
        if (this.count>= 50 && !this.delete) {
            this.count= 0;
            this.currentFrame++;
        };
        if (this.currentFrame== 7) this.delete= true;
    };
};