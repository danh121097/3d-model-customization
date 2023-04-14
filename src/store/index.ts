import { proxy } from 'valtio';

interface IProxy {
  intro: boolean;
  color: string;
  isLogoTexture: boolean;
  isFullTexture: boolean;
  logoDecal: string;
  fullDecal: string;
}

const state = proxy<IProxy>({
  intro: true,
  color: '#EFBD48',
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: 'imgs/threejs.png',
  fullDecal: 'imgs/threejs.png'
});

export default state;
