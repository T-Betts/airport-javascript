function TrafficController() {}

TrafficController.prototype.land = function(plane,airport,weather) {
  if (weather.isStormy == true) {
    airport.hangar.push(plane)
  }
}
