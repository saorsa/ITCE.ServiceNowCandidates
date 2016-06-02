var parser = require('node-xlsx');
const workSheetsFromFile = parser.parse(`${__dirname}/sampleShet.xlsx`);
console.log(JSON.stringify(workSheetsFromFile));
console.log(workSheetsFromFile[0].name);
for(var row of workSheetsFromFile[0].data) {
  console.log(row[0]);
}
