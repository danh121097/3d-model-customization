import { proxy } from 'valtio';

const state = proxy({
  intro: true,
  color: '#EFBD48',
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: 'imgs/threejs.png',
  fullDecal: 'imgs/threejs.png'
});

export default state;
