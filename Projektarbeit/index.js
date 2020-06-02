const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser')
const db = new sqlite3.Database('./db/database.db');

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


const server = app.listen(port, () => {
 console.log(`Server listening on port ${port}…`)
});

module.exports = server
