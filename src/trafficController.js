function TrafficController() {}

TrafficController.prototype.land = function(plane,airport,weather) {
  airport.hangar.push(plane)
}
