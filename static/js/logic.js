// Get the GeoJson
const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"




d3.json(url).then(data => { console.log(data.features)

for (let i = 0; i < data.features.length; i++) {
    let long = 0
    let lat = 0
    let depth = 0
    let mag = 0
    long = data.features[i].geometry.coordinates[0]
    lat = data.features[i].geometry.coordinates[1]
    depth = data.features[i].geometry.coordinates[2]
    mag = data.features[i].properties.mag
    
        L.circle([lat ,long],{
        fillOpacity: 0.5,
        color: getColor(depth),
        fillColor: getColor(depth),
        radius: mag * mag * 10000 * 0.9
        }).bindPopup(`
          <h2>Earthquake</h2><hr> 
          <h4>Location :${data.features[i].properties.place}</h4> 
          <h4>Magnitude: ${data.features[i].properties.mag.toLocaleString()}</h4>
          <h4>Depth: ${depth.toLocaleString()}m</h4>
           `).addTo(map)
}
})


  function getColor(d) {
    return d < 10 ? "green" :
            d < 30  ? "greenyellow" :
            d < 50  ? "yellow" :
            d < 70  ? "orange" :
            d < 90  ? "orangered" :
             "red" 
  }

// Creating the map object
let map = L.map("map", {
    center: [40.27, -102.145],
    zoom: 4
  })
  
  // Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map)

 /*Legend specific*/
let legend = L.control({ position: "bottomright" });

legend.onAdd = function(map) {
  let div = L.DomUtil.create("div", "legend")
  div.innerHTML += "<h4>Depth</h4>"
  div.innerHTML += '<i style="background: green"></i><span><10</span><br>'
  div.innerHTML += '<i style="background: greenyellow"></i><span>10-30</span><br>'
  div.innerHTML += '<i style="background: yellow"></i><span>30-50</span><br>'
  div.innerHTML += '<i style="background: orange"></i><span>50-70</span><br>'
  div.innerHTML += '<i style="background: orangered"></i><span>70-90</span><br>'
  div.innerHTML += '<i style="background: red"></i><span>>90</span><br>'

return div
}

legend.addTo(map)
