var beekeepers = {
  "Tristan":{
    "hives":[
      { "location": {"lat":-37.890909, "lng":145.308216}, "num_hives": 5},
      { "location":{"lat":-37.701264, "lng":145.351721}, "num_hives": 5},
      { "location":{"lat":-37.818841, "lng":145.09895}, "num_hives": 1}
    ]
  },
  "Robin":{
    "hives":[{ "location":{"lat":37.742641, "lng":145.014653},"num_hives":1 }]
  },
  "Paul": {
    "hives":[
      {"location": {"lat":-37.72778, "lng":144.9342}, "num_hives":1},
      {"location": {"lat":-37.74466, "lng":145.0731}, "num_hives":1},
      {"location": {"lat":-37.62769, "lng":144.7224}, "num_hives":2},
      {"location": {"lat":-37.52364, "lng":144.5812}, "num_hives":2},
      {"location": {"lat":-37.37216, "lng":144.5114}, "num_hives":2}
    ]
  }
}


function initMap() {
  // Create the map.
  var layer = "watercolor";
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: {lat: -37.8136, lng: 144.9631 },
    mapTypeId: layer,
    mapTypeControlOptions: {
      mapTypeIds: [layer]
    }
  });
  map.mapTypes.set(layer, new google.maps.StamenMapType(layer));


  // Construct the circle for each value in citymap.
  // Note: We scale the area of the circle based on the population.
  _(beekeepers).each(function(data, name) {
    console.log(data, name)
    _(data.hives).each(function(hive) {
      var circle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: map,
        center: hive.location,
        radius: 3218
      });

      console.log(hive.location)

      var infowindow = new google.maps.InfoWindow({
        content: name + ": " + hive.num_hives,
        position: hive.location
      });

      circle.addListener('click', function() {
        infowindow.open(map, circle);
      });
    })
  });
}

window.onload = initMap;