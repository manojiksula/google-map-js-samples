(function(exports) {
  "use strict";

  /* eslint-disable no-undef */
  // Initialize and add the map
  function initMap() {
    var map = new google.maps.Map(document.getElementById("map"), {
      center: {
        lat: 0,
        lng: 0
      },
      zoom: 4
    });
    var deckOverlay = new deck.GoogleMapsOverlay({
      layers: [
        new deck.GeoJsonLayer({
          id: "earthquakes",
          data:
            "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson",
          filled: true,
          pointRadiusMinPixels: 2,
          pointRadiusMaxPixels: 200,
          opacity: 0.4,
          pointRadiusScale: 0.3,
          getRadius: function getRadius(f) {
            return Math.pow(10, f.properties.mag);
          },
          getFillColor: [255, 70, 30, 180],
          autoHighlight: true,
          transitions: {
            getRadius: {
              type: "spring",
              stiffness: 0.1,
              damping: 0.15,
              enter: function enter(_) {
                return [0];
              },
              // grow from size 0,
              duration: 10000
            }
          }
        })
      ]
    });
    deckOverlay.setMap(map);
  }

  exports.initMap = initMap;
})((this.window = this.window || {}));
