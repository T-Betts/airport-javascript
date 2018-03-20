describe('Traffic Controller', function(){
  let tc;
  let airbornePlane;
  let groundedPlane;
  let groundedPlaneTwo;
  let groundedPlaneThree;
  let fullAirport;
  let emptyAirport;
  let airportWithoutPlane;
  let goodWeather;
  let badWeather;

  beforeEach(function(){
    tc = new TrafficController

    //planes
    airbornePlane = jasmine.createSpyObj('airbornePlane',['changeFlightStatus']);
    airbornePlane.inFlight = true;
    groundedPlane = jasmine.createSpyObj('groundedPlane',['changeFlightStatus']);
    groundedPlane.inFlight = false;
    groundedPlane.name = 'one';
    groundedPlaneTwo = jasmine.createSpyObj('groundedPlaneTwo',['changeFlightStatus']);
    groundedPlaneTwo.inFlight = false;
    groundedPlaneTwo.name = 'two';
    groundedPlaneThree = jasmine.createSpyObj('groundedPlaneThree',['changeFlightStatus']);
    groundedPlaneThree.inFlight = false;
    groundedPlaneThree.name = 'three';

    //airports
    emptyAirport = jasmine.createSpyObj('emptyAirport',['hasSpace','hasPlane']);
    emptyAirport.hasSpace.and.returnValue(true);
    emptyAirport.hasPlane.and.returnValue(1);
    emptyAirport.hangar = [];
    airportWithoutPlane = jasmine.createSpyObj('emptyAirport',['hasSpace','hasPlane']);
    airportWithoutPlane.hasPlane.and.returnValue(false);
    airportWithoutPlane.hangar = [];
    fullAirport = jasmine.createSpyObj('fullAirport',['hasSpace','hasPlane']);
    fullAirport.hasSpace.and.returnValue(false);
    fullAirport.hasPlane.and.returnValue(4);
    fullAirport.hangar = [
      groundedPlane,
      groundedPlane,
      groundedPlane,
      groundedPlane,
      groundedPlaneTwo,
      groundedPlane,
      groundedPlane,
      groundedPlane,
      groundedPlane,
      groundedPlane
    ];

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
      tc.takeOff(groundedPlaneTwo,emptyAirport,goodWeather)
      expect(emptyAirport.hangar).not.toContain(groundedPlaneTwo)
    });

    it('returns the correct plane', function() {
      expect(tc.takeOff(groundedPlaneTwo,fullAirport,goodWeather)).toEqual(groundedPlaneTwo)
    })

    it('Cannot take off in bad weather', function() {
      expect( function(){ tc.takeOff(groundedPlaneTwo,fullAirport,badWeather) } )
      .toThrow("Cannot take off in bad weather");
    });

    it('Plane must be in airport', function() {
      expect( function(){ tc.takeOff(groundedPlaneThree,fullAirport,badWeather) } )
      .toThrow("Plane is not in this airport");
    })

    it('Calls changeFlightStatus on departing plane', function() {
      tc.takeOff(groundedPlaneTwo,fullAirport,goodWeather)
      expect(groundPlaneTwo.changeFlightStatus).toHaveBeenCalled()
    })
  });

});
