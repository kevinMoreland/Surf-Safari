//Javascript does funny stuff like lets -4 % 5 = -4 instead of 1, which I want. This function fixes that
function mod(n, m) {
  return ((n % m) + m) % m;
}
function coordinatesAreEqual(coord1, coord2) {
  let threshold = 0.0000000001
  let coord1Lat = mod(coord1.lat, 360)
  let coord2Lat = mod(coord2.lat, 360)
  let coord1Lng = mod(coord1.lng, 360)
  let coord2Lng = mod(coord2.lng, 360)
  if((coord1Lat >= coord2Lat - threshold && coord1Lat <= coord2Lat + threshold) &&
     (coord1Lng >= coord2Lng - threshold && coord1Lng <= coord2Lng + threshold)) {
    return true
  }
  return false
}

module.exports = {
  coordinatesAreEqual,
  mod
}