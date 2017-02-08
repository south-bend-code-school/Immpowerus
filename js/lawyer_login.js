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
    $('.signin').on('click',signin);
  }

  function signin(e) {
    var email = $('#email').val();
    var password = $('#password').val();
    console.log(email, password);

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function(user) {
        window.location.replace("./lawyer_home.html?name="+user.uid);
      });
    e.preventDefault();

  }

})();
