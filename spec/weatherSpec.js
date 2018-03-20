describe('Weather', function() {

  describe('#isStormy', function(){
    it('randomly returns true', function(){
      weather = new Weather
      spyOn(Math, 'random').and.returnValue(0.09);
      expect(weather.isStormy()).toBe(true)
    });

    it('randomly returns false', function(){
      weather = new Weather
      spyOn(Math, 'random').and.returnValue(0.40);
      expect(weather.isStormy()).toBe(false)
    });
  });

});
