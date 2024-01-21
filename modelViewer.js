import '@google/model-viewer';
import WaveSurfer from 'wavesurfer.js'

let config = { 
  modelUrl: 'https://cdn.jsdelivr.net/gh/Goliath3/panorama@main//golden_pharaoh%2023.glb',
  audioUrl: '/sample.mp3',
  test:''
}

window.ModelViewerConfig = config;
let wavesurfer;
export function modelViewer(element) {
  const modelViewer = document.createElement('model-viewer');
  modelViewer.src = window.ModelViewerConfig.modelUrl;
  modelViewer.setAttribute('alt', 'A 3D model');
  // modelViewer.setAttribute('auto-rotate', '');
  modelViewer.setAttribute('camera-controls', '');
  // modelViewer.setAttribute('autoplay', false);
  // modelViewer.setAttribute('scale', '1 1 1'); // Replace with your desired scale values
  modelViewer.style.width = window.innerWidth;
  modelViewer.style.height = window.innerHeight;
  modelViewer.shadowIntensity = 1;
  modelViewer.touchAction = 'pan-y';
  modelViewer.ar = true;
  modelViewer.arMode = 'webxr scene-viewer';
  // modelViewer.setAttribute('field-of-view', '9deg');
  // modelViewer.setAttribute('camera-orbit', '0deg 75deg 150%');

  //Add modelviewer to #container in #app
  element.appendChild(modelViewer);

  //Create & add play pause state btn to #container in #app
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.id = 'counter';
  btn.innerHTML = 'Play';
  element.appendChild(btn);

  //Eventlistener to handle play pause logic
  btn.addEventListener('click', () => {
    let paused = modelViewer.paused;
    console.log(paused);
    if (!paused) {
      modelViewer.pause();
      btn.innerHTML = 'Play';
      fadeOut()
    } else {
      modelViewer.play();
      btn.innerHTML = 'Pause';
      fadeIn()
    }
    console.log('play');
  });
}

export function waveSurfer(element) {

  wavesurfer = WaveSurfer.create({
    container: '#wavesurfer',
    waveColor: '#3d90b6',
    progressColor: '#f0f0f0',
    url: window.ModelViewerConfig.audioUrl,
    // Set a bar width
    barHeight: 0,
    // Set a bar width
    barWidth: 0,
    // Optionally, specify the spacing between bars
    barGap: 2,
    // And the bar radius
    barRadius: 2,
    loop: false,
    hidden: true
  });


  // Handle the finish event
  wavesurfer.on('finish', function () {
    console.log('here')
    fadeIn(); // Call fadeIn function to restart the audio
  });


}



function fadeIn(duration = 300) {
  let startVolume = 0;
  wavesurfer.setVolume(startVolume);
  wavesurfer.play();

  const interval = 30;
  const step = interval / duration;

  let intervalId = setInterval(() => {
    startVolume += step;
    if (startVolume >= 1) {
      startVolume = 1;
      clearInterval(intervalId);
    }
    wavesurfer.setVolume(startVolume);
  }, interval);
}

function fadeOut(duration = 300) {
  let currentVolume = wavesurfer.getVolume();

  const interval = 30;
  const step = currentVolume * (interval / duration);

  let intervalId = setInterval(() => {
    currentVolume -= step;
    if (currentVolume <= 0) {
      currentVolume = 0;
      clearInterval(intervalId);
      wavesurfer.pause();
    }
    wavesurfer.setVolume(currentVolume);
  }, interval);
}

