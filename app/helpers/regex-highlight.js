import {helper} from '@ember/component/helper';
import {htmlSafe} from '@ember/string';
import safeGet from 'pos/utils/safe-get';

export function regexHighlight([regex, item, key, cssClass]) {
  let value = safeGet(item, key);
  const match = value.match(regex);

  if (!match) return value;

  match.shift(); // Wipe the dummy first result

  let letterToWrap = match.shift();

  if (!letterToWrap) return value; // Handle the empty regex case

  let isWrapping = false;

  const formattedValue = value.split('').reduce((formattedValue, letter) => {
    let buffer = '';

    if (letterToWrap && letter.toLowerCase() === letterToWrap.toLowerCase()) {
      if (!isWrapping) {
        buffer += `<span class="${cssClass}">`;
        isWrapping = true;
      }
      letterToWrap = match.shift();
    } else if (isWrapping) {
      buffer += '</span>';
      isWrapping = false;
    };
    buffer += letter;

    return formattedValue + buffer;
  }, '');

  return htmlSafe(`<span class="${cssClass}-wrap">${formattedValue}</span>`)
}

export default helper(regexHighlight);
