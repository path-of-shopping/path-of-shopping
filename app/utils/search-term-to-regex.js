export default (searchTerm) => {
  return new RegExp(searchTerm.replace(/[^\w ]/g).split(' ').map((word) => `(${word})`).join('.*'), 'i');
};
