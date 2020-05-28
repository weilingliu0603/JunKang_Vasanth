$(document).ready(function() {
    $(".membersRecord, .membersRecordValues").click(function() {
        if ($(this).find(".membersRecordID").html() != undefined) {
            window.location.replace(window.location.href.split("/")[0] + "edit-member?id=" + $(this).find(".membersRecordID").html());
        };
    });
    $(".membersRecordMembership").each(function(i, obj) {
        if ($(this).html() == "Gold") {
            $(this).css({
                "color": "orange"
            });
        };
    });
})