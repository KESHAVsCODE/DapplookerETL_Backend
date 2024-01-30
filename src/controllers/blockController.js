const { fetchGasData } = require("../services/fetchData");
const getTransactionsByBlock = async (req, res) => {
  try {
    const gasData = await fetchGasData();

    const blockTransactions = {};

    for (let item of gasData) {
      blockTransactions[item["Block Number"]] =
        (blockTransactions[item["Block Number"]] || 0) + 1;
    }

    const transactionsByBlock = [];

    for (const key in blockTransactions) {
      transactionsByBlock.push({
        block_number: key,
        total_transactions: blockTransactions[key],
      });
    }

    res.status(200).json({ status: "success", data: transactionsByBlock });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "failed", message: "something went wrong!" });
  }
};

const getAllBlockDetails = async (req, res) => {
  try {
    const gasData = await fetchGasData();

    const blocks = {};

    for (let transact of gasData) {
      if (transact["Block Number"] in blocks) {
        blocks[transact["Block Number"]].transaction_count++;
        blocks[transact["Block Number"]].total_gas_price +=
          transact["Gas Price"];
      } else {
        blocks[transact["Block Number"]] = {
          block_number: transact["Block Number"],
          transaction_count: 0,
          timestamp: transact["Timestamp"],
          total_gas_price: 0,
        };
      }
    }

    const allBlocksDetails = [];

    for (const key in blocks) {
      allBlocksDetails.push({
        block_number: key,
        transaction_count: blocks[key].transaction_count,
        timestamp: blocks[key].timestamp,
        avg_gas_price: blocks[key].transaction_count
          ? blocks[key].total_gas_price / blocks[key].transaction_count
          : 0,
      });
    }

    res.status(200).json({ status: "success", data: allBlocksDetails });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "failed", message: "something went wrong!" });
  }
};

module.exports = { getTransactionsByBlock, getAllBlockDetails };
