import { CanvasSpace, Group, Pt, Rectangle, Geom, Util, Const, Triangle } from 'https://cdn.jsdelivr.net/npm/pts@0.12.9/+esm';

const space = new CanvasSpace("#canvas").setup({
    retina: true,
    resize: true
});
const form = space.getForm();

class Leaf extends Pt {
    constructor(...args) {
        super(...args);
        this.color = "#E5AFC2";
        this.scolor = "#D88DA3";
        this.size = Math.random() * 5 + 5;
        this.angle = Math.random() * Math.PI * 2;
        this.dir = (Math.random() > 0.5) ? 1 : -1;
        this.speed = Math.random() * 0.5 + 0.1;
        this.phase = Math.random() * Math.PI * 2;
        this.flipSpeed = Math.random() * 0.05 + 0.02; 
        this.flip = 0; 
    }

    update(time) {
        this.y += this.speed;
        this.x -= (this.speed * 0.5) + Math.sin(time / 500 + this.phase) * 1.0;
        this.angle += this.dir * 0.01;
        this.flip += this.flipSpeed;

        if (this.y > space.height) {
            this.y = -20;
            this.x = Math.random() * space.width + space.width / 2;
        }
    }

    render(form) {
        let widthScale = Math.abs(Math.cos(this.flip));
        
        let rect1 = Rectangle.corners(Rectangle.fromCenter(this, this.size));
        rect1.forEach(p => {
            let rel = p.$subtract(this);
            rel.x *= widthScale; 
            p.to(this.$add(rel));
        });
        rect1.rotate2D(this.angle, this);
        form.fillOnly(this.color).polygon(rect1);

        let rect2 = Rectangle.corners(Rectangle.fromTopLeft(this, this.size));
        rect2.forEach(p => {
            let rel = p.$subtract(this);
            rel.x *= widthScale;
            p.to(this.$add(rel));
        });
        rect2.rotate2D(this.angle, this);
        form.fillOnly(this.scolor).polygon(rect2);
    }
}

let particles = [];

space.add({
    start: (bound) => {
        for (let i = 0; i < 20; i++) {
            particles.push(new Leaf(Math.random() * bound.width + bound.width / 2, Math.random() * bound.height));
        }
    },

    animate: (time, ftime) => {
        particles.forEach(p => {
            p.update(time);
            p.render(form);
        });
    }
});

space.add((time, ftime) => {
    form.fill("#fff").alignText("center");
    form.textBox(space.innerBound, "Happy New Year", "middle", "...");
});

space.bindMouse().bindTouch().play();

document.fonts.ready.then(function () {
    form.ctx.font = '32px "Great Vibes"';
});
