var map, UserMarker, BusMarker;
var socket = io();

var busL = {
    lat: -8.399301,
    lng: -35.056784
};

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: busL,
        zoom: 15,
        disableDefaultUI: true
    });

    var image = 'icons/pin-white64.png';
    var imageBus = 'icons/bus-white64.png';

    UserMarker = new google.maps.Marker({
        position: {
            lat: 0,
            lng: 0
        },
        map: map,
        icon: image
    });

    BusMarker = new google.maps.Marker({
        position: busL,
        animation: google.maps.Animation.BOUNCE,
        map: map,
        icon: imageBus
    });

    $('#user').click((event) => {
        // Don't show Touch to serach
        event.preventDefault();
        map.panTo({
            lat: UserMarker.position.lat(),
            lng: UserMarker.position.lng()
        });
    })

    $('#bus').click((event) => {
        // Don't show Touch to serach
        event.preventDefault();
        map.panTo({
            lat: BusMarker.position.lat(),
            lng: BusMarker.position.lng()
        });
    })
}

var geoSuccess = function(position) {
    UserMarker.setPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude
    });

    BusMarker.setAnimation(google.maps.Animation.BOUNCE);

    $('.preloader-wrapper').hide('fast');
    $('.content').fadeTo("slow", 1);
};

var geoError = function(position) {
    console.log('Error occurred to get position. Error code: ' + error.code);
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
};

navigator.geolocation.watchPosition(geoSuccess, geoError);
