describe('Traffic Controller', function(){
  let tc;
  let airbornePlane;
  airbornePlane.inFlight = 0
  let groundedPlane;
  groundedPlane.inFlight = 0
  let emptyAirport;
  let goodWeather;
  let badWeather;

  beforeEach(function(){
    tc = new TrafficController
    spyOnProperty(airbornePlane, 'inFlight', 'getter').and.returnValue(true);
    spyOnProperty(groundedPlane, 'inFlight', 'getter').and.returnValue(false);
    // airbornePlane = jasmine.createSpyObj('airbornePlane');
    // airbornePlane.inFlight.and.returnValue(true);
    // groundedPlane = jasmine.createSpyObj('groundedPlane');
    // groundedPlane.inFlight.and.returnValue(false);
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
      .toThrow("Cannot land in bad weather");
    })

    it('Cannot land plane if it is not airborne', function(){
      expect( function(){ tc.land(groundedPlane,emptyAirport,goodWeather) } )
      .toThrow("Plane not airborne");
    })

  });

});
