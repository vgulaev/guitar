// Create an audio context.
window.AudioContext = window.AudioContext || window.webkitAudioContext;
myAudioContext = new window.AudioContext();

gainNode = myAudioContext.createGain();
gainNode.connect( myAudioContext.destination );
gainNode.gain.value = 1;

var s = [{"hz":164.81},{"hz":246.94},{"hz":261.63},{"hz":220.0},{"hz":246.94},{"hz":196.0},{"hz":164.81},{"hz":246.94},{"hz":261.63},{"hz":220.0},{"hz":246.94},{"hz":196.0}];
l = s.length - 1;
function play() {
    i = i + 1;
    oscillator.frequency.value = s[i]["hz"];
    console.log(i);
    if (i == l) {
        stop();
        start();
    }
}

function stop() {
    //alert( 'Hello!!!' );  
    oscillator.stop();
    clearInterval( intervalID )
}

function start() {
    oscillator = myAudioContext.createOscillator();    
    oscillator.frequency.value = s[0]["hz"];
    oscillator.type = 'sine';
    oscillator.connect( gainNode );
    oscillator.start(0);
    i = 0;
    intervalID = setInterval( 'play()', 500 );
}
