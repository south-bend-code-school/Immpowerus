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
    $('#saveYouth').click(saveYouth);
  }

  function saveYouth(){
    var description = $('#description').val();


    writeYouth(description);
  }

  function writeYouth(description){
    var youthData = {
      description : description,
    };

    var newYouthKey = firebase.database().ref().child('Youth').push().key;
    var updates = {};

    console.log(updates);

    updates['/Youth/' + newYouthKey] = youthData;
    return firebase.database().ref().update(updates).then(function(){
      location.assign("waiting_room.html?name="+newYouthKey);
    });
  }

})();
