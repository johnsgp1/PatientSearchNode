const express = require('express');
const app = express();

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

app.get('/', (req, res) => {
    res.send('Hello from App Engine!');
  });
app.get('/get-Patient', (req,res) => {
    res.send('Patient Details...');
    console.log('test');
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