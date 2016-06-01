describe('Navbar', function() {
	beforeEach(function() {
		browser.get(browser.baseUrl);
	});

	it('should have a Home item', function() {
		home = element.all(by.css('.nav-link')).get(0);
		expect(home.getText()).toEqual('Home');
	});

	it('should have a Login item', function() {
		login = element.all(by.css('.pull-right li a')).get(0);
		expect(login.getText()).toEqual('Login');
	});

	it('should jumto login page when click on Login item', function() {
		login = element.all(by.css('.pull-right li a')).get(0);
		login.click();
		expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/login');
	});
});
