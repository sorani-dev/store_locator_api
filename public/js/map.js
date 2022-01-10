const map = L.map('map', {
    minZoom: 2,
    zoom: 9,
})
    .setView([45.8354243, 1.2644847], 13);

L.tileLayer('//{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
}).addTo(map)

const myIcon = L.divIcon({
    // className: 'marker'
})

/**
 * Fetch stores from API
 * @returns Array
 */
async function getStores() {
    try {
        const res = await fetch('/api/v1/stores')
        const data = await res.json()

        const stores = data.data.map(store => {
            return {
                "type": "Feature",
                "properties": {
                    "storeId": store.storeId,
                    "popupContent": store.storeId.toString(),
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [store.location.coordinates[1], store.location.coordinates[0]]
                },
                "id": 1
            }
        })

        loadMap(stores)
    } catch (error) {
    }
}

/**
 * Load map with stores
 * @param {Array} stores 
 */
function loadMap(stores) {

    stores.forEach(store => {
        const storeId = store.properties.storeId

        const text = `${storeId}`

        L.marker(store.geometry.coordinates, { icon: myIcon }).bindPopup(text).addTo(map);
    })
}

getStores()

// var geojsonFeature = {
//     "type": "FeatureCollection",
//     "features": [{
//         "type": "Feature",
//         "properties": {
//             "name": "ChezMoi",
//             // "amenity": "Building",
//             "popupContent": "This is where I live now!",
//             "show_on_map": true
//         },
//         "geometry": {
//             "type": "Point",
//             "coordinates": [45.82923, 1.26940]
//         },
//         "id": 1
//     }],
// };
// var myStyle = {
//     "color": "#ff7800",
//     "weight": 5,
//     "opacity": 0.65
// };

// var geojsonMarkerOptions = {
//     radius: 8,
//     fillColor: "#ff7800",
//     color: "#000",
//     weight: 1,
//     opacity: 1,
//     fillOpacity: 0.8
// };

// const html = `
//           <span class="icon-marker">
//             <span class="icon-marker-tooltip">
//               <h2>my title</h2>
//           </span>
//         </span>
//         `;

// // L.geoJSON(geojsonFeature, {
// //     // pointToLayer: function (feature, latlng) {
// //     //     return L.circleMarker(latlng, geojsonMarkerOptions);
// //     // },
// //     onEachFeature: onEachFeature,
// //     pointToLayer: function (feature, latlng) {
// //         return L.marker(latlng, {
// //             icon: L.divIcon({
// //                 className: 'icon',
// //                 html,
// //                 riseOnHover: true,
// //                 radius: 8,
// //                 fillColor: '#ff7800',
// //                 color: '#000',
// //                 weight: 1,
// //                 opacity: 1,
// //                 fillOpacity: 0.8
// //             }).addTo(map)
// //         })
// //     }
// // }).addTo(map);

// function loadMap() {
//     map.load('')
// }

function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.popupContent);
    }
}