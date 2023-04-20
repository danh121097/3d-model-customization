import { useSnapshot } from 'valtio';
import { useGLTF, useTexture } from '@react-three/drei';

import state from '@store';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';

const Shirt = () => {
  const snap = useSnapshot(state);
  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  const gltf = useGLTF('/threejs/man_shirt.glb') as any;
  const [mat] = Object.values(gltf.materials) as any;

  console.log('gltf', gltf);

  // console.log('nodes', nodes);
  // console.log('materials', materials);

  mat.color &&
    useFrame((_, delta) => easing.dampC(mat.color, snap.color, 0.25, delta));

  const stateString = JSON.stringify(snap);

  return (
    <group key={stateString}>
      <primitive object={gltf.scene}></primitive>
    </group>
  );
};

export default Shirt;
useGLTF.preload('/threejs/man_shirt.glb');
