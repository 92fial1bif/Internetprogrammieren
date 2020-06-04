// THIS IS FOR AUTOMATED TESTING
if (typeof module !== 'undefined') {
  global.$ = require('jquery')
}
// END

$( document ).ready((() => {
  // DOMContent is laoded, now we can start checking HTML Elements
  // If we dont "wait" for document to be ready, we cannot access HTML elements
  // for testing purposes, you can use a "debugger;" statement or also "console.log(element)"
  console.log('DOM is ready!');
  
var commenttable = document.getElementById ('comment-table')
var donatetable = document.getElementById ('donate-table')
var donatesumtable = document.getElementById('donate-sum')
 
// Seite prüfen :)
  if (commenttable)
  {
    getData();
  
  } 
  if (donatetable) {
    getDonate();// TODO: Implement getData Method
  
  }
  // console.log(donatesumtable) 
  if(donatesumtable)
  {
    sumDonate();
  }


  const form = $('#hft-shoutbox-form')
  const input = $('#hft-shoutbox-form-input-vorname')
  const input2 = $('#hft-shoutbox-form-input-nachname')
  const textarea = $('#hft-shoutbox-form-textarea-kommentar')

  // Register
  const registerform = $('#register-form')
  const registerinput = $('#register-form-firstname')
  const registerinput1 = $('#register-form-lastname')
  const registerinput2 = $('#register-form-email')
  const registerinput3 = $('#register-form-password')

  // Spenden
  const donateform = $('#donate-form')
  const donateinput = $('#donate-form-firstname')
  const donateinput1 = $('#donate-form-lastname')
  const donateinput2 = $('#donate-form-email')
  const donateinput3 = $('#donate-form-amount')
  const donateinput4 = $('#donate-form-iban')

 // Spenden Prüfen
 donateform.on('keyup', (event) =>
 {
   if (formElementIsValid(donateinput.val(), 3) && formElementIsValid(donateinput1.val(), 3) && emailFieldIsValid(donateinput2.val()) && amountFieldIsValid(donateinput3.val(), 1) && formElementIsValid(donateinput4.val(), 5)) {
     toggleAlertBox(false)
     toggleSubmit(false)
   } else {
     toggleAlertBox(true)
     toggleSubmit(true)
   }

 })


 // Spenden abschicken
 donateform.on('submit', async(event) => {
   event.preventDefault();
   await donate(donateinput.val(),donateinput1.val(), donateinput2.val(), donateinput3.val(),donateinput4.val(),);
   await getDonate();
   await sumDonate();
 })

  // Registrierung Prüfen
  registerform.on('keyup', (event) =>
  {
    if (formElementIsValid(registerinput.val(), 3) && formElementIsValid(registerinput1.val(), 3) && emailFieldIsValid(registerinput2.val()) && formElementIsValid(registerinput3.val(), 5)) {
      toggleAlertBox(false)
      toggleSubmit(false)
    } else {
      toggleAlertBox(true)
      toggleSubmit(true)
    }
  })

  // Registierung abschicken
  registerform.on('submit', async(event) => {
    event.preventDefault();
    await signin(registerinput.val(),registerinput1.val(), registerinput2.val(), registerinput3.val(),);
  })
  

  // Kommentar Prüfen
  form.on('keyup', (event) => {
    if (formElementIsValid(input.val(), 3) && formElementIsValid(input2.val(), 3) && formElementIsValid(textarea.val(), 1)) {
      toggleAlertBox(false)
      toggleSubmit(false)
    } else {
      toggleAlertBox(true)
      toggleSubmit(true)
    }
  })

  // Kommentar abschicken und auslesen
  form.on('submit', async(event) => {
    event.preventDefault();
    await saveData(input.val(), input2.val(), textarea.val(),);
    await getData();
  })
}))


// Validation
function formElementIsValid(element, minLength) {
  return element.length >= minLength
}

function emailFieldIsValid(element) {
  var strReg = "^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$";
  var regex = new RegExp(strReg);
  return(regex.test(element));
}

function amountFieldIsValid(element, minLength) {
  if (element.length >= minLength) {
    var strReg = "^[0-9.]+[0-9]";
    var regex = new RegExp(strReg);
    return (regex.test(element));
  }
}

// Alert
function toggleAlertBox(show) {
  const alertEl = $('#hft-shoutbox-alert')

  if (show) {
    alertEl.removeClass('d-none')
  } else {
    alertEl.addClass('d-none')
  }
}

// Umschalten 
function toggleSubmit(disable) {
  const submitButton = $('#hft-shoutbox-form-submit')
  submitButton.prop('disabled', disable)
}


// GET : Kommentar Daten
async function getData() {
  // clear complete table
  const tableBody =  $('.table > tbody');
  tableBody.empty();
  // fetch table data
  const response = await fetch('api/comment', {
    method: "get",
    headers: {
          'Content-Type': 'application/json'
        },
  });


  // fill table
  const json = await response.json();
  console.log(json);
  json.forEach(elem => {
  
    tableBody.append(`<tr><td>${elem.Vorname}</td><td>${elem.Nachname}</td><td>${elem.Kommentar}</td></tr>`);
  
  });
}


// GET : Spenden Daten
async function getDonate() {
    // clear complete table
    const tableBody =  $('.table > tbody');
    tableBody.empty();
    // fetch table data
    const response = await fetch('api/spenden', {
      method: "get",
      headers: {
            'Content-Type': 'application/json'
          },
    });
    getDonatespenden()
  
    // fill table
    const json = await response.json();
    console.log(json);
    json.forEach(elem => {
    
      tableBody.append(`<tr><td>${elem.first_name}</td><td>${elem.last_name}</td><td>${elem.amount}</td></tr>`);
      //console.log(elem.first_name);
    });

    async function getDonatespenden() {
      // clear complete table
      const tableBody =  $('.table > tbody');
      tableBody.empty();
      // fetch table data
      const response = await fetch('api/spendengesamt', {
        method: "get",
        headers: {
              'Content-Type': 'application/json'
            },
      });
    
    
      // fill table
      const json = await response.json();
      console.log(json);
      json.forEach(elem => {
      
        tableBody.append(`<tr><td></td><td></td><td><td>${elem.gesamt}</td></tr>`);
      
      });
    
    }
}

// POST : Kommentar Daten
async function saveData(Vorname, Nachname, Kommentar) {
  try{
    console.log("Test");
    await fetch('/comment', {
      method: 'post', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Vorname, 
        Nachname,
        Kommentar,
      }),
    });
    
  } catch (e){
      console.error(e);
  }
}

// POST : Anmelde Daten
async function signin(Vorname,Nachname,Email,Passwort)
{
  try{
    console.log(Passwort)
    await fetch('/anmelden', {
      method: 'post', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Vorname, 
        Nachname,
        Email,
        Passwort
      }),

    });
  } catch (e){
      console.error(e);
  }
}

// POST : Spende Daten
async function donate(Vorname,Nachname,Email,Betrag,IBAN)
{
  try{
    console.log(Betrag)
    await fetch('/spenden', {
      method: 'post', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Vorname, 
        Nachname,
        Email,
        Betrag,
        IBAN
      }),

    });
  } catch (e){
      console.error(e);
  }
}

// THIS IS FOR AUTOMATED TESTING
if (typeof module !== 'undefined') {
  module.exports = {
    getData,
    saveData,
  }
}
// END