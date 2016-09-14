window.$$$wrap$$$ = function () {

    var curState = 0;

    setInterval(function () {
        if (Math.random() > 0.8) {
            $$$(".focoRect").css("left", parseInt(Math.random() * 100) + "%")
                .css("top", parseInt(Math.random() * 100) + "%");
        } else if (Math.random() > 0.8) {
            $$$(".focoRect").css("opacity", 0);
        } else {
            $$$(".focoRect").css("opacity", 1);
        }

        if (Math.random() > 0.8) {
            $$$("#iso").html(Math.max(1, Math.pow(2, parseInt(Math.random() * 3))) + "00");
        }
        if (Math.random() > 0.7) {
            $$$(".iconArea").css("opacity", 0.5).css("color", "#effaaa");
        } else {
            $$$(".iconArea").css("opacity", 0.9).css("color", "#fff");;
        }


        if (Math.random() > 0.6) {
            $$$("#lens").css("opacity", 0.8);
        } else {
            $$$("#lens").css("opacity", 0);
        }
        if (Math.random() > 0.8) {
            $$$("#lens").css("transform", "scale(" + (3 + (0.5 - Math.random())) + ") rotate(" + (10 - parseInt(Math.random() * 20)) + "deg)");
        } else {
        }
        if (Math.random() > 0.8) {
            $$$("#lens").css("-webkit-filter", "blur(" + parseInt(Math.random() * Math.random() * 5) + "px)");
        } else {
        }

        if (curState !== 1) {
            $$$("#shutter").css("opacity", 0);
            $$$("#webContent").css("transform", "scale(1) rotate(0deg)");
            $$$("#stationaryLayer").css("transform", "scale(1.2) rotate(0deg)");
        } else {
            $$$("#shutter").css("opacity", 1);
            if (Math.random() > 0.98) {
                $$$("#webContent").css("transform", "scale(" + (1 + (0.5 - Math.random()) * 0.05) + ") rotate(" + (2 - parseInt(Math.random() * 4)) + "deg)");
                $$$("#stationaryLayer").css("transform", "scale(" + (1.2 + (0.5 - Math.random()) * 0.05) + ") rotate(" + (2 - parseInt(Math.random() * 4)) + "deg)");
            }
        }
    }, 100);

    function stage(num) {
        curState = num;
        for (var i = 0; i < 9; i++) {
            $$$("body").removeClass("transition" + i);
        }
        $$$("body").addClass("transition" + num);
    }

    var timeOutEvent = 0;
    $$$('body>*').wrapAll('<div id="webContent"></div>');
    edge.deploy(projroot, "/templates/scaled.html", function () {
        $$$('#webContent, #viewfinder').wrapAll('<div id="touchArea"></div>');
        stage(0);
        $$$("#touchArea").on({
            touchstart: function (e) {
                timeOutEvent = setTimeout(function () {
                    timeOutEvent = 0;
                    stage(1);
                }, 100);
                e.preventDefault();
            },
            touchmove: function () {
                clearTimeout(timeOutEvent);
                stage(0);
                timeOutEvent = 0;
            },
            touchend: function () {
                clearTimeout(timeOutEvent);
                if (curState == 1) {
                    stage(2);
                    setTimeout(function() {
                        stage(3);
                    }, 1000);
                } else {
                    stage(0);
                }
                return false;
            },
            touchcancel: function () {
                clearTimeout(timeOutEvent);
                stage(0);
                return false;
            },
        });
    });
}