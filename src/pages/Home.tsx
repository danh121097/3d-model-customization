import state from '@store';
import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';
import { CustomButton } from '@components';
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation
} from '@config';

const Home = () => {
  const snap = useSnapshot(state);

  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className='home' {...slideAnimation('left')}>
          <motion.header {...slideAnimation('down')}>
            <img
              src='imgs/logo.png'
              alt='logo'
              className='w-8 h-8 object-contain cursor-pointer'
            />
          </motion.header>

          <motion.div className='home-content' {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className='head-text'>
                LET'S <br className='xl:block hidden' /> DO IT.
              </h1>
            </motion.div>
            <motion.div
              {...headContentAnimation}
              className='flex flex-col gap-5'
            >
              <p className='max-w-md font-normal text-gray-600 text-base'>
                Using our{' '}
                <span className='font-bold'>3D customization tool</span>, create
                your model. Use your imagination to create your own unique
                style.
              </p>

              <CustomButton
                handleClick={() => (state.intro = false)}
                type='filled'
                title='Customize It'
                customStyles='w-fit !px-4 !py-2.5 font-bold text-sm'
              />
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Home;
