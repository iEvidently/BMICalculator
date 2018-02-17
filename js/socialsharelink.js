var termTitle;
var clickOption;
var requestManager = Sys.WebForms.PageRequestManager.getInstance();
var facebookInfo = { title: "", itemdesc: "", itemurl: "", itemid: "", coverimgurl: "", listname: "", };

/*Facebook share Javascript code*/
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/all.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

window.fbAsyncInit = function () {
    FB.init({
        appId: sslAppID,
        channelUrl: '//www.groupon.com', // Channel File for x-domain communication
        status: true, // check the login status upon init?
        cookie: true, // set sessions cookies to allow your server to access the session?
        xfbml: true, // parse XFBML tags on this page?
        oauth: true
    });
};

/* Anon user*/
function IsAnonymousUser() {
    var IsAnonymous = sslIsAnonymous;

    if (IsAnonymous == 'True') {
        RecallPopup();
        var fadeInTimer;
        var this_popup = $('div.btns-row').find('.commonLogPoints');

        setTimeout(function () {
            this_popup.fadeIn(450, function () {
                this_popup.animate({
                    bottom: '0'
                }, 500);
            });
        }, 100);

        return true;
    }

    return false;
}

function IsHasVHZAccount() {
    var hasVhzAccount = $("input[type='hidden'][id$='hdnIsVhzUser']").val();
    var hasPromptedForType = $("input[type='hidden'][id$='hdnIsPromptedForType']").val();

    if (hasVhzAccount.toLowerCase() == 'true') {
        return true;
    }
    else if (hasPromptedForType == '' || hasPromptedForType.toLowerCase() == 'false') {
        savePromptForType();
        return false;
    }
    else {
        return true;
    }
}

function showStatus() {
    RecallPopup();
    var fadeInTimer;
    var this_popup = $('div.btns-row').find('.commonLogStatus');

    setTimeout(function () {
        this_popup.fadeIn(450, function () {
            this_popup.animate({
                bottom: '0'
            }, 500);
        });
    }, 100);
}

function assignPoints() {
    var controlId = $("input[type='button'][id$='btnShareLinks']").attr("name");
    doAsyncPostBack(controlId);
}

function assignPointsLanding() {
    var controlId = $("input[type='button'][id$='btnShareLinks']").attr("name");
    doAsyncPostBackLanding(controlId);
}

function savePromptForType() {
    var controlId = $("input[type='button'][id$='btnPrompted']").attr("name");
    $("input[type='hidden'][id$='hdnIsPromptedForType']").val("True");

    requestManager.add_endRequest(endPromptedForTypeSaveRequestHandler);
    __doPostBack(controlId, "");
}

function RecallPopup() {
    $('.btns-row').removeClass('active');
    $('.popup-add-block').fadeOut(400).css('bottom', '-900px');;

    return false;
}

function emailCurrentPage() {
    window.location.href = "mailto:?subject=" + escape(document.title) + "&body=" + escape(window.location.href);
}

function emailPagefromcard(title, itemurl) {
    window.location.href = "mailto:?subject=" + escape(title) + "&body=" + escape(itemurl);
}

function doAsyncPostBack(triggerId) {
    $("input[type='hidden'][id$='hdnTermListItemID']").val($("div[id$='divTermListItemID']").text());
    $("input[type='hidden'][id$='hdnTermTitle']").val(termTitle);
    
    requestManager.add_endRequest(endRequestHandler);
    __doPostBack(triggerId, "");
}

function doAsyncPostBackLanding(triggerId) {
    /*$("input[type='hidden'][id$='hdnTermListItemID']").val(itemid);
   $("input[type='hidden'][id$='hdnTermTitle']").val(termTitle);*/
    requestManager.add_endRequest(endRequestHandler);
    __doPostBack(triggerId, "");
}

function ShareToFacebook(title, itemdesc, itemurl, itemid, coverimgurl, listname) {
    var isPointRequired = encodeURIComponent($("input[type='hidden'][id$='hdnPointRequired']").val());
    $("input[type='hidden'][id$='hdnTermListItemID']").val(itemid);
    $("input[type='hidden'][id$='hdnListName']").val(listname);

    facebookInfo.title = title;
    facebookInfo.itemdesc = itemdesc;
    facebookInfo.itemurl = itemurl;
    facebookInfo.itemid = itemid;
    facebookInfo.coverimgurl = coverimgurl;
    facebookInfo.listname = listname;

    clickOption = 'Facebook';

    if (isPointRequired == "True") {

        if (IsAnonymousUser()) {
            return;
        }

        var IsAnonymous = sslIsAnonymous;
        if (IsAnonymous == 'False' && !IsHasVHZAccount()) {
            return;
        }
    }

    OpenFacebook();
}

