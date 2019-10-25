const express = require('express');
const app = express();
const fs =require('fs');
const ejs=require('ejs');
var _ = require('underscore');
let ejsHtml = require('ejs-html')
var  path = __dirname + '/function.ejs'
, str = fs.readFileSync(path, 'utf8');
var  path1 = __dirname + '/test.html'
var mustache = require('mustache');

//Below code is used to set access permisions such as CORS
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    // Pass to next layer of middleware
    next();
  });



  var tpl=_.template(fs.readFileSync(path1, 'utf8'));
  var htmls = _.template('<li><%= name %></li>', { name: 'John Smith' });
  console.log(htmls);

  //Below code section uses EJS templating
  //app.set('view engine', 'EJS')
  var users = [];

       users.push({ name: 'Tobi', age: 2, species: 'ferret' })
       users.push({ name: 'Loki', age: 2, species: 'ferret' })
       users.push({ name: 'Jane', age: 6, species: 'ferret' })

var ret = ejs.render(str, {
  users: users,
  filename: path
});

let html=ejsHtml.render(ret);

//console.log(html);
app.get('/', (req, res) => {
    res.send('Hello from App Engine!');
  });

  //This service uses mustache templating
app.get('/get-Patient', (req,res) => {
    var demoData = [{ // dummy data to display
        "name":"Steve Balmer",
        "company": "Microsoft",
        "systems": [{
        "os":"Windows XP"
        },{
        "os":"Vista"
        },{
        "os":"Windows 7"
        },{
        "os":"Windows 8"
        }]
        },{
        "name":"Steve Jobs",
        "company": "Apple",
        "systems": [{
        "os":"OSX Lion"
        },{
        "os":"OSX Leopard"
        },{
        "os":"IOS"
        }]
        },{
        "name":"Mark Z.",
        "company": "Facebook"
        }];
        res.writeHead(200,{'Content-Type':'text/html'});
        var slug =[req.params.slug][0]; // grab the page slug
        var rData = {records:demoData}; // wrap the data in a global object... (mustache starts from an object then parses)
        var page = fs.readFileSync(path1, 'utf8'); // bring in the HTML file
        var html = mustache.to_html(page, rData); // replace all of the data
        res.write(html); // send to client
        res.end();
});
app.get('/QueryBuilder',(req,res)=>{

    //res.sendFile(__dirname+"/index.html");
   // res.render('index', {"name": "Sherlynn"});
    res.writeHead(200,{'Content-Type':'text/html'});

    fs.readFile(__dirname+"/index.html",{name:'test'},function(error,data){
        if(error){
            res.writeHead(404);
            res.write('File Not Found')
        }else{
            res.write(html);
        }
        res.end();
    })
});
app.post('/getpatientDetails',(req,res)=>{
    var test=
        [{
           name:'Test',
           id:1

        },
        {
            name:'Tester',
            id:2
        }]
    
    res.status(200).json({
        'title': 'Payment Successful',
        'result': test
      });
    res.set({'Content-Type': 'application/json'});
    res.send(test);
});
  
  // Listen to the App Engine-specified port, or 8080 otherwise
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
  });