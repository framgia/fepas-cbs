describe('Room list', function() {
  var originalTimeout;
  beforeEach(function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 200000;
  })

  it('should have a heading', function() {
    browser.get('http://localhost:5000/#/rooms');
    var heading = element(by.css('h1'))
    expect(heading.getText()).toEqual('List Rooms');
  });

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });
});
