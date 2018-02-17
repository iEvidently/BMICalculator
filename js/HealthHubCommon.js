function TopCallBtnclick(e) {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code === 13) {
        //event.preventDefault ? event.preventDefault() : event.returnValue = false;

        $('#TopbtnSubmit').click();
    }
}
function BottomCallBtnclick(e) {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code === 13) {
        //event.preventDefault ? event.preventDefault() : event.returnValue = false;

        $('#BottombtnSubmit').click();
    }
}
function TopRedirectToSearch() {

    var TextVal = document.getElementById('TopsearchBox').value;
    if (TextVal.length > 0) {
        var url = "/search?k=" + TextVal
        location.href = url;
    }
}
function BottomRedirectToSearch() {

    var TextVal = document.getElementById('BottomsearchBox').value;
    if (TextVal.length > 0) {
        var url = "/search?k=" + TextVal
        location.href = url;
    }
}
//start - master page searc hbutton
// venkat commented: search bar not comming in static page
//function MasterTopSearchclick(e) {
//    var code = e.keyCode ? e.keyCode : e.which;
//    if (code === 13) {
//        //event.preventDefault ? event.preventDefault() : event.returnValue = false;
//        $('#MasterbtnSubmit').click();
//    }
//}

//function MasterTopSearchBtnClick() {

//    var TextVal = document.getElementById('MasterTopsearchBox').value;
//    if (TextVal.length > 0) {
//        var url = "/search?q=" + TextVal
//        location.href = url;
//    }
//}

//function MobileRedirectToSearch() {

//    var TextVal = document.getElementById('searchBoxMobile').value;
//    if (TextVal.length > 0) {
//        var url = "/search?q=" + TextVal
//        location.href = url;
//    }
//}
//end - master page searc hbutton
$(document).ready(function () {
    //Article details page - if image not available then default image to show
    $('.col-md-5 img').error(function () {
        $(this).hide();
    });

    ArticleDefaultImage();
    setAppType();
    var firstLetter = $.trim($('#HHTitle').text()).substring(0, 1).toUpperCase();
    var i = 0;
    while (!validateAlphanumeric(firstLetter)) {
        firstLetter = $.trim($('#HHTitle').text()).substring(0 + i, 1 + i).toUpperCase();
        i++;
    }
    //$(".col-md-3 .letter-box span").html(firstLetter);
    $(".col-md-3 .letter-box").html('<span>' + firstLetter + '</span>');

    //News details page - new link and pdf download link will get hide if no there is no href
    if (document.getElementById('news-view-more-url') !== null) {
        var newsdownloadlink = document.getElementById('news-view-more-url').href;
        if (newsdownloadlink.indexOf('#') >= 0 || newsdownloadlink == 'undefined')
        { document.getElementById('news-view-more-url').style.display = 'none'; }
    }
    if (document.getElementById('news-pdf-down-url') !== null) {
        var newspdfdownurl = document.getElementById('news-pdf-down-url').href;
        if (newspdfdownurl.indexOf('#') >= 0 || newspdfdownurl.indexOf('undefined') >= 0 || newspdfdownurl == 'undefined')
        { document.getElementById('news-pdf-down-url').style.display = 'none'; }
    }

    $('#DCloadmore').attr('href', "/healthhub/persona?k=DISEASES%20&%20CONDITIONS&p=" + $.trim($('#pTitle').text()));
    $('#CFloadmore').attr('href', "/healthhub/persona?k=COSTS & FINANCING&p=" + $.trim($('#pTitle').text()));

    SetRedirection();

    $("#fontSmall").click(function () {
        $("a, p, h3, h4, h5, h6").css("font-size", "1.00em");
    });

    $("#fontLarge").click(function () {
        $("a, p, h3, h4, h5, h6").css("font-size", "1.25em");
    });

    setTimeout(function () {
        if (getUrlVars()["p"] != null) {
            document.getElementById("personatitle").innerHTML = "<h2>" + getUrlVars()["p"].replace(/%20/gi, ' ') + "</h2>";
        }
        if ($("#wikicat").length != 0) { //check whether there's a wikicat before executing this..
            if (getUrlVars()["k"] != null) {
                var cond = getUrlVars()["k"].replace("%20", " ");
                if ($.trim(cond) == "COSTS") {
                    document.getElementById("wikicat").innerHTML = "<h2>COST & FINANCING</h2>";
                }
                else {
                    document.getElementById("wikicat").innerHTML = "<h2>DISEASES & CONDITIONS</h2>";
                }
            }
        }
    }, 1000);
    
    if (textChanger != undefined)
        textChanger.init();

    //var string = string + "<li><a href='#related_link'>Related</a></li>";
    //string = string + "<li><a href='#recommended_link'>Recommended</a></li></ul>";
    //if (document.getElementById("side-nav") !== null) {
    //    document.getElementById("side-nav").innerHTML = string;
    //}
});

