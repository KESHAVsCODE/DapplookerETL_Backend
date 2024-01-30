const axios = require("axios");

require("dotenv").config();
const fetchTableData = async () => {
  try {
    const response = await axios.get(process.env.TABLE_DATA_URL);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.status) {
      const { status, data } = error.response; // Extracting error info from the API response
      console.error("Error occurred: ", status, data);
      const errorMessage = data.status
        ? data.status.error_message
        : "Unknown error";
      throw new Error(errorMessage);
    } else {
      console.error("Error message:", error.message);
      throw new Error("Request failed");
    }
  }
};

module.exports = { fetchTableData };
