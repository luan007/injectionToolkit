window.$$$wrap$$$ = function () {
    var timeOutEvent=0;
    $$$('body>*').wrapAll('<div id="touchArea"></div>');
    $$$("#touchArea").on({
        touchstart: function(e){
            timeOutEvent = setTimeout(function() {
                timeOutEvent = 0; 
                $$$("#touchArea").addClass('scaled');
                $$$(".duijiao").show();
            },500);
            e.preventDefault();
        },
        touchmove: function(){
            clearTimeout(timeOutEvent);
            $$$(".duijiao").hide();
            $$$("#touchArea").removeClass('scaled');
            timeOutEvent = 0; 
        },
        touchend: function(){
            clearTimeout(timeOutEvent);
            $$$(".duijiao").hide();
            $$$("#touchArea").removeClass('scaled');
            return false; 
        },
        touchcacel: function(){
            clearTimeout(timeOutEvent);
            $$$(".duijiao").hide();
            $$$("#touchArea").removeClass('scaled');
            return false; 
        },
    });
    edge.deploy(projroot, "/templates/scaled.html");
}