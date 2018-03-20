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

TrafficController.prototype.takeOff = function(plane,airport,weather) {
  if (weather.isStormy()){
    throw "Cannot take off in bad weather"
  } else if (!airport.hasPlane(plane)) {
    throw "Plane is not in this airport"
  } else {
    index = airport.hasPlane(plane)
    plane = airport.hangar.splice(index, 1)[0]
    plane.changeFlightStatus()
    return plane
  }
}
