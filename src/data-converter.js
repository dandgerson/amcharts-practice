const path = require('path');
const xlsxj = require('xlsx-to-json');

xlsxj({
  input: path.join(__dirname, 'data' , 'Data.xlsx'),
  output: path.join(__dirname, 'data' , 'Data.json'),
}, (err, result) => {
  if (err) console.log(err);
  else console.log(result);
});

