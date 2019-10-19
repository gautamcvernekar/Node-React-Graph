const express = require('express');
const mongoose = require('mongoose');
const Stat = require('./models/stats.model');
var bodyParser = require("body-parser");

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// starts a connection with mongoDb hosted on mlab
mongoose.connect('mongodb://gautam:gautam1@ds335668.mlab.com:35668/mern-graph',{
  useNewUrlParser:true,
  useCreateIndex:true
});
const connection = mongoose.connection;
connection.once('open',()=>{
  console.log("MongoDB connection successfull!")
});

// api to send the latest score to the frontend
app.get('/score', (req, res) => {
  // console.log("sadasda")
  Stat.find()
    .then(stats => {
      // console.log(stats[stats.length-1].points);
      res.json(stats[stats.length-1]);
    })
    .catch(err => res.status(400).json('Error: ' + err))
});

// api to delete all the records of the database
app.get('/delete', (req, res) => {
  Stat.deleteMany({}, function(){
    res.json('Documents Deleted')
  })
});

// api to update the sent scores to the database
app.post('/update',(req,res)=>{
  let points = req.body.points;
  let assists = req.body.assists;
  let rebounds = req.body.rebounds;

  const newStat = new Stat({
    points,
    assists,
    rebounds
  });

  newStat.save()
    .then(() => res.json('Stat Added'))
    .catch(err => res.status(400).json('Error:' + err));
})

const port = 5000;

// starts the server
app.listen(port, () => `Server running on port ${port}`);