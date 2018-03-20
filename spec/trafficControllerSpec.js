describe('Traffic Controller', function(){
  let tc;
  let airbornePlane;
  let groundedPlane;
  let fullAirport;
  let emptyAirport;
  let goodWeather;
  let badWeather;

  beforeEach(function(){
    tc = new TrafficController
    // spyOnProperty(airbornePlane, 'inFlight', 'getter').and.returnValue(true);
    // spyOnProperty(groundedPlane, 'inFlight', 'getter').and.returnValue(false);
    // airbornePlane = jasmine.createSpyObj('airbornePlane');
    // airbornePlane.inFlight.and.returnValue(true);
    // groundedPlane = jasmine.createSpyObj('groundedPlane');
    // groundedPlane.inFlight.and.returnValue(false);
    airbornePlane = jasmine.createSpyObj('airborneAirport',['changeFlightStatus']);
    // emptyAirport.hasSpace.and.returnValue(true)
    airbornePlane.inFlight = true
    groundedPlane = jasmine.createSpyObj('groundedAirport',['changeFlightStatus']);
    groundedPlane.inFlight = false
    emptyAirport = jasmine.createSpyObj('emptyAirport',['hasSpace']);
    emptyAirport.hasSpace.and.returnValue(true);
    emptyAirport.hangar = []
    fullAirport = jasmine.createSpyObj('fullAirport',['hasSpace']);
    fullAirport.hasSpace.and.returnValue(false);
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
    });

    it('Cannot land plane if it is not airborne', function(){
      expect( function(){ tc.land(groundedPlane,emptyAirport,goodWeather) } )
      .toThrow("Plane not airborne");
    });

    it('Cannot land if airport is full', function(){
      expect( function(){ tc.land(airbornePlane,fullAirport,goodWeather) } )
      .toThrow("Airport is full");
    });

    it('Calls changeFlightStatus on landing plane', function() {
      tc.land(airbornePlane,emptyAirport,goodWeather)
      expect(airbornePlane.changeFlightStatus()).toHaveBeenCalled()
    })

  });

});
