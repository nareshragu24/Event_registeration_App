var express = require('express')
var app = express()

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
require('dotenv/config');
var multer = require('multer');

//Getting the system date
var d = new Date();
var day = d.getDate();
var month=d.getMonth()+1;
var year=d.getFullYear();
var str=day+'/'+month+'/'+year;

//The schema for uploading the user's details
var imgModel = require('./model');
const connectDB = require('./DB/connection');
connectDB();
//Connecting to the database
// const URI = 'mongodb+srv://mohan:mohan@cluster0-cej4i.mongodb.net/test?retryWrites=true&w=majority';
// mongoose.connect('mongodb://localhost:27017/Forms');
// var db=mongoose.connection;
// db.on('error', console.log.bind(console, "connection error"));
// db.once('open', function(callback){
//     console.log("connection succeeded");
// })

//Uploading the image to MongoDB
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage });

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('./public'));



// Set EJS as templating engine
app.set("view engine", "ejs");

//Main Page
app.get('/', (req,res) => {
  res.render('app');
})

// Uploading the registered user
app.post('/sign_up', upload.single('image'), (req, res, next) => {
	 obj = {
    date:str,
    name: req.body.name,
    email: req.body.email,
    ticket: req.body.ticket,
    phone: req.body.phone,
    Regtype: req.body.type,
		img: {
			data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
			contentType: 'image/png/jpg'
		}
	}
	imgModel.create(obj, (err, item) => {
		if (err) {
			console.log(err);
		}
		else {
      // Retriving the Register ID
      var phone1 = obj.phone;
             imgModel.find({phone: phone1 }, (err,docs) => {
              if(err) console.log(err);
              else
              res.render('register',{docs: docs});
            });
		}
	});
});

//Admin page
app.get('/admin', (req,res) => {
  res.render('admin');
});


//Admin authentication
app.post('/login', (req,res) => {
  // var collection = db.collection("admins");
  // collection.findOne({username: username,password: password}, (err,user) => {
  //   if(err){
  //     console.log(err);
  //     return res.status(500).send();
  //   }
  //   if(!user){
  //     return res.status(404).send();
  //   }
  //   return
  var user = "mohan";
  var pass = "mohan";
  var username = req.body.name;
  var password = req.body.pass;
  if(user === username && pass === password)
  {
   res.redirect('/adminview');
 }
 else{
   res.redirect('/');
 }
 //});
});

//The PieChart Logic
app.get('/newroute', (req, res) => {
  imgModel.find({Regtype : "Self"}).count({}, function(err, a){
   if(err){
     console.log(err);
   }
   else{
     imgModel.find({Regtype : "Group"}).count({}, function(err, b)
     {
       if(err){
         console.log(err);
       }
       else{
        imgModel.find({Regtype : "Corporate"}).count({}, function(err, c)
     {
       if(err){
         console.log(err);
       }
       else{
        imgModel.find({Regtype : "Others"}).count({}, function(err, d)
     {
       if(err){
         console.log(err);
       }
       else{
        console.log("The count is:"+a+b+c+d);
        res.render('Piechart', {
            self: a,
            group: b,
            coporate: c,
            others: d
            });
          }
        });
       }
     });
    }
   });
  }
 });
});

//List of people registered
app.get('/adminview', (req, res) => {
    imgModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('AdminView', { items: items });
        }
    });
  });

// Getting the particular user's entry
app.get('/details/:regId', (req,res) => {
  imgModel.find({_id: req.params.regId }, (err,docs) => {
    if(err) console.log(err);
    else res.render('single',{users: docs})
  });
});

app.listen(process.env.PORT, err => {
	if (err)
		throw err
	console.log('Server started')
});
