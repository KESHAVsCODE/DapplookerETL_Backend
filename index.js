const app = require("./app");

app.listen(2000, (error) => {
  if (error) return console.log(error);
  console.log("Server listening on port", 2000);
});
