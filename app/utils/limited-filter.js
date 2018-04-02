export default (list, testCallback, limit = 50) => {
  const filteredList = [];

  for (let i = 0; i < list.length; i++) {
    if (!testCallback(list[i])) continue;

    filteredList.push(list[i]);
    if (filteredList.length === limit) return filteredList;
  }

  return filteredList;
};
