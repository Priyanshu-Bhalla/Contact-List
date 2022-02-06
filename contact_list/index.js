const express = require('express');
const req = require('express/lib/request');
const path = require('path');
const port = 8001;

const db = require('./config/mongoose');
const Contact = require('./model/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('./assests'));


app.get('/addContact', function(req, res){
    return res.render('addContacts', {
        title: "New Contact"
    });
  
});
app.get('/UpdatingContact', function(req, res){
    console.log(res.query.id);
    return res.render('updateContact', {
        title: "Update Contact"
    });
  
});


app.get('/', function(req, res){
        Contact.find({},function(err,contacts){
            if(err){
                console.log("Error in fetching data from db");
                return;
            }
            return res.render('home',{
                title: "Contact List",
                contact_list: contacts
            });

        });
});
app.post('/create-contact', function(req, res){
    
    // contactList.push(req.body);

    //creating the collection
    Contact.create({
        name:req.body.name,
        phone : req.body.phone,
        email:req.body.email
    }, function(err,newContact){
        if(err){
            console.log('error in creating the contact');
            return;
        }
        console.log('*******',newContact);
        return res.redirect('/');
    })// we create a call back function in case any error occurs and creates the new contact we just created

});

app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
})


app.get('/delete-contact/', function(req, res){
     console.log(req.query);
    let id = req.query.id

    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log("error in deleting the contact");
        }

        return res.redirect('back');
    });
    
});
app.post('/update-contact/', function(req, res){
    console.log(req.query.id);
    Contact.findByIdAndUpdate(req.query.id, req.body, function(err, user){
        return res.redirect('/');
    });
    
});