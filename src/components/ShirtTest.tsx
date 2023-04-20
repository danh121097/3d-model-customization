import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Decal } from '@react-three/drei';

import state from '@store';

const Shirt = () => {
  const snap = useSnapshot(state);
  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  const { nodes, materials } = useGLTF('/threejs/man_shirt.glb') as any;

  console.log('nodes', nodes);
  console.log('materials', materials);

  useFrame((_, delta) => {
    Object.keys(materials).forEach((materialName) => {
      console.log('', materialName);
      materials[materialName] &&
        easing.dampC(materials[materialName].color, snap.color, 0.25, delta);
    });
  });

  const stateString = JSON.stringify(snap);

  return (
    <group key={stateString}>
      {nodes &&
        Object.keys(nodes).map((nodeName) => {
          const { geometry } = nodes[nodeName];

          return (
            geometry && (
              <mesh
                key={nodeName}
                castShadow
                geometry={geometry}
                material={geometry.material || undefined}
                material-roughness={1}
                dispose={null}
              >
                {snap.isFullTexture && (
                  <Decal
                    position={[0, 0, 0]}
                    rotation={[0, 0, 0]}
                    scale={2}
                    map={fullTexture}
                  />
                )}

                {snap.isLogoTexture && (
                  <Decal
                    position={[0, 0.04, 0.15]}
                    rotation={[0, 0, 0]}
                    scale={0.15}
                    map={logoTexture}
                    map-anisotropy={16}
                    depthTest={false}
                    depthWrite={true}
                  />
                )}
              </mesh>
            )
          );
        })}
    </group>
  );
};

export default Shirt;
useGLTF.preload('/threejs/man_shirt.glb');
