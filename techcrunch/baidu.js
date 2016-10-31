window.$$$wrap$$$ = function () {

    function fillScores(dataSet) {
        //key -> arr -> obj
        var result = []
        for (var i in dataSet) {
            for (var j = 0; j < dataSet[i].length; j++) {
                result.push(
                    {
                        key: i,
                        score: 100,
                        obj: dataSet[i][j]
                    }
                );
            }
        }
        return result;
    }

    //deal with all sch data
    for (var i = 0; i < $$$edgeData$$$.schedule.length; i++) {
        var cur = $$$edgeData$$$.schedule[i];
        cur.start = dayhourTotime(cur.date, cur.start_time, 6);
        cur.end = dayhourTotime(cur.date, cur.end_time, 6);
    }

    var iconmap = {
        "speaker": "street-view",
        "investor": "star",
        "schedule": "calendar",
        "company": "rocket",
        "search": "search"
    };


    var scores = {
        speaker: {
            name: 5,
            title: 3,
            desc: 0.5
        },
        investor: {
            name: 5,
            time: 0.5,
            desc: 0.5,
            tags: 0.5
        },
        schedule: {
            name: 5,
            speakers: 3
        },
        company: {
            name: 5,
            products: 5,
            desc: 3
        }
    };


    var suggestion = {
        speaker: {
            name: 5,
            title: 3,
            desc: 0.5
        },
        investor: {
            name: 5,
            time: 0.5,
            desc: 0.5,
            tags: 0.5
        },
        schedule: {
            name: 5,
            speakers: 3
        },
        company: {
            name: 5,
            products: 5,
            desc: 3
        },
        search: {
            name: 300
        }
    };


    var lihaiScore = {
        speaker: {
            name: 3,
            // title: 3,
        },
        investor: {
            name: 3
        },
        schedule: {
            name: 3
        },
        company: {
            name: 5
        }
    };

    function search_all(kw) {
        return search(kw, $$$edgeData$$$, scores);
    }

    function suggestions(kw) {
        return search(kw, $$$edgeData$$$, suggestion);
    }

    function search_match(kw) {
        var res = search(kw, $$$edgeData$$$, lihaiScore, 4);
        return res;
    }

    function hookSuggestion(dataSet, scoreScheme) {
        var elem = $$$("#index-kw");
        if (!elem || elem.length == 0) {
            elem = $$$("#kw");
        }
        var container = $$$(".edge_sug");

        // console.log("!");
        elem.bind("propertychange change click keyup input paste", function (event) {
            // If value has changed...
            if (elem.data('oldVal') != elem.val()) {
                // Updated stored value
                elem.data('oldVal', elem.val());
                var searched = suggestions(elem.val());
                container.children().remove();
                i = 4;
                while (searched.length > 0 && i > 0) {
                    i--;
                    var e = searched.pop();
                    $$$template("sugitem", { type: iconmap[e.key], keyword: e.obj.name }).appendTo(container);
                }
            }
        });
    }

    function index() {

        hookSuggestion();
        particlesJS("particles", {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                },
                "opacity": {
                    "value": 1,
                    "random": false,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.2,
                        "sync": false
                    }
                },
                "size": {
                    "value": 5,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "retina_detect": true
        });

        edge.particlefix('#particles', 500);
        edge.baidu.unbindWeather();
    }


    if (edge.baidu.isIndex()) {
        edge.iconset(edgeroot);
        edge.deploy(projroot, ["templates/common.html", "templates/index.html"], index);
    } else {
        edge.iconset(edgeroot);
        var key = edge.baidu.getKW();
        window.fresult = search_all(key);
        window.gresult = search_match(key);

        if (window.gresult.length == 0) {
            if (window.fresult.length < 3) {
                window.gresult = fresult;
                window.fresult = [];
            }
        }

        if (gresult.length == 0 || gresult.length > 3) {

            if (edge.baidu.regexKW(/(场景|changjing|场景搜索|这里|context|here)/i)) {
                gresult = [];
                fresult = fillScores($$$edgeData$$$);
            }
            else if (edge.baidu.regexKW(/(议程|日程|安排|agenda|schedule|时间)/i)) {
                gresult = [];
                fresult = fillScores({ schedule: $$$edgeData$$$.schedule });
            }
            else if (edge.baidu.regexKW(/(投资|资本|investor|十分|pitch|路演|VC|融资|invest|venture)/i)) {
                gresult = [];
                fresult = fillScores({ investor: $$$edgeData$$$.investor });
            }
            else if (edge.baidu.regexKW(/(演讲|嘉宾|参会|人|VIP)/i)) {
                gresult = [];
                fresult = fillScores({ speaker: $$$edgeData$$$.speaker });
            }
            else if (edge.baidu.regexKW(/(项目|start|up|创业|project|公司|参展)/i)) {
                gresult = [];
                fresult = fillScores({ company: $$$edgeData$$$.company });
            }
        }

        //calculate intersect


        edge.deploy(projroot, ["templates/common.html", "templates/design.html"], hookSuggestion);
    }
};