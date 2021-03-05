const availableMaps = ["mapbox://styles/mapbox/satellite-v9",
                       "mapbox://styles/mapbox/outdoors-v11",
                       "mapbox://styles/mapbox/streets-v11"]
const mapModes = {SATELLITE: availableMaps[0],
                OUTDOOR: availableMaps[1],
                SURF: availableMaps[2]}
module.exports = {
  availableMaps,
  mapModes
}