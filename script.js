window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 500;

    class InputHandler {
        constructor(game) {
            this.game = game;
            window.addEventListener('keydown', e => {
                if (((e.key === 'ArrowUp') ||
                    (e.key === 'ArrowDown') ||
                    (e.key === 'ArrowRight') ||
                    (e.key === 'ArrowLeft')) 
                    && this.game.keys.indexOf(e.key) === -1) {
                    this.game.keys.push(e.key)
                }
                console.log(this.game.keys);
            });
            window.addEventListener('keyup', e => {
                if (this.game.keys.indexOf(e.key) > -1) {
                    this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
                }
            });
        }
    }
    class Particle {

    }
    class Player {
        constructor(game) {
            this.game = game;
            this.width = 120;
            this.height = 190;
            this.x = 20;
            this.y = 360;
            this.speedY = 0;
            this.speedX = 0;
            this.knockbackCooldown = 0;

            this.image = document.getElementById('player');
        }

        update() {
     if (window.sceneStep === 2) {
    const monster = document.getElementById('monster');
    const monsterX = 250;
const monsterY = 0;
const monsterWidth = 200;
const monsterHeight = 300;
    const touching = this.x < monsterX + monsterWidth &&
        this.x + this.width > monsterX &&
        this.y < monsterY + monsterHeight &&
        this.y + this.height > monsterY;

    if (touching) {
        monster.style.transform = 'rotate(90deg)';
        monster.style.transition = 'transform 0.5s';
    }
}

            if (this.game.keys.includes('ArrowUp')) this.speedY = -1;
            else if (this.game.keys.includes('ArrowDown')) this.speedY = 1;
            else if (this.game.keys.includes('ArrowRight')) this.speedX = 1;
            else if (this.game.keys.includes('ArrowLeft')) this.speedX = -1;
            else {
                this.speedY = 0;
                this.speedX = 0;
            }
            this.y += this.speedY;
            this.x += this.speedX;
            if (this.y > 360) this.y = 360;
            if (this.y < 200) this.y = 200;

            if (player.x >= 300) {
                setOpacity('sword', 0);
            }
        }
        draw(context) {
            const w = 50;
            const h = w * (190/120);
            context.drawImage(this.image, this.x, this.y, w, h);
        }
        positionx() {
            return this.x;
        }
    }
    class Enemy {

    }
    class Layer {
        constructor(game, image, speedModifier) {
            this.game = game;
            this.image = image;
            this.speedModifier = speedModifier;
            this.width = canvas.width;
            this.height = 500;
            this.x = 0;
            this.y =  this.height - 300;
        }
        update() {
            if (this.x <= -700) this.x = 0;
            else this.x -= this.game.speed * this.speedModifier;
        }
        draw(context) {
            context.drawImage(this.image, this.x, this.y);
            context.drawImage(this.image, this.x + 700, this.y);
        }
    }
    class Background {
        constructor(game) {
            this.game = game;
            this.image1 = document.getElementById('layer1');
            this.layer1 = new Layer(this.game, this.image1, 0.5);
            this.layers = [this.layer1];
        }
        update() {
            this.layers.forEach(layer => layer.update());
        }
        draw(context) {
            this.layers.forEach(layer => layer.draw(context));
        }
    }
    class UI {

    }
    class Sword {
        constructor(game) {
            this.game = game;
            this.width = 100;
            this.height = 100;
            this.x = 100;
            this.y = 380;
            this.image = document.getElementById('sword');
            SetOpacity('sword', 0);
        }
        update() {
    
        }
        draw(context) {
            const w = 25;
            const h = 50;
            ctx.drawImage(this.image, this.x, this.y, w, h);
        }
    }
    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.background = new Background(this);
            this.player = new Player(this);
            this.sword = new Sword(this);
            this.input = new InputHandler(this);
            this.keys = [];
            this.speed = 5;
        }
        update() {
            this.player.update();
            this.background.update();
            this.sword.update();
            this.sword.x = this.player.x + 20;
            this.sword.y = this.player.y + 20;
        }
        draw(context) {
            this.background.draw(context);
            this.player.draw(context);
            this.sword.draw(context);
        }
    }

    const game = new Game(canvas.width, canvas.height);
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update();
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate();
    function SetOpacity( imageid, opacity ) {
        var s= document.getElementById(imageid).style;
        s.opacity = ( opacity / 100 );
        s.MozOpacity = ( opacity / 100 );
        s.KhtmlOpacity = ( opacity / 100 );
        s.filter = 'alpha(opacity=' + opacity + ')';
    }
});