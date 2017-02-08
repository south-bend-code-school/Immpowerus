(function(){
  $( document ).ready(init);

  function init () {
    beginVidChat();


  }

  function beginVidChat(){
    var chatName = location.search.split('name=')[1];

    $('#vidChat').append( "<iframe src='https://appear.in/"+chatName+"' width='100%' height='100%' frameborder='0'></iframe>")
  }









})();
