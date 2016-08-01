var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var channels = 2;

function add_1000() {
  g.offset_x += 1500;
  g.drow();
}

function MakeGraph() {
  g = new Graph( $("#graph"), 400 );
  g.mouse_mode = 'select';
  g.scale.y = 700;
  g.scale.x = 1;
  g.offset_x = 0;
  g.offset_x = 58789;
  g.offset_x = 105457;
  g.sampleRate = 44100;
  //g.drow( 'original', range( 1, s.length ), s );
  //44100
  var hz = 82.41;
  var k = 2 * Math.PI / ( 44100 / hz );
  sin1 = function ( x ) {
    return Math.sin( k * x ) + Math.sin( 2 * k * x ) + Math.sin( 3 * k * x )  + Math.sin( 4 * k * x );
  };
  sin2 = function ( x ) {
    return Math.sin( k * x )
  };
  //g.drow( 'original', range( 1, 59857 ), s );
  g.drow( 'original', range( 1, s.length ), s );
  //g.drow( 'original', range( 1, 106342 ), s );
  //g.drow( 'sin1', range( 1, 59857 ), sin1 );
  //g.drow( 'sin2', range( 1, 59857 ), sin2 );
}

function play() {
  var frameCount = audioCtx.sampleRate * 4;
  var myArrayBuffer = audioCtx.createBuffer(channels, frameCount, audioCtx.sampleRate);

  var d = g.selected[ 'e' ] - g.selected[ 's' ];
  for (var channel = 0; channel < channels; channel++) {
    var nowBuffering = myArrayBuffer.getChannelData(channel);
    for (var i = 0; i < frameCount; i++) {
      nowBuffering[i] = s[ g.selected[ 's' ] + i % d ];
      }
  }
  var source = audioCtx.createBufferSource();
  source.buffer = myArrayBuffer;
  source.connect(audioCtx.destination);
  source.start();
}

function setMouseMode( element ) {
  g.mouse_mode = element.value;
} 

$( function () { MakeGraph(); } );
