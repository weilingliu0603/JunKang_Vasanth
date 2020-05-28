$(document).ready(function() {
    if ($(".invisibleSuccess").html() == "1") {
        $(".successfullyUpdatedDatabase, .successfullyUpdatedDatabaseText").css({
            "marginTop": "calc(-100vh + 240px)"
        });
        $(".successfullyUpdatedDatabase").animate({
            "width": "0px"
        }, 3000, "linear");
        setTimeout(function() {
            $(".successfullyUpdatedDatabase, .successfullyUpdatedDatabaseText").animate({
                "marginTop": "-1000px"
            }, 500);
        }, 3000);
    };
});