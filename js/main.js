/*
SAMPLE URL
https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-122.4241,37.78,14.25,0,60/600x600?access_token=pk.eyJ1Ijoic3RldmVncmlmZml0aCIsImEiOiJja2pnamd1dHoyaDdvMnNuMG5mMmlieXdvIn0.KbiXqVd8ymvPhxBY-FzTTw
base/style/static/lon,lat,zoom,bearing,pitch,size?access_token=token

Reference for MapBox static map images
https://docs.mapbox.com/api/maps/static-images/

Available styles
// streets-v11, outdoors-v11, light-v10, dark-v10, satellite-v9
*/

import GEO from "./geoLocation.js";

var w = window.innerWidth > 1250 ? 1250 : window.innerWidth;
var h =
  window.innerHeight > 850
    ? window.innerHeight - 380
    : window.innerHeight - 140;

const APP = {
  baseURL: "https://api.mapbox.com/styles/v1/mapbox",
  style: "streets-v11", //matches HTML
  lon: -122.4241,
  lat: 37.78,
  zoom: 10, //matches HTML
  bearing: 0,
  pitch: 60, //matches HTML
  size: `${w}x${h}`,
  token:
    "pk.eyJ1IjoiamFuZ2lyc3VtaXQiLCJhIjoiY2tsbmVwcHM5MGk5czJucXlrMHZ0dGQ2NSJ9.T7lXAWUa6D6H8F9Vt3BqIw",
  init() {
    APP.addListeners();
    //initial load with default image
    APP.loadMap();
  },
  addListeners() {
    //zoom listener
    document.getElementById("zoom").addEventListener("change", APP.setZoom);
    //style listener
    document.getElementById("style").addEventListener("change", APP.setStyle);
    //pitch listener
    document.getElementById("pitch").addEventListener("change", APP.setPitch);
    //geolocation listener
    document.body.addEventListener("click", APP.getPosition);
    //TODO:
    //image load and error listener
    let img = document.getElementById("map");
    img.addEventListener("load", (ev) => {
      img.alt = `Map image for ${APP.lat}, ${APP.lon}`;
    });
    img.addEventListener("error", (err) => {
      img.alt = `Failed to load map image. ${err.message}`;
    });

    // Get the modal
    var modal = document.getElementById("myModal");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function (event) {
      modal.style.display = "none";
      event.stopPropagation();
      event.stopImmediatePropagation();
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
      event.stopPropagation();
      event.stopImmidiatePropagation();
    };
  },
  setZoom(ev) {
    let select = ev.target;
    APP.zoom = select.value;
    APP.loadMap();
  },
  setStyle(ev) {
    let select = ev.target;
    APP.style = select.value;
    APP.loadMap();
  },
  setPitch(ev) {
    let select = ev.target;
    APP.pitch = select.value;
    APP.loadMap();
  },
  getPosition() {
    //use the imported GEO object
    GEO.setOptions({ enableHighAccuracy: true, timeout: 5000, maximumAge: 0 });
    GEO.getCurrentLocation(APP.loadMap, APP.failure);
    //to fetch the current position and
    //call loadMap with new position
  },
  loadMap(pos) {
    if (pos) {
      APP.lon = pos.coords.longitude;
      APP.lat = pos.coords.latitude;
    } else {
      let pos = {
        coords: {
          latitude: APP.lat,
          longitude: APP.lon,
        },
      };
    }
    let url = `${APP.baseURL}/${APP.style}/static/${APP.lon},${APP.lat},${APP.zoom},${APP.bearing},${APP.pitch}/${APP.size}?access_token=${APP.token}`;
    let img = document.getElementById("map");
    img.alt = "loading new map image";
    img.src = url;
  },
  failure(error) {
    let modal = document.getElementById("myModal");
    let modalText = document.getElementById("modal-text");
    modalText.innerHTML = "Error! " + error.message;
    modal.style.display = "block";
  },
};

document.addEventListener("DOMContentLoaded", APP.init);
