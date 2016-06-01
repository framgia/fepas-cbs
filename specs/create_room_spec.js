describe('Create room', function() {
  var originalTimeout;
  var randomVal = parseInt(Math.random() * 1000000000, 10);
  var name = 'name-' + randomVal;
  var description = 'description-' + randomVal;
  beforeEach(function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 200000;
  });

  it('should add new room', function() {
    browser.get('http://localhost:5000/#/login');
    element(by.linkText('Sign in with Google')).click();
    browser.getAllWindowHandles().then(function (handles) {
      newWindowHandle = handles[1];
      browser.driver.switchTo().window(newWindowHandle).then(function () {
        browser.driver.findElement(by.id('Email')).sendKeys("framgia.fepas.test@gmail.com");
        browser.sleep(2000);
        browser.driver.findElement(by.id('next')).click();
        browser.sleep(2000)
        browser.driver.findElement(by.id('Passwd')).sendKeys("Fep@s2016");
        browser.sleep(2000);
        browser.driver.findElement(by.id('signIn')).click();
        browser.sleep(10000);
      });
      backWindowHandle = handles[0];
      browser.switchTo().window(backWindowHandle)
    });
    browser.sleep(10000);
    browser.get('http://localhost:5000/#/rooms/new');
    browser.sleep(10000);

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
    browser.sleep(5000);
  })


  it('should edit room', function() {
    browser.get('http://localhost:5000/#/rooms/'+ name + '/edit');
    browser.sleep(5000);
    var randomVal = parseInt(Math.random() * 1000000000, 10);
    var new_name = 'name-' + randomVal;
    var new_description = 'description-' + randomVal;

    element(by.model('room.room.roomName')).clear();
    element(by.model('room.room.roomName')).sendKeys(new_name);
    element(by.model('room.room.roomDescription')).clear();
    element(by.model('room.room.roomDescription')).sendKeys(new_description);
    element(by.model('room.room.roomCapacity')).clear();
    element(by.model('room.room.roomCapacity')).sendKeys(5);

    element(by.buttonText('update')).click();
    browser.sleep(2000);
    browser.get('http://localhost:5000/#/rooms');
    browser.sleep(5000);
    expect(element(by.xpath('//td[text()="' + new_name  + '"]')).isPresent()).toBe(true);
    expect(element(by.xpath('//td[text()="' + new_description + '"]')).isPresent()).toBe(true);
    browser.sleep(2000);
  })

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });
})
