function initMapEssen() {
  const foodtrucks = { lat: 21.2658, lng: -157.8191 }; // Food Trucks · Cartwright Road, Waikiki

  const map = new google.maps.Map(document.getElementById("map-essen"), {
    zoom: 15,
    center: foodtrucks,
    mapTypeId: "roadmap",
  });

  new google.maps.Marker({
    position: foodtrucks,
    map,
    title: "Food Trucks · Cartwright Road",
  });
}