function OpenFacebook() {
    var heading = facebookInfo.title;
    var capt = 'Healthhub';
    var desc = facebookInfo.itemdesc;
    var url = facebookInfo.itemurl;
    var finalPict = 'http://fbrell.com/f8.jpg';
    var pict = facebookInfo.coverimgurl;

    if (pict) {
        var fullUrl = new RegExp('^(?:[a-z]+:)?//', 'i');

        if (!fullUrl.test(pict)) {
            pict = location.origin + pict;
        }

        finalPict = pict;
    }
        
    setClosestElementValue('hdnTermTitle', heading);

    // calling the API ...
    var obj = {
        method: 'share',
        name: heading.replace('\\u0027', '\''),
        href: url,
        picture: finalPict,
        caption: capt,
        description: desc.replace('\\u0027', '\''),
        display: 'popup'
    };

    function callback(response) {
        FB.getLoginStatus(function (loginResponse) {
            if (loginResponse && (loginResponse.status === 'connected' || loginResponse.status === 'not_authorized') && response && !response.error_message) {
                assignPointsLanding();
            }
        }, true);
    }

    FB.ui(obj, callback);
}

/*Twitter share Javascript code*/

window.twttr = (function (d, s, id) {
    var t, js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return; js = d.createElement(s); js.id = id;
    js.src = "//platform.twitter.com/widgets.js"; fjs.parentNode.insertBefore(js, fjs);
    return window.twttr || (t = { _e: [], ready: function (f) { t._e.push(f) } });
}(document, "script", "twitter-wjs"));

if (twttr != undefined) {
    twttr.ready(function (twttr) {
        //twttr.events.bind('tweet', reward_user);
        if (window.addEventListener) {
            window.addEventListener('message', reward_user, false);
        }
        else if (window.attachEvent) {
            window.attachEvent('onmessage', reward_user);
        }
    });
}

/* end of Twitter Share  */

function reward_user(event) {
    /* reset both the a tag */
    if (event) {
        if (event.origin == 'https://twitter.com') {
            $("#TwitterShare").attr("href", "javascript:void(0);");
            $("#linkShareWithOutPoints").attr("href", "javascript:void(0);");

            if (event.data) {
                var response = JSON.parse(event.data);
                var method = response.method;
                var params = response.params[0];
                if (method == 'trigger' && params == 'tweet') {
                    assignPoints();
                }
            }
        }
    }
}

function getShareCounts() {
    /*jQuery.getJSON('http://urls.api.twitter.com/1/urls/count.json?url=' + window.location.href + '/&callback=?',
    function (data) {
        $('#twttrCount').text(data.count);
    });

    jQuery.getJSON('http://graph.facebook.com/?id=' + window.location.href,
    function (data) {
        $('#fbCount').text(data.shares);
    });*/
}

function initializeEvents() {
    termTitle = $.trim($("div[id$='divTermTitle']").text());
    var isPointRequired = encodeURIComponent($("input[type='hidden'][id$='hdnPointRequired']").val());

    $("#HealthhubSignIn").click(function () {
        var secureUrl = sslSecureUrl;

        window.location.href = secureUrl + "/membership/login?returnUrl=" + window.location.href.replace(_spPageContextInfo.siteAbsoluteUrl, '');
    });

    $("#linkShareWithOutPoints")
        .unbind('click')
        .click(function () {
            RecallPopup();

            if (clickOption) {
                if (clickOption == 'Facebook') {
                    $(this).attr("href", "javascript:void(0);");
                    OpenFacebook();
                }
                else if (clickOption == 'Twitter') {
                    $(this).attr("href", "https://twitter.com/intent/tweet?url=" + encodeURIComponent(window.location.href) + "&text=" + encodeURIComponent(termTitle));
                }
            }
        });

    $("#linkShareWithOutPointsNric")
        .unbind('click')
        .click(function () {
            RecallPopup();

            if (clickOption) {
                if (clickOption == 'Facebook') {
                    $(this).attr("href", "javascript:void(0);");
                    OpenFacebook();
                }
                else if (clickOption == 'Twitter') {
                    $(this).attr("href", "https://twitter.com/intent/tweet?url=" + encodeURIComponent(window.location.href) + "&text=" + encodeURIComponent(termTitle));
                }
            }
        });

    //$("#TwitterShare")
    //    .unbind('click')
    //    .click(function () {
    //        RecallPopup();

    //        clickOption = 'Twitter'
    //        $(this).attr("href", "https://twitter.com/intent/tweet?url=" + encodeURIComponent(window.location.href) + "&text=" + encodeURIComponent(termTitle));
    //    });
}

