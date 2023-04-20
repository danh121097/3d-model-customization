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
  logoDecal: 'imgs/logo.png',
  fullDecal: 'imgs/logo.png'
});

export default state;
