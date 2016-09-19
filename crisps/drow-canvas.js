//forked & modified

function __init__() {

    var canvas, world, ctx
    var elements = [], bodies = [], floats = []
    var type = [
        document.getElementById("img1"),
        document.getElementById("img2")
    ]

    var logo = document.getElementById("imglogo")

    var sW = window.innerWidth
    var sH = window.innerHeight
    var first = true

    // 初始化
    function init() {
        var worldAABB
        canvas = document.getElementById('main-canvas')
        canvas.width = sW
        canvas.height = sH
        worldAABB = new b2AABB()
        worldAABB.minVertex.Set(0, -500)
        worldAABB.maxVertex.Set(sW, sH)
        world = new b2World(worldAABB, new b2Vec2(0, 600), true)
        createWall(0.1, sH, sW, 0) // 右
        createWall(sW, 0.1, 0, sH) // 下
        createWall(0.1, sH, 0, 0) // 左
        ctx = canvas.getContext('2d')
        requestAnimationFrame(loop)
        ctx.lineCap = "round"
    }


    window.addEventListener('devicemotion', deviceMotionHandler, false)
    var f // 4s能使用一次摇一摇
    var last_update = 0
    var x, y, z, last_x = 0, last_y = 0, last_z = 0
    var addQueue = 0
    function deviceMotionHandler(eventData) {
        var acceleration = eventData.accelerationIncludingGravity
        var curTime = new Date().getTime()
        if ((curTime - last_update) > 10) {
            var diffTime = curTime - last_update
            last_update = curTime
            x = acceleration.x
            y = acceleration.y
            z = acceleration.z
            var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000
            if (speed > 4000 - elements.length * 20) {
                addQueue += 1
            }
            last_x = x
            last_y = y
            last_z = z
        }
    }

    // pos 用来标识手机左右倾斜的重力
    var pos
    // 判断手机方向
    window.addEventListener('deviceorientation', deviceOrientationHandler, true)
    function deviceOrientationHandler(event) {
        if (event) {
            pos = Math.sin(event.gamma * Math.PI / 180) //<--厉害 看不懂
            switch (true) {
                case event.beta > 10 && event.beta < 24:
                    // speed(2000)
                    break
                case event.beta > 25 && event.beta < 34:
                    // speed(1300)
                    break
                case event.beta > 35 && event.beta < 54:
                    // speed(900)
                    break
                case event.beta > 75:
                    // speed(600)
                    break
            }
        }
    }


    function create() {
        var vW = (Math.random() * 30 + 20)
        var vH = (Math.random() * 30 + 20)
        createReact(vW >> 1, vH >> 1, rd(vW >> 1, sW - vW), -80)
        var rdType = type[rd(0, type.length - 1)]
        var scale = rd(9, 10) / 10
        elements.push({
            img: rdType,
            width: rdType.width * scale,
            height: rdType.height * scale
        })
    }



    // 创建墙
    function createWall(width, height, x, y) {
        var wall, BodyDef = new b2BodyDef()
        wall = new b2BoxDef()
        wall.density = 0
        wall.restitution = 0.9
        wall.friction = 0
        wall.extents.Set(width, height); // 定义矩形高、宽
        BodyDef.position.Set(x, y); // 设置物体的初始位置
        BodyDef.AddShape(wall)
        world.CreateBody(BodyDef)
    }



    // 创建薯片
    function createReact(width, height, x, y) {
        var react, BodyDef = new b2BodyDef()
        react = new b2BoxDef()
        react.density = 0.01 //for mass
        react.restitution = 0.1
        react.friction = 0.3
        react.extents.Set(width, height); // 定义矩形高、宽
        // BodyDef.linearVelocity.Set(Math.random() * 400 - 200, Math.random() * 400 - 200)// 随机初速度
        BodyDef.position.Set(x, y) // 设置物体的初始位置
        BodyDef.angularDamping = 0.02
        BodyDef.angularVelocity = Math.random() * 50
        BodyDef.AddShape(react)
        bodies.push(world.CreateBody(BodyDef))
    }

    function reset() {
        if (bodies) {
            for (i = 0; i < bodies.length; i++) {
                var body = bodies[i]
                world.DestroyBody(body)
                body = null
            }
        }
        bodies = []
        elements = []
    }

    function easeInOutCubic(t, b, c, d) {
        d = d || 1
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    }

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

    function drawRing(t, dt) {
        //blow
        if (t >= 0 && t <= 2) {
            var deg = easeInOutCubic(time(t, 0, 2), 0, 2)
            ctx.save()
            // ctx.globalCompositeOperation = 'overlay'
            ctx.beginPath()
            ctx.strokeStyle = "rgba(255, 255, 255, " + deg + ")"
            ctx.lineWidth = deg * 10
            ctx.translate(sW / 2, sH / 2)
            ctx.arc(0, 0, deg * 20 + 30, 0, deg * Math.PI, false)
            ctx.stroke()
            ctx.restore()
        }
        if (t > 2 && t <= 4) {
            var lt = 2 - easeInOutCubic(time(t, 2, 3), 0, 2)
            ctx.save()
            // ctx.globalCompositeOperation = 'overlay'
            ctx.beginPath()
            ctx.strokeStyle = "rgba(255, 255, 255, " + lt / 2 + ")"
            ctx.lineWidth = lt * 10
            ctx.translate(sW / 2, sH / 2)
            ctx.arc(0, 0, 2 * 20 + 30, 0, 2 * Math.PI, false)
            ctx.stroke()
            ctx.restore()
        }
        if (t >= 0.2 && t <= 3) {
            for (var i = 0; i < 1; i += 1 / 40) {
                var rt = time(t, 0.2 + i * 0.8, 0.7 + i * 1.5)
                if (rt <= 0 || rt >= 1) continue;
                ctx.strokeStyle = "rgba(255, 255, 255, " + rt + ")"
                ctx.save()
                ctx.translate(sW / 2, sH / 2)
                ctx.rotate(i * Math.PI * 2)
                ctx.lineWidth = rt * 3
                ctx.beginPath()
                ctx.moveTo(0, 50 + easeInOutCubic(rt, 0, 1) * 100)
                ctx.lineTo(0, 50 + rt * 100)
                ctx.stroke()
                ctx.restore()
            }
        }
        if (t > 0) {
            ctx.save()
            ctx.translate(sW / 2, sH / 2)
            for (var i = 0; i < 20; i++) {
                var deg = easeInOutCubic(time(t, 2 + i / 10, 5 + i / 10), 0, 1)
                var s = deg * 1200
                ctx.beginPath()
                ctx.fillStyle = i % 2 == 0 ? "#fff" : "rgb(255, 209, 31)"
                ctx.arc(0, 0, s, 0, 2 * Math.PI, false)
                ctx.fill()
            }
            ctx.restore()
        }
        if (t > 5) {
            var deg = 1 - Math.sqrt(easeInOutCubic(time(t, 5, 7), 0, 1))
            drawChips(dt * (1 + deg * 10))
        }
        if (t > 1.5) {
            ctx.save()
            var deg = easeInOutCubic(time(t, 2, 7), 0, 1)
            var s = deg * deg * 200
            ctx.translate(sW / 2 - s * 1.2 / 2, sH / 2 - s / 2)
            ctx.drawImage(logo, 0, 0, s * 1.2, s)
            ctx.restore()
        }
    }

    var MAX_CHIPS = 50
    var MIN_INTERVAL = 100
    var lastChip = Date.now()
    function drawChips(dt) {
        ctx.save()
        //push & pop ops
        var len = floats.length
        //custom physics
        if (len < MAX_CHIPS && Date.now() - lastChip > MIN_INTERVAL) {
            lastChip = Date.now()
            floats.push({
                x: Math.random() * sW,
                y: sH + 100,
                a: 0,
                va: 5 * (Math.random() - 0.5),
                vx: 10 * (Math.random() - 0.5),
                vy: -Math.random() * 50 - 50,
                s: Math.random() * 100 + 30,
                img: type[rd(0, type.length - 1)]
            })
        }

        for (var i = 0; i < len; i++) {
            var cur = floats.shift()
            if (cur.x < -100 || cur.x > sW + 100 || cur.y < -100) {
                //remove 
                continue
            }
            cur.x += cur.vx * dt
            cur.y += cur.vy * dt
            cur.a += cur.va * dt
            cur.a = (cur.a > Math.PI * 2) ? (cur.a - Math.PI * 2) : cur.a
            floats.push(cur)
            ctx.save()
            ctx.translate(cur.x, cur.y)
            ctx.rotate(cur.a)
            ctx.translate(-cur.s / 2, -cur.s / 2)
            ctx.drawImage(cur.img, 0, 0, cur.s, cur.s)
            ctx.restore()
        }
        ctx.restore()
    }

    var time1 = new Date().getTime()
    var animationTime = 0
    function loop() {
        var time2 = new Date().getTime()
        // 手机左右倾斜 添加重力
        var dt = (time2 - time1) / 1000
        world.m_gravity.x = pos * 500
        time1 = time2
        ctx.clearRect(0, 0, sW, sH)
        if (elements.length < 170) {
            while (addQueue > 0) {
                create()
                addQueue--
            }
        } else {
            animationTime += dt
        }
        world.Step(dt, 10)
        if (animationTime < 4) {
            for (i = 0; i < bodies.length; i++) {
                var body = bodies[i]
                var element = elements[i]
                var left = (body.m_position0.x)
                var top = (body.m_position0.y)
                var rot = body.m_rotation0
                ctx.save()
                ctx.translate(left, top)
                ctx.rotate(rot)
                ctx.translate(-45, -45)
                ctx.drawImage(element.img, 0, 0)
                ctx.restore()
            }
        }
        if (animationTime > 0) {
            drawRing(animationTime, dt)
        }
        return requestAnimationFrame(loop);
    }


    // 随机
    function rd(min, max) {
        var c = max - min + 1
        return Math.floor(Math.random() * c + min)
    }

    init()
}