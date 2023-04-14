import dayjs from 'dayjs';

export const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export function formatName(str: string) {
  if (str) {
    const convertToArray = str.toLowerCase().split('_');
    const result = convertToArray.map(function (val) {
      return val.replace(val.charAt(0), val.charAt(0).toUpperCase());
    });
    return result.join(' ');
  }
  return '';
}

export function removeSpace(str: string) {
  return str.replace(/\s/g, '');
}

export function timeFormat(date: string | number, format = 'HH:mm:ss') {
  return dayjs(date).format(format);
}

export function dateFormat(date: string, format = 'DD/MM/YYYY') {
  return dayjs(date).format(format);
}

export function isSingaporeNumber(mobile_number: string) {
  return /^\+?65(8|9)\d{7}$/.test(mobile_number);
}

export function countdownTimer(milisecons: number) {
  const mils = Math.max(milisecons, 0);
  const days = Math.floor(mils / (1000 * 60 * 60 * 24));
  const hours = Math.floor((mils / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((mils / 1000 / 60) % 60);
  const seconds = Math.floor((mils / 1000) % 60);
  return {
    days: ('0' + days).slice(-2),
    hours: ('0' + hours).slice(-2),
    seconds: ('0' + seconds).slice(-2),
    minutes: ('0' + minutes).slice(-2)
  };
}

export function isEmailValid(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

export function downloadCanvasToImage() {
  const canvas = document.querySelector('canvas');
  if (!canvas) return;
  const dataURL = canvas.toDataURL();
  const link = document.createElement('a');

  link.href = dataURL;
  link.download = 'canvas.png';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function reader(file: File) {
  new Promise((resolve) => {
    const fileReader = new FileReader();
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.readAsDataURL(file);
  });
}

export function getContrastingColor(color: string) {
  // Remove the '#' character if it exists
  const hex = color.replace('#', '');

  // Convert the hex string to RGB values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate the brightness of the color
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Return black or white depending on the brightness
  return brightness > 128 ? 'black' : 'white';
}