function validateAlphanumeric(TCode) {
    if (/[^a-zA-Z0-9]/.test(TCode)) {
        return false;
    }
    return true;
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
}

function LoadGMap() {
    var lat = document.getElementById("lat").innerHTML;
    var lng = document.getElementById("long").innerHTML;
    var link = "https://www.google.com.sg/maps?q=" + lat.trim() + "," + lng.trim()
    var link1 = "http://maps.googleapis.com/maps/api/staticmap?center=" + lat.trim() + "," + lng.trim() + "&zoom=15&size=200x137&maptype=roadmap&markers=color:red%7Clabel:%7C" + lat.trim() + "," + lng.trim() + "&sensor=false";
    document.getElementById("gmap").src = link1;
    document.getElementById("maplink").href = link;
}


function SetValueForFilter(valueToSelect) {
    var element = document.getElementById('filterdropdown');
    element.value = valueToSelect;
}

function SetRedirection() {
    $("#provider-name-redirect-url").attr("href", $('#provider-url').text());
    $("#provider-name-redirect-url-btn").attr("href", $('#provider-url').text());
    $("#provider-image-redirect-url").attr("href", $('#provider-url').text());
    $("#news-view-more-url").attr("href", $('#news-view-url img').attr('src'));
    $("#news-pdf-down-url").attr("href", decodeURIComponent($('#news-download-url img').attr('src')));
    $("#news-pdf-down-url").attr("download", $('#news-download-url img').attr('src'));
    if ($('#android-service-url img').attr('src') != undefined) {
        $("#app-android-service-link").attr("href", $('#android-service-url img').attr('src'));
    }
    else {
        $("#app-android-service-link").hide();
    }

    if ($('#ios-service-url img').attr('src') != undefined) {
        $("#app-ios-service-link").attr("href", $('#ios-service-url img').attr('src'));
    }
    else {
        $("#app-ios-service-link").hide();
    }

    //var img = $("#provider-image-redirect-url").find("img");
    //if (img) {
    //    var imgSrc = $(img).attr("src");
    //    if (imgSrc) {
    //        imgSrc = imgSrc + "?Width=150&Height=85"
    //        $(img).attr("src", imgSrc);
    //    }
    //}

    //var cvimg = $(".bordered-img").find("img");
    //if (cvimg) {
    //    var cvimgSrc = $(cvimg).attr("src");
    //    if (cvimgSrc) {
    //        cvimgSrc = cvimgSrc + "?Width=140&Height=140"
    //        $(cvimg).attr("src", cvimgSrc);
    //    }
    //}

    var mydiv = $('#provider-url');
    var x = $.trim(mydiv.text());
    if (x == "") {
        $('#provider-name-redirect-url').removeAttr("href");
        $('.btn-side.btn-right-arrow').css("display", "none");
        $('#provider-image-redirect-url').removeAttr("href");
    }

    var eventsPREmailId = $('.eventsPREmailId');
    var y = $.trim(eventsPREmailId.text());
    if (y == "") {
        $('.eventsPREmail').css("display", "none");
    } else {
        $(".eventsPREmailId").wrap("<a href='mailto:" + y + "'></a>");
    }

    var eventsPRPhoneNo = $('.eventsPRPhoneNo');
    var z = $.trim(eventsPRPhoneNo.text());
    if (z == "") {
        $('.eventsPRPhone').css("display", "none");
    } else {
        $(".eventsPRPhoneNo").wrap("<a href='tel:" + z + "'></a>");
    }
}


