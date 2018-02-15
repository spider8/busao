var map, userMarker, busMarker;
var socket = io();

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        //center: ,
        zoom: 15,
        disableDefaultUI: true
    });

    var image = 'icons/pin-white64.png';
    var imageBus = 'icons/bus-white64.png';

    userMarker = new google.maps.Marker({
        map: map,
        icon: image
    });

    busMarker = new google.maps.Marker({
        animation: google.maps.Animation.BOUNCE,
        map: map,
        icon: imageBus
    });

    $('#user').click((event) => {
        // Don't show Touch to serach
        event.preventDefault();
        map.panTo(userMarker.getPosition());
    })

    $('#bus').click((event) => {
        // Don't show Touch to serach
        event.preventDefault();
        map.panTo(busMarker.getPosition());
    })
}

socket.on('location', function (data) {
    $('.preloader-wrapper').hide('fast');
    $('.content').fadeTo("slow", 1);

    busMarker.setPosition({ lat: data.lat, lng: data.lng });
    map.panTo(busMarker.getPosition());
});

navigator.geolocation.getCurrentPosition(function (position) {
    userMarker.setPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude
    })
});
