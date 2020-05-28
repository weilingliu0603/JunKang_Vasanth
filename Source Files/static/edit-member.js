$(document).ready(function() {
    $('.invisibleEditMemberTransactionDiscount').each(function(i, obj) {
        if ($(this).html() == "2") {
            $(this).prev().css({
                "color": "orange"
            });
        };
    });
    postValue = $("#invalidText").html().trim();
    if (postValue == "Data successfully updated!") {
        $("#invalidText").css({
            color: "lawngreen",
            marginLeft: "calc(100vw - 830px)"
        });
    };
});