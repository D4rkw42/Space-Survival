class Boss {
    constructor(missileDamage) {
        this.missileDamage= missileDamage;
        this.y= -400;
        this.countMissile= 0;
        this.countShoot= 0;
        this.x= width / 2 - 431 / 2;
        this.life= 500;
    };
    draw() {
        let boss= document.getElementById("boss");
        if (this.life> 0) context.drawImage(boss, this.x, this.y);
        if (this.y< -80) this.y+= 0.5;
        if (this.y== -80) {
            this.countShoot+= 10;
            this.countMissile+= 10;
        };
        if (this.countShoot>= 200) {
            this.countShoot= 0;
            shoots.push(new Shoot(230, this.y + 200, 8, "boss", "blue"));
            shoots.push(new Shoot(510, this.y + 200, 8, "boss", "blue"));
            shoots.push(new Shoot(400, this.y + 200, 5, "boss", "red"));
            setTimeout(() => {
                shoots.push(new Shoot(290, this.y + 200, 8, "boss", "blue"));
                shoots.push(new Shoot(570, this.y + 200, 8, "boss", "blue"));
            }, 500);
        };
        if (this.countMissile>= 8000) {
            this.countMissile= 0;
            missiles.push(new Missile(random(this.x, this.x + 350), this.y + 90, 0.5, 10));
            missiles.push(new Missile(random(this.x, this.x + 350), this.y + 90, 0.5, 10));
        };
    };
};