function setAppType() {

    var typeOfApp = $("#type-of-app").text().trim();
    if (typeOfApp !== null) {
        var pos = typeOfApp.toString().indexOf("WEB APP");

        if (pos != -1) {
            $("#web-type").show();
            $("#mobile-app").hide();
        }
        var mpos = typeOfApp.toString().indexOf("MOBILE APP");
        if (mpos != -1) {
            $("#web-type").hide();
            $("#mobile-app").show();
        }
        var mobile = typeOfApp.toString().indexOf("MOBILE APP");
        var web = typeOfApp.toString().indexOf("WEB APP");
        if (mobile != -1 && web != -1) {
            $("#web-type").show();
            $("#mobile-app").show();
        }
    }

}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function PrepareNativeMobileView() {
    $('#smartbanner, #smartbanner.android').hide();
    $('.global-logo-bar').hide();
    $('.global-footer').hide();
    $('.signup.add-text').hide();
    $('.signup.box').hide();
    $('.rounded-content-frame__footer').hide();
    $('#main').css({ "background": "none", "padding": "0" });
    $('#main').css({ "margin-top": "5px", "padding": "0" });
    $('.login-main').css("padding", "0 ");
    $('.captcha-img-block').css("width", "70%");
    $('.popup-holder .box').css("width", "90%");
    $('.popup-holder .holder').css("padding", "0");
    $('.join-form-area').css("padding", "24px 0px 24px");
}

function DisableRelatedEvents() {
    var tab01 = document.getElementById("tab02");
    var tab02 = document.getElementById("tab04");
    var x = $("#tab02").html().indexOf('related-links');
    var y = $("#tab04").html().indexOf('partner-links inner blue');
    if ($("#tab02").html().indexOf('related-links') == -1 && $("#tab04").html().indexOf('partner-links inner blue') == -1) {
        $("#box05").hide();
    } else {
        $("#box05").show();
    }
    if ($("#tab02").html().indexOf('related-links') > -1) {
        $("#liEvents").show();
        $("#tab02").addClass("tab active");
    }
    else {
        $("#liEvents").hide();
    }
    if ($("#tab04").html().indexOf('partner-links inner blue') > -1) {
        $("#lia-Z").show();
        $("#tab04").addClass("tab active");
    }
    else {
        $("#lia-Z").hide();
    }
}

function DisableRelatednews() {
    if (document.getElementById("RelatedSection") !== null && document.getElementById("RelatedNews") !== null) {
        if ($("#RelatedNews").html().indexOf('date-box') > -1) {
            $("#RelatedSection").show();
        }
        else {
            $("#RelatedSection").hide();
        }
    }
}

