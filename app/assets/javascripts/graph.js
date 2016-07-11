function Graph( svg, starty ) {
  this.svg = svg;
  this.svg[0].ondragstart = function () {
    console.log( 'dragstart' );
  };
  this.origin = { x: 0, y: starty };
  console.log( 'init' );
  this.drow_axis( starty );
};

Graph.prototype.drow_axis = function ( starty ) {
  var axisx = document.createElementNS( "http://www.w3.org/2000/svg", "line" );
  axisx.setAttribute( 'x1', 0 );
  axisx.setAttribute( 'y1', starty );
  axisx.setAttribute( 'x2', this.svg.width() );
  axisx.setAttribute( 'y2', starty );
  axisx.setAttribute( 'stroke', "red" ); 
  axisx.setAttribute( 'stroke-width', 1 );  
  this.svg.append( axisx );
};

Graph.prototype.drow = function ( id, x, things ) {
  var g = document.createElementNS( "http://www.w3.org/2000/svg", "polyline" );
  if ( things instanceof Array ) {
    var y = things;
  };
  var points = [];
  for ( e in x ) {
    points.push( [ x[ e ], Math.round( y[ e ] * this.scale_y ) + this.origin.y ].join( ',' ) )
  };

  g.id = id;
  g.setAttribute( 'points', points.join( ' ' ) );
  g.setAttribute( 'style', 'fill:none;stroke:black;stroke-width:3' );  

  this.svg.append( g );
};

function range( startx, starty ){
  var x = [];
  for ( var i = startx; i <= starty; i++ ) {
    x.push( i );
  };
  return x;
};
