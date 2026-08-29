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
    class Sword {
        constructor(game) {
            this.game = game;
            this.width = 100;
            this.height = 100;
            this.x = 300;
            this.y = 150;
        }
        update() {
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
            this.y = 100;
            this.speedY = 0;
            this.speedX = 0;
            this.knockbackCooldown = 0;

            this.image = document.getElementById('player');
        }

        update() {
            // Show sword once scene 2 starts
            if (window.sceneStep >= 1) {
                const sword = document.getElementById('sword');
                sword.style.display = 'block';
                if (window.sceneStep >= 2) {
                    sword.style.left = 300 + 'px';
                    sword.style.top = 150 + 'px';
                    sword.style.height = 100 + 'px';
                    sword.style.width = 100 + 'px';
                }
            }

            // Monster collision check (only during scene 2)
            if (window.sceneStep === 1) {
                const monster = document.getElementById('monster');
                monster.style.display = 'block';
                const monsterX = 400;
                const monsterY = 150;
                const monsterWidth = 100;
                const monsterHeight = 100;

                if (this.knockbackCooldown > 0) this.knockbackCooldown--;

                const touching = this.x < monsterX + monsterWidth &&
                    this.x + this.width > monsterX &&
                    this.y < monsterY + monsterHeight &&
                    this.y + this.height > monsterY;

                if (touching && this.knockbackCooldown === 0) {
                    this.x -= 50;
                    this.knockbackCooldown = 30;
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
            if (this.y > 150) this.y = 150;
            if (this.y < 50) this.y = 50;
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