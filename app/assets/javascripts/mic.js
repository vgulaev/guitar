function mic() {
  console.log( 'Hay' );


  function use_stream( stream )
  {
      var audio_context = new AudioContext();
      var microphone = audio_context.createMediaStreamSource( stream );
      // do something with the microphone stream...
  };

  navigator.mediaDevices.getUserMedia( { "audio": true }, use_stream, function() {} );
}