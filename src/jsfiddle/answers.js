  sortedText = sortMe.sort(function (a, b) {
					if (a.id < b.id)
						return -1;
					if (a.id > b.id)
						return 1;
					return 0;
				}).map(function(obj) { return obj.char; }).join("");