// initialize music
var Mixer = new heliosAudioMixer();
Mixer.setLogLvl(2)

if(window.location.hash === '#html5' || ! Mixer.detect.webAudio) {
  console.log('HTML5 mode')
  Mixer.detect.webAudio = false;
}
// base
Mixer.createTrack('track0', { source: 'https://s3-us-west-1.amazonaws.com/audio-joystick/track0', looping: true, gain: 1 });

// mixed
Mixer.createTrack('track1', { source: 'https://s3-us-west-1.amazonaws.com/audio-joystick/track1', looping: true, gain: 0.5 });
Mixer.createTrack('track2', { source: 'https://s3-us-west-1.amazonaws.com/audio-joystick/track2', looping: true, gain: 0.5 });
Mixer.createTrack('track3', { source: 'https://s3-us-west-1.amazonaws.com/audio-joystick/track3', looping: true, gain: 0.5 });
Mixer.createTrack('track4', { source: 'https://s3-us-west-1.amazonaws.com/audio-joystick/track4', looping: true, gain: 0.5 });

console.log('Feature detection: %O', Mixer.detect)

// application
function mute(){
  console.log('mute')
  if(Mixer.muted){
    Mixer.unmute()
    document.getElementById('mix-mute').classList.remove('active')
  } else{
    Mixer.mute()
    document.getElementById('mix-mute').classList.add('active')
  }
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

// application
var canvas = document.getElementById('canvas');
context = canvas.getContext('experimental-webgl', {});
if (!context) {
  context = canvas.getContext('webgl', {});
}

canvas.addEventListener('mousemove', function(evt) {
  var mousePos = getMousePos(canvas, evt);  
  
  var x = (1-(-1))/(this.width-(-1))*(mousePos.x-this.width)+1;
  var y = (1-(-1))/(this.height-(-1))*(mousePos.y-this.height)+1;

  var t1_gain = (x - (-1)) / (1 - (-1));
  var t2_gain = 1 - t1_gain;
  var t3_gain = (y - (-1)) / (1 - (-1));
  var t4_gain = 1 - t3_gain;

  Mixer.getTrack("track1").gain(t1_gain);
  Mixer.getTrack("track2").gain(t2_gain);
  Mixer.getTrack("track3").gain(t1_gain);
  Mixer.getTrack("track4").gain(t2_gain);

}, false);