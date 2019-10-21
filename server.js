const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const patientRouter=require("./routes/index");
const doctorRouter=require("./routes/docdetails");
const bodyParser=require('body-parser');
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());
const url = 'mongodb+srv://dbuser:testing123@nodejs-tutorial-hfvrp.mongodb.net/tutorial?retryWrites=true&w=majority';

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Database connected successfully");
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:true
}));
app.use('/patients',patientRouter);
app.use('/doctors',doctorRouter);
app.listen(port, () => {
  console.log(`server is running on port:${port}`);
});
