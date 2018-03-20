function TrafficController() {}

TrafficController.prototype.land = function(plane,airport,weather) {
  if (weather.isStormy()){
    throw "Cannot land in bad weather"
  } else if (!plane.inFlight) {
    throw "Plane not airborne"
  } else if (!airport.hasSpace()){
    throw "Airport is full"
  } else {
    airport.hangar.push(plane)
  }
}
