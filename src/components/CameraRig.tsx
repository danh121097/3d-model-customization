import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';

import state from '@store';
import { Euler, Group, Vector3 } from 'three';

type CameraRigProps = {
  children: React.ReactNode;
};

const CameraRig = ({ children }: CameraRigProps) => {
  const group = useRef<Group>(null);
  const snap = useSnapshot(state);

  useFrame((state, delta) => {
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;

    // set the initial position of the model
    let targetPosition = [-0.5, 0, 2];
    if (snap.intro) {
      if (isBreakpoint) targetPosition = [0, 0, 2];
      if (isMobile) targetPosition = [0, 0.2, 2.5];
    } else {
      if (isMobile) targetPosition = [0, 0, 2.5];
      else targetPosition = [0, 0, 2];
    }

    // set model camera position
    easing.damp3(
      state.camera.position,
      targetPosition as unknown as Vector3,
      0.25,
      delta
    );

    // set the model rotation smoothly
    group.current &&
      easing.dampE(
        group.current.rotation as Euler,
        [-state.pointer.y / 4, state.pointer.x / 2, 0],
        0.25,
        delta
      );
  });

  return <group ref={group}>{children}</group>;
};

export default CameraRig;
