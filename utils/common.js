window.$$$wrap$$$ = function () {

    edge.query = function (name, url) {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    edge.has = function (selector) {
        if (Array.isArray(selector)) {
            for (var i = 0; i < selector.length; i++) {
                if ($(selector[i]).length == 0) {
                    return false;
                }
            }
            return true;
        }
        return $(selector).length > 0;
    }

    function isPathAbsolute(path) {
        return /^(:\/|[a-z]+:\/\/)/.test(path);
    }

    edge.root = function (root, path) {
        if (isPathAbsolute(path)) {
            return path;
        }
        if (path.indexOf('/') != 0) {
            path = "/" + path;
        }
        return root + path;
    }

    edge.style = function (path, cb) {
        cb = cb || function () { };
        $("<div></div>").load(path, function () {
            $(this).children("style").appendTo($('body'));
        });
    }

    edge.iconset = function (root) {
        $('<link href="' + root + '/utils/fonts/css/font-awesome.min.css" rel="stylesheet">').appendTo(document.head);
    }

    function mod(t) {
        if (t.attr("addClass")) {
            $(t.html()).addClass(t.attr("addClass"));
        }
        if (t.attr("toggleClass")) {
            $(t.html()).toggleClass(t.attr("addClass"));
        }
        if (t.attr("removeClass")) {
            $(t.html()).removeClass(t.attr("removeClass"));
        }
    }


    function inject(t) {
        if (t.attr("appendTo")) {
            t.children().appendTo(t.attr("appendTo"));
            return;
        }
        if (t.attr("prependTo")) {
            t.children().prependTo(t.attr("prependTo"));
            return;
        }
        if (t.attr("insertBefore")) {
            t.children().insertBefore(t.attr("insertBefore"));
            return;
        }
        if (t.attr("insertAfter")) {
            t.children().insertAfter(t.attr("insertAfter"));
            return;
        }
    }

    function script(t) {
        t.appendTo("body");
    }

    function remove(t) {
        $(t.html()).remove();
    }

    function define(t) {
        var id = t.attr("id");
        if (!id || id.trim() == "") return;
        var template = (t.html());
        if (!window.$$$template$$$) {
            window.$$$template$$$ = {};
        }
        window.$$$template$$$[id] = template;
    }

    function put(t) {
        console.log(t);
    }

    edge.deploy = function (root, path_arr, cb, interval, cur) {
        cb = cb || function () { };
        if (Array.isArray(path_arr)) {
            if (cur == undefined) { cur = 0; }
            if (cur >= path_arr.length) {
                _debug("<" + cur + "> Seq Complete");
                return cb();
            }
            var next = function () {
                edge.deploy(root, path_arr, cb, interval, cur + 1);
            };
            edge._deploy(root, path_arr[cur], next, interval);

        } else {
            return edge._deploy(root, path_arr, cb, interval);
        }
    }


    edge._deploy = function (_r, path, cb, interval) {
        cb = cb || function () { };
        interval = interval || 100;
        console.log(_r, path);
        path = edge.root(_r, path);
        $("<div></div>").load(path, function () {
            var ht = $(this).html();
            ht = ht.replace(/{{root}}/g, _r);
            // _debug(ht);
            var tmpid = 'temp_' + Date.now();
            var d = $("<div id='" + tmpid + "'>" + ht + "</div>");
            // deal with templates
            var templates = d.find("template");
            for (var i = 0; i < templates.length; i++) {
                var cur = $(templates[i]);
                if (cur.parent("#" + tmpid).length > 0) continue;
                var id = cur.attr("id");
                var data = undefined;
                if (cur.html().trim().length > 0) {
                    try {
                        data = JSON.parse(cur.html());
                    } catch (e) {
                        _debug("[X] Inline Template  - Failed to Parse Data");
                        _debug(e);
                    }
                    if (!data) {
                        //run ..
                        try {
                            data = eval(cur.html());
                        } catch (e) {

                        }
                    }
                }
                var tmpl = $$$template(id, data);
                if (tmpl) {
                    tmpl.insertAfter(cur);
                } else {
                    _debug("[X] Inline Template  - Failed to load Template > " + id);
                }
                cur.remove();
            }


            var closure = function () {
                var untils = d.children("wait");
                for (var i = 0; i < untils.length; i++) {
                    if (!edge.has(untils[i].innerHTML)) {
                        _debug("Document not ready > " + (untils[i]).innerHTML)
                        return false;
                    } else {
                        untils[i].remove();
                    }
                }

                var all = d.children();
                for (var i = 0; i < all.length; i++) {
                    console.log(all[i]);
                    switch (all[i].tagName) {
                        case 'INJECT':
                            inject($(all[i]));
                            break;
                        case 'INSERT':
                            inject($(all[i]));
                            break;
                        case 'DEFINE':
                            define($(all[i]));
                            break;
                        case 'TEMPLATE':
                            define($(all[i]));
                            break;
                        case 'MOD':
                            mod($(all[i]));
                            break;
                        case 'REMOVE':
                            remove($(all[i]));
                            break;
                        case 'SCRIPT':
                            script($(all[i]));
                            break;
                        case 'STYLE':
                            script($(all[i]));
                            break;
                    }
                }

                _debug("<*> " + path);
                cb();
                return true;
            }
            tryUntil(closure, interval);
        });
    }


    window.$$$template = function (id, data) {
        data = data || {};
        if (!window.$$$template$$$ || !window.$$$template$$$[id]) return;
        var tmp = window.$$$template$$$[id];
        for (var i in data) {
            while (tmp.indexOf("{{" + i + "}}") >= 0) {
                tmp = tmp.replace("{{" + i + "}}", !((data[i] == null) || (data[i] == undefined)) ? data[i] : "");
            }
        }
        return $$$(tmp);
    }
}


