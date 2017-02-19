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
    beginVidChat();
    $('#endSession').on('click', endSession);

  }

  function beginVidChat(){
    var chatName = location.search.split('name=')[1];
    $('#vidChat').append( "<iframe src='https://appear.in/"+chatName+"' width='100%' height='100%' frameborder='0'></iframe>")
  }


  function endSession(){
    var userKey = location.search.split('name=')[1];
    return firebase.database().ref('/Youth/'+userKey).remove()
      .then(function(){
        window.location.replace('./thank_you_youth.html');
      });
  }








})();
