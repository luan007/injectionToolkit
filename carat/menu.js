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
            "box-shadow": "rgba(0, 0, 0, 0.4) 0px 7px 15px 2px",
            "transition": "none"
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
            "box-shadow": "rgba(0, 0, 0, .3) 0px 0px 3px 0px"
        });
    };

    d.bind("touchmove", moving);
    d.bind("touchstart", down);
    d.bind("touchend touchcancel", moveDone);
}

window.$$$wrap$$$ = function () {
    edge.deploy(projroot, "/templates/menu.html", function() {
        buildMenu("#edge_menu_bar", 4);
    });
};