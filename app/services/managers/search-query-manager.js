import Service from '@ember/service';

const DEFAULT_FILTERS = {
  LEAGUE: 'Standard',
  NAME: {
    name: '',
    base: ''
  },
  TYPE: {
    category: '',
    rarity: ''
  },
  WEAPON: {
    damage: {min: '', max: ''},
    critical: {min: '', max: ''},
    pdps: {min: '', max: ''},
    aps: {min: '', max: ''},
    dps: {min: '', max: ''},
    edps: {min: '', max: ''},
  },
  ARMOUR: {
    armour: {min: '', max: ''},
    energy: {min: '', max: ''},
    evasion: {min: '', max: ''},
    block: {min: '', max: ''}
  },
  SOCKET: {
    sockets: {red: '', green: '', blue: '', white: '', min: '', max: ''},
    links: {red: '', green: '', blue: '', white: '', min: '', max: ''}
  },
  REQUIREMENT: {
    level: {min: '', max: ''},
    dexterity: {min: '', max: ''},
    strength: {min: '', max: ''},
    intelligence: {min: '', max: ''}
  },
  MAP: {
    tier: {min: '', max: ''},
    iiq: {min: '', max: ''},
    packSize: {min: '', max: ''},
    iir: {min: '', max: ''},
    shaped: '',
    series: ''
  },
  MISCELLANEOUS: {
    quality: {min: '', max: ''},
    gemLevel: {min: '', max: ''},
    itemLevel: {min: '', max: ''},
    talismanTier: {min: '', max: ''},
    shaperItem: '',
    elderItem: '',
    alternateArt: '',
    corrupted: '',
    enchanted: '',
    identified: '',
    crafted: ''
  },
  TRADE: {
    status: 'online',
    account: '',
    saleType: '',
    price: {currency: '', min: '', max: ''}
  }
};

export default Service.extend({
  initializeFilters() {
    return {
      league: DEFAULT_FILTERS.LEAGUE,
      name: DEFAULT_FILTERS.NAME,
      type: DEFAULT_FILTERS.TYPE,
      weapon: DEFAULT_FILTERS.WEAPON,
      armour: DEFAULT_FILTERS.ARMOUR,
      socket: DEFAULT_FILTERS.SOCKET,
      requirement: DEFAULT_FILTERS.REQUIREMENT,
      map: DEFAULT_FILTERS.MAP,
      miscellaneous: DEFAULT_FILTERS.MISCELLANEOUS,
      trade: DEFAULT_FILTERS.TRADE,
    };
  },

  hydrate(query) {
    return Object.assign(this.initializeFilters(), query);
  },

  sanitize(filtersHash) {
    const copy = JSON.parse(JSON.stringify(filtersHash));
    this._clean(copy);
    return copy;
  },

  _clean(hash) {
    Object.keys(hash).forEach((key) => {
      if (typeof hash[key] === 'object') {
        this._clean(hash[key]);
        if (Object.values(hash[key]).length) return;
      } else if (!!hash[key] || hash[key] === 0 || hash[key] === false) return;

      delete hash[key];
    });
  }
});
