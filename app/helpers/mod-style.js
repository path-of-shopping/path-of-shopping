import {helper} from '@ember/component/helper';
import {htmlSafe} from '@ember/string';

const COLOR_MATCHERS = [
  {color: '#d14e4e', needle: /to maximum life/i},
  {color: '#b97123', needle: /fire resistance/i},
  {color: '#adaa47', needle: /lightning resistance/i},
  {color: '#3f6db8', needle: /cold resistance/i},
  {color: '#8b49b8', needle: /chaos resistance/i},
];

export function modStyle([mod]) {
  const matcher = COLOR_MATCHERS.find(({needle}) => needle.test(mod));
  if (!matcher) return null;

  return htmlSafe(`color: ${matcher.color};`);
}

export default helper(modStyle);
