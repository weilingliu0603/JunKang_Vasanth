function nameOverlayUp() {
    $("#newMemberFormFieldName").stop().animate({
        "marginLeft": "30px",
        "marginTop": "-78px",
        "color": "white"
    }, 200);
    $("#newMemberFormFieldName").css({
        "zIndex": 2
    });
};

function emailOverlayUp() {
    $("#newMemberFormFieldEmail").stop().animate({
        "marginLeft": "580px",
        "marginTop": "-78px",
        "color": "white"
    }, 200);
    $("#newMemberFormFieldEmail").css({
        "zIndex": 2
    });
};

function phoneOverlayUp() {
    $("#newMemberFormFieldPhone").stop().animate({
        "marginLeft": "30px",
        "marginTop": "20px",
        "color": "white"
    }, 200);
    $("#newMemberFormFieldPhone").css({
        "zIndex": 2
    });
};

function addressOverlayUp() {
    $("#newMemberFormFieldAddress").stop().animate({
        "marginLeft": "580px",
        "marginTop": "20px",
        "color": "white"
    }, 200);
    $("#newMemberFormFieldAddress").css({
        "zIndex": 2
    });
};

function animatingInputOverlay() {
    // New Member Name
    $("#newMemberName").focus(function() {
        $(this).stop().animate({
            "borderTopColor": "1px solid white",
            "borderLeftColor": "1px solid white",
            "borderRightColor": "1px solid white",
            "borderBottomColor": "1px solid white"
        }, 0);
        nameOverlayUp();
    });
    $("#newMemberName").focusout(function() {
        if ($(this).val().length == 0) {
            $("#newMemberFormFieldName").stop().animate({
                "marginLeft": "35px",
                "marginTop": "-53px",
                "color": "#888888"
            }, 200);
            $("#newMemberFormFieldName").css({
                "zIndex": -1
            });
        };
    });
    
    // New Member Email
    $("#newMemberEmail").focus(function() {
        $(this).stop().animate({
            "borderTopColor": "1px solid white",
            "borderLeftColor": "1px solid white",
            "borderRightColor": "1px solid white",
            "borderBottomColor": "1px solid white"
        }, 0);
        emailOverlayUp();
    });
    $("#newMemberEmail").focusout(function() {
        if ($(this).val().length == 0) {
            $("#newMemberFormFieldEmail").stop().animate({
                "marginLeft": "585px",
                "marginTop": "-53px",
                "color": "#888888"
            }, 200);
            $("#newMemberFormFieldEmail").css({
                "zIndex": -1
            });
        };
    });
    
    // New Member Phone
    $("#newMemberPhone").focus(function() {
        $(this).stop().animate({
            "borderTopColor": "1px solid white",
            "borderLeftColor": "1px solid white",
            "borderRightColor": "1px solid white",
            "borderBottomColor": "1px solid white"
        }, 0);
        phoneOverlayUp();
    });
    $("#newMemberPhone").focusout(function() {
        if ($(this).val().length == 0) {
            $("#newMemberFormFieldPhone").stop().animate({
                "marginLeft": "35px",
                "marginTop": "47px",
                "color": "#888888"
            }, 200);
            $("#newMemberFormFieldPhone").css({
                "zIndex": -1
            });
        };
    });
    
    // New Member Email
    $("#newMemberAddress").focus(function() {
        $(this).stop().animate({
            "borderTopColor": "1px solid white",
            "borderLeftColor": "1px solid white",
            "borderRightColor": "1px solid white",
            "borderBottomColor": "1px solid white"
        }, 0);
        addressOverlayUp();
    });
    $("#newMemberAddress").focusout(function() {
        if ($(this).val().length == 0) {
            $("#newMemberFormFieldAddress").stop().animate({
                "marginLeft": "585px",
                "marginTop": "47px",
                "color": "#888888"
            }, 200);
            $("#newMemberFormFieldAddress").css({
                "zIndex": -1
            });
        };
    });
};

function membershipGenderClick() {
    $("#newMemberMembership1, #newMemberMembership2").click(function() {
        $("#newMemberMembership1, #newMemberMembership2").stop().animate({
            "borderTopColor": "1px solid white",
            "borderLeftColor": "1px solid white",
            "borderRightColor": "1px solid white",
            "borderBottomColor": "1px solid white"
        }, 0);
        membershipValue = parseInt($(this).attr("id").substr($(this).attr("id").length - 1, 1));
        $(this).animate({
            "backgroundColor": "#9c5c00",
        }, 200);
        $("#newMemberMembership" + String(parseInt($(this).attr("id").substr($(this).attr("id").length - 1, 1)) % 2 + 1)).animate({
            "backgroundColor": "transparent",
        }, 200);
        $("#membershipGender").val(String(membershipValue) + "/" + $("#membershipGender").val().substr(2, 1));
    });

    $("#newMemberGender1, #newMemberGender2").click(function() {
        genderValue = parseInt($(this).attr("id").substr($(this).attr("id").length - 1, 1));
        $(this).animate({
            "backgroundColor": "#9c5c00",
        }, 200);
        $("#newMemberGender" + String(parseInt($(this).attr("id").substr($(this).attr("id").length - 1, 1)) % 2 + 1)).animate({
            "backgroundColor": "transparent",
        }, 200);
        $("#membershipGender").val($("#membershipGender").val().substr(0, 1) + "/" + String(genderValue));
    });
};

