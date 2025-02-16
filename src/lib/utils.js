import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const toTimeString = (sec, showMilliSeconds = true) => {
  sec = parseFloat(sec);
  let hours = Math.floor(sec / 3600);
  let minutes = Math.floor((sec - hours * 3600) / 60);
  let seconds = sec - hours * 3600 - minutes * 60;
  // add 0 if value < 10; Example: 2 => 02
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  // matches the decimal point and the digits after it e.g if the number is 4.567 it matches .567
  let maltissaRegex = /\..*$/; 
  let millisec = String(seconds).match(maltissaRegex);
  return (
    hours +
    ":" +
    minutes +
    ":" +
    String(seconds).replace(maltissaRegex, "") +
    (showMilliSeconds ? (millisec ? millisec[0] : ".000") : "")
  );
};

export const readFileAsBase64 = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const download = (url) => {
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "");
  link.click();
};