const axios = require("axios");
require("dotenv").config();

const fetchTableData = async () => {
  try {
    const response = await axios.get(process.env.TABLE_DATA_URL);
    return response.data;
  } catch (error) {
    throw new Error("Request failed");
  }
};

const fetchGasData = async () => {
  try {
    const response = await axios.get(process.env.GAS_DATA_URL);
    return response.data;
  } catch (error) {
    throw new Error("Request failed");
  }
};

module.exports = { fetchTableData, fetchGasData };
