$(document).ready(function () {
    
    var headers = ["H1", "H2", "H3", "H4", "H5", "H6"];
    
    //  $(".accordion p, .accordion div").slideUp("fast");
    //  $(".accordion p, .accordion div").hide();
    
    $(".accordion p, .accordion div").hide();
    $(".accordion").click(function (e) {
        var target = e.target
            , name = target.nodeName.toUpperCase();
    
        console.log("HERE------");
        console.log(name);
        console.log(target);
        console.log($(target).next());
        
        if ($.inArray(name, headers) > -1) {
            var subItem = $(target).next();
            var depth = $(subItem).parents().length;
            var allAtDepth = $(".accordion p, .accordion div").filter(function () {
                if ($(this).parents().length >= depth && this !== subItem.get(0)) {
                    return true;
                }
            });
        
            $(allAtDepth).slideUp("fast");
            
            
            subItem.slideToggle("fast", function () {
                $(".accordion :visible:last").css("border-radius", "0 0 10px 10px");
            });
            $(target).css({
                "border-bottom-right-radius": "0"
                , "border-bottom-left-radius": "0"
            });
        }
    });
});