const fs = require('fs');
const jsonData = JSON.parse(fs.readFileSync('FoodData.json', 'utf8'));
// Convert JSON to CSV manually
function jsonToCsv(jsonData) {
  let csv = '';

  // Extract headers
  const headers = Object.keys(jsonData[0]);
  csv += headers.join(',') + '\n';

  // Extract values
  jsonData.forEach(obj => {
    const values = headers.map(header => obj[header]);
    csv += values.join(',') + '\n';
  });

  return csv;
}

// Convert JSON to CSV
const csvData = jsonToCsv(jsonData);

fs.appendFile('FoodDataConverted.csv', csvData, (err) => {
  if (err) {
    console.error('Error writing to file', err);
  } else {
    console.log('Data successfully appended to FoodDataConverted.csv');
  }
});
