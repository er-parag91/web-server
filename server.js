const express = require ('express');
const hbs = require ('hbs');
const fs = require ('fs');
let app = express ();
hbs.registerPartials (__dirname + '/views/partials');
hbs.registerHelper ('getCurrentYear', () => {
  return new Date ().getFullYear ();
});

hbs.registerHelper ('screamIt', text => {
  return text.toUpperCase ();
});
app.set ('view engine');
app.use ((req, res, next) => {
  let now = new Date ().toString ();
  let log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile ('server.log', log + '\n', err => {
    if (err) {
      console.log (err);
    }
  });
  console.log (log);
  res.render ('maintanance.hbs', {
    pageTitle: 'I am developer',
  });
});
app.use (express.static (__dirname + '/public'));
app.get ('/about', (req, res) => {
  res.render ('about.hbs', {
    pageTitle: 'About me',
  });
});

app.get ('/', (req, res) => {
  res.render ('home.hbs', {
    pageTitle: 'Welcome to my home page',
  });
});

app.get ('/bad', (req, res) => {
  res.send ({
    errorMessage: 'Not able to connect',
  });
});
app.listen (3000, () => {
  console.log ('Started');
});
