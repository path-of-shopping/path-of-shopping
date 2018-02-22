import Service from '@ember/service';

const DEFAULT_FILTERS = {
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
    account: '',
    saleType: '',
    price: {currency: '', min: '', max: ''}
  }
};



export default Service.extend({
  initializeFilters() {
    return {
      typeFilters: DEFAULT_FILTERS.TYPE,
      weaponFilters: DEFAULT_FILTERS.WEAPON,
      armourFilters: DEFAULT_FILTERS.ARMOUR,
      socketFilters: DEFAULT_FILTERS.SOCKET,
      requirementFilters: DEFAULT_FILTERS.REQUIREMENT,
      mapFilters: DEFAULT_FILTERS.MAP,
      miscellaneousFilters: DEFAULT_FILTERS.MISCELLANEOUS,
      tradeFilters: DEFAULT_FILTERS.TRADE,
    };
  }
});
