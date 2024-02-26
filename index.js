const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Feedback = require("./model");

const app = express();

//Database connection link
const uri =
  "mongodb+srv://310AlphaGroup:feedback@310projects.slc5jhr.mongodb.net/?retryWrites=true&w=majority";

//Function to connect to the database
function connect() {
  mongoose.connect(uri);
  mongoose.connection.on("connected", () => {
    console.log("Database connected succesfully");
  });
}

connect();

//Set up Cross Origin Resource Sharing
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello world!');
})

//Endpoint to store data in the databasd
app.post("/api/store-data", async (req, res) => {
  try {
    //Destructure data sent from the front end
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

//Endpoint to fetch data from the database
app.get('/api/get-data', async (req, res) => {
  try {
    const Feedbacks = await Feedback.find()
    //Send response to the front end
    res.json(Feedbacks)
  } catch(error) {
    console.log('Error occurred: ', error);
  }
})

//Run server
app.listen(8000, () => {
  console.log("server started on port 8000");
});
