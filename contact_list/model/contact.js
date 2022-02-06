const mongoose = require('mongoose'); // requiring mongoose

//creating Schema 
const contactSchema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    phone : {
        type : String,
        required : true,
        unique: true
    },
    email:{
        type:String,
        required:true,
        unique: true
    }
});

//creating collection (mongoose.model signifies collection);
const Contact = mongoose.model('Contact',contactSchema);

//export Contact using module.export
module.exports = Contact;