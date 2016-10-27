
var ctl = {
    flowCtl: 30,
    blurTop: 0
};
function initParticles() {
    var canvas = document.getElementById("maincanvas");
    var canvas2 = document.getElementById("drawcanvas");
    var ctx = canvas.getContext("2d");
    var ctx2 = canvas2.getContext("2d");

    window.addEventListener("resize", resize);
    var global_width, global_height, ratio;

    function resize() {
        ratio = window.devicePixelRatio || 1;
        global_width = window.innerWidth;
        global_height = window.innerHeight;
        canvas.setAttribute("width", global_width * ratio);
        canvas.setAttribute("height", global_height * ratio);
        canvas.style.width = global_width;
        canvas.style.height = global_height;
        canvas2.setAttribute("width", global_width * ratio);
        canvas2.setAttribute("height", global_height * ratio);
        canvas2.style.width = global_width;
        canvas2.style.height = global_height;
        // draw();
    }

    window.flow = [];

    function emitW() {
        flow.push({
            x: -100,
            y: global_height * Math.random(),
            ax: -10,
            ay: 0,
            vx: Math.random() * 500 + 50,
            vy: (Math.random() - 0.5) * 130,
            s: Math.random() * ctl.flowCtl * 0.03 + ctl.flowCtl / 100,
            ro: Math.random() * Math.PI * 30 + 3,
            vr: (Math.random() - 0.5) * 1,
            o: Math.random(),
            vo: Math.random() / 100 + 0.01,
            type: Math.random(),
            entered: false,
            selected: Math.random() > 0.8 ? 1 : 0,
            color: "rgba(" + parseInt(10 + Math.random() * 90)
            + ", " + parseInt(120 + Math.random() * 50)
            + ", " + parseInt(200 + Math.random() * 50) + ", 0.9)"
        });
        flow[flow.length - 1].x -= flow[flow.length - 1].s * 70;
    }

    function inView(o) {
        return o.x > -100 && o.y > -100 && o.x < global_width + 100 && o.y < global_height + 100;
    }

    function update(t) {
        ease_update();
        var len = flow.length;
        for (var i = 0; i < len; i++) {
            var cur = flow.pop();

            if (inView(cur)) {
                cur.entered = true;
            } else if (cur.entered) {
                //kick
                continue;
            }

            cur.vx += cur.ax * t;
            cur.vy += cur.ay * t;
            cur.x += cur.vx * t;
            cur.y += cur.vy * t;
            cur.o += cur.vo * t;
            cur.o = Math.min(1, cur.o);
            cur.ro += cur.vr * t;
            flow.unshift(cur);
        }

        var counter = 0;
        while (counter < ctl.flowCtl && flow.length < ctl.flowCtl * 10) {
            emitW();
            counter++;
        }
    }

    var prev = Date.now();
    function draw() {
        update((Date.now() - prev) / 1000);
        prev = Date.now();
        ctx.save();
        ctx.scale(ratio, ratio);
        ctx.clearRect(0, 0, global_width, global_height);


        ctx2.save();
        ctx2.globalCompositeOperation = "multiply";
        ctx2.scale(ratio, ratio);
        ctx2.clearRect(0, 0, global_width, global_height);
        for (var i = 0; i < flow.length; i++) {
            var c = flow[i];
            ctx.save();
            ctx.translate(c.x, c.y);
            ctx.fillStyle = "rgba(255,255,255," + Math.min(1, c.o * ctl.flowCtl * 0.01) + ")";
            ctx.rotate(c.ro);
            ctx.scale(c.s * c.s * c.s * 70, c.s * c.s * c.s * 70);
            ctx.beginPath();
            ctx.moveTo(0, -1.732);
            ctx.lineTo(-1, 0);
            ctx.lineTo(1, 0);
            ctx.fill();
            ctx.closePath();
            // ctx.fillRect(-c.s / 2, -c.s / 2, c.s, c.s);
            ctx.restore();

            if (c.selected) {
                ctx2.save();
                ctx2.translate(global_width - c.x, c.y);
                ctx2.rotate(c.ro);
                ctx2.scale(c.s * c.s * 20, c.s * c.s * 20);
                // ctx2.fillRect(-5, -5, 10, 10);
                ctx2.beginPath();
                ctx2.fillStyle = c.color;
                ctx2.moveTo(0, -1.732);
                ctx2.lineTo(-1, 0);
                ctx2.lineTo(1, 0);
                ctx2.fill();
                ctx2.closePath();
                ctx2.restore();
            }
        }

        ctx.restore();



        ctx2.restore();

        canvas2.style.filter = "blur(" + ctl.blurTop + "px)";
        canvas2.style.webkitFilter = "blur(" + ctl.blurTop + "px)";

        if (Math.random() > 0.9) {
            console.log("go");
            ease(ctl, "blurTop", Math.random() * 10);
        }

        return requestAnimationFrame(draw);
    }

    resize();


    requestAnimationFrame(draw);
}

window.addEventListener("load", initParticles);