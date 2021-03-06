// ============================================================================
//
// THIS IS A PLACE HOLDER ANIMATION UNTIL I CAN GET SOMETHING I LIKE WORKING
// ALL CREDITS GOES TO THE ORIGINAL AUTHORS!
//
// BASED HEAVILY ON:
// https://github.com/mrdoob/three.js/blob/dev/examples/canvas_particles_waves.html
//
// ============================================================================

var THREE          = require("three-js")();

// hacky patch for extending threejs
var CanvasRenderer = require("raw!./assets/js/three.js/examples/js/renderers/CanvasRenderer.js");
var Projector = require("raw!./assets/js/three.js/examples/js/renderers/Projector.js");
eval(CanvasRenderer);
eval(Projector);

var SEPARATION = 100, AMOUNTX = 50, AMOUNTY = 50;
var camera, scene, renderer;
var particles, particle, count = 0;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}

function onDocumentTouchStart( event ) {
  if ( event.touches.length === 1 ) {
    event.preventDefault();
    mouseX = event.touches[ 0 ].pageX - windowHalfX;
    mouseY = event.touches[ 0 ].pageY - windowHalfY;
  }
}

function onDocumentTouchMove( event ) {
  if ( event.touches.length === 1 ) {
    event.preventDefault();
    mouseX = event.touches[ 0 ].pageX - windowHalfX;
    mouseY = event.touches[ 0 ].pageY - windowHalfY;
  }
}

var init = function init(container) {

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.z = 1000;
  camera.position.y = 500;

  scene = new THREE.Scene();

  particles = new Array();

  var PI2 = Math.PI * 2;
  var material = new THREE.SpriteCanvasMaterial( {

    color: 0xaaaaaa,
    program: function ( context ) {

      context.beginPath();
      context.arc( 0, 0, 0.5, 0, PI2, true );
      context.fill();

    }

  } );

  var i = 0;

  for ( var ix = 0; ix < AMOUNTX; ix ++ ) {

    for ( var iy = 0; iy < AMOUNTY; iy ++ ) {

      particle = particles[ i ++ ] = new THREE.Sprite( material );
      particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
      particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 );
      scene.add( particle );

    }

  }

  renderer = new THREE.CanvasRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  // handle mouse / touch
  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  document.addEventListener( 'touchstart', onDocumentTouchStart, false );
  document.addEventListener( 'touchmove', onDocumentTouchMove, false );
  
  // handle resize
  window.addEventListener( 'resize', onWindowResize, false );
}

var animate = function animate() {
  requestAnimationFrame( animate );
  render();
}

var render = function render() {
  camera.position.x += ( mouseX - camera.position.x ) * .05 * 0.1;
  camera.position.y += ( - mouseY - camera.position.y ) * .05 * 0.0;
  camera.lookAt( scene.position );

  var i = 0;
  var mod = 0.5;

  for ( var ix = 0; ix < AMOUNTX; ix ++ ) {

    for ( var iy = 0; iy < AMOUNTY; iy ++ ) {

      particle = particles[ i++ ];
      particle.position.y = ( Math.sin( ( ix + count ) * 0.3 ) * 50 ) +
        ( Math.sin( ( iy + count ) * 0.5 ) * 50 * mod);
      particle.scale.x = particle.scale.y = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * 4 +
        ( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 4 * mod;

    }

  }

  renderer.render( scene, camera );

  count += 0.1;
}

module.exports = {
  init: init,
  animate: animate,
  render: render
}