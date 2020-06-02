// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    window.addEventListener('load', function () {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation')
  
      // Loop over them and prevent submission
      Array.prototype.filter.call(forms, function (form) {
        form.addEventListener('submit', function (event) {
          if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
          }
          form.classList.add('was-validated')
        }, false)
      })
    }, false)
  }())
 

jQuery("#backtotop").click(function () {
    jQuery("body,html").animate({
        scrollTop: 0
    }, 600);
});
jQuery(window).scroll(function () {
    if (jQuery(window).scrollTop() > 150) {
        jQuery("#backtotop").addClass("visible");
    } else {
        jQuery("#backtotop").removeClass("visible");
    }
});





$('<form action="#"><select /></form>').appendTo("#mainav");$("<option />",{selected:"selected",value:"",text:"MENU"}).appendTo("#mainav select");$("#mainav a").each(function(){var e=$(this);if($(e).parents("ul ul ul").length>=1){$("<option />",{value:e.attr("href"),text:"- - - "+e.text()}).appendTo("#mainav select")}else if($(e).parents("ul ul").length>=1){$("<option />",{value:e.attr("href"),text:"- - "+e.text()}).appendTo("#mainav select")}else if($(e).parents("ul").length>=1){$("<option />",{value:e.attr("href"),text:""+e.text()}).appendTo("#mainav select")}else{$("<option />",{value:e.attr("href"),text:e.text()}).appendTo("#mainav select")}});$("#mainav select").change(function(){if($(this).find("option:selected").val()!=="#"){window.location=$(this).find("option:selected").val()}})


!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){function b(b){var c={},d=/^jQuery\d+$/;return a.each(b.attributes,function(a,b){b.specified&&!d.test(b.name)&&(c[b.name]=b.value)}),c}function c(b,c){var d=this,f=a(d);if(d.value==f.attr("placeholder")&&f.hasClass(m.customClass))if(f.data("placeholder-password")){if(f=f.hide().nextAll('input[type="password"]:first').show().attr("id",f.removeAttr("id").data("placeholder-id")),b===!0)return f[0].value=c;f.focus()}else d.value="",f.removeClass(m.customClass),d==e()&&d.select()}function d(){var d,e=this,f=a(e),g=this.id;if(""===e.value){if("password"===e.type){if(!f.data("placeholder-textinput")){try{d=f.clone().attr({type:"text"})}catch(h){d=a("<input>").attr(a.extend(b(this),{type:"text"}))}d.removeAttr("name").data({"placeholder-password":f,"placeholder-id":g}).bind("focus.placeholder",c),f.data({"placeholder-textinput":d,"placeholder-id":g}).before(d)}f=f.removeAttr("id").hide().prevAll('input[type="text"]:first').attr("id",g).show()}f.addClass(m.customClass),f[0].value=f.attr("placeholder")}else f.removeClass(m.customClass)}function e(){try{return document.activeElement}catch(a){}}var f,g,h="[object OperaMini]"==Object.prototype.toString.call(window.operamini),i="placeholder"in document.createElement("input")&&!h,j="placeholder"in document.createElement("textarea")&&!h,k=a.valHooks,l=a.propHooks;if(i&&j)g=a.fn.placeholder=function(){return this},g.input=g.textarea=!0;else{var m={};g=a.fn.placeholder=function(b){var e={customClass:"placeholder"};m=a.extend({},e,b);var f=this;return f.filter((i?"textarea":":input")+"[placeholder]").not("."+m.customClass).bind({"focus.placeholder":c,"blur.placeholder":d}).data("placeholder-enabled",!0).trigger("blur.placeholder"),f},g.input=i,g.textarea=j,f={get:function(b){var c=a(b),d=c.data("placeholder-password");return d?d[0].value:c.data("placeholder-enabled")&&c.hasClass(m.customClass)?"":b.value},set:function(b,f){var g=a(b),h=g.data("placeholder-password");return h?h[0].value=f:g.data("placeholder-enabled")?(""===f?(b.value=f,b!=e()&&d.call(b)):g.hasClass(m.customClass)?c.call(b,!0,f)||(b.value=f):b.value=f,g):b.value=f}},i||(k.input=f,l.value=f),j||(k.textarea=f,l.value=f),a(function(){a(document).delegate("form","submit.placeholder",function(){var b=a("."+m.customClass,this).each(c);setTimeout(function(){b.each(d)},10)})}),a(window).bind("beforeunload.placeholder",function(){a("."+m.customClass).each(function(){this.value=""})})}});

