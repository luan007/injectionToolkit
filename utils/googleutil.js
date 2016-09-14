window.$$$wrap$$$ = function () {
    var j = function () { }

    j.prototype.isIndex = function () {
        return window.location.pathname.trim() == "/" || window.location.pathname.trim().toLowerCase().indexOf("web") >= 0;
    }

    j.prototype.searchResultPage = function () {
        return window.location.pathname.trim() == "/search" || window.location.pathname.trim() == "/search/";
    }

    j.prototype.getKW = function () {
        return $("#lst-ib").val();
    }

    j.prototype.matchKW = function (t) {
        return this.getKW().indexOf(t) > -1;
    }

    j.prototype.regexKW = function (t) {
        return t.test(this.getKW());
    }

    edge.google = new j();
    
    window.googleutil = edge.google;
}