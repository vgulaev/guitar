function MakeGraph() {
  var starty = 400;
  var svg = $("#graph")
  var g1 = document.createElementNS( "http://www.w3.org/2000/svg", "polyline" );
  var g2 = document.createElementNS( "http://www.w3.org/2000/svg", "polyline" );
  var axisx = document.createElementNS( "http://www.w3.org/2000/svg", "line" );
  axisx.setAttribute( 'x1', 0 );
  axisx.setAttribute( 'y1', starty );
  axisx.setAttribute( 'x2', 1900 );
  axisx.setAttribute( 'y2', starty );
  axisx.setAttribute( 'stroke', "red" ); 
  axisx.setAttribute( 'stroke-width', 1 );  

  var guitar = [];
  var ideal = [];
  var x = 0;
  var prev = s[ 2000 ];
  var starti = 870;
  var maxdy = 0;
  var prexy = s[ starti ];
  var maxy = 0;
  for ( var i = starti; i < starti + 900; i++ ) {
    /*if ( prev * s[i] < 0 ) {
      console.log( "= " + i + " " + prev + " " + s[ i ] );
      break;
    }*/
    if ( Math.abs( s[ i ] - prexy ) > maxdy ) {
      maxdy = Math.abs( s[ i ] - prexy );
    };
    if ( Math.abs( s[ i ] ) > maxy ) {
      maxy = Math.abs( s[ i ] );
    };
    ideal.push( [ x * 1, Math.sin( x / 190 ) * 120 + starty ].join( ',' ) );
    guitar.push( [ x * 2, Math.round(s[i] * 50000 + starty ) ].join( ',' ) );
    x += 1;
    prexy = s[ i ];
  }
  g1.setAttribute( 'points', guitar.join( ' ' ) );
  g1.setAttribute( 'style', 'fill:none;stroke:black;stroke-width:3' );  
  g2.setAttribute( 'points', ideal.join( ' ' ) );
  g2.setAttribute( 'style', 'fill:none;stroke:green;stroke-width:3' );  
  svg.append( axisx )
  svg.append( g1 );
  svg.append( g2 );
  console.log( maxdy );
  console.log( maxy );
  console.log( maxdy / maxy * 100 );
  //alert( 'Hello' );
}

$( function () { MakeGraph(); } );