// Run It
jQuery(document).ready(function($) {
    $("input, textarea").placeholder();
});


const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser')
const db = new sqlite3.Database('./db/shoutbox.db');

const port = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', async (req, res) => {
  db.all('SELECT * FROM shouts', (err, shouts) => {
    res.render('pages/index', { shouts })
  });
});

app.get('/api/shouts', async (req, res) => {
  db.all('SELECT * FROM shouts', (err, shouts) => {
    res.json(shouts)
  });
});

app.get('/add-entry', (req, res) => {
  res.render('pages/add-entry', { success: true });
});

app.post('/api/shouts', (req, res) => {
  if (req.body.username && req.body.message) {
    db.run('INSERT INTO shouts(username, message) VALUES (?, ?);', [req.body.username, req.body.message], function (err) {
      if(err) {
        res.json({error: err});
      } else {
        res.json({
         ...req.body, 
         id: this.lastID,
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
// THIS IS FOR AUTOMATED TESTING
if (typeof module !== 'undefined') {
    global.$ = require('jquery')
  }
  // END
  
  $( document ).ready((() => {
    // DOMContent is laoded, now we can start checking HTML Elements
    // If we dont "wait" for document to be ready, we cannot access HTML elements
    // for testing purposes, you can use a "debugger;" statement or also "console.log(element)"
    console.log('DOM is ready!')
    
    getData(); // TODO: Implement getData Method
    const input = $('#hft-shoutbox-form-input-name')
    const textarea = $('#hft-shoutbox-form-textarea')
    const form = $('#hft-shoutbox-form')
  
    form.on('keyup', (event) => {
      if (formElementIsValid(input.val(), 3) && formElementIsValid(textarea.val(), 10)) {
        toggleAlertBox(false)
        toggleSubmit(false)
      } else {
        toggleAlertBox(true)
        toggleSubmit(true)
      }
    })
  
    form.on('submit', async(event) => {
      event.preventDefault();
      await saveData(input.val(), textarea.val());
      await getData();
    })
  }))
  
  function formElementIsValid(element, minLength) {
    return element.length >= minLength
  }
  
  function toggleAlertBox(show) {
    const alertEl = $('#hft-shoutbox-alert')
  
    if (show) {
      alertEl.removeClass('d-none')
    } else {
      alertEl.addClass('d-none')
    }
  }
  
  function toggleSubmit(disable) {
    const submitButton = $('#hft-shoutbox-form-submit')
    submitButton.prop('disabled', disable)
  }
  
  async function getData() {
    // clear complete table
    const tableBody = $(".table > tboby")
    tableBody.empty();
    // fetch table data
   const response =  await fetch('/api/shouts', {
      method: 'get', 
      headers: {
        "Content-Type": "application/json"
      },
    });
  
    const json = await response.json();
    json.forEach(elem => {
      tableBody.append(`<tr><td>&{elem.id}</td><td>&{elem.username}</td><td>&{elem.message}</td></tr>`);
    });
  }
  
  async function saveData(username, message) {
    
    try{
      await fetch('/api/shouts', {
        method: 'post', 
        headers: {
          "Content-Type": "application/json"
        } ,
        body: JSON.stringify({
          username, 
          message,
        })
      });
    } catch (e){
        console.error(e);
    }
  }
  
  // THIS IS FOR AUTOMATED TESTING
  if (typeof module !== 'undefined') {
    module.exports = {
      getData,
      saveData
    }
  }
  // END