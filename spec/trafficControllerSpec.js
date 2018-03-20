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

    // bad_weather = jasmine.createSpyObj(‘Weather’,['isStormy']);
    // bad_weather.isStormy.and.returnValue(true);
  });

  describe('#land', function(){
    // trafficController.land(plane,airport,weather)

    it('Can store a plane in airport hangar', function() {
      goodWeather = jasmine.createSpyObj('Weather',{ 'isStormy': false });
      // goodWeather.isStormy.and.returnValue(false);
      tc.land(airbornePlane,emptyAirport,goodWeather)
      expect(emptyAirport.hangar).toContain(airbornePlane)
    });

    // it('Cannot land a plane in bad weather', function() {
    //   bad_weather
    //   expect( function(){ tc.land(airborne_plane,empty_airport,bad_weather) } )
    //   .toThrow(new Error("Cannot land in bad weather"));
    // })

  });

});