function membershipGenderHover() {
    $("#newMemberMembership1, #newMemberMembership2").hover(function() {
        $(this).animate({
            "backgroundColor": "#9c5c00",
        }, 200);
    }, function() {
        if (parseInt($(this).attr("id").substr($(this).attr("id").length - 1, 1)) != membershipValue) {
            $(this).animate({
                "backgroundColor": "transparent",
            }, 200);
        };
    });

    $("#newMemberGender1, #newMemberGender2").hover(function() {
        $(this).animate({
            "backgroundColor": "#9c5c00",
        }, 200);
    }, function() {
        if (parseInt($(this).attr("id").substr($(this).attr("id").length - 1, 1)) != genderValue) {
            $(this).animate({
                "backgroundColor": "transparent",
            }, 200);
        };
    });
};

function newMemberInputTextHoverAndFocus() {
    $(".newMemberInputText").hover(function() {
        if ($(this).css("borderTopColor") != "rgb(205, 92, 92)") {
            $(this).animate({
                "borderTopColor": "1px solid #9c5c00",
                "borderLeftColor": "1px solid #9c5c00",
                "borderRightColor": "1px solid #9c5c00",
                "borderBottomColor": "1px solid #9c5c00"
            }, 200);
        };
    }, function() {
        if ($(this).css("borderTopColor") != "rgb(205, 92, 92)" && onFocus[$(this).attr("id")] == false) {
            $(this).animate({
                "borderTopColor": "1px solid white",
                "borderLeftColor": "1px solid white",
                "borderRightColor": "1px solid white",
                "borderBottomColor": "1px solid white"
            }, 200);
        };
    });

    $(".newMemberInputText").focus(function() {
        onFocus[$(this).attr("id")] = true
        $(this).animate({
            "borderTopColor": "1px solid #9c5c00",
            "borderLeftColor": "1px solid #9c5c00",
            "borderRightColor": "1px solid #9c5c00",
            "borderBottomColor": "1px solid #9c5c00"
        }, 200);
    });
    $(".newMemberInputText").focusout(function() {
        onFocus[$(this).attr("id")] = false
        $(this).animate({
            "borderTopColor": "1px solid white",
            "borderLeftColor": "1px solid white",
            "borderRightColor": "1px solid white",
            "borderBottomColor": "1px solid white"
        }, 200);
    });
};

// Global Variables
membershipValue = 0;
genderValue = 0;
onFocus = {
    "newMemberName": false, 
    "newMemberEmail": false, 
    "newMemberPhone": false, 
    "newMemberAddress": false
}

$(document).ready(function() {
    animatingInputOverlay();
    membershipGenderClick();
    membershipGenderHover();
    newMemberInputTextHoverAndFocus();
    errorBoxes = $("#invisibleErrorString").html().trim().split("/");
    console.log(errorBoxes);
    boxes = ["#newMemberName", "#newMemberEmail", "#newMemberPhone", "#newMemberAddress", "#newMemberMembership1, #newMemberMembership2", "#newMemberGender1, #newMemberGender2"]
    boxesOverlay = []
    if (errorBoxes.length > 2) {
        for (i in errorBoxes) {
            console.log(boxes[i]);
            if (errorBoxes[i] == "True") {
                $(boxes[i]).animate({
                    "borderTopColor": "1px solid #cd5c5c",
                    "borderLeftColor": "1px solid #cd5c5c",
                    "borderRightColor": "1px solid #cd5c5c",
                    "borderBottomColor": "1px solid #cd5c5c"
                }, 200);
            } else {
                if (boxes[i] == "#newMemberName") {
                    nameOverlayUp();
                } else if (boxes[i] == "#newMemberEmail") {
                    emailOverlayUp();
                } else if (boxes[i] == "#newMemberPhone") {
                    phoneOverlayUp();
                } else if (boxes[i] == "#newMemberAddress") {
                    addressOverlayUp();
                } else if (boxes[i] == "#newMemberMembership1, #newMemberMembership2") {
                    console.log("passs");
                    if ($("#membershipGender").val().substr(0, 1) == "1") {
                        membershipValue = 1;
                        $("#newMemberMembership1").animate({
                            "backgroundColor": "#9c5c00",
                        }, 200);
                        $("#newMemberMembership2").animate({
                            "backgroundColor": "transparent",
                        }, 200);
                    } else {
                        membershipValue = 2;
                        $("#newMemberMembership2").animate({
                            "backgroundColor": "#9c5c00",
                        }, 200);
                        $("#newMemberMembership1").animate({
                            "backgroundColor": "transparent",
                        }, 200);
                    };
                } else {
                    if ($("#membershipGender").val().substr(2, 1) == "1") {
                        genderValue = 1;
                        $("#newMemberGender1").animate({
                            "backgroundColor": "#9c5c00",
                        }, 200);
                        $("#newMemberGender2").animate({
                            "backgroundColor": "transparent",
                        }, 200);
                    } else {
                        genderValue = 2;
                        $("#newMemberGender2").animate({
                            "backgroundColor": "#9c5c00",
                        }, 200);
                        $("#newMemberGender1").animate({
                            "backgroundColor": "transparent",
                        }, 200);
                    };
                };
            };
        };
    };
});