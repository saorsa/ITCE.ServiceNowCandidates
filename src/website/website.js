var ServiceNowAdvertisment = function (options) {
	var options = options || {
		parent: '.adv',
		container: 'span',
		containerClass: 'sn-adv',
		target: '_blank',
		action : 'insert'
	};
	var self = this;
	self.language = '';
	var advertismentResources = [{
			locale : 'de',
			text : 'Haben Sie auf JavaScript programmieren?  Lösen Sie bitte folgende Aufgabe',
			url: 'http://jsfiddle.net/anjc4qe0/'
		}, {
			locale : 'fr',
			text : 'Vous avez déjà intégré du JavaScript? Il faut résoudre cette tâche. ',
			url: 'http://jsfiddle.net/exgcxtvo/'
		}
	];
	this.init = function () {
		var resourcesLength = advertismentResources.length;
		self.language = advertismentResources[(Math.floor(Math.random() * resourcesLength)+1) - 1];
	};
	this.getOptions = function () { return options; };
	this.insertAdvertisment = function () {
		var container = document.querySelector(options.parent);
		var advertisment = document.createElement(options.container);
		advertisment.className = options.containerClass;
		var link = document.createElement('a');
		link.href = self.language.url;
		link.innerHTML = self.language.text;
		link.target = options.target;
		advertisment.appendChild(link);
		switch(options.action) {
			case 'append':
				container.appendChild(advertisment);
				break;
			case 'insert':
				container.insertBefore(advertisment, container.firstChild);
				break;
		}
	};
	this.init();
}
