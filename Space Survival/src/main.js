const Pontos= document.getElementById("pontos");
const Record= document.getElementById("record");
const entireHeart= document.getElementById("entireHeart");
const midHeart= document.getElementById("midHeart");
const audios= {
    explosion: () => {
        let audio= document.createElement("audio");
        let source= document.createElement("source");
        document.body.appendChild(audio);
        source.src="audio/explosion.mp3";
        audio.appendChild(source);
        audio.play();
        setTimeout(() => document.body.removeChild(audio), 2500);
    },
    lazer: () => {
        let audio= document.createElement("audio");
        let source= document.createElement("source");
        document.body.appendChild(audio);
        source.src="audio/lazer.mp3";
        audio.appendChild(source);
        audio.currentTime= 1;
        audio.play();
        setTimeout(() => document.body.removeChild(audio), 2500);
    }
};
var ship;
var boss;
var gameEnded;
var record= 0;
var pontos;
var powerCount;
var extraStrength= 0;
var shooted= 0;
var spawnMeteors, spawnCount, meteorsCount, countShoot, meteorSpeed, missileDamage, meteorsDestroyed, loadBoss;
var keys= {
    ArrowUp: {status: false},
    ArrowDown: {status: false},
    ArrowRight: {status: false},
    ArrowLeft: {status: false},
    k: {status: false, shoot: true}
};
const init= function() {
    shooted= 0;
    extraStrength= 0;
    powerCount= 0;
    spawnCount= 5000;
    pontos= 0;
    gameEnded= false;
    ship= new Ship(width / 2, height, "ship");
    spawnMeteors= true;
    meteorsCount= 5000;
    meteorsDestroyed= 0;
    countShoot= 0;
    meteorSpeed= 0.3;
    shootDamage= 10;
    missileDamage= 25;
    loadBoss= false;
    shoots= [];
    meteors= [];
    explosions= [];
    missiles= [];
    powerUps= [];
};
const distance= function(x1, y1, x2, y2) {
    let dist= {
        x: Math.abs(x1 - x2),
        y: Math.abs(y1 - y2)
    };
    return Math.sqrt(dist.x ** 2 + dist.y ** 2);
};
const destroy= function() {
    for (let pos in shoots) {
        for (let p in meteors) {
            if (shoots[pos] && meteors[p]) {
                if (distance(shoots[pos].x - 30, shoots[pos].y, meteors[p].x, meteors[p].y + 50)<= 40 && shoots[pos].origin=="ship") {
                    meteors[p].life-= shoots[pos].damage + extraStrength;
                    delete shoots[pos];
                    if (meteors[p].life<= 0) {
                        pontos+= 50;
                        audios.explosion();
                        meteorsDestroyed++;
                        explosions.push(new Explosion(meteors[p].x - 30, meteors[p].y + 50));
                        delete meteors[p];
                    };
                };
            };
        };
        for (let p in missiles) {
            if (shoots[pos] && missiles[p]) {
                if (distance(shoots[pos].x - 30, shoots[pos].y, missiles[p].x, missiles[p].y + 50)<= 50 && shoots[pos].origin=="ship") {
                    missiles[p].life-= shoots[pos].damage + extraStrength;
                    delete shoots[pos];
                    if (missiles[p].life<= 0) {
                        pontos+= 100;
                        audios.explosion();
                        explosions.push(new Explosion(missiles[p].x - 30, missiles[p].y + 50));
                        delete missiles[p];
                    };
                };
            };
        };
        if (loadBoss && shoots[pos]) {
            if (distance(shoots[pos].x - 30, shoots[pos].y, boss.x + 200, boss.y)<= 200 && shoots[pos].origin=="ship") {
                boss.life-= shoots[pos].damage + extraStrength;
                delete shoots[pos];
                if (boss.life<= 0) {
                    pontos+= 200;
                    for (let i= 1;i<= 15;i++) {
                        explosions.push(new Explosion(random(boss.x, boss.x + 431), random(boss.y, boss.y + 265)));
                    };
                    audios.explosion();
                    loadBoss= false;
                    meteorsDestroyed= 0;
                    spawnMeteors= true;
                    missileDamage+= 10;
                    meteorSpeed+= 0.2;
                    spawnCount-= 500;
                };
            };
        };
        if (shoots[pos]) {
            if (distance(shoots[pos].x - 30, shoots[pos].y, ship.x, ship.y)<= 40 && shoots[pos].origin=="boss" && ship.life> 0) {
                ship.life-= shoots[pos].damage;
                delete shoots[pos];
            };
        };
    };
};
const action= function() {
    for (let pos in keys) {
        let actions= {
            ArrowUp: () => ship.y-= 3,
            ArrowDown: () => ship.y+= 3,
            ArrowRight: () => ship.x+= 3,
            ArrowLeft: () => ship.x-= 3,
            k: () => {
                if (keys.k.shoot) {
                    shoots.push(new Shoot(ship.x + 12, ship.y - 5, -5, "ship", "red"));
                    shoots.push(new Shoot(ship.x + 52, ship.y - 5, -5, "ship", "red"));
                    keys.k.shoot= false;
                    shooted++;
                    if (shooted>= 6) {
                        shooted= 0;
                        audios.lazer();
                    };
                };
            }
        };
        if (keys[pos].status && ship.life> 0 && gaming) {
            actions[pos]();
        };
    };
};
const colide= function() {
    for (let pos in meteors) {
        if (meteors[pos]) {
            if (distance(meteors[pos].x + 20, meteors[pos].y + 50, ship.x + 30, ship.y)<= 60 && ship.life> 0) {
                ship.life-= 20;
                explosions.push(new Explosion(meteors[pos].x - 20, meteors[pos].y + 40));
                delete meteors[pos];
                audios.explosion();
            };
        };
    };
    for (let pos in missiles) {
        if (missiles[pos]) {
            if (distance(missiles[pos].x + 20, missiles[pos].y + 50, ship.x, ship.y)<= 120 && ship.life> 0) {
                ship.life-= missiles[pos].damage;
                for (let i= 1;i<= 10;i++) {
                    explosions.push(new Explosion(random(missiles[pos].x - 100, missiles[pos].x + 100), random(missiles[pos].y - 100, missiles[pos].y + 100)));
                };
                delete missiles[pos];
                audios.explosion();
            };
        };
    };
    for (let pos in powerUps) {
        if (powerUps[pos]) {
            if (distance(powerUps[pos].x, powerUps[pos].y, ship.x + 20, ship.y)<= 30) {
                if (powerUps[pos].effect=="strength") {
                    extraStrength+= 2;
                    setTimeout(() => extraStrength-= 2, 10000);
                } else if (powerUps[pos].effect=="life") {
                    ship.life+= 20;
                    if (ship.life> ship.maxLife) ship.life= ship.maxLife;
                };
                powerUps[pos].catched= true;
            };
        };
    };
};
const update= function() {
    context.clearRect(0, 0, width, height);
    ship.draw();
    action();
    destroy();
    colide();
    if (ship.y + 65> height) ship.y= height - 65;
    if (ship.y< 0) ship.y= 0;
    if (ship.x + 65> width) ship.x= width - 65;
    if (ship.x< 0) ship.x= 0;
    for (let pos in meteors) {
        meteors[pos].draw();
        if (meteors[pos].y> height + 100) delete meteors[pos];
    };
    for (let pos in missiles) {
        missiles[pos].draw();
        if (missiles[pos].y> height + 100) delete missiles[pos];
    };
    if (loadBoss) {
        boss.draw();
    };
    for (let pos in shoots) {
        shoots[pos].draw();
        if (shoots[pos].y< -20 || shoots[pos].y> height + 50) delete shoots[pos];
    };
    for (let pos in explosions) {
        explosions[pos].draw();
        if (explosions[pos].delete) {
            delete explosions[pos];
        };
    };
    for (let pos in powerUps) {
        powerUps[pos].draw()
        if (powerUps[pos].catched || powerUps[pos].y>= height + 30) {
            delete powerUps[pos];
        };
    };
    if (!keys.k.shoot) countShoot+= 10;
    if (countShoot>= 150) {
        countShoot= 0;
        keys.k.shoot= true;
    };
    if (spawnMeteors) meteorsCount+= 10;
    if (meteorsCount>= spawnCount) {
        let lastX= 0;
        for (let i= 1;i<= 3;i++) {
            let x= random(0, width - 50);
            let y= random(120, 200);
            if (x>= lastX && x<= lastX + 50) continue;
            meteors.push(new Meteor(x, -y, meteorSpeed));
            lastX= x;
        };
        meteorsCount= 0;
    };
    if (meteorsDestroyed> 20 && spawnMeteors) {
        spawnMeteors= false;
        loadBoss= true;
        boss= new Boss(missileDamage);
    };
    if (meteors.length>= 50) {
        let copy= [];
        for (let pos in meteors) {
            if (meteors[pos]!= undefined) {
                copy.push(meteors[pos]);
            };
        };
        meteors= copy;
    };
    if (shoots.length>= 200) {
        let copy= [];
        for (let pos in shoots) {
            if (shoots[pos]!= undefined) {
                copy.push(shoots[pos]);
            };
        };
        shoots= copy;
    };
    if (missiles.length>= 50) {
        let copy= [];
        for (let pos in missiles) {
            if (missiles[pos]!= undefined) {
                copy.push(missiles[pos]);
            };
        };
        missiles= copy;
    };
    if (explosions.length>= 50) {
        let copy= [];
        for (let pos in explosions) {
            if (explosions[pos]!= undefined) {
                copy.push(explosions[pos]);
            };
        };
        explosions= copy;
    };
    if (powerUps.length>= 10) {
        let copy= [];
        for (let pos in powerUps) {
            if (powerUps[pos]!= undefined) {
                copy.push(powerUps[pos]);
            };
        };
        powerUps= copy;
    };
    powerCount+= 10;
    if (powerCount>= 5000) {
        powerCount= 0;
        let summon= [false, false, false, true, true, false, false][random(0, 6)];
        if (summon) {
            powerUps.push(new PowerUp);
        };
    };
    if (ship.life<= 0 && !gameEnded) {
        gameEnded= true;
        audios.explosion();
        explosions.push(new Explosion(ship.x - 20, ship.y));
        setTimeout(init, 5000);
    };
    if (extraStrength< 0) extraStrength= 0;
    if (spawnCount< 1000) spawnCount= 1000;
    if (pontos> record) record= pontos;
    Pontos.innerHTML="Pontos: " + pontos.toString();
    Record.innerHTML="Record: " + record.toString();
    let hearts= [];
    let x= 10;
    let pos= 1;
    context.fillStyle="rgba(255, 255, 255, 0.8)";
    context.fillRect(0, 0, 225, 55);
    context.fillStyle="gray";
    context.strokeRect(0, 0, 225, 55);
    for (let i= 1;i<= ship.life;i++) {
        hearts[pos]= 0.5;
        if (i % (ship.maxLife / 5)== 0) {
            hearts[pos]= 1;
            pos++;
        };
    };
    for (pos in hearts) {
        if (hearts[pos]== 0.5) {
            context.drawImage(midHeart, x, 10);
        } else if (hearts[pos]== 1) {
            context.drawImage(entireHeart, x, 10);
        };
        x+= 40;
    };
};
document.addEventListener("keydown", (event) => {
    if (keys[event.key]) {
        keys[event.key].status= true;
    };
});
document.addEventListener("keyup", (event) => {
    if (keys[event.key]) {
        keys[event.key].status= false;
    };
});
init();
setInterval(() => {
    if (gaming) update();
}, 10);
