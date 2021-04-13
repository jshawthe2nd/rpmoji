import React from "react";

export const symbols = {
  warrior: {
    male: `🦸‍♂️`,
    female: `🦸‍♀️`
  },
  mage: {
    male: `🧙‍♂️`,
    female: `🧙‍♀️`
  },
  enemy: {
    ogre: `👹`,
    goblin: `👺`,
    ghost: `👻`,
    alien: `👽`,
    monser: `👾`,
    robot: `🤖`,
    zombie: `🧟‍♂️`,
    boss: `🦹‍♂️`
  },
  npc: {
    guard: `💂‍♂️`,
    vampire: `🧛‍♂️`,
    djinn: `🧞`,
    elf: {
      male: `🧝‍♂️`,
      female: `🧝‍♀️`
    },
    fairy: {
      male: `🧚‍♂️`,
      female: `🧚‍♀️`
    },
    king: `🤴`,
    queen: `👸`,
    healer: {
      male: `👨‍⚕️`,
      female: `👩‍⚕️`
    },
    alumnus: {
      male: `👨‍🏫`,
      female: `👩‍🏫`
    },
    alchemist: {
      male: `👨‍🔬`,
      female: `👩‍🔬`
    },
    blacksmith: {
      male: `👨‍🔧`,
      female: `👩‍🔧`
    },
    sorceror: {
      male: `👨‍💼`,
      female: `👩‍💼`
    },
    guardian: `🤵`
  },
  world: {
    region: {
      forest: `🌲`,
      mountain: `⛰`,
      desert: `🌵`,
      water: `🌊`
    },
    location: {
      town: `🏘`,
      dungeon: `🕳`,
      castle: `🏰`,
      guild: `🏟`,
      shop: `🏪`,
      monument: `🗿`,
      city: `🏙`
    }
  },
  menu: {
    hp: `❤`,
    notification: `🔔`,
    gold: `💰`,
    quest: `📓`,
    select: `👉`,
    loc: `🧭`
  },
  status: {
    poison: `🤢`,
    ko: `💀`
  },
  item: {
    potion: `🧃`,
    ether: `🧴`,
    elixir: `🧪`,
    antidote: `💊`
  },
  gear: {
    weapon: {
      sword: `🗡️`,
      axe: `🪓`,
      bow: `🏹`,
      dagger: `⚔️`
    },
    armor: `🧥`,
    shield: `🛡️`,
    robe: `👘`,
  },
  magic: {
    scroll: `📜`,
  },
  spell: {
    cure: `🩹`,
    ice: `🧊`,
    dispel: `🔮`,
    fire: `🔥`,
    elec: `⚡`,
    poison: `⚗️`
  },
  dialog: `💬`
};

function getSymbol( symbolPath ) {
  return ( symbolPath ) ? symbolPath
    .split( "." )
    .reduce( ( o, i ) => o[ i ], symbols ) : ``;
}

export function Icon( { symbol, label, cssClass, status = false } ) {
  return (
    <span
      className={ `icon 
        ${ getSymbol( symbol ) } 
        ${ ( status ) ? `status` : `` } 
        ${ cssClass }`
      }
      role="img"
      aria-label={label ? label : ``}
    >
      { getSymbol( symbol ) }
    </span>
  );
}
