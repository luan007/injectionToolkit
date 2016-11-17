

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
        });
    };

    d.bind("touchmove", moving);
    d.bind("touchstart", down);
    d.bind("touchend touchcancel", moveDone);
}

window.$$$wrap$$$ = function () {

    function IsPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
        }
        return flag;
    }

    if(IsPC()) return;

    var res = [
        "templates/menu.html",
        // "templates/index.html"
    ];

    edge.deploy(projroot, res, function () {


             $.get("http://192.168.1.1:2561/mac", function(data) {
                data = data.toString().toUpperCase().trim();
                
                var s = ['90:B6:86:ED:72:1C', '20:82:C0:56:F7:B1', '90:B6:86:D1:9F:40', 'A4:5E:60:DC:E1:11' ];
                var a = ["70:14:A6:63:D6:07", '60:D9:C7:08:EF:4C'];

                if(s.indexOf(data) >= 0) {
                    $(".edgead").get()[0].src = "http://router.network:9999" + "/benz/assets/sclass.mp4";
                } else {
                    $(".edgead").get()[0].src = "http://router.network:9999" + "/benz/assets/aclass.mp4";
                }
             });

        function showMenu() {
            // window.open("http://wifi.lan/", "_blank");
            try{
                $(".edgead").get()[0].webkitRequestFullscreen();
            }catch(e){}
                $(".edgead").get()[0].style.visibility = "visible";
                $(".edgead").get()[0].play();
            
            //   src="{{root}}/assets/aclass.mp4"
         
            // $("#edge-menu-content").addClass("visible");
        }
        function closeMenu() {
            $("#edge-menu-content").removeClass("visible");
        }
        buildMenu("#edge_menu_bar", 4, showMenu);
        // $("#edge-menu-close").click(closeMenu);
    });
};
