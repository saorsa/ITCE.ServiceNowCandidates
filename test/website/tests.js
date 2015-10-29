describe('Website', function () {
	it('Should have language initialized', function () {
		var advertisment = new ServiceNowAdvertisment();
		console.log('Language is: ' + advertisment.language.locale);
		expect(advertisment.language.locale === 'de' || advertisment.language.locale === 'fr').toBe(true);
	});
	it('Should have default options initialized', function () {
		var advertisment = new ServiceNowAdvertisment();
		var options = advertisment.getOptions();
		expect(options.parentClass).toEqual('top-icon-row');
		expect(options.container).toEqual('span');
		expect(options.containerClass).toEqual('sn-adv');
	});
	it('Should accept options', function () {
		var advertisment = new ServiceNowAdvertisment({parentClass: 'a', container: 'b', containerClass: 'c'});
		var options = advertisment.getOptions();
		expect(options.parentClass).toEqual('a');
		expect(options.container).toEqual('b');
		expect(options.containerClass).toEqual('c');
	});
});
