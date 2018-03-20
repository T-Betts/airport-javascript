describe('Plane', function(){
  describe('inFlight', function(){
    it('should return true after instantiation', function() {
      plane = new Plane
      expect(plane.inFlight).toEqual(true);
    });
  });

  describe('#changeFlightStatus', function(){
    it('should change inFlight from false to true', function(){
      plane = new Plane
      plane.changeFlightStatus()
      expect(plane.inFlight).toBe(false)
    });
    it('should change inFlight from true to false', function(){
      plane = new Plane
      plane.changeFlightStatus()
      plane.changeFlightStatus()
      expect(plane.inFlight).toBe(true)
    });
  });
});
