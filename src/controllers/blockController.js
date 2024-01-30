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
      transaction_count: 1,
      timestamp: "",
    };

    // console.log(req.params.block_number, typeof req.params.block_number);
    for (let transact of gasData) {
    }

    res.status(200).json({ status: "success", data: blockDetails });
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
};

// {
//   "status": "success",
//   "data": [
//     {
//       "block_number": "18825772",
//       "transaction_count": 35,
//       "timestamp": "2023-12-20T07:56:11",
//       "avg_gas_price": 54211256775.08572
//     },
//     {
//       "block_number": "18825773",
//       "transaction_count": 180,
//       "timestamp": "2023-12-20T07:56:23",
//       "avg_gas_price": 56733394304.78889
//     },
//     {
//       "block_number": "18825774",
//       "transaction_count": 220,
//       "timestamp": "2023-12-20T07:56:35",
//       "avg_gas_price": 54982417132.48182
//     },
//     {
//       "block_number": "18825775",
//       "transaction_count": 152,
//       "timestamp": "2023-12-20T07:56:47",
//       "avg_gas_price": 54270661005.61842
//     },
//     {
//       "block_number": "18825776",
//       "transaction_count": 120,
//       "timestamp": "2023-12-20T07:56:59",
//       "avg_gas_price": 56124746324.975
//     },
//     {
//       "block_number": "18825777",
//       "transaction_count": 172,
//       "timestamp": "2023-12-20T07:57:11",
//       "avg_gas_price": 60535158862.825584
//     },
//     {
//       "block_number": "18825778",
//       "transaction_count": 131,
//       "timestamp": "2023-12-20T07:57:23",
//       "avg_gas_price": 58604485799.46565
//     },
//     {
//       "block_number": "18825779",
//       "transaction_count": 160,
//       "timestamp": "2023-12-20T07:57:35",
//       "avg_gas_price": 52930389032.875
//     },
//     {
//       "block_number": "18825780",
//       "transaction_count": 183,
//       "timestamp": "2023-12-20T07:57:47",
//       "avg_gas_price": 51670216109.748634
//     },
//     {
//       "block_number": "18825781",
//       "transaction_count": 140,
//       "timestamp": "2023-12-20T07:57:59",
//       "avg_gas_price": 77264643387.63571
//     },
//     {
//       "block_number": "18825782",
//       "transaction_count": 197,
//       "timestamp": "2023-12-20T07:58:11",
//       "avg_gas_price": 53723941627.80203
//     },
//     {
//       "block_number": "18825783",
//       "transaction_count": 134,
//       "timestamp": "2023-12-20T07:58:23",
//       "avg_gas_price": 54789176573.16418
//     },
//     {
//       "block_number": "18825784",
//       "transaction_count": 153,
//       "timestamp": "2023-12-20T07:58:35",
//       "avg_gas_price": 53717439395.43791
//     },
//     {
//       "block_number": "18825785",
//       "transaction_count": 9,
//       "timestamp": "2023-12-20T07:58:47",
//       "avg_gas_price": 52420235986.888885
//     }
//   ]
// }