function endRequestHandler(sender, args) {
    var statusCode = encodeURIComponent($("input[type='hidden'][id$='hdnStatus']").val());
    var statusMsg = encodeURIComponent($("input[type='hidden'][id$='hdnStatusMessage']").val());
    var ptsEarned = encodeURIComponent($("input[type='hidden'][id$='hdnPointsEarned']").val());

    if (statusCode == "0") {
        //$('#earnStatus').focus();
        if ($.trim(ptsEarned) == "0") {
            $('#earnStatus, .socialschare-earnstatus-message').html('<span>' + statusMsg + '</span><br/><br/>');
        }
        else {
            $('#earnStatus, .socialschare-earnstatus-message').html('<span>Thank you for sharing!</span><br/><span>You have earned</span><br/><span class="">' + ptsEarned + ' <span class="fa fa-heart"></span></span><br/><br/>');
        }
        showStatus();
    }
    else if (statusCode == "1") {
        //$('#earnStatus').focus();

        $('#socialLinkViewMyActivity, .socialshare-view-myactivity').hide();
        $('#earnStatus, .socialschare-earnstatus-message').html('<span>Thank you for sharing!</span><br/><br/>');
        showStatus();
    }
    else if (statusCode == "2") {
        $('#socialLinkViewMyActivity, .socialshare-view-myactivity').hide();
        $('#earnStatus, .socialschare-earnstatus-message').html('<span>Thank you for sharing!</span><br/><br/>');
        showStatus();
    }
    else if (statusCode == "3") {
        $('#earnStatus, .socialschare-earnstatus-message').html('<span>' + statusMsg + '</span><br/><br/>');
        showStatus();
    }
    else {
        $('#socialLinkViewMyActivity, .socialshare-view-myactivity').hide();
        $('#earnStatus, .socialschare-earnstatus-message').html('<span>Thank you for sharing!</span><br/><br/>');
        showStatus();
    }

    requestManager.remove_endRequest(endRequestHandler);
    initializeEvents();
    getShareCounts();
}

function endPromptedForTypeSaveRequestHandler(sender, args) {
    RecallPopup();
    var this_popup = $('div.btns-row').find('.commonLogNric');

    setTimeout(function () {
        this_popup.fadeIn(450, function () {
            this_popup.animate({
                bottom: '0'
            }, 500);
        });
    }, 100);

    requestManager.remove_endRequest(endPromptedForTypeSaveRequestHandler);
    initializeEvents();
    getShareCounts();
}

function setClosestElementValue(name, value) {
    var socialDiv = $('#contentRow');

    if (socialDiv != undefined) {
        if (socialDiv.find(("input[type='hidden'][id$='" + name + "']")) != undefined &&
            socialDiv.find(("input[type='hidden'][id$='" + name + "']")).length > 0) {
            socialDiv.find(("input[type='hidden'][id$='" + name + "']")).val(value);
        }
        else {
            $("input[type='hidden'][id$='" + name + "']").val(value);
        }
    }
    else {
        $("input[type='hidden'][id$='" + name + "']").val(value);
    }
}

$(document).ready(function () {
    //when the document is finished loading, replace everything  
    initializeEvents();
    getShareCounts();

    /* Start Whatsapp share*/
    $("#whatsappShare").attr("href", "whatsapp://send?text=" + encodeURIComponent(window.location.href));

    var isPointRequired = encodeURIComponent($("input[type='hidden'][id$='hdnPointRequired']").val());

    if (isPointRequired != "True") {
        $('.healthpoit_icons p').hide();
    }
});