const { fetchTableData } = require("../services/fetchData");

const getTables = async (req, res) => {
  try {
    const response = await fetchTableData();
    console.log("Total tables is ", response?.data.__schema.types.length);

    const filteredTables = response?.data.__schema.types.filter((table) =>
      isValidTable(table)
    );
    const listOfTables = filteredTables.map((table) => ({
      tableName: table.name,
    }));

    res.status(200).json({ status: "success", data: listOfTables });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "failed", message: "something went wrong!" });
  }
};

const isValidTable = (entityDefinition) => {
  return (
    entityDefinition.fields !== null &&
    entityDefinition.fields !== "" &&
    entityDefinition.fields !== undefined &&
    entityDefinition.fields.length > 0 &&
    !entityDefinition.name.startsWith("_") &&
    !this.entitiesToExclude.includes(entityDefinition.name.toLowerCase())
  );
};

module.exports = { getTables };
