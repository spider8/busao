var map, userMarker, busMarker;
var socket = io();

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        //center: ,
        zoom: 17,
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
}

socket.on('location', function (data) {
    busMarker.setPosition({ lat: data.lat, lng: data.lng });
    console.log(data);
});

socket.on('ready', function (data) {
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
})

navigator.geolocation.getCurrentPosition(function (position) {
    userMarker.setPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude
    })
});
