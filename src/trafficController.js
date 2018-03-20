function TrafficController() {}

TrafficController.prototype.land = function(plane,airport,weather) {
  if (!weather.isStormy()){
    airport.hangar.push(plane)
  }
  else{
    throw "Cannot land in bad weather"
  }
}
