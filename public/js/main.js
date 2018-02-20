var map, userMarker, busMarker;
var isInitialized = false;
var socket = io();

const userIcon = 'icons/pin-white64.png';
const busIcon = 'icons/bus-white64.png';

function setup() {
    $('#user').click((event) => {
        event.preventDefault();
        map.panTo(userMarker.getPosition());
    })

    $('#bus').click((event) => {
        event.preventDefault();
        map.panTo(busMarker.getPosition());
    })

    $('.preloader-wrapper').hide('fast');
    $('.content').fadeTo("slow", 1);
    map.setCenter(busMarker.getPosition());
    isInitialized = true;
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { "lat": -8.01449, "lng": -34.95036 }, // Localização do prédio central UFRPE
        zoom: 17,
        disableDefaultUI: true
    });

    userMarker = new google.maps.Marker({
        map: map,
        icon: userIcon
    });

    busMarker = new google.maps.Marker({
        animation: google.maps.Animation.BOUNCE,
        map: map,
        icon: busIcon
    });
}

socket.on('location', function (data) {
    busMarker.setPosition({ lat: data.lat, lng: data.lng });
    isInitialized || setup();

});

navigator.geolocation.getCurrentPosition(function (position) {
    userMarker.setPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude
    })
});