function DisableRelatedApps() {
    var x = document.getElementById("tab02Apps");;
    var y = document.getElementById("tab03Events");
    var z = document.getElementById("tab04Atoz");

    if ($("#tab03Events").html().indexOf('related-links') == -1 && $("#tab02Apps").html().indexOf('apps-lst') == -1 && $("#tab04Atoz").html().indexOf('partner-links inner blue') == -1) {
        $("#box05").hide();
    } else {
        $("#box05").show();
    }

    if ($("#tab02Apps").html().indexOf('apps-lst') > -1 && $("#tab03Events").html().indexOf('related-links') > -1 && $("#tab04Atoz").html().indexOf('partner-links inner blue') == -1) {
        //apps-list          
        $("#liApps").show();
        $("#liApps").addClass("active");
        $("#tab02").addClass("tab active");
        $("#liEvents").show();
        $("#liA-z").hide();

    } else if ($("#tab02Apps").html().indexOf('apps-lst') > -1 && $("#tab03Events").html().indexOf('related-links') == -1 && $("#tab04Atoz").html().indexOf('partner-links inner blue') > -1) {
        //apps-list         
        $("#liA-z").show();
        $("#liEvents").hide();
        $("#liApps").show();
        $("#liApps").addClass("active");
        $("#tab02").addClass("tab active");

    } else if ($("#tab02Apps").html().indexOf('apps-lst') == -1 && $("#tab03Events").html().indexOf('related-links') > -1 && $("#tab04Atoz").html().indexOf('partner-links inner blue') > -1) {

        //events
        $("#liApps").hide();
        $("#liEvents").addClass("active");
        $("#tab03").addClass("tab active");
        $("#liEvents").css({ background: "none" });
        $("#tab02").hide();

    } else if ($("#tab02Apps").html().indexOf('apps-lst') > -1 && $("#tab03Events").html().indexOf('related-links') == -1 && $("#tab04Atoz").html().indexOf('partner-links inner blue') == -1) {
        //apps      
        $("#liA-z").hide();
        $("#liEvents").hide();
        $("#liApps").show();
        $("#liApps").addClass("active");
        $("#tab02").addClass("tab active");

    } else if ($("#tab02Apps").html().indexOf('apps-lst') == -1 && $("#tab03Events").html().indexOf('related-links') > -1 && $("#tab04Atoz").html().indexOf('partner-links inner blue') == -1) {
        //events 
        $("#liA-z").hide();
        $("#liApps").hide();
        $("#liEvents").show();
        $("#liEvents").addClass("active");
        $("#tab03").addClass("tab active");
        $("#liEvents").css({ background: "none" });
        $("#tab02").hide();

    } else if ($("#tab02Apps").html().indexOf('apps-lst') == -1 && $("#tab03Events").html().indexOf('related-links') == -1 && $("#tab04Atoz").html().indexOf('partner-links inner blue') > -1) {

        //atoz     
        $("#liEvents").hide();
        $("#liApps").hide();
        $("#liA-z").show();
        $("#liA-z").addClass("active");
        $("#tab02").hide();
        $("#tab03").hide();
        $("#tab04").addClass("tab active");

    }

}
function DisableRelatedLinksWiki() {

    var x = document.getElementById("tab03Apps");;
    var y = document.getElementById("tab02Events");
    var z = document.getElementById("tab04Atoz");

    if ($("#tab02Events").html().indexOf('related-links') == -1 && $("#tab03Apps").html().indexOf('apps-lst') == -1 && $("#tab04A-z").html().indexOf('partner-links inner blue') == -1) {

        $("#box05").hide();

    } else {
        $("#box05").show();
    }

    if ($("#tab03Apps").html().indexOf('apps-lst') > -1 && $("#tab02Events").html().indexOf('related-links') > -1 && $("#tab04A-z").html().indexOf('partner-links inner blue') == -1) {
        //Events          

        $("#liEvents").show();
        $("#liApps").show();
        $("#liEvents").addClass("active");
        $("#liA-z").hide();
        $("#tab04A-z").hide();
        $("#tab02").addClass("tab active");
        $("#liEvents").css({ background: "none" });


    } else if ($("#tab03Apps").html().indexOf('apps-lst') > -1 && $("#tab02Events").html().indexOf('related-links') == -1 && $("#tab04A-z").html().indexOf('partner-links inner blue') > -1) {
        //Atoz         
        $("#liA-z").show();
        $("#liEvents").hide();
        $("#liApps").show();
        $("#liA-z").addClass("active");
        $("#tab04").addClass("tab active");

    } else if ($("#tab03Apps").html().indexOf('apps-lst') == -1 && $("#tab02Events").html().indexOf('related-links') > -1 && $("#tab04A-z").html().indexOf('partner-links inner blue') > -1) {

        //Atoz  
        $("#liApps").hide();
        $("#liEvents").show();
        $("#liA-z").show();
        $("#tab04").addClass("tab active");


    } else if ($("#tab03Apps").html().indexOf('apps-lst') > -1 && $("#tab02Events").html().indexOf('related-links') == -1 && $("#tab04A-z").html().indexOf('partner-links inner blue') == -1) {
        //apps      
        $("#liA-z").hide();
        $("#liEvents").hide();
        $("#liApps").show();
        $("#liApps").addClass("active");
        $("#tab03").addClass("tab active");
        $("#liApps").css({ background: "none" });
        $("#tab04").hide();
    } else if ($("#tab03Apps").html().indexOf('apps-lst') == -1 && $("#tab02Events").html().indexOf('related-links') > -1 && $("#tab04A-z").html().indexOf('partner-links inner blue') == -1) {
        //events 
        $("#liA-z").hide();
        $("#liApps").hide();
        $("#liEvents").show();
        $("#liEvents").addClass("active");
        $("#tab02").addClass("tab active");
        $("#liEvents").css({ background: "none" });
        $("#tab04").hide();

    } else if ($("#tab03Apps").html().indexOf('apps-lst') == -1 && $("#tab02Events").html().indexOf('related-links') == -1 && $("#tab04A-z").html().indexOf('partner-links inner blue') > -1) {

        //atoz     
        $("#liEvents").hide();
        $("#liApps").hide();
        $("#liA-z").show();
        $("#liA-z").addClass("active");
        $("#tab02").hide();
        $("#tab03").hide();
        $("#tab04").addClass("tab active");

    }

}
function DisableCostAndFinancing() {

    var x = document.getElementById("tab03Apps");;
    var y = document.getElementById("tab02Events");
    var z = document.getElementById("tab04Atoz");

    if ($("#tab02Events").html().indexOf('related-links') == -1 && $("#tab03Apps").html().indexOf('apps-lst') == -1 && $("#tab04A-z").html().indexOf('partner-links inner blue') == -1) {

        $("#related_link").hide();

    } else {
        $("#related_link").show();
    }

    if ($("#tab03Apps").html().indexOf('apps-lst') > -1 && $("#tab02Events").html().indexOf('related-links') > -1 && $("#tab04A-z").html().indexOf('partner-links inner blue') == -1) {
        //Events          

        $("#liEvents").show();
        $("#liApps").show();
        $("#liEvents").addClass("active");
        $("#liA-z").hide();
        $("#tab04A-z").hide();
        $("#tab02").addClass("tab active");
        $("#liEvents").css({ background: "none" });


    } else if ($("#tab03Apps").html().indexOf('apps-lst') > -1 && $("#tab02Events").html().indexOf('related-links') == -1 && $("#tab04A-z").html().indexOf('partner-links inner blue') > -1) {
        //Atoz         
        $("#liA-z").show();
        $("#liEvents").hide();
        $("#liApps").show();
        $("#liA-z").addClass("active");
        $("#tab04").addClass("tab active");

    } else if ($("#tab03Apps").html().indexOf('apps-lst') == -1 && $("#tab02Events").html().indexOf('related-links') > -1 && $("#tab04A-z").html().indexOf('partner-links inner blue') > -1) {

        //Atoz  
        $("#liApps").hide();
        $("#liEvents").show();
        $("#liA-z").show();
        $("#tab04").addClass("tab active");


    } else if ($("#tab03Apps").html().indexOf('apps-lst') > -1 && $("#tab02Events").html().indexOf('related-links') == -1 && $("#tab04A-z").html().indexOf('partner-links inner blue') == -1) {
        //apps      
        $("#liA-z").hide();
        $("#liEvents").hide();
        $("#liApps").show();
        $("#liApps").addClass("active");
        $("#tab03").addClass("tab active");
        $("#liApps").css({ background: "none" });
        $("#tab04").hide();
    } else if ($("#tab03Apps").html().indexOf('apps-lst') == -1 && $("#tab02Events").html().indexOf('related-links') > -1 && $("#tab04A-z").html().indexOf('partner-links inner blue') == -1) {
        //events 
        $("#liA-z").hide();
        $("#liApps").hide();
        $("#liEvents").show();
        $("#liEvents").addClass("active");
        $("#tab02").addClass("tab active");
        $("#liEvents").css({ background: "none" });
        $("#tab04").hide();

    } else if ($("#tab03Apps").html().indexOf('apps-lst') == -1 && $("#tab02Events").html().indexOf('related-links') == -1 && $("#tab04A-z").html().indexOf('partner-links inner blue') > -1) {

        //atoz     
        $("#liEvents").hide();
        $("#liApps").hide();
        $("#liA-z").show();
        $("#liA-z").addClass("active");
        $("#tab02").hide();
        $("#tab03").hide();
        $("#tab04").addClass("tab active");

    }

}
function DisableRelatedPrograms() {
    var x = document.getElementById("tab03Apps");;
    var y = document.getElementById("tab02Events");
    var z = document.getElementById("tab04Atoz");

    if ($("#tab02Events").html().indexOf('related-links') == -1 && $("#tab03Apps").html().indexOf('apps-lst') == -1 && $("#tab04Atoz").html().indexOf('partner-links inner blue') == -1) {

        $("#box05").hide();

    } else {
        $("#box05").show();
    }

    if ($("#tab03Apps").html().indexOf('apps-lst') > -1 && $("#tab02Events").html().indexOf('related-links') > -1 && $("#tab04Atoz").html().indexOf('partner-links inner blue') == -1) {
        //Events          
        $("#liApps").show();
        $("#liEvents").show();
        $("#liA-z").hide();
        $("#liEvents").addClass("active");
        $("#tab02").addClass("tab active");


    } else if ($("#tab03Apps").html().indexOf('apps-lst') > -1 && $("#tab02Events").html().indexOf('related-links') == -1 && $("#tab04Atoz").html().indexOf('partner-links inner blue') > -1) {
        //apps-list         
        $("#liA-z").show();
        $("#liEvents").hide();
        $("#liApps").show();
        $("#liApps").addClass("active");
        $("#tab03").addClass("tab active");
        $("#liApps").css({ background: "none" });
        $("#tab02").hide();


    } else if ($("#tab03Apps").html().indexOf('apps-lst') == -1 && $("#tab02Events").html().indexOf('related-links') > -1 && $("#tab04Atoz").html().indexOf('partner-links inner blue') > -1) {

        //events
        $("#liApps").hide();
        $("#liA-z").show();
        $("#liEvents").show();
        $("#liEvents").addClass("active");
        $("#tab02").addClass("tab active");


    } else if ($("#tab03Apps").html().indexOf('apps-lst') > -1 && $("#tab02Events").html().indexOf('related-links') == -1 && $("#tab04Atoz").html().indexOf('partner-links inner blue') == -1) {
        //apps      
        $("#liA-z").hide();
        $("#liEvents").hide();
        $("#liApps").show();
        $("#liApps").addClass("active");
        $("#tab03").addClass("tab active");
        $("#liApps").css({ background: "none" });
        $("#tab02").hide();

    } else if ($("#tab03Apps").html().indexOf('apps-lst') == -1 && $("#tab02Events").html().indexOf('related-links') > -1 && $("#tab04Atoz").html().indexOf('partner-links inner blue') == -1) {
        //events 
        $("#liA-z").hide();
        $("#liApps").hide();
        $("#liEvents").show();
        $("#liEvents").addClass("active");
        $("#tab02").addClass("tab active");


    } else if ($("#tab03Apps").html().indexOf('apps-lst') == -1 && $("#tab02Events").html().indexOf('related-links') == -1 && $("#tab04Atoz").html().indexOf('partner-links inner blue') > -1) {

        //atoz     
        $("#liEvents").hide();
        $("#liApps").hide();
        $("#liA-z").show();
        $("#liA-z").addClass("active");
        $("#tab02").hide();
        $("#tab03").hide();
        $("#tab04").addClass("tab active");
        $("#liA-z").css({ background: "none" });

    }
}

