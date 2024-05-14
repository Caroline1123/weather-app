const typeWriterEffect = (string, location) => {
  let i = 0;
  let write = () => {
    if (i < string.length) {
      location.innerHTML += string[i];
      i++;
      setTimeout(write, 75);
    }
  };
  setTimeout(write, 50);
};

export { typeWriterEffect };
