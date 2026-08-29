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
                    (e.key === 'ArrowRight')) 
                    && this.game.keys.indexOf(e.key) === -1) {
                    this.game.keys.push(e.key);
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
    class Projectile {

    }
    class Particle {

    }
    class Player {
        constructor(game) {
            this.game = game;
            this.width = 120;
            this.height = 190;
            this.x = 20;
            this.y = 100;
            this.speedY = 0;
            this.speedX = 0;

            this.image = new Image();
           this.image.src = 'https://htmlhoster.com/p/V24GS21N/pixil-frame-0.png'
        }

        update() {
            if (this.game.keys.includes('ArrowUp')) {
                this.speedY = -1;
            }
            else if (this.game.keys.includes('ArrowDown')) this.speedY = 1;
            else if (this.game.keys.includes('ArrowRight')) this.speedX = 1;
            else {
                this.speedY = 0;
                this.speedX = 0;
            }
            this.y += this.speedY;
            this.x += this.speedX;
            //if (this.y > 300) this.y = 300;
            //if (this.y < 50) this.y = 50;
        }
        draw(context) {
            const w = this.width * 0.5;
            const h = w * (190/120);
            context.drawImage(this.image, this.x, this.y, w, h);
        }
    }
    class Enemy {

    }
    class Layer {
        constructor(game, image, speedModifier) {
            this.game = game;
            this.image = image;
            this.speedModifier = speedModifier;
            this.width = 1768;
            this.height = 500;
            this.x = 0;
            this.y = 0;
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
    // brain of project
    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.keys = [];
            this.speed = 5;
        }
        update() {
            this.player.update();
            this.background.update();
        }
        draw(context) {
            this.background.draw(context);
            this.player.draw(context);
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
});