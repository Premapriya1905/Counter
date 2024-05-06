const express = require('express');
const bodyParser= require('body-parser');
const mongoose = require('mongoose');
const { getRouter, postRouter } = require('./Routes/Authserver')
const app=express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const dataSchema = new mongoose.Schema({
    id: Number,
    name: String,
    password: String,
    age: Number
  });

  const DataModel = mongoose.model('Data', dataSchema);


  app.post('/users', (req, res) => { const user = new User({ name: req.body.name, email: req.body.email, age: req.body.age });

  user.save((err, user) => { if (err) return console.error(err); 
    res.send(user); }); });

  app.get('/users', (req, res) => { User.find((err, users) => { if (err) return console.error(err); 
    res.send(users); }); });

  app.put('/users/:id', (req, res) => { User.findOneAndUpdate( { _id: req.params.id }, { $set: req.body }, { new: true }, (err, user) => { if (err) return console.error(err); 
    res.send(user); } ); });

    app.delete('/users/:id', (req, res) => { User.findOneAndDelete({ _id: req.params.id }, (err, user) => { if (err) return console.error(err); 
        res.send(user); }); });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

