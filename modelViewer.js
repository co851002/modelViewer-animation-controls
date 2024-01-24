
import '@google/model-viewer';
import WaveSurfer from 'wavesurfer.js'


window.ModelViewerConfig = null;

// const config = {
//     modelUrl: '',//model url - any origin
//     audioUrl: '/cool_music_3.mp3', //audio url to be on same origin as iframe html
//     width: '100px', //width is px, % or vh
//     height: '100px', //height is px, % or vh
//     url: 'https://www.tiktok.com', //Paste clickout url here
//     centered: true, //true or false, false defaults to top left
// }

// window.ModelViewerConfig = config;

let wavesurfer;
let app = document.getElementById('app');
let modelUrl = window.ModelViewerConfig.modelUrl || 'https://cdn.jsdelivr.net/gh/Goliath3/panorama@main/shaylushay.glb';
let audioUrl = window.ModelViewerConfig.audioUrl || '/cool_music_3.mp3';
let width = window.ModelViewerConfig.width || '100%';
let height = window.ModelViewerConfig.height || '100%';
let clickOut = window.ModelViewerConfig.url || 'https://www.sketchfab.com';


export function modelViewer(element) {
  element.style.width = window.ModelViewerConfig.width;
  element.style.height = window.ModelViewerConfig.height;
  window.ModelViewerConfig.centered ? document.getElementById('app').style.margin = '0 auto' : null;
  console.log(window)
  const modelViewer = document.createElement('model-viewer');
  modelViewer.src = modelUrl;
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
  

  //Add modelviewer to #container in #app
  element.appendChild(modelViewer);

  console.log(modelViewer)

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

 

// modelViewer.addEventListener('load', () => {
//   // Access the Three.js scene
//   const modelScene = modelViewer.model;
//   const threeScene = modelScene ? modelScene.scene : null;

//   console.log('loaded', modelScene, threeScene)


//   if (threeScene) {
//       // Traverse the scene to find meshes
//       threeScene.traverse((object) => {
//           if (object.isMesh) {
//               // Do something with the mesh
//               console.log(object);
//           }
//       });
//   }
// });

let isDragging = false;

modelViewer.addEventListener('mousedown', () => {
    isDragging = false;
});

modelViewer.addEventListener('mousemove', () => {
    isDragging = true;
});

modelViewer.addEventListener('mouseup', () => {
    if (!isDragging) {
        // Not dragging, so handle as a click
        window.open (clickOut, '_blank');
    }
});


}

export function waveSurfer(element) {

  wavesurfer = WaveSurfer.create({
    container: '#wavesurfer',
    waveColor: '#3d90b6',
    progressColor: '#f0f0f0',
    url: '/cool_music_3.mp3',
    // Set a bar width
    barHeight: 0.5,
    // Set a bar width
    barWidth: 1,
    // Optionally, specify the spacing between bars
    barGap: 2,
    // And the bar radius
    barRadius: 2,
    loop: false
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

