import state from '@store';
import { useSnapshot } from 'valtio';
import { getContrastingColor } from '@helpers';

interface CustomButtonProps {
  type: 'filled' | 'outline';
  title: string;
  customStyles?: string;
  handleClick: () => void;
}

const CustomButton = (props: CustomButtonProps) => {
  const { type, title, customStyles, handleClick } = props;
  const snap = useSnapshot(state);

  const generateStyle = (type) => {
    if (type === 'filled') {
      return {
        backgroundColor: snap.color,
        color: getContrastingColor(snap.color)
      };
    } else if (type === 'outline') {
      return {
        borderWidth: '1px',
        borderColor: snap.color,
        color: snap.color
      };
    }
  };

  return (
    <button
      className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
      style={generateStyle(type)}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default CustomButton;
