const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
app.use(cors());

require("dotenv").config();

app.use(express.json());

app.post("/createCard", async (req, res) => {
  const { name, description, startDate, dueDate } = req.body;

  const url = `https://api.trello.com/1/cards?idList=${process.env.idList}&key=${process.env.apiKey}&token=${process.env.apiToken}&name=${name}&desc=${description}&start=${startDate}&due=${dueDate}`;

  try {
    const response = await axios.post(url);
    if (response.status === 200) {
      res.json({ message: "Card created successfully" });
    } else {
      res.json({ error: "Card could not created" });
    }
  } catch (error) {
    res.json({ error: "There is an error" });
  }
});

app.listen(process.env.port, () => {
  try {
    console.log(`Server is running on port ${process.env.port}`);
  } catch (e) {
    console.log(e);
  }
});
