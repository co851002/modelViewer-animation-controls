import './style.css';
import { modelViewer, waveSurfer } from './modelViewer';
modelViewer(document.querySelector('#container'));
waveSurfer(document.querySelector('#container')); 

const config = {
    modelUrl: '',
    audioUrl: '',
    width: '',
    height: ''
}

window.mvConfig = config;
