const knex = require('../db/knex');

class FoodInsecurityData {
  constructor({ id, BORO, ZIP_CODE, count, longitude, latitude, bbl }) {
    this.id = id;
    this.BORO = BORO;
    this.ZIP_CODE = ZIP_CODE;
    this.count = count;
    this.longitude = longitude;
    this.latitude = latitude;
    this.bbl = bbl;
  }

  static async list() {
    const result = await knex('Food_Insecurity');
    return result.map((rawFoodData) => new FoodInsecurityData(rawFoodData));
  };

}

module.exports = FoodInsecurityData