function ArticleDefaultImage() {
    $(".carousel .item").find("img").each(function () {
        imgURL2 = $(this).attr("src");
        if (imgURL2 == "") {
            $(this).attr("src", "/_layouts/15/HealthHub/images/bg-partner-links.gif");
        }
    });
}


//Print function for all detail page
function printDiv(divID) {

    window.print();
}

$(document).ready(function () {
    $('input[placeholder]').on('focus', function () {
        var $this = $(this);
        $this.data('placeholder', $this.prop('placeholder'));
        $this.removeAttr('placeholder')
    }).on('blur', function () {
        var $this = $(this);
        $this.prop('placeholder', $this.data('placeholder'));
    });
});

$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();

    $('.change-pass a').click(function () {
        var href_ = $(this).attr('href');
        if ($(href_).length) {
            $('.overlay-section.fpwd').show();
            $('body').addClass('fixed');
            $(href_).stop().animate({
                top: '150px'
            }, 500);
        }
        return false;
    });
    $('.popup-holder .btn-cancel').click(function () {
        $('.overlay-section.fpwd').hide();
        $('body').removeClass('fixed');
        $(this).closest('.overlay-holder').stop().animate({
            top: '-600px'
        }, 1500);
        return false;
    });
});

$(document).ready(function () {
    $('ul.information-add-lst .txt-box .holder p').dotdotdot();

    $(".related-nav ul.add-nav-section li:first-child").addClass("active");
    var m = 1;
    $(".related-nav .tab-holder .tab").each(function (index) {
        if (!($(this).text().trim())) {
            $(this).remove();
        }
        $(".related-nav .tab-holder .tab:first-child").addClass('active');
        m++;
    });


    $(".page-holder nav.tab-nav-article ul > li > a").click(function () {
        $('ul.information-add-lst .txt-box .holder p').dotdotdot();
    });

    $('ul.information-add-lst .txt-box .txt-box-row .text-box-section p').dotdotdot();

    $('ul.slides li .txt-box .holder-txt-box p').dotdotdot();

    $('.partner-links .title-section h3').dotdotdot(); // For For Related Articles.

    $('.myhealth ul.partner-links .title-section h3').dotdotdot(); // For JUST FOR YOU After login.

    $('.deals-list .text-holder .hold h3').dotdotdot();

    //News list pagination issue.
    //$('.allnw-news .pagination-area ul.pagination a:first-child').hide();
    //$('.allnw-news .pagination-area ul.pagination span').css('margin', '0');

    //Hide if no image in detail page.
    var mydiv = $('.bordered-img');
    var x = $.trim(mydiv.html());
    if (x == "") { $('.bordered-img').hide(); }

    //Detail page table responsive.
    $(".info-area.info-box-holder table").wrap("<div class='table-responsivea'></div>");
    $(".info-area.info-box-holder table").addClass('table');
    $(".info-area.info-box-holder table").css({ "overflow-x": "scroll", "display": "block", "border": "none" });
    $(".info-area.info-box-holder table td").css("display", "table-cell");

});

