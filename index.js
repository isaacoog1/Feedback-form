const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Feedback = require("./model");

const app = express();

const uri =
  "mongodb+srv://310AlphaGroup:feedback@310projects.slc5jhr.mongodb.net/?retryWrites=true&w=majority";

function connect() {
  mongoose.connect(uri);
  mongoose.connection.on("connected", () => {
    console.log("Database connected succesfully");
  });
}

connect();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (raq, res) => {
  res.send('Hello world!');
})

app.post("/api/store-data", async (req, res) => {
  try {
    const { fullname, email, rating, message } = req.body;
    const newFeedback = new Feedback({
      fullname,
      email,
      rating,
      message,
    });
    newFeedback
      .save()
      .then(() => {
        res.send("Data saved successfully");
      })
      .catch((error) => res.status(400).json("Error: ") + error);
  } catch (err) {
    console.log("An error occured ", err);
  }
});

app.get('/api/get-data', async (req, res) => {
  try {
    const Feedbacks = await Feedback.find()
    res.json(Feedbacks)
  } catch(error) {
    console.log('Error occurred: ', error);
  }
})

app.listen(8000, () => {
  console.log("server started on port 8000");
});
