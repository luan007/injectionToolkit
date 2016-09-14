window.$$$wrap$$$ = function () {
    var j = function () { }

    j.prototype.isIndex = function () {
        return $("body").attr("data-cur-page") == "index";
    }

    j.prototype.getKW = function () {
        return $("#kw").val();
    }

    j.prototype.matchKW = function (t) {
        return this.getKW().indexOf(t) > -1;
    }

    j.prototype.regexKW = function (t) {
        return t.test(this.getKW());
    }

    j.prototype.unbindWeather = function () {
        tryUntil(function () {
            if (!edge.has('#weather')) {
                return false;
            } else {
                // console.log("unbind");
                var el = document.getElementById('weather'),
                    elClone = el.cloneNode(true);

                el.parentNode.replaceChild(elClone, el);
                
                $(".weather-detail").remove();
                $(".weather-shield").remove();
                // $("#weather i").remove();
                return true; //in case..x
            }
        }, 1000);
    }

    edge.baidu = new j();
}