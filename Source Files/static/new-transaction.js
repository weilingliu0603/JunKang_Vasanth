$(document).ready(function() {
    $(".newTransactionInputs").focus(function() {
        $(this).next().css({
            "zIndex": 2
        });
        if ($(this).next().attr("id") != "newTransactionDateText") {
            $(this).next().stop().animate({
                "marginLeft": "135px",
                "marginTop": "-9.5px",
                "color": "white"
            }, 200);
        } else {
            $(this).next().stop().animate({
                "marginLeft": "15px",
                "marginTop": "-9.5px",
                "color": "white"
            }, 200);
        };
        $(this).animate({
            "borderTopColor": "1px solid #9c5c00",
            "borderLeftColor": "1px solid #9c5c00",
            "borderRightColor": "1px solid #9c5c00",
            "borderBottomColor": "1px solid #9c5c00"
        }, 200);
    });
    $(".newTransactionInputs").focusout(function() {
        if ($(this).val() == "") {
            $(this).next().css({
                "zIndex": -1
            });
            if ($(this).next().attr("id") != "newTransactionDateText") {
                $(this).next().stop().animate({
                    "marginLeft": "145px",
                    "marginTop": "17.5px",
                    "color": "rgb(136, 136, 136)"
                }, 200);
            } else {
                $(this).next().stop().animate({
                    "marginLeft": "25px",
                    "marginTop": "17.5px",
                    "color": "rgb(136, 136, 136)"
                }, 200);
            };
        };
        $(this).animate({
            "borderTopColor": "1px solid white",
            "borderLeftColor": "1px solid white",
            "borderRightColor": "1px solid white",
            "borderBottomColor": "1px solid white"
        }, 200);
    });

    $(".newTransactionGuest").click(function() {
        values = $("#newTransactionInvisible1").val().split(",");
        if ($(this).html() == "No") {
            $(this).animate({
                "backgroundColor": "#9c5c00",
                "borderTopColor": "1px solid #9c5c00",
                "borderLeftColor": "1px solid #9c5c00",
                "borderRightColor": "1px solid #9c5c00",
                "borderBottomColor": "1px solid #9c5c00"
            }, 200);
            $(this).html("Yes")
            $("#newTransactionIDText").html("Name");
            $("#newTransactionIDText").css({
                "width": "45px"
            });
            $("#newTransactionInvisible1").html($("#newTransactionInvisible1").html().substr(0, 2) + "1");
            $(".newTransactionMembership, .newTransactionMembershipText").animate({
                "opacity": "0"
            }, 200);
            $(".newTransactionMembership, .newTransactionMembershipText").css({
                "cursor": "default"
            });
            $(".newTransactionDate").animate({
                "width": "460px"
            }, 200);
            $(".newTransactionMembershipText").animate({
                "marginLeft": "615px"
            }, 200);
            values[1] = 1;
        } else {
            $(this).animate({
                "backgroundColor": "transparent",
                "borderTopColor": "1px solid white",
                "borderLeftColor": "1px solid white",
                "borderRightColor": "1px solid white",
                "borderBottomColor": "1px solid white"
            }, 200);
            $(this).html("No")
            $("#newTransactionIDText").html("Member ID");
            $("#newTransactionIDText").css({
                "width": "85px"
            });
            $("#newTransactionInvisible1").html($("#newTransactionInvisible1").html().substr(0, 2) + "0");
            $(".newTransactionMembership").animate({
                "opacity": "1"
            }, 200);
            $(".newTransactionMembership, .newTransactionMembershipText").css({
                "cursor": "pointer"
            });
            $(".newTransactionDate").animate({
                "width": "190px"
            }, 200);
            $(".newTransactionMembershipText").animate({
                "marginLeft": "345px",
                "opacity": "1"
            }, 200);
            values[1] = 0;
        };
        values = values.join();
        $("#newTransactionInvisible1").val(values);
    });

    $(".newTransactionCut, .newTransactionHighlight, .newTransactionPerm, .newTransactionColour, .newTransactionRebonding, .newTransactionTreatment").click(function() {
        if ($(this).css("backgroundColor") == "rgba(0, 0, 0, 0)" || $(this).css("backgroundColor") == "rgba(156, 92, 0, 0)") {
            $(this).animate({
                "backgroundColor": "#9c5c00",
            }, 200);
            values = $("#newTransactionInvisible2").val().split(",");
            values[parseInt($(this).attr("class").substr($(this).attr("class").length - 1, 1)) - 1] = 1;
            values = values.join();
            $("#newTransactionInvisible2").val(values);
        } else {
            $(this).animate({
                "backgroundColor": "transparent",
            }, 200);
            values = $("#newTransactionInvisible2").val().split(",");
            values[parseInt($(this).attr("class").substr($(this).attr("class").length - 1, 1)) - 1] = 0;
            values = values.join();
            $("#newTransactionInvisible2").val(values);
        };
        $(".newTransactionCut, .newTransactionHighlight, .newTransactionPerm, .newTransactionColour, .newTransactionRebonding, .newTransactionTreatment").css({
            "borderColor": "white"
        });
    });

    $("#newTransactionMembershipLeft").animate({
        "backgroundColor": "#9c5c00",
    }, 200);

    $(".newTransactionMembership").click(function() {
        if ($(this).css("backgroundColor") == "rgba(0, 0, 0, 0)" || $(this).css("backgroundColor") == "rgba(156, 92, 0, 0)") {
            $(this).animate({
                "backgroundColor": "#9c5c00",
            }, 200);
            values = $("#newTransactionInvisible1").val().split(",");
            if ($(this).attr("id") == "newTransactionMembershipLeft") {
                $("#newTransactionMembershipRight").animate({
                    "backgroundColor": "transparent",
                }, 200);
                values[0] = 0;
            } else {
                $("#newTransactionMembershipLeft").animate({
                    "backgroundColor": "transparent",
                }, 200);
                values[0] = 1;
            };
            values = values.join();
            $("#newTransactionInvisible1").val(values);
        };
    });

    var errorValues = $("#invisibleErrorValues").val().split(",");
    var tagValues = [".newTransactionDate", ".newTransactionMembership", ".newTransactionGuest", ".newTransactionID", ".newTX2-1", ".newTX2-2", ".newTX2-3", ".newTX2-4", ".newTX2-5", ".newTX2-6", ".newTX2-7", ".newTX2-8", ".newTX2-9"];
    for (i in errorValues) {
        if (errorValues[i] == "True") {
            console.log(errorValues[i], tagValues[i]);
            $(tagValues[i]).css({
                "borderColor": "indianred"
            });
        };
    };

    if ($(".newTransactionDate").val() != "") {
        $(".newTransactionDate").next().css({
            "zIndex": 2
        });
        $(".newTransactionDate").next().stop().animate({
            "marginLeft": "15px",
            "marginTop": "-9.5px",
            "color": "white"
        }, 200);
    };
    if ($(".newTransactionID").val() != "") {
        $(".newTransactionID").next().css({
            "zIndex": 2
        });
        $(".newTransactionID").next().stop().animate({
            "marginLeft": "135px",
            "marginTop": "-9.5px",
            "color": "white"
        }, 200);
    };
    
    var invis1Value = $("#newTransactionInvisible1").val().split(",");
    if (invis1Value[0] == "1") {
        $("#newTransactionMembershipRight").animate({
            "backgroundColor": "rgb(156, 92, 0)",
        }, 200);
        $("#newTransactionMembershipLeft").animate({
            "backgroundColor": "transparent",
        }, 200);
    };
    if (invis1Value[1] == "1") {
        $(".newTransactionGuest").animate({
            "backgroundColor": "#9c5c00",
            "borderTopColor": "1px solid #9c5c00",
            "borderLeftColor": "1px solid #9c5c00",
            "borderRightColor": "1px solid #9c5c00",
            "borderBottomColor": "1px solid #9c5c00"
        }, 200);
        $(".newTransactionGuest").html("Yes")
        $("#newTransactionIDText").html("Name");
        $("#newTransactionIDText").css({
            "width": "45px"
        });
        $(".newTransactionMembership, .newTransactionMembershipText").animate({
            "opacity": "0"
        }, 200);
        $(".newTransactionMembership, .newTransactionMembershipText").css({
            "cursor": "default"
        });
        $(".newTransactionDate").animate({
            "width": "460px"
        }, 200);
        $(".newTransactionMembershipText").animate({
            "marginLeft": "615px"
        }, 200);
    };

    var invis2Value = $("#newTransactionInvisible2").val().split(",");
    for (i in invis2Value) {
        if (invis2Value[i] == "1") {
            $(".newTX2-" + String(parseInt(i) + 1)).animate({
                "backgroundColor": "#9c5c00"
            }, 200);
        };
    };
});