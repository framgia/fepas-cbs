describe('Edit Profile', function() {
  var originalTimeout;
  beforeEach(function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 200000;
  })

  it('should have a heading', function() {
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
        browser.sleep(2000);
      });
      backWindowHandle = handles[0];
      browser.switchTo().window(backWindowHandle)
    });
    browser.sleep(3000);
    browser.get('http://localhost:5000/#/users/edit');
    var heading = element(by.css('h1'))

    expect(heading.getText()).toEqual('Edit profile');
  });


  it('can update profile', function(){
    browser.get('http://localhost:5000/#/users/edit');

    var randomVal = parseInt(Math.random() * 1000000000, 10);
    var name = 'name-' + randomVal;
    var division = 'division-' + randomVal;
    var age = randomVal;

    element(by.model('user.info.name')).sendKeys(name);
    element(by.model('user.info.division')).sendKeys(division);
    element(by.model('user.info.age')).sendKeys(age);
    element(by.buttonText('Save Changes')).click();

    browser.get('http://localhost:5000/#/users/edit');
    browser.sleep(4000);
    expect(element(by.model('user.info.name')).getAttribute('value')).toEqual(name);
    expect(element(by.model('user.info.division')).getAttribute('value')).toEqual(division);
    expect(element(by.model('user.info.age')).getAttribute('value')).toEqual(age.toString());
  });

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });
});
