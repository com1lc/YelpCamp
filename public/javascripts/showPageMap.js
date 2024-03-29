// const campground = require("../../models/campground");

mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/light-v8", //stylesheet Location
    center: campground.geometry.coordinates, //starting position[lng, lat]
    zoom: 10, //starting zoom
});

const marker = new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<h3>${campground.title}</h3><p>${campground.location}`
        )
    )
    .addTo(map);
