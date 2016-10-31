window.$$$wrap$$$ = function () {
    if (edge.google.isIndex()) {
        edge.deploy(rise, [
            "templates/index.html",
        ]);
    } else if (edge.google.searchResultPage()) {
        
        var dep = [
             "templates/container.html",
             "templates/attendees.html" ,
             "templates/speakers.html" ,
             "templates/investors.html" ,
             "templates/schedule.html" ,
             "templates/download.html" ,
            //  "templates/tracks.html"
        ];
        
        edge.deploy(rise, dep);
    }
}