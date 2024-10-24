/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const fs = require('fs');
const csv = require('csv-parser');

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('Food_Insecurity').del();

  const results = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream('../FoodInsecurityDatabase/FoodDataConverted.csv') // CSV file path
      .pipe(csv())
      .on('data', (data) => {
        // Convert data to float and ensure CensusTract is a string
        results.push({
          BORO: data.BORO,
          ZIP_CODE: data['ZIP CODE'],
          count: parseFloat(data.count),
          longitude: parseFloat(data.longitude),
          latitude: parseFloat(data.latitude),
          bbl: parseFloat(data.bbl),
        });
      })
      .on('end', async () => {
        await knex('Food_Insecurity').insert(results);
        resolve();
      })
      .on('error', (error) => reject(error));
  });
};
