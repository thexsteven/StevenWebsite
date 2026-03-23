function initAlltag() {
  const hotel  = { lat: 21.2790,  lng: -157.8295 }; // Waikiki Malia, 2211 Kuhio Ave
  const ef     = { lat: 21.2912,  lng: -157.8430 }; // EF School, Kapiolani Blvd / Ala Moana
  const center = { lat: 21.2855,  lng: -157.8370 }; // Mitte zwischen Hotel und Schule

  const map = new google.maps.Map(document.getElementById("map-alltag"), {
    zoom: 14,
    center: center,
    mapTypeId: "roadmap",
  });

  // Marker Hotel (rot)
  new google.maps.Marker({
    position: hotel,
    map,
    title: "Waikiki Malia Hotel · 2211 Kuhio Ave",
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 8,
      fillColor: "#c8102e",
      fillOpacity: 1,
      strokeColor: "#ffffff",
      strokeWeight: 2,
    },
  });

  // Marker EF School (blau)
  new google.maps.Marker({
    position: ef,
    map,
    title: "EF Education First · Kapiolani Blvd",
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 8,
      fillColor: "#0f2f5f",
      fillOpacity: 1,
      strokeColor: "#ffffff",
      strokeWeight: 2,
    },
  });

  // Bike-Route: Hotel → Ala Wai Blvd → Kapiolani → EF School (gestrichelt, rot)
  const route = [
    { lat: 21.2790, lng: -157.8295 }, // Start: Waikiki Malia
    { lat: 21.2830, lng: -157.8310 }, // Richtung Ala Wai
    { lat: 21.2855, lng: -157.8330 }, // Ala Wai Blvd (Kanalstraße)
    { lat: 21.2875, lng: -157.8360 }, // Weiter Ala Wai Richtung Westen
    { lat: 21.2895, lng: -157.8400 }, // Abbiegen Richtung Kapiolani
    { lat: 21.2912, lng: -157.8430 }, // Ziel: EF School
  ];

  // Karte 2: Calisthenics Park am Ala Moana Beach Park
  const caliPos = { lat: 21.2908, lng: -157.8479 };
  const mapCali = new google.maps.Map(document.getElementById("map-cali"), {
    zoom: 16,
    center: caliPos,
    mapTypeId: "roadmap",
  });

  new google.maps.Marker({
    position: caliPos,
    map: mapCali,
    title: "Calisthenics Park · Ala Moana Beach Park",
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 9,
      fillColor: "#c8102e",
      fillOpacity: 1,
      strokeColor: "#ffffff",
      strokeWeight: 2,
    },
  });

  new google.maps.Polyline({
    path: route,
    geodesic: false,
    strokeColor:   "#0f2f5f",
    strokeOpacity: 0,
    strokeWeight:  0,
    icons: [{
      icon: {
        path:          "M 0,-1 0,1",
        strokeOpacity: 0.9,
        strokeColor:   "#c8102e",
        scale:         3,
      },
      offset: "0",
      repeat: "10px",
    }],
  }).setMap(map);
}
