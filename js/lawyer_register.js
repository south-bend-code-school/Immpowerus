(function(){
  $( document ).ready(init);

  var config = {
    apiKey: "AIzaSyA9H0Gmv_FxpkVjYbe6ZGOi_dxld-tjvXQ",
    authDomain: "impowerus-8cb1d.firebaseapp.com",
    databaseURL: "https://impowerus-8cb1d.firebaseio.com",
    storageBucket: "impowerus-8cb1d.appspot.com",
    messagingSenderId: "840951300821"
  };

  function init () {
    firebase.initializeApp(config);
    $('#saveLawyer').click(saveLawyer);
  }

  function saveLawyer(){
    var fName = $('#first_name').val();
    var lName = $('#last_name').val();
    var firm = $('#firm').val();
    var address = $('#address').val();
    var email = $('#email').val();
    var password = $('#password').val();
    var barNum  = $('#barNum').val();
    var stateBars = $('#stateBars').val();
    var languages = $('#languages').val();
    var helpTypes = [];
    $('input:checked').each(function() {
        helpTypes.push($(this).next('label').text());
    });

    writeLawyer(fName, lName, firm, address, email, password, barNum, stateBars, helpTypes, languages);
  }

  function writeLawyer(fName, lName, firm, address, email, password, barNum, stateBars, helpTypes, languages){
    var lawyerData = {
      fName : fName,
      lName : lName,
      firm : firm,
      address : address,
      email : email,
      password : password,
      barNum : barNum,
      stateBars : stateBars,
      helpTypes : helpTypes,
      languages : languages,
    };

    var newLawyerKey = firebase.database().ref().child('Lawyer').push().key;
    var updates = {};

    console.log(updates);

    updates['/Lawyer/' + newLawyerKey] = lawyerData;
    return firebase.database().ref().update(updates).then(function(){
      window.location.replace("./lawyer_home.html");
    });
  }

})();
