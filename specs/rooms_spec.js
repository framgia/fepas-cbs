describe('Room list', function() {
  it('should have a heading', function() {
    browser.get('http://localhost:5000/#/rooms');

    var heading = element(by.css('h1'))
    expect(heading.getText()).toEqual('List Rooms');
  });
});