function profileCall() {
    $('.overlay-section').toggle();
    $('.profilebox').toggle();
    $('.overlay-section.fpwd').hide();
    $(".profilebox").css('top', '35px');
}

$(document).click(function (e) {
    if ($('.top-links > li > span > div > a.btn-log').hasClass('active') && $(e.target).closest('.account-area').get(0) == null) {
        $('.top-links > li > span > div > a.btn-log').removeClass('active');
        $('.overlay-section').hide();
        $('#account-box').hide();
        $('.profilebox').hide();
    }

    /*if (!$('.top-links > li > a.user').hasClass('active')) {
       //alert('hide')
       $('.overlay-section').hide();
       $('#account-box').hide();
       $('.profilebox').hide();
   }*/

});

//Clear Profile Local Storage
function ClearMyProfileLocalStorage() {
    sessionStorage.removeItem("hhprofile");
    //console.log("hhprofile is cleared from sessionStorage...");
}

function isLocalStorageNameSupported() {
    var testKey = 'test', storage = window.sessionStorage;
    try {
        storage.setItem(testKey, '1');
        storage.removeItem(testKey);
        return localStorageName in win && win[localStorageName];
    }
    catch (error) {
        return false;
    }
}

$(document).ready(function () {
    $('.ttl-side-box').show();
    $('.info-area .btns-row').show();
    var str = "";
    var i = 1;

    $(".info-area.info-box-holder h2").each(function (index) {
        if ($(this).text().trim() == '') {
            $(this).hide();
        }
    });

    $('.info-area.info-box-holder h2').each(function (index) {

        if ($(this).html().trim() != '') {
            //alert($(this).text())
            if (index == '0') {
                str += '<li class="active filter" onclick=detCont("' + i + '",this)><a href="javascript:void(0)">' + $(this).html() + '</a></li>';
            } else {
                str += '<li class="filter" onclick=detCont("' + i + '",this)><a href="javascript:void(0)">' + $(this).html() + '</a></li>';
            }
            i++;
        }
    })
    $('.az-theme .side-nav.nav').html(str);

    var $elements = $(".info-area.info-box-holder h2");
    $elements.each(function (index) {
        if ($(this).html().trim() != '') {
            $(this).replaceWith('<h2><span>' + $(this).html() + '</span></h2>');
        }
    });

    var j = 1;
    $(".info-area.info-box-holder h2").each(function (index) {
        $(this).nextUntil("h2").andSelf().wrapAll('<div class="box' + j + '">');
        j++;
    });


    //For About us
    var strAbt = "";
    var iAbt = 1;
    $(".about-theme .col-md-9 .content-frame-holder .info-box-holder .content-holder .box .box-ttl h2").each(function (index) {
        if ($(this).text().trim() == '') {
            $(this).hide();
        }
    });
    $('.about-theme .col-md-9 .content-frame-holder .info-box-holder .content-holder .box .box-ttl h2').each(function (index) {
        if ($(this).text().trim() != '') {
            if (index == '0') {
                strAbt += '<li class="active"><a href="#box' + iAbt + '">' + $(this).text() + '</a></li>';
            } else {
                strAbt += '<li><a href="#box' + iAbt + '">' + $(this).text() + '</a></li>';
            }
            iAbt++;
        }
    })
    $('.about-theme .col-md-3 .side-nav.nav').html(strAbt);


    // For Directory side nav
    $("ul.side-icos-lst li").click(function () {
        $("ul.side-icos-lst li").removeClass('active');
        $(this).addClass('active');
    });

    // For About Us side nav
    $(".about-theme .side-nav.nav li").removeClass('active');
    $(".about-theme .side-nav.nav li:first-child").addClass('active');

    $(".global-footer").wrap("<div class='foot'></div>");


    if ($('.logo-organiser-txt a').attr('href') === undefined) {
        $(".logo-organiser-txt a").hover(function () {
            $(this).css({ "text-decoration": "none", "cursor": "text" });
        });
    }

    // For Latest Deals page % symbol
    $('.information-list.latest-deals .add-box .text').each(function () {
        var p = $(this);
        p.html(p.text().replace('%', '<sup>%</sup>'));
    });

});


