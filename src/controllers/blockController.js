const { fetchGasData } = require("../services/fetchData");
const getTransactionsByBlock = async (req, res) => {
  try {
    const gasData = await fetchGasData();

    const blocks = {};

    for (let transact of gasData) {
      blocks[transact["Block Number"]] =
        (blocks[transact["Block Number"]] || 0) + 1;
    }

    const transactionsByBlock = [];

    for (const key in blocks) {
      transactionsByBlock.push({
        block_number: key,
        total_transactions: blocks[key],
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

const getBlockDetails = async (req, res) => {
  try {
    const gasData = await fetchGasData();

    const blockDetails = {
      block_number: "",
      transaction_count: 0,
      timestamp: "",
    };

    // console.log(req.params.block_number, typeof req.params.block_number);
    for (let transact of gasData) {
      if (transact["Block Number"] === parseInt(req.params.block_number)) {
        blockDetails.transaction_count++;
        blockDetails.block_number = transact["Block Number"];
        blockDetails.timestamp = transact["Timestamp"];
      }
    }

    res.status(200).json({ status: "success", data: blockDetails });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "failed", message: "something went wrong!" });
  }
};

const transformBlockDetails = async (req, res) => {
  try {
    const transactionsData = await fetchGasData();

    const transformedData = transactionsData.slice(0, 10).map((transaction) => {
      const {
        "Max Priority Fee Per Gas": maxPriorityFeePerGas,
        Status,
        "Max Fee Per Gas": maxFeePerGas,
        Nonce,
        "Gas Used": gasUsed,
        ...restOfTransaction
      } = transaction;

      return restOfTransaction;
    });

    res.status(200).json({ status: "success", data: transformedData });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "failed", message: "something went wrong!" });
  }
};

module.exports = {
  getTransactionsByBlock,
  getAllBlockDetails,
  getBlockDetails,
  transformBlockDetails,
};
