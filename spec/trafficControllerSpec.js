describe('Traffic Controller', function(){
  let tc;
  let airbornePlane;
  let groundedPlane;
  let groundedPlaneTwo;
  let groundedPlaneThree;
  let fullAirport;
  let emptyAirport;
  let goodWeather;
  let badWeather;

  beforeEach(function(){
    tc = new TrafficController

    //planes
    airbornePlane = jasmine.createSpyObj('airbornePlane',['changeFlightStatus']);
    airbornePlane.inFlight = true;
    groundedPlane = jasmine.createSpyObj('groundedPlane',['changeFlightStatus']);
    groundedPlane.inFlight = false;
    groundedPlaneTwo = jasmine.createSpyObj('groundedPlaneTwo',['changeFlightStatus']);
    groundedPlaneTwo.inFlight = false;
    groundedPlaneThree = jasmine.createSpyObj('groundedPlaneThree',['changeFlightStatus']);
    groundedPlaneThree.inFlight = false;

    //airports
    emptyAirport = jasmine.createSpyObj('emptyAirport',['hasSpace']);
    emptyAirport.hasSpace.and.returnValue(true);
    emptyAirport.hangar = [];
    fullAirport = jasmine.createSpyObj('fullAirport',['hasSpace']);
    fullAirport.hasSpace.and.returnValue(false);

    //weather
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
      .toThrow("This is not an airborne plane");
    });

    it('Cannot land if airport is full', function(){
      expect( function(){ tc.land(airbornePlane,fullAirport,goodWeather) } )
      .toThrow("Airport is full");
    });

    it('Calls changeFlightStatus on landing plane', function() {
      tc.land(airbornePlane,emptyAirport,goodWeather)
      expect(airbornePlane.changeFlightStatus).toHaveBeenCalled()
    })

  });

  describe('#takeOff', function(){
    // trafficController.land(plane,airport,weather)

    it('removes correct plane from the hangar', function() {
      emptyAirport.hangar.push(groundedPlane)
      emptyAirport.hangar.push(groundedPlaneTwo)
      emptyAirport.hangar.push(groundedPlaneThree)
      tc.takeOff(groundedPlane,emptyAirport,goodWeather)
      expect(emptyAirport.hangar).not.toContain(groundedPlane)
    });

    it('returns the correct plane', function() {
      emptyAirport.hangar.push(groundedPlane)
      emptyAirport.hangar.push(groundedPlaneTwo)
      emptyAirport.hangar.push(groundedPlaneThree)
      expect(tc.takeOff(groundedPlaneTwo,emptyAirport,goodWeather)).toEqual(groundedPlaneTwo)
    })
  });

});
