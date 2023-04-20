import { Canvas } from '@react-three/fiber';
import { Environment, Center } from '@react-three/drei';
import { Shirt, Backdrop, CameraRig } from '@components';

const CanvasModel = () => {
  return (
    <Canvas
      shadows
      camera={{
        position: [0, 0, 0],
        fov: 30,
        near: 0.003,
        far: 1000
      }}
      gl={{ preserveDrawingBuffer: true }}
      className='w-full max-w-full h-full transition-all ease-in'
    >
      <ambientLight intensity={0.5} />
      <Environment preset='city' />

      <CameraRig>
        <Backdrop />
        <Center>
          <Shirt />
        </Center>
      </CameraRig>
    </Canvas>
  );
};

export default CanvasModel;
