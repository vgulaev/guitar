var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var channels = 2;

function MakeGraph() {
  g = new Graph( $("#graph"), 400 );
  g.scale.y = 1000;
  g.offset_x = 58789;
  //g.drow( 'original', range( 1, s.length ), s );
  g.drow( 'original', range( 1, 59857 ), s );
}

function play() {
  var frameCount = s.length - g.offset_x;
  var myArrayBuffer = audioCtx.createBuffer(channels, frameCount, audioCtx.sampleRate);

  for (var channel = 0; channel < channels; channel++) {
    var nowBuffering = myArrayBuffer.getChannelData(channel);
    for (var i = g.offset_x; i < frameCount; i++) {
      /*if ( s[ i ] > 0 && s[ i + 1 ] < 0 ) {
        console.log( i );
        break;
      };*/
      nowBuffering[i] = s[ i ];
      }
  }
  var source = audioCtx.createBufferSource();
  source.buffer = myArrayBuffer;
  source.connect(audioCtx.destination);
  source.start();
}

$( function () { MakeGraph(); } );