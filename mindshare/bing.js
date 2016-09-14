window.$$$wrap$$$ = function () {
    timer = 0;
    document.getElementById("bLogo").src = projroot + "/assets/mindshare_logo.png";
    elem = $$$("#sb_form_q");
    elem.bind("propertychange change click keyup input paste", function (event) {
        // If value has changed...
        if (elem.data('oldVal') != elem.val()) {
            // Updated stored value
            elem.data('oldVal', elem.val());
            var lst = $$$(".sa_drw");
            var tmpl = 
            '<li class="sa_sg sa_sgAS">'+
            '<div class="as_icon"></div>'+
            '<div class="sa_tm">Mindshare Offical Site</div>'+
            '</li>';
            clearTimeout(timer);
            timer = setTimeout(function(){
                $$$(tmpl).click(function(){
                    window.open("http://mindshareworld.com/");
                }).prependTo(lst);
            }, 500);
        }
    });
    edge.deploy(projroot, "/templates/index.html");
};