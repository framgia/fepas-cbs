describe('Create room', function() {
  it('should add new room', function() {
    browser.get('http://localhost:5000/#/rooms/new');

    var randomVal = parseInt(Math.random() * 1000000000, 10);
    var name = 'name-' + randomVal;
    var description = 'description-' + randomVal;

    element(by.model('room.room.roomName')).sendKeys(name);
    element(by.model('room.room.roomDescription')).sendKeys(description);
    element(by.model('room.room.roomCapacity')).sendKeys(5);

    element(by.buttonText('create')).click();
    browser.sleep(2000);

    expect(browser.getCurrentUrl()).toMatch(/\/#\/$/);

    browser.get('http://localhost:5000/#/rooms');
    browser.sleep(2000);
    expect(element(by.xpath('//td[text()="' + name + '"]')).isPresent()).toBe(true);
    expect(element(by.xpath('//td[text()="' + description + '"]')).isPresent()).toBe(true);
  })
})
