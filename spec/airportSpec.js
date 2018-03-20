describe('Airport', function(){

  describe('Constructor', function(){
    it('instantiated with an empty planes array', function(){
      airport = new Airport()
      expect(airport.hangar).toEqual([])
    })

    it('instantiated with a default capacity', function(){
      airport = new Airport
      expect(airport.capacity).toEqual(10)
    })

    it('instantiated with a set capacity', function(){
      airport = new Airport(15)
      expect(airport.capacity).toEqual(15)
    })
  })

  describe('#hasPlane', function(){
    it('returns index of plane if plane is in hangar', function(){
      airport = new Airport
      airport.hangar.push("Plane")
      airport.hangar.push("Plane2")
      expect(airport.hasPlane("Plane")).toEqual(0)
    });

    it('returns false if plane is not in hangar', function(){
      airport = new Airport
      expect(airport.hasPlane('Plane')).toBe(false)
    })
  });

  describe('#hasSpace', function(){
    it('returns true if airport hangar is full', function(){
      airport = new Airport
      var times = 10
      for(var i = 0; i < times; i++){
        airport.hangar.push("Plane")
      }
      expect(airport.hasSpace()).toBe(false)
    })

    it('returns true if airport hangar is full', function(){
      airport = new Airport
      expect(airport.hasSpace()).toBe(true)
    })

  })

});
