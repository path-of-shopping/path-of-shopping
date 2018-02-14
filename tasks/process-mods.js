const fs = require('fs');

const MODS_JSON_PATH = './git_modules/repoe/data/mods.min.json';
const DOMAIN_WHITELIST = ['item', 'flask', 'jewel'];

if (!fs.existsSync(MODS_JSON_PATH)) {
  console.log('Looks like the RePoE git submodule is missing.', MODS_JSON_PATH);
  process.exit(1);
}

console.log('Reading the mods file...');
const mods = JSON.parse(fs.readFileSync(MODS_JSON_PATH));

console.log('Processing the mods...');
const filteredMods = DOMAIN_WHITELIST.reduce((filteredMods, domain) => {
  filteredMods[domain] = {};
  return filteredMods;
}, {});

Object.keys(mods).forEach((key) => {
  const {domain, stats, spawn_weights} = mods[key];

  if (!DOMAIN_WHITELIST.includes(domain)) return;

  const tags = spawn_weights.filter(({weight}) => weight > 0).map(({tag}) => tag);

  stats.forEach(({id, min, max}) => {
    const affix = filteredMods[domain][id] || (filteredMods[domain][id] = {id, tags: {}});

    tags.forEach((tag) => {
      let affixTag = affix.tags[tag] || (affix.tags[tag] = {min: Infinity, max: -Infinity});
      affixTag.min = Math.min(affixTag.min, min);
      affixTag.max = Math.max(affixTag.max, max);
    });
  });
});

console.log('Writing constants files...');
Object.keys(filteredMods).forEach((domain) => {
  fs.writeFile(`./app/constants/${domain}-mods.js`, `export default ${JSON.stringify(filteredMods[domain])};`, (error) => {
    if (error) return console.log(error);
    console.log(`  ${domain}-mods.js - Success !`);
  });
});
