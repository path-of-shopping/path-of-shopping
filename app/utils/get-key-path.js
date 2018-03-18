export default (sourceObject, key, fallbackValue) => {
  if (sourceObject === null) return fallbackValue;

  const subKeys = key.split('.');
  const valueKey = subKeys.pop();

  const parentObject = subKeys.reduce((subObject, subKey) => {
    if (subObject.hasOwnProperty(subKey)) return subObject[subKey];
    return {};
  }, sourceObject);

  return parentObject[valueKey] || fallbackValue;
};
