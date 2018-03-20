function Plane() {
  this.inFlight = true
}

Plane.prototype.changeFlightStatus = function () {
   this.inFlight = !this.inFlight
};
