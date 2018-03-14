export default (sourceObject, key) => {
  if (sourceObject.get) return sourceObject.get(key);
  return sourceObject[key];
};
