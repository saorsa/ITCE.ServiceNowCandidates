var ServiceNowAdvertisment = function (options) {
	var options = options || {
		parentClass: 'top-icon-row',
		container: 'span',
		containerClass: 'sn-adv',
		target: '_blank'
	};
	var self = this;
	self.language = '';
	var advertismentResources = [{
			locale : 'de',
			text : 'Haben Sie auf JavaScript programmieren?  Lösen Sie bitte folgende Aufgabe',
			url: '#'
		}, {
			locale : 'fr',
			text : 'Vous avez déjà intégré du JavaScript? Il faut résoudre cette tâche. ',
			url: '#'
		}
	];
	this.init = function () {
		var resourcesLength = advertismentResources.length;
		self.language = advertismentResources[(Math.floor(Math.random() * resourcesLength)+1) - 1];
	};
	this.getOptions = function () { return options; };
	this.insertAdvertisment = function () {
		var container = document.getElementsByClassName(options.parentClass)[0];
		var advertisment = document.createElement(options.container);
		var link = document.createElement('a');
		link.href = self.language.url;
		link.innerHTML = self.language.text;
		link.target = options.target;
		link.class = self.language.text;
		advertisment.appendChild(link);
		container.appendChild(advertisment);
	};
	this.init();
}
