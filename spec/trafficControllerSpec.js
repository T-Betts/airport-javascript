describe('Traffic Controller', function(){
  let tc;
  let airbornePlane;
  let emptyAirport;
  let goodWeather;
  let badWeather;

  beforeEach(function(){
    tc = new TrafficController
    airbornePlane = new Plane
    emptyAirport = new Airport
    goodWeather = jasmine.createSpyObj('goodWeather',['isStormy']);
    goodWeather.isStormy.and.returnValue(false);
    badWeather = jasmine.createSpyObj('badWeather',['isStormy']);
    badWeather.isStormy.and.returnValue(true);
  });

  describe('#land', function(){
    // trafficController.land(plane,airport,weather)

    it('Can store a plane in airport hangar', function() {
      tc.land(airbornePlane,emptyAirport,goodWeather)
      expect(emptyAirport.hangar).toContain(airbornePlane)
    });

    it('Cannot land a plane in bad weather', function() {
      expect( function(){ tc.land(airbornePlane,emptyAirport,badWeather) } )
      .toThrow(new Error("Cannot land in bad weather"));
    })

  });

});
