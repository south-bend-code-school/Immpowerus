(function(){
  $( document ).ready(init);

  function init () {
    beginVidChat();
  }

  function beginVidChat(){
    var chatName = location.search.split('name=')[1];

    $('#vidChat').append( "<iframe src='https://appear.in/"+chatName+"' width='800' height='640' frameborder='0'></iframe>")
  }



})();
