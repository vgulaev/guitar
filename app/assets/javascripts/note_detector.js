function find_first_note() {
  var first_more_02 = 0;
  for ( var i in s ) {
    if ( Math.abs( s[ i ] ) > 0.2 ) {
      first_more_02 =  i;
      break;
    }
  }
  for ( var i = 0; i < first_more_02; i++ ) {
    if ( ( s[ first_more_02 - i ] * s[ first_more_02 - i - 1 ] ) < 0 ) {
      return first_more_02 - i
    }
  }
}

function note_print() {
  var ffn = find_first_note();
  console.log( ffn );
  $( '#output' ).html( 'Hello!!!' );
}

$( function () { note_print(); } );