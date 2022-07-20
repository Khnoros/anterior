var map;
var directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer();

map = new google.maps.Map(document.getElementById('map'), {
    center: {
        lat: -27.5914,
        lng: -48.5447
    },
    zoom: 16
});
directionsDisplay.setMap(map);

var start = document.getElementById('start');
var searchStart = new google.maps.places.SearchBox(start);
var end = document.getElementById('end');
var searchEnd = new google.maps.places.SearchBox(end);
var valorKM = 1.8;
var detail = document.getElementById('detail');
var googlemapsStart = document.getElementById('button-input');

function findRoute() {
    var startAddress = start.value;
    var endAddress = end.value;
    var request = {
        origin: startAddress,
        destination: endAddress,
        travelMode: 'DRIVING'
    };
    directionsService.route(request, function (result, status) {
        if (status == 'OK') {
            directionsDisplay.setDirections(result);
            
            document.getElementById('distance').innerHTML = result.routes[0].legs[0].distance.text;
            document.getElementById('duration').innerHTML = result.routes[0].legs[0].duration.text;

            // Transformar
            var distancia = parseInt(result.routes[0].legs[0].distance.text.replace(".", ""));
            console.log(distancia)

            var valor1 = parseInt("1.000,00".replace(".", "")); // mostra 1000
            console.log(valor1)


            // Ida    
            var totalValorIda = distancia * valorKM;

            if ( distancia <= 7) {
                document.getElementById("price").innerHTML = (13).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                });;
            } else {
                document.getElementById("price").innerHTML = totalValorIda.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                });
            }


            // Volta
            var totalValorVolta = (distancia * valorKM) * 1.8;

            if (distancia <= 7) {
                document.getElementById("price2").innerHTML = (13 * 1.9).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                });;
            } else {
                document.getElementById("price2").innerHTML = totalValorVolta.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                });
            }

            detail.style.display = 'block';
        } else {
            detail.style.display = 'none';
            alert("Opa! Parece que o endereço está incorreto.")
        }
    });
}

googlemaps.addEventListener("click", function (event) {
    if (start.value.trim() != "" && end.value.trim() != "") {
        event.preventDefault();
        findRoute();
    }
});