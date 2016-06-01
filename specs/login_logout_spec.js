describe("Login & Logout", function() {
	beforeEach(function() {
		browser.get('#/login');
	});

	it('should jump to /login when /login is accessed', function() {
		expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/login');
	});

	it('should have a navbar when /login is accessed', function() {
		navbar = element(by.css('nav'));
		expect(navbar.isPresent()).toBe(true);
	});

	it('should have a login button when /login is accessed', function() {
		loginButton = element(by.buttonText('Sign in with Google'));
		expect(loginButton.isPresent()).toBe(true);
	});

	it('ensures user can login & logout through Google', function() {
		element(by.buttonText('Sign in with Google')).click();
		browser.getAllWindowHandles().then(function (handles) {
      browser.driver.switchTo().window(handles[1]).then(function () {
	      browser.driver.findElement(by.id('Email')).sendKeys("framgia.fepas.test@gmail.com");
	      browser.sleep(2000);
	      browser.driver.findElement(by.id('next')).click();
	      browser.sleep(2000)
	      browser.driver.findElement(by.id('Passwd')).sendKeys("Fep@s2016");
	      browser.sleep(2000);
	      browser.driver.findElement(by.id('signIn')).click();
	      browser.sleep(3000);
    	});
	    browser.driver.switchTo().window(handles[0])
    });
		fullName = element(by.binding('vm.fullname')).getText();
		imageUrl = element(by.css('#avatar img')).getAttribute('src');

		expect(fullName).not.toBe(null);
		expect(imageUrl).not.toBe(null);
		expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/');

		element(by.css('.dropdown')).click();
    browser.sleep(3000);
		dropdownMenu = element(by.css('.dropdown-menu'));
		expect(dropdownMenu.isPresent()).toBe(true);
		logout = element(by.css('[ng-click="vm.logout()"]'));
		expect(logout.getText()).toEqual('Logout');
		logout.click();
		expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/');
	});
});
