$(document).ready(function() {
    $('.invisibleMemberType').each(function(i, obj) {
        if ($(this).html() == "2") {
            $(this).parent().children(".transactionsRecordMember").css({
                "color": "orange"
            });
            $(this).parent().children(".transactionsRecordPrice").css({
                "color": "orange"
            });
        } else if ($(this).html() == "3") {
            $(this).parent().children(".transactionsRecordMember").css({
                "color": "deepskyblue"
            });
        };
    });
});