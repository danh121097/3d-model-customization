import React from 'react';
import { CustomButton } from '@components';
import { IReadFileType } from '@types';

type FileUploadProps = {
  file: File | undefined;
  setFile: (file: File) => void;
  readFile: (type: IReadFileType) => void;
};

const FileUpload = (props: FileUploadProps) => {
  const { file, setFile, readFile } = props;

  const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event) return;
    const { files } = event.target;
    const selectedFiles = files as FileList;
    setFile(selectedFiles[0]);
  };

  return (
    <div className='filepicker-container'>
      <div className='flex-1 flex flex-col'>
        <input
          id='file-upload'
          type='file'
          accept='image/*'
          onChange={onChangeFile}
        />
        <label htmlFor='file-upload' className='filepicker-label'>
          Upload File
        </label>

        <p className='mt-2 text-gray-500 text-xs truncate'>
          {!file ? 'No file selected' : file.name}
        </p>
      </div>

      <div className='mt-4 flex flex-wrap gap-3'>
        <CustomButton
          type='outline'
          title='Logo'
          handleClick={() => readFile('logo')}
          customStyles={`text-xs ${!file && 'pointer-events-none'}`}
        />
        <CustomButton
          type='filled'
          title='Full'
          handleClick={() => readFile('full')}
          customStyles={`text-xs ${!file && 'pointer-events-none'}`}
        />
      </div>
    </div>
  );
};

export default FileUpload;
