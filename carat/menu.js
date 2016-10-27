function buildMenu(query, padding, showMenu) {
    var d;
    var element = d = $(query);
    padding = padding == undefined ? 4 : padding;
    var w = element.width();
    var h = element.height();
    var moving = false;
    var hw = w / 2;
    var hh = h / 2;
    var posX = 0;
    var posY = 0;
    var targetX = 0;
    var targetY = 0;
    var moving = function (e) {
        moving = true;
        posX = e.changedTouches[0].clientX - hw;
        posY = e.changedTouches[0].clientY - hh;
        d.css({
            // top: e.changedTouches[0].clientY - half,
            // left: e.changedTouches[0].clientX - half,
            "transform": "translateX(" + posX + "px) translateY(" + posY + "px) scale(1.2)",
            "background": "#fff",
            "transition": "background 0.1s ease"
        });
        e.preventDefault();
        return true;
    };
    var down = function (e) {
        moving = false;
        e.preventDefault();
    };
    var moveDone = function (e) {
        if (moving == false) {
            showMenu();
            return;
        }
        moving = false;
        posX = e.changedTouches[0].clientX - hw;
        posY = e.changedTouches[0].clientY - hh;
        if (posY <= window.innerHeight * 0.3) {
            targetY = 0;
            targetX = posX < 0 ? 0 : (posX > window.innerWidth - w ? window.innerWidth - w : posX);
        }
        else if (posY >= window.innerHeight * 0.7) {
            targetY = window.innerHeight - h - padding;
            console.log(h, padding);
            targetX = posX < 0 ? 0 : (posX > window.innerWidth - w ? window.innerWidth - w : posX);
        }
        else if (posX <= window.innerWidth / 2) {
            targetX = 0;
            targetY = posY < 0 ? 0 : (posY > window.innerHeight - h ? window.innerHeight - h : posY);
        } else {
            targetX = window.innerWidth - w - padding;
            targetY = posY < 0 ? 0 : (posY > window.innerHeight - h ? window.innerHeight - h : posY);
        }

        d.css({
            "transform": "translateX(" + targetX + "px) translateY(" + targetY + "px) scale(1)",
            "transition": "all ease 0.5s",
            "background": "rgba(255, 255, 255, 0.9)",
        });
    };

    d.bind("touchmove", moving);
    d.bind("touchstart", down);
    d.bind("touchend touchcancel", moveDone);
}

window.$$$wrap$$$ = function () {
    edge.deploy(projroot, "/templates/menu.html", function () {

        function showMenu() {
            $("#edge-menu-content").addClass("visible");
            ease(ctl, "flowCtl", 40, 0.05);
        }

        function closeMenu() {
            $("#edge-menu-content").removeClass("visible");
            ease(ctl, "flowCtl", 0, 0.01);
        }

        buildMenu("#edge_menu_bar", 4, showMenu);
        $("#edge-menu-close").click(closeMenu);

        initParticles();
    });
};


var ctl = {
    flowCtl: 0
};
function initParticles() {
    var canvas = document.getElementById("edge-particle-bg");
    var ctx = canvas.getContext("2d");

    window.addEventListener("resize", resize);
    var global_width, global_height, ratio;

    function resize() {
        ratio = window.devicePixelRatio || 1;
        global_width = window.innerWidth;
        global_height = window.innerHeight;
        console.log(ratio);
        canvas.setAttribute("width", global_width * ratio);
        canvas.setAttribute("height", global_height * ratio);
        canvas.style.width = global_width;
        canvas.style.height = global_height;
        // draw();
    }

    window.flow = [];

    function emitW() {
        flow.push({
            x: -100,
            y: global_height * Math.random(),
            ax: -10,
            ay: 0,
            vx: Math.random() * 500 + 550,
            vy: (Math.random() - 0.5) * 130,
            s: Math.random() * ctl.flowCtl * 0.02 + ctl.flowCtl / 100,
            ro: Math.random() * Math.PI * 13 + 3,
            vr: (Math.random() - 0.5) * 10,
            o: Math.random(),
            vo: Math.random() / 100 + 0.01,
            type: Math.random(),
            entered: false
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
        while (counter < ctl.flowCtl && flow.length < ctl.flowCtl * 4) {
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
        }

        ctx.restore();
        return requestAnimationFrame(draw);
    }

    resize();
    requestAnimationFrame(draw);
}