function detCont(id, el) {
    //$("html, body").css("overflow-x", "initial");
    //$("html, body").css("overflow-x", "static");
    $('.filter').removeClass('active');
    $(el).addClass('active');
    $('html, body').animate({
        scrollTop: $($('.box' + id)).offset().top
    }, 500);
}

//For Deals
window.onload = function () {
    var strDeals = "";
    var iDeals = 1;
    var newid = 1;
    $(".deals-listing .col-md-9 .content-frame-holder .info-box-holder .content-holder .box .box-ttl h2").each(function (index) {
        if ($(this).text().trim() == '') {
            $(this).hide();
        }
    });
    $(".deals-listing .col-md-9 .content-frame-holder .info-box-holder .content-holder .box .box-ttl h2").each(function (index) {
        if ($(this).text().trim() != '') {
            if (window.location.hash.substr(1) == $(this).text() && window.location.hash.substr(1) != "") {
                strDeals += '<li class="active filter" onclick=detConts("' + iDeals + '",this)><a href="#' + $(this).text() + '">' + $(this).text() + '</a></li>';
                newid = 2;
            } else {
                strDeals += '<li class="filter" onclick=detConts("' + iDeals + '",this)><a href="#' + $(this).text() + '">' + $(this).text() + '</a></li>';
            }
            iDeals++;
        }
    });
    $(".deals-listing .col-md-3 .side-nav.nav").html(strDeals);
    $(".deals-listing .col-md-9 .content-frame-holder .info-box-holder .content-holder .box .box-ttl h2").each(function (index) {
        if ($(this).text().trim() != '') {
            if (window.location.hash.substr(1) == "") {
                $(".deals-listing .side-nav.nav li:first-child").addClass('active');
            }
        }
    });
}
function detConts(id, el) {
    $('.filter').removeClass('active');
    $(el).addClass('active');
}
