(function(){
  $( document ).ready(init);

  var config = {
    apiKey: "AIzaSyA9H0Gmv_FxpkVjYbe6ZGOi_dxld-tjvXQ",
    authDomain: "impowerus-8cb1d.firebaseapp.com",
    databaseURL: "https://impowerus-8cb1d.firebaseio.com",
    storageBucket: "impowerus-8cb1d.appspot.com",
    messagingSenderId: "840951300821"
  };

  var clock;
  var consultKey;

  var chatNames = location.search.split('name=')[1];
  youth_id = chatNames.split('$')[0];
  lawyer_id = chatNames.split('$')[1];

  function init () {
    firebase.initializeApp(config);
    beginVidChat();
    startClock();
    pullYouthInfo();
    createConsultation();
  }

  function beginVidChat(){
    $('#vidChat').append( "<iframe src='https://appear.in/"+youth_id+"' width='100%' height='100%' frameborder='0'></iframe>")
  }

  function createConsultation(){
    var date = moment()._d;
    var ref = firebase.database().ref('Youth/'+youth_id);
    ref.once('value').then(function(snapshot){
      var youth = snapshot.val();
      var description = youth.description;
      addConsult(date, description);
    });
  }

  function addConsult(date, description){
    var consultationData = {
      date : date,
      description : description,
    };
    var newConsultationKey = firebase.database().ref().child('/Lawyer/'+lawyer_id+'/consultations').push().key;
    consultKey = newConsultationKey;
    var updates = {};
    updates['/Lawyer/'+lawyer_id+"/consultations/"+newConsultationKey] = consultationData;
    return firebase.database().ref().update(updates).then(function(){
    });
  }

  function startClock() {
    var duration = moment.duration({
      'seconds': 00,
      'hour': 00,
      'minutes': 0
    });
    var timestamp = new Date(0,0,0,2,10,30);
    var interval = 1;
    setInterval(function () {
        timestamp = new Date(timestamp.getTime() + interval*1000);
        duration = moment.duration(duration.asSeconds() + interval, 'seconds');
        $('#clock').text(duration.hours() + 'h:' + duration.minutes() + 'm:' + duration.seconds() + 's');
        updateTime();
    }, 1000);

  }

  function updateTime(date){
    console.log(consultKey);
    var timeSpent = $('#clock').text();
    return firebase.database().ref('/Lawyer/'+lawyer_id+'/consultations/'+consultKey).update({
      timeSpent : timeSpent,
    }).then(function(){

    });

  }




  function pullYouthInfo(){
    var ref = firebase.database().ref('Youth/'+youth_id);
    ref.once('value', function(snapshot){
      var youth = snapshot.val();
      var description = youth.description;
      $('#youthIssueDesc').append("<h5>"+description+"</h5>");
    });
  }





})();
