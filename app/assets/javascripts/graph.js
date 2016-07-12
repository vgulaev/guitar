function Graph( svg, starty ) {
  this.svg = svg;
  this.origin = { x: 0, y: starty };
  this.scale = { x: 1, y: 1 };
  this.offset_x = 0;
  this.width = this.svg.width();
  this.item = {};
  this.drow_axis( starty );
  this.svg[ 0 ].addEventListener('mousedown', this.onMouseDown.bind( this ), false);
  //document.getElementById( svg[ 0 ].id ).addEventListener( 'mousedown', this.mousedown, true );
};

Graph.prototype.onMouseDown = function( e ) {
  var startx = e.clientX;
  this.svg.mouseup( { self: this } ,function ( e ) {
      var deltax = startx - e.clientX;
      e.data.self.offset_x += deltax;
      e.data.self.svg.unbind( 'mouseup' );
      e.data.self.drow();
  } );
};

Graph.prototype.drow_axis = function ( starty ) {
  var axisx = document.createElementNS( "http://www.w3.org/2000/svg", "line" );
  axisx.setAttribute( 'x1', 0 );
  axisx.setAttribute( 'y1', starty );
  axisx.setAttribute( 'x2', this.width );
  axisx.setAttribute( 'y2', starty );
  axisx.setAttribute( 'stroke', "red" ); 
  axisx.setAttribute( 'stroke-width', 1 );  
  this.svg.append( axisx );
};

Graph.prototype.drow = function ( id, xargs, things ) {
  if ( id === undefined ) {

  } else {
    this.item[ id ] = { x: xargs, y: things };
  }
  for ( e in this.item ) {
    var old_g = $( '#' + e );
    if ( old_g.length > 0 ) { old_g.remove() };
    var g = document.createElementNS( "http://www.w3.org/2000/svg", "polyline" );
    if ( this.item[ e ].y instanceof Array ) {
      var y = this.item[ e ].y;
    };
    var x = this.item[ e ].x;  
    var points = [];
    var start_i = Math.round( this.offset_x - this.width / this.scale.x );
    var finish_i = Math.round( this.offset_x + 2 * this.width / this.scale.x );
    console.log( this.offset_x );
    for ( var i = start_i; i < finish_i ; i ++ ) {
      if ( ( i < 0 ) || ( i >= x.length ) ) { continue };
      points.push( [ x[ i ] - this.offset_x, Math.round( y[ i ] * this.scale.y ) + this.origin.y ].join( ',' ) )
    };

    g.id = e;
    g.setAttribute( 'points', points.join( ' ' ) );
    g.setAttribute( 'style', 'fill:none;stroke:black;stroke-width:3' );  

    this.svg.append( g );
  };
};

function range( startx, starty ){
  var x = [];
  for ( var i = startx; i <= starty; i++ ) {
    x.push( i );
  };
  return x;
};
