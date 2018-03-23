import Service, {inject as service} from '@ember/service';
import EmberObject from '@ember/object';
import ModFilterTypes from 'pos/constants/mod-filter-types';
import Ember from 'ember';
import getKeyPath from 'pos/utils/get-key-path';

const DEFAULT_FILTERS = {
  NAME: {
    id: '',
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
    price: {currency: '', min: '', max: ''}
  }
};

export default Service.extend({
  staticDataFetcher: service('fetchers/static-data-fetcher'),

  hydrateFilters(partialFilters = null) {
    return {
      league: getKeyPath(partialFilters, 'league', this.get('staticDataFetcher.leagues')[0]),
      name: {
        id: getKeyPath(partialFilters, 'name.id', DEFAULT_FILTERS.NAME.id),
        name: getKeyPath(partialFilters, 'name.name', DEFAULT_FILTERS.NAME.name),
        base: getKeyPath(partialFilters, 'name.base', DEFAULT_FILTERS.NAME.base)
      },
      type: {
        category: getKeyPath(partialFilters, 'type.category', DEFAULT_FILTERS.category),
        rarity: getKeyPath(partialFilters, 'type.rarity', DEFAULT_FILTERS.rarity)
      },
      weapon: {
        damage: {
          min: getKeyPath(partialFilters, 'weapon.damage.min', DEFAULT_FILTERS.WEAPON.damage.min),
          max: getKeyPath(partialFilters, 'weapon.damage.max', DEFAULT_FILTERS.WEAPON.damage.max)
        },
        critical: {
          min: getKeyPath(partialFilters, 'weapon.critical.min', DEFAULT_FILTERS.WEAPON.critical.min),
          max: getKeyPath(partialFilters, 'weapon.damage.max', DEFAULT_FILTERS.WEAPON.critical.max)
        },
        pdps: {
          min: getKeyPath(partialFilters, 'weapon.pdps.min', DEFAULT_FILTERS.WEAPON.pdps.min),
          max: getKeyPath(partialFilters, 'weapon.damage.max', DEFAULT_FILTERS.WEAPON.pdps.max)
        },
        aps: {
          min: getKeyPath(partialFilters, 'weapon.aps.min', DEFAULT_FILTERS.WEAPON.aps.min),
          max: getKeyPath(partialFilters, 'weapon.damage.max', DEFAULT_FILTERS.WEAPON.aps.max)
        },
        dps: {
          min: getKeyPath(partialFilters, 'weapon.dps.min', DEFAULT_FILTERS.WEAPON.dps.min),
          max: getKeyPath(partialFilters, 'weapon.damage.max', DEFAULT_FILTERS.WEAPON.dps.max)
        },
        edps: {
          min: getKeyPath(partialFilters, 'weapon.edps.min', DEFAULT_FILTERS.WEAPON.edps.min),
          max: getKeyPath(partialFilters, 'weapon.damage.max', DEFAULT_FILTERS.WEAPON.edps.max)
        }
      },
      armour: {
        armour: {
          min: getKeyPath(partialFilters, 'armour.armour.min', DEFAULT_FILTERS.ARMOUR.armour.min),
          max: getKeyPath(partialFilters, 'armour.armour.max', DEFAULT_FILTERS.ARMOUR.armour.max)
        },
        energy: {
          min: getKeyPath(partialFilters, 'armour.energy.min', DEFAULT_FILTERS.ARMOUR.energy.min),
          max: getKeyPath(partialFilters, 'armour.energy.max', DEFAULT_FILTERS.ARMOUR.energy.max)
        },
        evasion: {
          min: getKeyPath(partialFilters, 'armour.evasion.min', DEFAULT_FILTERS.ARMOUR.evasion.min),
          max: getKeyPath(partialFilters, 'armour.evasion.max', DEFAULT_FILTERS.ARMOUR.evasion.max)
        },
        block: {
          min: getKeyPath(partialFilters, 'armour.block.min', DEFAULT_FILTERS.ARMOUR.block.min),
          max: getKeyPath(partialFilters, 'armour.block.max', DEFAULT_FILTERS.ARMOUR.block.max)
        },
      },
      socket: {
        sockets: {
          red: getKeyPath(partialFilters, 'socket.sockets.red', DEFAULT_FILTERS.SOCKET.sockets.red),
          green: getKeyPath(partialFilters, 'socket.sockets.green', DEFAULT_FILTERS.SOCKET.sockets.green),
          blue: getKeyPath(partialFilters, 'socket.sockets.blue', DEFAULT_FILTERS.SOCKET.sockets.blue),
          min: getKeyPath(partialFilters, 'socket.sockets.min', DEFAULT_FILTERS.SOCKET.sockets.min),
          max: getKeyPath(partialFilters, 'socket.sockets.max', DEFAULT_FILTERS.SOCKET.sockets.max)
        },
        links: {
          red: getKeyPath(partialFilters, 'socket.links.red', DEFAULT_FILTERS.SOCKET.links.red),
          green: getKeyPath(partialFilters, 'socket.links.green', DEFAULT_FILTERS.SOCKET.links.green),
          blue: getKeyPath(partialFilters, 'socket.links.blue', DEFAULT_FILTERS.SOCKET.links.blue),
          min: getKeyPath(partialFilters, 'socket.links.min', DEFAULT_FILTERS.SOCKET.links.min),
          max: getKeyPath(partialFilters, 'socket.links.max', DEFAULT_FILTERS.SOCKET.links.max)
        },
      },
      requirement: {
        level: {
          min: getKeyPath(partialFilters, 'requirement.level.min', DEFAULT_FILTERS.REQUIREMENT.level.min),
          max: getKeyPath(partialFilters, 'requirement.level.max', DEFAULT_FILTERS.REQUIREMENT.level.max)
        },
        dexterity: {
          min: getKeyPath(partialFilters, 'requirement.dexterity.min', DEFAULT_FILTERS.REQUIREMENT.dexterity.min),
          max: getKeyPath(partialFilters, 'requirement.dexterity.max', DEFAULT_FILTERS.REQUIREMENT.dexterity.max)
        },
        strength: {
          min: getKeyPath(partialFilters, 'requirement.strength.min', DEFAULT_FILTERS.REQUIREMENT.strength.min),
          max: getKeyPath(partialFilters, 'requirement.strength.max', DEFAULT_FILTERS.REQUIREMENT.strength.max)
        },
        intelligence: {
          min: getKeyPath(partialFilters, 'requirement.intelligence.min', DEFAULT_FILTERS.REQUIREMENT.intelligence.min),
          max: getKeyPath(partialFilters, 'requirement.intelligence.max', DEFAULT_FILTERS.REQUIREMENT.intelligence.max)
        }
      },
      map: {
        tier: {
          min: getKeyPath(partialFilters, 'map.tier.min', DEFAULT_FILTERS.MAP.tier.min),
          max: getKeyPath(partialFilters, 'map.tier.max', DEFAULT_FILTERS.MAP.tier.max)
        },
        iiq: {
          min: getKeyPath(partialFilters, 'map.iiq.min', DEFAULT_FILTERS.MAP.iiq.min),
          max: getKeyPath(partialFilters, 'map.iiq.max', DEFAULT_FILTERS.MAP.iiq.max)
        },
        packSize: {
          min: getKeyPath(partialFilters, 'map.packSize.min', DEFAULT_FILTERS.MAP.packSize.min),
          max: getKeyPath(partialFilters, 'map.packSize.max', DEFAULT_FILTERS.MAP.packSize.max)
        },
        iir: {
          min: getKeyPath(partialFilters, 'map.iir.min', DEFAULT_FILTERS.MAP.iir.min),
          max: getKeyPath(partialFilters, 'map.iir.max', DEFAULT_FILTERS.MAP.iir.max)
        },
        shaped: getKeyPath(partialFilters, 'map.shaped', DEFAULT_FILTERS.MAP.shaped),
        series: getKeyPath(partialFilters, 'map.series', DEFAULT_FILTERS.MAP.series)
      },
      miscellaneous: {
        quality: {
          min: getKeyPath(partialFilters, 'miscellaneous.quality.min', DEFAULT_FILTERS.MISCELLANEOUS.quality.min),
          max: getKeyPath(partialFilters, 'miscellaneous.quality.max', DEFAULT_FILTERS.MISCELLANEOUS.quality.max)
        },
        gemLevel: {
          min: getKeyPath(partialFilters, 'miscellaneous.gemLevel.min', DEFAULT_FILTERS.MISCELLANEOUS.gemLevel.min),
          max: getKeyPath(partialFilters, 'miscellaneous.gemLevel.max', DEFAULT_FILTERS.MISCELLANEOUS.gemLevel.max)
        },
        itemLevel: {
          min: getKeyPath(partialFilters, 'miscellaneous.itemLevel.min', DEFAULT_FILTERS.MISCELLANEOUS.itemLevel.min),
          max: getKeyPath(partialFilters, 'miscellaneous.itemLevel.max', DEFAULT_FILTERS.MISCELLANEOUS.itemLevel.max)
        },
        talismanTier: {
          min: getKeyPath(partialFilters, 'miscellaneous.talismanTier.min', DEFAULT_FILTERS.MISCELLANEOUS.talismanTier.min),
          max: getKeyPath(partialFilters, 'miscellaneous.talismanTier.max', DEFAULT_FILTERS.MISCELLANEOUS.talismanTier.max)
        },
        shaperItem: getKeyPath(partialFilters, 'miscellaneous.shaperItem', DEFAULT_FILTERS.MISCELLANEOUS.shaperItem),
        elderItem: getKeyPath(partialFilters, 'miscellaneous.elderItem', DEFAULT_FILTERS.MISCELLANEOUS.elderItem),
        alternateArt: getKeyPath(partialFilters, 'miscellaneous.alternateArt', DEFAULT_FILTERS.MISCELLANEOUS.alternateArt),
        corrupted: getKeyPath(partialFilters, 'miscellaneous.corrupted', DEFAULT_FILTERS.MISCELLANEOUS.corrupted),
        enchanted: getKeyPath(partialFilters, 'miscellaneous.enchanted', DEFAULT_FILTERS.MISCELLANEOUS.enchanted),
        identified: getKeyPath(partialFilters, 'miscellaneous.identified', DEFAULT_FILTERS.MISCELLANEOUS.identified),
        crafted: getKeyPath(partialFilters, 'miscellaneous.crafted', DEFAULT_FILTERS.MISCELLANEOUS.crafted)
      },
      trade: {
        price: {
          currency: getKeyPath(partialFilters, 'trade.price.currency', DEFAULT_FILTERS.TRADE.price.currency),
          min: getKeyPath(partialFilters, 'trade.price.min', DEFAULT_FILTERS.TRADE.price.min),
          max: getKeyPath(partialFilters, 'trade.price.max', DEFAULT_FILTERS.TRADE.price.max)
        },
        status: getKeyPath(partialFilters, 'trade.status', DEFAULT_FILTERS.TRADE.status),
        account: getKeyPath(partialFilters, 'trade.account', DEFAULT_FILTERS.TRADE.account)

      },
      mod: Ember.A((partialFilters && partialFilters.mod) ? partialFilters.mod.map((rawModBlock) => this.initModFilterBlock(rawModBlock)) : [this.initModFilterBlock()])
    };
  },

  sanitize(filtersHash) {
    const copy = JSON.parse(JSON.stringify(filtersHash));
    this._clean(copy);
    this._cleanEmptyMods(copy);

    return copy;
  },

  initModFilterBlock(rawFilterBlock = {}) {
    return EmberObject.create({
      type: rawFilterBlock.type || ModFilterTypes.AND,
      min: rawFilterBlock.min || '',
      max: rawFilterBlock.max || '',
      mods: Ember.A(rawFilterBlock.mods ? rawFilterBlock.mods.map((rawModItem) => this.initModFilterItem(rawModItem)) : [this.initModFilterItem()])
    });
  },

  initModFilterItem(rawFilterItem = {}) {
    return EmberObject.create({
      mod: rawFilterItem.mod || '',
      weight: rawFilterItem.weight || '',
      min: rawFilterItem.min || '',
      max: rawFilterItem.max || ''
    });
  },

  _clean(hash) {
    Object.keys(hash).forEach((key) => {
      if (typeof hash[key] === 'object') {
        this._clean(hash[key]);
        if (Object.values(hash[key]).length) return;
      } else if (!!hash[key] || hash[key] === 0 || hash[key] === false) return;

      delete hash[key];
    });
  },

  _cleanEmptyMods(hash) {
    if (!hash.mod) return;

    hash.mod.forEach((block) => {
      block.mods = block.mods.filter(({mod}) => !!mod);
    });

    hash.mod = hash.mod.filter(({mods}) => mods.length);

    if (hash.mod.length === 0) delete hash.mod;
  }
});
