import React, { useEffect, useRef, useState } from 'react';
import state from '@store';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';
import {
  fadeAnimation,
  slideAnimation,
  EditorTabs,
  FilterTabs,
  DecalTypes
} from '@config';
import { ColorPicker, CustomButton, Tab, FileUpload } from '@components';
import { useOnClickOutside } from '@composables';
import { reader } from '@helpers';
import { IReadFileType } from '@types';

const Customizer = () => {
  const tabs = useRef(null);
  const snap = useSnapshot(state);

  const [file, setFile] = useState<File | undefined>();

  const [activeEditorTab, setActiveEditorTab] = useState('');
  const [activeFilterTab, setActiveFilterTab] = useState<{
    [key: string]: boolean;
  }>({
    'logo-tshirt': true,
    'stylish-tshirt': false
  });

  const generateTabContent = () => {
    switch (activeEditorTab) {
      case 'color-picker':
        return <ColorPicker />;
      case 'file-picker':
        return <FileUpload file={file} setFile={setFile} readFile={readFile} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    console.log('file', file);
  }, [file]);

  const handleDecals = (type: IReadFileType, result: string) => {
    const decalType = DecalTypes[type];

    if (decalType.stateProperty === 'logoDecal') state.logoDecal = result;
    else state.fullDecal = result;

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  const handleActiveFilterTab = (tabName: string) => {
    console.log('tabName');

    switch (tabName) {
      case 'logo-tshirt':
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case 'stylish-tshirt':
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName]
      };
    });
  };

  useOnClickOutside(tabs, () => {
    setActiveEditorTab('');
  });

  const readFile = async (type: IReadFileType) => {
    if (!file) return;
    const result = (await reader(file)) as string;
    if (result) {
      handleDecals(type, result);
      setActiveEditorTab('');
    }
  };

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key='custom'
            className='absolute top-0 left-0 z-10'
            {...slideAnimation('left')}
          >
            <div className='flex items-center min-h-screen'>
              <div ref={tabs} className='editortabs-container tabs'>
                {EditorTabs.map((tab) => (
                  <Tab
                    isActiveTab={false}
                    isFilterTab={false}
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}

                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div
            className='absolute z-10 top-5 right-5'
            {...fadeAnimation}
          >
            <CustomButton
              type='filled'
              title='Go Back'
              handleClick={() => (state.intro = true)}
              customStyles='w-fit px-4 py-2.5 font-bold text-sm'
            />
          </motion.div>

          <motion.div
            className='filtertabs-container'
            {...slideAnimation('up')}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
