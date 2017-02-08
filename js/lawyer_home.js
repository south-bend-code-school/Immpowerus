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
    loadLawyer();
    searchForYouth();
    $('.collapsible').collapsible();
    $('.collapsible').on('click', 'li .collapsible-body a', goToChat);
  }

  function loadLawyer(){
    var lawyerKey = location.search.split('name=')[1];

    var ref = firebase.database().ref('Lawyer/'+lawyerKey);
    ref.once('value', function(snapshot){
      var lawyer = snapshot.val();
      $('#lawyerName').append(" " + lawyer.fName + " " + lawyer.lName);
      var cons = lawyer.consultations;
      for(var i in cons){
        $('tbody').append(
          "<tr>"+
            "<td>"+cons[i].date.split('T')[0]+"</td>"+
            "<td>"+cons[i].timeSpent+"</td>"+
            "<td>"+cons[i].description+"</td>"+
          "<tr>"
        );
      };
    });
  }

  function searchForYouth() {
    var ref = firebase.database().ref('Youth/');
    ref.once('value', function(snapshot){
      var youths = snapshot.val();
      for (var i in youths) {
        var youth_id = i;
        var description = youths[i].description;
        displayYouths(youth_id, description);
      }
    });
  }

  function displayYouths(youth_id, description) {
    $('.collapsible').append(
      "<li class='youthLi'>" +
        "<div class='collapsible-header hoverable'><i class='material-icons'>question_answer</i></div>" +
        "<div class='collapsible-body'>"+
          "<p>"+description+"</p>" +
          "<a id='startChat' class='waves-effect waves-light btn' data-field="+youth_id+">Enter Chat</a>" +
          "</div>" +
      "</li>"
    )
  }

  function goToChat() {
    var lawyerKey = location.search.split('name=')[1];
    var youth_id = $(this).data('field');
    location.assign("chat_room.html?name="+youth_id+"$"+lawyerKey);
  }

})();
