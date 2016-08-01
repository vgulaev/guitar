function Graph( svg, starty ) {
  this.svg = svg;
  this.origin = { x: 0, y: starty };
  this.scale = { x: 1, y: 1 };
  this.offset_x = 0;
  this.sampleRate = 0;
  this.width = this.svg.width();
  this.item = {};
  this.selected = {};
  //can be: select, move
  this.mouse_mode = 'select';
  this.drow_axis( starty );
  this.drow_canvas_size();
  this.onWindowResize();
  // Events
  this.svg[ 0 ].addEventListener( 'mousedown', this.onMouseDown.bind( this ), false );
  window.addEventListener( 'resize', this.onWindowResize.bind( this ) );
  //document.getElementById( svg[ 0 ].id ).addEventListener( 'mousedown', this.mousedown, true );
};

Graph.prototype.onWindowResize = function( e ) {
  this.svg.width( window.innerWidth - 30 );
  this.width = this.svg.width();
  this.drow_canvas_size();
  this.drow_axis();
  //console.log( 'onWindowResize ' + window.innerWidth );
};

Graph.prototype.drow_canvas_size = function() {
  var label = recreate( 'text', 'size_label' );
  label.setAttribute( 'color', 'black' );
  label.setAttribute( 'y', '20' );
  label.innerHTML = this.svg.width() + ' x ' + this.svg.height();
  this.svg.append( label );
};

Graph.prototype.action_move = function( e ) {
  var startx = e.clientX;
  this.svg.mouseup( { self: this } ,function ( e ) {
      var deltax = startx - e.clientX;
      e.data.self.offset_x += deltax;
      e.data.self.svg.unbind( 'mouseup' );
      e.data.self.drow();
  } );
};

Graph.prototype.round_selection = function( rect ) {
  var startx = rect.x.baseVal.value + this.offset_x;
  var newx = startx;
  while ( true ) {
    if ( (s[ newx ] < 0) && (s[ newx + 1 ] > 0) ) {
      rect.setAttribute( 'x', newx - this.offset_x );
      this.selected[ 's' ] = newx;
      break;
    }
    newx += 1;
  };
  startx = rect.x.baseVal.value + rect.width.baseVal.value + this.offset_x;
  var newx = startx;
  while ( true ) {
    if ( (s[ newx ] < 0) && (s[ newx + 1 ] > 0) ) {
      rect.setAttribute( 'width', newx - this.offset_x - rect.x.baseVal.value );
      this.selected[ 'e' ] = newx;
      break;
    }
    newx -= 1;
  };
};

function recreate( svg_type, svg_id ) {
  var old_element = $( '#' + svg_id );
  if ( old_element.length > 0 ) { old_element.remove() };
  var new_element = document.createElementNS( "http://www.w3.org/2000/svg", svg_type );
  new_element.id = svg_id;
  return new_element;
}

Graph.prototype.action_select = function( e ) {
  var startx = e.clientX;
  var rect_x = e.offsetX;
  var rect_label = recreate( 'text', 'select_rect_label' );
  var rect = recreate( 'rect', 'select_rect' );
  rect.setAttribute( 'style', 'fill: none; stroke:red; stroke-width: 1;' );
  rect.setAttribute( 'y', this.origin.y - 50 );
  rect.setAttribute( 'height', 100 );
  rect.setAttribute( 'x', rect_x );
  rect.setAttribute( 'width', 300 );
  this.svg.append( rect );
  this.svg.append( rect_label );

  this.svg.mousemove( { self: this } ,function ( e ) {
    var deltax = e.clientX - startx;
    if ( deltax > 0 ) {
      rect.setAttribute( 'width', deltax );
    } else if ( deltax < 0 ) {
      rect.setAttribute( 'width', Math.abs( deltax ) );
      rect.setAttribute( 'x', rect_x + deltax );
    };
  } );
  
  this.svg.mouseup( { self: this } ,function ( e ) {
      e.data.self.svg.unbind( 'mouseup' );
      e.data.self.svg.unbind( 'mousemove' );
      e.data.self.round_selection( rect );
      rect_label.setAttribute( 'color', 'black' );
      rect_label.setAttribute( 'x', rect.x.baseVal.value );
      rect_label.setAttribute( 'y', e.data.self.origin.y - 20 );
      var delta = e.data.self.selected[ 'e' ] - e.data.self.selected[ 's' ];
      rect_label.innerHTML = Math.round( delta / e.data.self.sampleRate * 1000 ) / 1000 + ' s ' + Math.round( e.data.self.sampleRate / delta * 100 ) / 100 + ' hz';
  } );
};

Graph.prototype.action_move = function( e ) {
  var startx = e.clientX;
  this.svg.mouseup( { self: this } ,function ( e ) {
      var deltax = startx - e.clientX;
      e.data.self.offset_x += deltax;
      e.data.self.svg.unbind( 'mouseup' );
      e.data.self.drow();
  } );
};

Graph.prototype.onMouseDown = function( e ) {
  if ( 'move' === this.mouse_mode ) {
    this.action_move( e );
  } else if ( 'select' === this.mouse_mode ) {
    this.action_select( e );
  }
};

Graph.prototype.drow_axis = function ( starty ) {
  var axisx = recreate( 'line', 'axis_x' );
  axisx.setAttribute( 'x1', 0 );
  axisx.setAttribute( 'y1', this.origin.y );
  axisx.setAttribute( 'x2', this.width );
  axisx.setAttribute( 'y2', this.origin.y );
  axisx.setAttribute( 'stroke', 'red' ); 
  axisx.setAttribute( 'stroke-width', 1 );  
  this.svg.append( axisx );
};

Graph.prototype.drow = function ( id, xargs, things ) {
  if ( id === undefined ) {

  } else {
    this.item[ id ] = { x: xargs, y: things };
  }
  for ( e in this.item ) {
    var x = this.item[ e ].x;  
    var points = [];
    var old_g = $( '#' + e );
    if ( old_g.length > 0 ) { old_g.remove() };
    var g = document.createElementNS( "http://www.w3.org/2000/svg", "polyline" );
    if ( this.item[ e ].y instanceof Array ) {
      var y = this.item[ e ].y;
    } else if ( this.item[ e ].y instanceof Function ) {
      var y = [];
      for ( i in x ) {
        y.push( this.item[ e ].y.call( this, x[ i ] ) );
      }
    };
    var start_i = Math.round( this.offset_x - this.width / this.scale.x );
    var finish_i = Math.round( this.offset_x + 2 * this.width / this.scale.x );
    console.log( this.offset_x );
    for ( var i = start_i; i < finish_i ; i ++ ) {
      if ( ( i < 0 ) || ( i >= x.length ) ) { continue };
      points.push( [ ( x[ i ] - this.offset_x ) * this.scale.x, Math.round( y[ i ] * this.scale.y ) + this.origin.y ].join( ',' ) )
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
