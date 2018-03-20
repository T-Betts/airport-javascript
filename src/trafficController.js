function TrafficController() {}

TrafficController.prototype.land = function(plane,airport,weather) {
  if (weather.isStormy()){
    throw "Cannot land in bad weather"
  } else if (!plane.inFlight) {
    throw "This is not an airborne plane"
  } else if (!airport.hasSpace()) {
    throw "Airport is full"
  } else {
    plane.changeFlightStatus()
    airport.hangar.push(plane)
  }
}
