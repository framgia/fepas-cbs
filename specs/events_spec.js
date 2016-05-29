describe('Events',function() {
	beforeEach(function() {
		browser.get(browser.baseUrl + '/events');
	});

  it('should have filter conditions', function() {
  	timeFromLabel = element.all(by.css('p strong')).get(0);
  	expect(timeFromLabel.getText()).toEqual('Time From:');
  	timeFromInput = element(by.model('eventList.timeFrom')).clear();
  	timeFromInput.sendKeys('datetime');
  	expect(element(by.model('eventList.timeFrom')).getAttribute('value')).toEqual('datetime');

  	timeToLabel = element.all(by.css('p strong')).get(1);
  	expect(timeToLabel.getText()).toEqual('Time To:');
  	timeToInput = element(by.model('eventList.timeTo')).clear();
  	timeToInput.sendKeys('datetime');
  	expect(element(by.model('eventList.timeTo')).getAttribute('value')).
  		toEqual('datetime');

  	roomLabel = element(by.css('.bottom-5 strong'));
  	expect(roomLabel.getText()).toEqual('Room:');
  	allRooms = element.all(by.options('room for room in eventList.rooms'))
  	browser.sleep(5000);
  	roomCount = element.all(by.css('.bottom-5 select option')).count();
  	expect(allRooms.count()).toEqual(roomCount);
  	expect(allRooms.first().getText()).toEqual('Select room');

  	seatsLabel = element(by.css('.bottom-10 strong'));
  	expect(seatsLabel.getText()).toEqual('Seats:');
  	allSeats = element.all(by.options('seat for seat in eventList.seats'))
  	browser.sleep(5000);
  	seatCount = element.all(by.css('.bottom-10 select option')).count();
  	expect(allSeats.count()).toEqual(seatCount);
  	expect(allSeats.first().getText()).toEqual('Select seats');
  });

  it('booked events and rooms detail change by filter conditions', function() {
  	timeFromInput = element(by.model('eventList.timeFrom')).clear();
  	timeFromInput.sendKeys('Sun May 20 2016 00:00:00 GMT+0700 (ICT)');
  	timeToInput = element(by.model('eventList.timeTo')).clear();
  	timeToInput.sendKeys('Sun May 23 2016 23:59:59 GMT+0700 (ICT)');
  	browser.sleep(5000);
  	expect(element(by.css('.fc-event-container')).isPresent()).toBe(true);

  	element.all(by.css('.bottom-5 select option:nth-child(2)')).click();
  	browser.sleep(5000);
  	expect(element(by.css('.fc-event-container')).isPresent()).toBe(false);
  	selectRoom = element.all(by.css('.bottom-5 select option:nth-child(2)')).
  	get(0).getText();
  	expect(element.all(by.repeater('room in eventList.allRooms')).get(0).element(by.css('.room-name')).getText()).toEqual(selectRoom);

  	element.all(by.css('.bottom-10 select option:nth-child(2)')).click();
  	browser.sleep(5000);
  	expect(element(by.css('.fc-event-container')).isPresent()).toBe(false);
  	selectSeat = element.all(by.css('.bottom-10 select option:nth-child(2)')).
  	get(0).getText();
  	expect(element.all(by.repeater('room in eventList.allRooms')).get(0).element(by.css('.room-capacity')).getText()).toEqual(selectSeat);
	})
});
