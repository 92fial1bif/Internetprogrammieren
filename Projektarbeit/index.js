const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser')
const db = new sqlite3.Database('./db/database.db');
const mailer = require('nodemailer');

const port = process.env.PORT || 3000;
const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/public', express.static(process.cwd() + '/public'));
app.use( express.static( "public" ) );

// GET : Index 
app.get('/', async (req, res) => {
  db.all('SELECT * FROM comments', (err, comments) => {
    res.render('pages/index', { comments })
  });
});

app.get('/', (req, res) => {
  res.render('pages/', { success: true });
});

// GET : Kommentar 
app.get('/comment', async (req, res) => {
  db.all('SELECT * FROM comments', (err, comments) => {
    res.render('pages/comment', { comments})
  });
});

app.get('/api/comment', async (req, res) => {
  db.all('SELECT * FROM comments', (err, comments) => {
    res.json(comments);
  });
});

// GET : Spenden 
app.get('/spenden', (req, res) => {
  db.all('SELECT * FROM donation', (err, donation) => {
  res.render('pages/spenden', { donation });
  });
});

// GET : Spenden Summe
app.get('/spenden' , (req,res) =>{
  db.all('SELECT SUM(amount) FROM donation ',(err,donation_sum))
  res.json(donation_sum)
  console.log(donation_sum)
})

app.get('/api/spenden', async (req, res) => {
  db.all('SELECT * FROM donation', (err, donation) => {
    res.json(donation);
  });
});

// GET : Galerie 
app.get('/gallery', (req, res) => {
  res.render('pages/gallery', { success: true });
});

// GET : Anmelden 
app.get('/anmelden', (req, res) => {
  res.render('pages/anmelden', { success: true });
});

 // Auto-Mail
app.get('/anmelden' ,(req,res) =>{
  res.render('anmelden.ejs')
})

// GET : Mail

app.get('/',function(req,res){
  res.sendfile('index.html');
});
app.get('/send',function(req,res){
      rand=Math.floor((Math.random() * 100) + 54);
  host=req.get('host');
  link="http://"+req.get('host')+"/verify?id="+rand;
  mailOptions={
      to : req.query.to,
      subject : "Please confirm your Email account",
      html : "Vielen Dank für Ihre Unterstützung.<br>Wir halten Sie bei Veränderungen, immer auf dem neusten Stand.<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
  }
  console.log(mailOptions);
  smtpTransport.sendMail(mailOptions, function(error, response){
   if(error){
          console.log(error);
      res.end("error");
   }else{
          console.log("Message sent: " + response.message);
      res.end("sent");
       }
});
});

// GET : Mail

app.get('/verify',function(req,res){
  console.log(req.protocol+":/"+req.get('host'));
  if((req.protocol+"://"+req.get('host'))==("http://"+host))
  {
    console.log("Domain is matched. Information is from Authentic email");
    if(req.query.id==rand)
    {
        console.log("email is verified");
        res.end("<h1>Email "+mailOptions.to+" is been Successfully verified");
    }
    else
    {
        console.log("email is not verified");
        res.end("<h1>Bad Request</h1>");
    }
  }
  else
  {
    res.end("<h1>Request is from unknown source");
  }
  });
  

// GET : Partner 
app.get('/partner', (req, res) => {
  res.render('pages/partner', { success: true });
});

// GET : Unternehmen 
app.get('/unternehmen', (req, res) => {
  res.render('pages/unternehmen', { success: true });
});

// GET : Ziele
app.get('/zieleunderfolge', (req, res) => {
  res.render('pages/zieleunderfolge', { success: true });
});

// POST : Kommentar
app.post('/comment', (req, res) => {
  if (req.body.Vorname && req.body.Nachname && req.body.Kommentar) {
    db.run('INSERT INTO comments(Vorname, Nachname, Kommentar) VALUES (?, ?, ?);', [req.body.Vorname, req.body.Nachname, req.body.Kommentar], function (err) {
      if(err) {
        res.json({error: err});
      } else {
        res.json({
         ...req.body, 
      });
      }
    });
  } else {
    res.json({error: "Request body is not correct"});
    }

});

// POST : Anmelden
app.post('/anmelden', (req, res) => {
  if (req.body.Vorname, req.body.Nachname, req.body.Email, req.body.Passwort ) {
    db.run('INSERT INTO users (first_name, last_name, email, password) VALUES ( ?, ?, ?, ? );', [req.body.Vorname, req.body.Nachname, req.body.Email, req.body.Passwort], function (err) {
      if(err) {
        res.json({error: err});
      } else {
        console.log("test");
        res.json({
         ...req.body, 
      });
      }
    });
  } else {
    res.json({error: "Request body is not correct"});
    }
});

// POST : Spenden
app.post('/spenden', (req, res) => {
  if (req.body.Vorname, req.body.Nachname, req.body.Email, req.body.Betrag, req.body.IBAN ) {
    db.run('INSERT INTO donation (first_name, last_name, email, amount, iban) VALUES ( ?, ?, ?, ?, ? );', [req.body.Vorname, req.body.Nachname, req.body.Email, req.body.Betrag, req.body.IBAN], function (err) {
      if(err) {
        res.json({error: err});
      } else {
        console.log("test");
        res.json({
         ...req.body, 
      });
      }
    });
  } else {
    res.json({error: "Request body is not correct"});
    }
});

app.get('/api/spendengesamt', async (req, res) => {
  db.all('SELECT SUM(amount) AS gesamt FROM donation', (err, donation) => {
    res.json(donation);
  });
});

// Verbindung zur Domain

var smtpTransport = mailer.createTransport({
  service: "Gmail",
  auth: {
      user: "worldwidegreenhft@gmail.com",
      pass: "worldwidegreen0711"
  }
});
var rand,mailOptions,host,link;





const server = app.listen(port, () => {
 console.log(`Server listening on port ${port}…`)
});

module.exports = server
