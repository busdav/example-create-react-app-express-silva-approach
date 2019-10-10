const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// API calls
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.get('/', (req, res) => {
  res.render("index", { title: "Express" });
});

app.get('/blog', (req, res) => {
  res.send('Welcome to Blog');
});

  // Serve any static files
  app.use(express.static(path.join(__dirname, "public")));
  app.use(express.static(path.join(__dirname, 'client/build')));
    
  // Handle React routing, return all requests to React app
  // app.get('*', function(req, res) {
  //   res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  // });
  app.get(["/app", "/app/*"], function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });


// I don't need the below if statement at all - it is duplication, and what Silva had put in there 
// was simply the react routing (which he didn't use in development because he never BUILT the react app 
// in development. However, it does not harm at all if I put it outside of an 'if' statement, and, 
// if I want to BUILD the react app and have it served by Express server ALSO IN DEV, then I NEED 
// the react routing line outside of a 'if production' statement.)


// if (process.env.NODE_ENV === 'production') {
 
//   app.get('/', (req, res) => {
//     res.send('Welcome to Homepage');
//   });

//   app.get('/blog', (req, res) => {
//     res.send('Welcome to Blog');
//   });
  
//   // Serve any static files
//   app.use(express.static(path.join(__dirname, 'client/build')));
    
//   // Handle React routing, return all requests to React app
//   app.get('*', function(req, res) {
//     res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
//   });
// }

app.listen(port, () => console.log(`Listening on port ${port}`));