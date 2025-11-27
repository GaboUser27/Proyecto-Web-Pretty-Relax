let map;

const salonCoords = {
    lat: 29.8807356,
    lng: -95.6497005
};

async function initMap() {
    // Cargar librería
    const { Map } = await google.maps.importLibrary("maps");
    const { Marker } = await google.maps.importLibrary("marker");

    // Crear mapa centrado en el salón
    map = new Map(document.getElementById("map"), {
        center: salonCoords,
        zoom: 17,
        mapId: "DEMO_MAP_ID",
    });

    // Marcar ubicación del salón
    new Marker({
        map: map,
        position: salonCoords,
        title: "Pretty & Relax Salon",
    });
}

window.initMap = initMap;
