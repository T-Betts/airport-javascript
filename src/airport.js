function Airport(capacity = 10){
  this.hangar = []
  this.capacity = capacity
}

Airport.prototype.hasPlane = function(plane){
  for (var i = 0; i < this.hangar.length; i++) {
    if (plane === this.hangar[i]) return i
  }
  return false
}

Airport.prototype.hasSpace = function(){
  return this.hangar.length < this.capacity ? true : false
}
