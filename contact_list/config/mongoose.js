//require mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contact_list_db');//connect mongoose with db

const db = mongoose.connection;//check connection

// if any error print it
db.on('error', console.error.bind(console, 'connection error:'));

//up and running print the msg
db.once('open', function() {
  console.log("mongoose is connected to the db");
});