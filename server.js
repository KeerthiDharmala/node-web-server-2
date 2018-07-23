const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) =>{
  var now = new Date().toString();
  var log = `${now} : ${req.method} : ${req.url}`;
  console.log(log) ;
  fs.appendFileSync('server.log', log + '\n', (err) =>{
    if(err){
      console.log('Unable to append to server.log file');
    }
  });
 next();
});
// app.use((req, res, next)=>{
//   res.render('maintainance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})
app.get('/',(request, response)=>{
response.render('welcome.hbs',{
  newTitle : 'Welcome Page',

  welcomeMessage : 'Hello Welcome to the new code project'
});
});

app.get('/about',(request, response) => {
  response.render('about.hbs',{
    newTitle:'About page from server.js',

  });
});

app.get('/bad',(request, response) => {
  response.send({
    name : 'Error',
    errorMessage : 'This is a error message in /bad'
  });
});
app.listen(3000,()=>{
  console.log('server is up here');
});
