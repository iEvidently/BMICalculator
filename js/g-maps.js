$(window).resize(function () {
    $(".view-lst > li:nth-child(2) a").click(function () {
        google.maps.event.trigger(map, "resize");
        map.setCenter(new google.maps.LatLng(1.279559, 103.8341541));
    });

});

function getImageByCategoryId(categoryId) {
    var imagePath = "";
    switch (categoryId) {
        case 0:
            imagePath = '/_layouts/15/HealthHub/images/marker-quit.png';
            break;
        case 1:
            imagePath = '/_layouts/15/HealthHub/images/marker-quit.png';
            break;
        case 2:
            imagePath = '/_layouts/15/HealthHub/images/marker-water-centre.png';
            break;
        case 3:
            imagePath = '/_layouts/15/HealthHub/images/marker-gym.png';
            break;
        case 4:
            imagePath = '/_layouts/15/HealthHub/images/marker-screening.png';
            break;
        case 5:
            imagePath = '/_layouts/15/HealthHub/images/marker-blood.png';
            break;
        case 6:
            imagePath = '/_layouts/15/HealthHub/images/marker-pharmacies.png';
            break;
        case 7:
            imagePath = '/_layouts/15/HealthHub/images/marker-sports.png';
            break;
        case 8:
            imagePath = '/_layouts/15/HealthHub/images/marker-parks.png';
            break;
        case 12:
            imagePath = '/_layouts/15/HealthHub/images/marker-eldercare.png';
            break;
        case 13:
            imagePath = '/_layouts/15/HealthHub/images/marker-quit.png';
            break;
        case 14:
            imagePath = '/_layouts/15/HealthHub/images/marker-clinics.png';
            break;
        case 15:
            imagePath = '/_layouts/15/HealthHub/images/marker-hospital.png';
            break;
        case 16:
            imagePath = '/_layouts/15/HealthHub/images/marker-lab.png';
            break;
        case 23:
            imagePath = '/_layouts/15/HealthHub/images/marker-eldercare.png';
            break;
        case 24:
            imagePath = '/_layouts/15/HealthHub/images/marker-eldercare.png';
            break;
        case 25:
            imagePath = '/_layouts/15/HealthHub/images/marker-eldercare.png';
            break;
        case 26:
            imagePath = '/_layouts/15/HealthHub/images/marker-eldercare.png';
            break;
        case 27:
            imagePath = '/_layouts/15/HealthHub/images/marker-eldercare.png';
            break;
        case 34:
            imagePath = '/_layouts/15/Healthhub/images/marker-hawker-centre.png';
            break;
        case 36:
            imagePath = '/_layouts/15/Healthhub/images/marker-quit.png';
            break;
        case 37:
            imagePath = '/_layouts/15/Healthhub/images/marker-nursinghome.png';
            break;
    }
    return imagePath;
}

function loadMarkers(markers) {
    google.maps.event.addListenerOnce(map, 'idle', function () {
        for (i = 0; i < markers.length; i++) {
            var t = markers[i].ID;
            var image = getImageByCategoryId(parseInt(markers[i].CategoryId));
            var position = new google.maps.LatLng(markers[i].Lat, markers[i].Lng);
            marker = new google.maps.Marker({
                position: position,
                map: map,
                title: markers[i].Name,
                icon: image
            });
            google.maps.event.addListener(marker, 'click', (function (marker, t) {
                return function () {
                    OpenMapDetails(t);
                }
            })(marker, t));
        }
    });
}

function initMapDetails() {
    //initialize map
    var mapOptions = {
        center: new google.maps.LatLng(lat, lng), //(1.3490497992476904,103.85249924765627), // (1.352083, 103.819836),
        streetViewControl: false,
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    var image = getImageByCategoryId(parseInt(categoryId));

    google.maps.event.addListenerOnce(map, 'idle', function () {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lng),
            map: map,
            title: locationName,
            icon: image
        });
    });
}

function initMap() {
    //initialize map
    var mapOptions = {
        center: new google.maps.LatLng(lat, lng), //(1.3490497992476904,103.85249924765627), // (1.352083, 103.819836),
        streetViewControl: false,
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

    loadData();
}

function OpenMapDetails(t) {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: '{ "id": ' + t + '}',
        url: "/_layouts/15/webresources/services.aspx/GetMarkerInfo",
        beforeSend: function () {
            $('body').append('<div class="popup-box" style="position:fixed;"><a href="#" class="btn-close">close</a><div class="holder"></div></div>');
            $('body').append('<div class="overlay-area"></div>');
            $('body .popup-box .holder').append("<img src='/_layouts/15/HealthHub/images/loading_new.gif' class='img-responsive' alt='Loading' style='margin-left:40%;;padding:8%;'>");
        },
        success: function (data) {
            var template = Handlebars.compile($("#tmpl_MarkerInfo").html());
            var html = template(JSON.parse(data.d));
            $('body .popup-box .holder').html(html);
        }
    });
}

function loadData() {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ categoryId: categoryId, filterExpression: filterExpression }),
        url: "/_layouts/15/webresources/services.aspx/GetMarkers",
        beforeSend: function () {
            $(".map-area").prepend($("<div/>", {
                id: "overlay",
                text: "loading..",
                css: {
                    "background": "black",
                    "z-index": 2,
                    "opacity": .3,
                    "position": "absolute"
                }
            }).append(
                $("<img/>", {
                    src: "/_layouts/15/WebResources/images/loading.gif",
                    class: "img-responsive",
                    css: {
                        "margin-left": "40%",
                        "padding": "8%",
                        "margin-top": "15%"
                    }
                })
            ));
        },
        success: function (data) {
            $("#overlay").remove();

            //initialize map
            var mapOptions = {
                center: new google.maps.LatLng(lat, lng), //(1.3490497992476904,103.85249924765627), // (1.352083, 103.819836),
                streetViewControl: false,
                zoom: 11,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
            map.setTilt(45);

            //load markers
            loadMarkers(JSON.parse(data.d));
        }
    });
}