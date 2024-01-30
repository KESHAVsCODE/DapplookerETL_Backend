const { fetchGasData } = require("../services/fetchData");
const getAvgGasPrice = async (req, res) => {
  try {
    const gasData = await fetchGasData();

    //this checks if the gas price not available for a particular item
    const validGasPrices = gasData.filter(
      (entry) =>
        typeof entry["Gas Price"] === "number" && !isNaN(entry["Gas Price"])
    );

    const avgGasPrice =
      validGasPrices.length > 0
        ? validGasPrices.reduce((acc, ele) => acc + ele["Gas Price"], 0) /
          validGasPrices.length
        : 0;

    res.status(200).json({ status: "success", data: { avgGasPrice } });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "failed", message: "something went wrong!" });
  }
};

module.exports = { getAvgGasPrice };
