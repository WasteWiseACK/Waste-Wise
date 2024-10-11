/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const fs = require('fs');
const csv = require('csv-parser');

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('emissions').del();

  const results = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream('../../C02Database/CO2Converted.csv') // CSV file path
      .pipe(csv())
      .on('data', (data) => {
        // Convert data to float and ensure CensusTract is a string
        results.push({
          TotalEmissions: parseFloat(data.TotalEmissions),
          TransportationTotalEmissions: parseFloat(data.TransportationTotalEmissions),
          HousingTotalEmissions: parseFloat(data.HousingTotalEmissions),
          FoodTotalEmissions: parseFloat(data.FoodTotalEmissions),
          GoodsTotalEmissions: parseFloat(data.GoodsTotalEmissions),
          ServicesTotalEmissions: parseFloat(data.ServicesTotalEmissions),
          CensusTract: data.CensusTract,
        });
      })
      .on('end', async () => {
        await knex('emissions').insert(results);
        resolve();
      })
      .on('error', (error) => reject(error));
  });
};
