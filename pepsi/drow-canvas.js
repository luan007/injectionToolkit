//forked & modified

function __init__() {



    var canvas, world, ctx, ocean, ctx2 = [], bangtx, bang
    var elements = [], bodies = [], floats = []
    var type = [
        document.getElementById("img1"),
        document.getElementById("img2"),
        document.getElementById("img3"),
        document.getElementById("img4"),
        document.getElementById("img5"),
        document.getElementById("img6"),
        document.getElementById("img7"),
        document.getElementById("img8"),
        document.getElementById("img9"),
        document.getElementById("img10"),
        document.getElementById("img11"),
        document.getElementById("img12"),
    ]

    var can = document.getElementById("imgCan")
    var ear = document.getElementById("imgEar")

    var sW = window.innerWidth
    var sH = window.innerHeight

    function time(t, start, end, endless) {
        var duration = end - start
        duration = duration < 0 ? 0 : duration
        var rT = t - start
        rT = rT < 0 ? 0 : rT
        var norm = rT / duration
        if (!endless) {
            norm = norm > 1 ? 1 : norm
        }
        return norm
    }

    function init() {
        canvas = document.getElementById('main-canvas')
        bang = document.getElementById('bang')
        canvas.width = bang.width = sW
        canvas.height = bang.height = sH
        for (var i = 0; i < $(".ocean").length; i++) {
            $(".ocean").get(i).width = (sW);
            $(".ocean").get(i).height = (sH);
            if (i !== $(".ocean").length - 1) {
                $(".ocean").get(i).classList.add("overlay");
            }
            ctx2.push($(".ocean").get(i).getContext('2d'));

        }
        bangtx = bang.getContext('2d')
        ctx = canvas.getContext('2d')
        requestAnimationFrame(loop)
        ctx.lineCap = "round"
    }

    function wave(theta) {
        theta -= 8;
        if (theta < 0) return;
        theta = Math.min(theta, 8);
        theta *= 2;
        var offset = theta * 100 - 200;
        var waveH = 30;
        for (var j = 0; j < ctx2.length; j++) {
            var c = ctx2[j];
            var localoffset = offset - (j) * (theta) * 10;
            c.clearRect(0, 0, sW, sH);
            c.fillStyle = "#313984";
            c.beginPath();
            c.moveTo(0, sH);
            c.lineTo(sW, sH);

            for (var i = 1; i >= -0.2; i -= 1 / 50) {
                var h = Math.sin(theta * 5 + j * 2 + i * 3) * waveH;
                c.lineTo(sW * i, sH - localoffset + h);
            }
            c.lineTo(0, sH);
            c.fill();
            c.closePath();
        }
        if (theta > 8) {
            $(".imgKV").addClass("show");
            $(".glow").addClass("show");
        } else {
            $(".imgKV").removeClass("show");
            $(".glow").removeClass("show");
        }
    }

    var frozen = document.getElementById("frozen");
    function drawCan(t, dt) {
        // if (t > 2) return;
        var rt = edge.easing.easeOutBack(time(t, 0, 0.9), 0, 1, 1, 1)
        //0.9 should be an event
        var rt2 = edge.easing.easeOutQuad(time(t, 0.9, 1.3), 0, 1, 1, 1)
        var rt3 = edge.easing.easeInOutQuad(time(t, 5, 8), 0, 1, 1, 1)
        var rt4 = time(t, 5, 20);
        ctx.save();
        ctx.translate(0, sH - rt * (100 * (1 - rt * 0.3)))
        ctx.rotate((1 - rt) * 0.3)
        if (t > 0.8 && t < 4) {
            ctx.save()
            ctx.rotate(0.4 - rt2 * 0.4)
            ctx.translate(sW / 2, -sW / 4 / ear.width * ear.height * 0.7)
            ctx.drawImage(ear, 0, 0, sW / 4, sW / 4 / ear.width * ear.height);
            ctx.restore()
        }
        ctx.restore();
        naivePhysics(dt, exp);
        ctx.save();
        ctx.translate(0, sH - rt * (100 * (1 - rt * 0.3)) - rt3 * 200 - rt4 * 50)
        ctx.rotate((1 - rt) * 0.3)
        ctx.scale(0.95, 0.95)
        ctx.drawImage(can, 0, 0, sW, sW / can.width * can.height);
        ctx.restore();
        if (t > 5) {
            frozen.classList.remove("freeze")
        } else if (t > 0.9) {
            frozen.classList.add("freeze")
        }
    }

    function naivePhysics(dt, engine, ltx) {
        //well :)
        ltx = ltx || ctx;
        var particles = engine;
        var len = particles.length
        for (var i = 0; i < len; i++) {
            var cur = particles.shift()
            if (cur.x < -100 || cur.x > sW + 100 || cur.y < -100 || cur.y > sH + 100) {
                //remove 
                continue
            }
            cur.vx += cur.ax * dt
            cur.vy += cur.ay * dt
            cur.x += cur.vx * dt
            cur.y += cur.vy * dt
            cur.r += cur.vr * dt
            cur.r = (cur.r > Math.PI * 2) ? (cur.r - Math.PI * 2) : cur.r
            particles.push(cur)
            ltx.save()
            ltx.translate(cur.x, cur.y)
            ltx.rotate(cur.r)
            ltx.translate(-cur.s / 2, -(cur.s / cur.img.width * cur.img.height) / 2)
            ltx.drawImage(cur.img, 0, 0, cur.s, (cur.s / cur.img.width * cur.img.height))
            ltx.restore()
        }
    }

    var time1 = Date.now();
    var time2;
    var T = 0;
    exp = [];
    exp2 = [];
    exp3 = [];

    var cold = 1;
    var lastCi = 20;

    function loop() {
        time2 = Date.now();
        var dt = (time2 - time1) / 1000;
        T += dt;
        time1 = time2;
        var totalT = T - 4;
        if(totalT < 0) return requestAnimationFrame(loop);

        // if (totalT < cold * 2) {
        ctx.clearRect(0, 0, sW, sH);
        // }
        drawCan(totalT, dt);
        if (totalT > 1.5 && totalT <= 4 && Math.random() > 0.6) {
            for (var i = 0; i < (totalT < cold ? 5 : 5); i++) {
                exp.push({
                    img: type[8],
                    x: sW / 2,
                    y: sH,
                    vx: 200 * (1 - Math.random() * 2),
                    vy: -800 * (Math.random() + .5),
                    vr: Math.random() * 10,
                    r: 0,
                    ax: 0,
                    ay: totalT < cold * 2 ? 10 : 980,
                    s: 50 * (Math.random() + 0.5)
                });
            }
        }
        if (totalT > 4) {
            if (lastCi > 0 && Math.random() > 0.8) {
                for (var i = 0; i < 1; i++) {
                    exp.push({
                        img: type[parseInt(Math.random() * type.length)],
                        x: Math.random() * sW,
                        y: sH + 80,
                        vx: 0,
                        vy: (Math.random() + 0.5) * -300,
                        vr: Math.random() * 1,
                        r: 0,
                        ax: 0,
                        ay: 0,
                        s: 50 * (Math.random() + 0.5)
                    });
                }
                for (var i = 0; i < 1 && Math.random() > 0.99; i++) {
                    exp2.push({
                        img: type[parseInt(Math.random() * type.length)],
                        x: Math.random() * sW,
                        y: sH + 80,
                        vx: 0,
                        vy: (Math.random() + 0.5) * -300,
                        vr: Math.random() * 1,
                        r: 0,
                        ax: 0,
                        ay: 0,
                        s: 100 * (Math.random() + 0.5)
                    });
                }
            }
        } else {
            lastCi = 20;
        }


        if (totalT < 13) {
            naivePhysics(dt, exp2);
        }
        else {
            if (exp3.length < 30) {
                exp3.push({
                    img: type[parseInt(Math.random() * type.length)],
                    x: sW / 2 + 20 * (Math.random() - 0.5),
                    y: sH / 2 * 1.4 + 20 * (Math.random() - 0.5),
                    vx: (Math.random() - 0.5) * 600,
                    vy: (Math.random() - 0.5) * 600,
                    vr: (Math.random() - 0.5) * 2,
                    r: 0,
                    ax: 0,
                    ay: 0,
                    s: 30 * (Math.random() + 0.5),
                    fade: 0
                });
            }
        }
        var boost = 2 - edge.easing.easeOutQuad(time(totalT, 13, 15), 1, 1, 1);
        bangtx.clearRect(0, 0, sW, sH);
        naivePhysics(dt * (0.3 + boost * 2), exp3, bangtx);
        wave(totalT);
        requestAnimationFrame(loop);
    }

    init()
}