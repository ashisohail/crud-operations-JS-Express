const express = require("express");
const app = express();
const port = 3000; //This is a door to your application
const fs = require("fs/promises");
app.use(express.json());

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

//Get Request

app.get("/api/recipies", (req, res) => {
  fs.readFile("./db.json", "utf8").then((recipiesObj) => {
    const parsedRecipiesObj = JSON.parse(recipiesObj);
    res.send(parsedRecipiesObj);
  });
});

//Post Request

app.post("/api/recipies", (req, res) => {
  const newRecipie = req.body;
  fs.readFile("./db.json", "utf8").then((recipiesObj) => {
    const parsedRecipiesObj = JSON.parse(recipiesObj);
    parsedRecipiesObj.recipies.push(newRecipie);
    fs.writeFile("./db.json", JSON.stringify(parsedRecipiesObj)).then(() => {
      res.send(parsedRecipiesObj);
    });
  });
});

//Delete request

app.delete("/api/recipies/:id", (req, res) => {
  const recipieId = req.params.id;
  fs.readFile("./db.json", "utf8").then((recipiesObj) => {
    const parsedRecipiesObj = JSON.parse(recipiesObj);
    const filteredRecipie = parsedRecipiesObj.recipies.filter((recipie) => {
      return recipie.id !== recipieId;
    });
    fs.writeFile("./db.json", JSON.stringify(filteredRecipie)).then(() => {
      res.send(filteredRecipie);
    });
  });
});
