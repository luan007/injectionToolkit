


window.$$$wrap$$$ = function () {
    if (edge.google.isIndex()) {
        edge.deploy(kc, [
            "templates/index.html",
        ]);
    } else if (edge.google.searchResultPage()) {
        if (edge.google.regexKW(/(schedule)|(program)|(time)|(agenda)/i)) {
            edge.deploy(kc, [
                "templates/schedule.html",
            ]);
        } else if (edge.google.regexKW(/(partner)|(coop)|(corp)|(sponsor)/i)) {
            window.showCat = 1;
            edge.deploy(kc, [
                "templates/partners.html",
            ]);
            window.kw = "";
        } else if (edge.google.regexKW(/(speaker)|(lecture)|(speech)|(parti)/i)) {
            window.showCat = 0;
            edge.deploy(kc, [
                "templates/partners.html",
            ]);
            window.kw = "";
        } else if(edge.google.getKW() && edge.google.getKW().length > 0) {
            var spres = window.spsearch(edge.google.getKW());
            if(spres) {
                window.kw = edge.google.getKW();
                window.spres = spres;
                edge.deploy(kc, [
                    "templates/partners.html",
                ]);
            }
        }
    }
}