function initMap() {
  // Karte initialisieren – Zentrum zwischen Atlantik und Pazifik
  const map = new google.maps.Map(document.getElementById("map-hawaii"), {
    zoom: 3,
    center: { lat: 42, lng: -100 },
    mapTypeId: "terrain",
  });

  // Koordinaten – Flughäfen
  const fra    = { lat: 50.0379,  lng:   8.5622  }; // Frankfurt (FRA)
  const ord    = { lat: 41.9742,  lng: -87.9073  }; // Chicago O'Hare (ORD)
  const hnl    = { lat: 21.3187,  lng: -157.9225 }; // Honolulu Airport (HNL)
  const hotel  = { lat: 21.2790,  lng: -157.8295 }; // Hotel Waikiki Malia, 2211 Kuhio Ave

  // Flughafen-Marker (standard)
  [
    { pos: fra,  label: "FRA · Frankfurt" },
    { pos: ord,  label: "ORD · Chicago O'Hare" },
    { pos: hnl,  label: "HNL · Honolulu Airport" },
  ].forEach(({ pos, label }) => {
    new google.maps.Marker({ position: pos, map, title: label });
  });

  // Hotel-Marker (roter Kreis zur Unterscheidung)
  new google.maps.Marker({
    position: hotel,
    map,
    title: "Hotel Waikiki Malia · 2211 Kuhio Ave",
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 8,
      fillColor: "#c8102e",
      fillOpacity: 1,
      strokeColor: "#ffffff",
      strokeWeight: 2,
    },
  });

  // Flugroute FRA → ORD → HNL (geodätisch = Großkreis)
  new google.maps.Polyline({
    path: [fra, ord, hnl],
    geodesic: true,
    strokeColor: "#0f2f5f",
    strokeOpacity: 0.85,
    strokeWeight: 2.5,
  }).setMap(map);

  // Autofahrt HNL → Hotel (gestrichelt, rot)
  new google.maps.Polyline({
    path: [hnl, hotel],
    geodesic: false,
    strokeColor:   "#0f2f5f",
    strokeOpacity: 0,
    strokeWeight:  0,
    icons: [{
      icon: {
        path:           "M 0,-1 0,1",
        strokeOpacity:  0.9,
        strokeColor:    "#c8102e",
        scale:          3,
      },
      offset: "0",
      repeat: "10px",
    }],
  }).setMap(map);
}
