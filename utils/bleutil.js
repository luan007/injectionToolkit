window.$$$wrap$$$ = function() {

    var j = function () { }

    j.prototype.controlLight = function (r, g, b, bt) {
        r = parseInt(r) + "";
        g = parseInt(g) + "";
        b = parseInt(b) + "";
        $("#lightc").text("发送中...");
        bt = parseInt(bt) + "";
        var a = r + "," + g + "," + b + "," + bt;
        for (var i = a.length; i < 18; i++) {
            a += ",";
        }
        fin = ""
        for (var i = 0; i < a.length; i++) {
            var q = a.charCodeAt(i).toString(16);
            if (q.length < 2) {
                q = "0" + q;
            }
            fin += q;
        }

        $.ajax({
            type: "GET",
            url: "http://192.168.1.1/cgi-bin/l/" + fin,
            data: "",
            contentType: "text/plain; charset=utf-8",
            dataType: "text",
            success: function (data) {
                // Play with returned data in JSON format
                if (data.trim() == "") {
                    setTimeout(function () {
                        controlLight(r, g, b, bt);
                    }, 100);
                } else {
                    $("#lightc").text("灯光控制");
                }
            },
            error: function (msg) {
                setTimeout(function () {
                    controlLight(r, g, b, bt);
                }, 100);
            }
        });
        console.log((fin.length / 2));
        // alert("已发送 (" + fin.length / 2 + ")");
    }


    edge.ble = new j();

}