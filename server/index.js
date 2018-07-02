const express = require("express");
const bodyParser = require("body-parser");
const massive = require("massive");
require("dotenv").config();
const cors = require("cors");
const controller = require("./controller");

const app = express();
app.use(bodyParser.json());
app.use(cors());

massive(process.env.CONNECTION_STRING)
  .then(dbInstance => {
    app.set("db", dbInstance);
  })
  .catch(err => console.log(err));

const port = 3001;

app.get("/api/family", controller.getFamily);
app.post("/api/family", controller.addFamily);
app.delete("/api/family/:id", controller.deleteFamily);
//put is adding items that do not yet exist --- axios#put(url[, data[, config]])
//app.put("/api/family/:id", controller.putFamily);
//patch is changing existing data --- axios#patch(url[, data[, config]])
//app.patch("/api/family/:id", controller.patchFamily);

app.get("/api/providers", controller.getProviders);
app.post("/api/providers", controller.addProvider);
app.delete("/api/providers/:id", controller.deleteProvider);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
