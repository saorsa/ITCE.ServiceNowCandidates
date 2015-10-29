String.prototype.scrambleAndGenerateJSON = function () {
	var randomized = [];
	var text = this;
	for(var i = 0; i<text.length; i++) {
		randomized.push({
				id : i,
				char : text[i]
			});
	}
	var textLength = text.length;
	//while (picked.length < text.length) {
	//	var position = Math.floor(Math.random() * (textLength+1));
	//	if (picked.indexOf(position)<0) {		
	//		randomized.push({
	//			id : position,
	//			char : text[position]
	//		});
	//		picked.push(position);
	//	}
	//}
	for (var i=textLength-1; i>=0; i--) {
		var position = Math.floor(Math.random() * (i+1));
		var tmp = randomized[i];
		randomized[i] = randomized[position];
		randomized[position] = tmp;		
	}
	//console.log(picked.length + ' == ' + text.length);
	return randomized;
};
var sortScrambled = function (a, b) {
					if (a.id < b.id)
						return -1;
					if (a.id > b.id)
						return 1;
					return 0;
				};
describe('Show me the ', function () {
	it(' french text:', function () {
		var text = "Vous voulez devenir un membre de l' équipe d 'ITCE et de participer dans l' implémentation du système ServiceNow de l 'Enterprise Cloud? Envoyez-nous un email: jobs@itce.com et nous allons vous contacter.";
		var scrambledText = text.scrambleAndGenerateJSON();
		console.log(JSON.stringify(scrambledText));
		var sortedText = scrambledText.sort(sortScrambled).map(function(obj) { return obj.char; }).join('');		
		expect(sortedText).toEqual(text); 
	});
	it(' german text:', function () {
		var text = "Haben Sie auf JavaScript programmieren? Lösen Sie bitte folgende Aufgabe Wünschen Sie sich an ITCE Team zu schiessen und an der Überführung  des Enterprice Cloud Systemen  - Service Now zu beteiligen? Bitte senden Sie uns eine email an jobs@itce.com  und wir werden Sie  kontaktieren.";
		var scrambledText = text.scrambleAndGenerateJSON();
		console.log(JSON.stringify(scrambledText));
		var sortedText = scrambledText.sort(sortScrambled).map(function(obj) { return obj.char; }).join('');		
		expect(sortedText).toEqual(text); 
	});
});
