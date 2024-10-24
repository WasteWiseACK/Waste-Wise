const FoodInsecurityData = require('../models/FoodInsecurity');

exports.listAllFoodData = async (req, res) => {
  try {
    const foodData = await FoodInsecurityData.list();
    res.send(foodData);
  } catch (error) {
    return res.status(500).send({ error: error.message })
  }

}
