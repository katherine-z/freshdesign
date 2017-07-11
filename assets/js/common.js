$(document).ready(function() {
    $("#stepOne").validate({
      rules: {
        amount: {
          required: true,
          number: true,
          range: [1, 10000]
        },
        term: {
          required: true,
          number: true,
          range: [1, 12]
        },
      },
      messages: {
        amount: {
          required: "Обязательное поле",
          number: "Неверный формат ввода",
          range: "Введите число от 1 до 10000"
        },
        term: {
          required: "Обязательное поле",
          number: "Неверный формат ввода",
          range: "Введите число от 1 до 12"
        }
      }
    });


    $("#stepTwo").validate({
      rules: {
        TIN: {
          required: true,
          digits: true,
          minlength: 10,
          maxlength: 10
        },
        lastname: {
          required: true
        },
        name: {
          required: true
        },
        city: {
          required: true
        }
        
      },
      messages: {
        TIN: {
          required: "Обязательное поле",
          digits: "Неверный формат ввода",
          minlength: "Слишком короткий ИНН",
          maxlength: "Слишком длинный ИНН"
        },
        lastname: {
          required: "Обязательное поле"
        },
        name: {
          required: "Обязательное поле"
        },
        city: {
          required: "Обязательное поле"
        }
      }
    });

     TINfin();

 });

// check age
function TINcheck() {
    var inputTIN = document.getElementById('cTIN').value;
    var inputTINnum = inputTIN.substring(0,5); // just 5 first digits
    var todayNum = Math.floor((new Date() - new Date(1899, 11, 31))/86400000); // amount of days between 31.12.1899 and today
    if(isNaN(inputTIN) ||  inputTIN === "" || inputTIN.length != 10) {
      console.log("not valid");
      document.getElementById("your_age").innerHTML = "";
    } else if(todayNum - inputTINnum >= 7670){ // 7670 - amount of days for 21 years
     document.getElementById("your_age").innerHTML = "Вам больше 21 года";
    } else {
      document.getElementById("your_age").innerHTML = "Вам меньше 21 года";
    }
}

//using check age with change value or blur
function TINfin() {
  $('#cTIN').on('input keyup', function(e) {
      TINcheck();
  });
  var form = document.getElementById("stepTwo");
  form.addEventListener("blur", function( event ) {
      TINcheck();
  } , true);
}

//autocomplete cities
jQuery(function () 
 {
 jQuery("#ccity").autocomplete({
  source: function (request, response) {
   jQuery.getJSON(
    "http://gd.geobytes.com/AutoCompleteCity?callback=?&q="+request.term,
    function (data) {
     response(data);
    }
   );
  },
  minLength: 3
 });
 jQuery("#ccity").autocomplete("option", "delay", 100);
});