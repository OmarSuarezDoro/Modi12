/**
 * Univeridad de La Laguna
 * Asignatura: Desarrollo de Sistemas Informáticos
 * Novena práctica de la asignatura DSI
 * Realizada por: Omar Suárez Doro
 * Correo: alu0101483474@ull.edu.es
 */

import chalk from 'chalk';

/**
 * This enum represent the color
 */
export enum COLOR {
  WHITE = 'white',
  BLUE = 'blue',
  BLACK = 'black',
  RED = 'red',
  GREEN = 'green',
  NOCOLOR = 'nocolor',
  MULTICOLOR = 'multicolor'
}

/**
 * This enum represent the type of card
 */
export enum TYPE {
  LAND = 'land',
  CREATURE = 'creature',
  ENCHANTMENT = 'enchantment',
  INSTANT = 'instant',
  SORCERY = 'sorcery',
  ARTIFACT = 'artifact',
  PLANESWALKER = 'planeswalker'
}

/**
 * This enum represent the rarity of the card
 */
export enum RARITY {
  COMMON = 'common',
  UNCOMMON = 'uncommon',
  RARE = 'rare',
  MYTHIC = 'mythic'
}

/**
 * This class represent a card
 */
export class Card {
  constructor(protected id_: number, protected name_: string,
    protected mana_cost_: number, protected color_: COLOR,
    protected type_: TYPE, protected rarity_: RARITY,
    protected rules_text_: string, protected market_value_: number) {
  }

  /**
   * This method return the id of the card
   */
  get id(): number {
    return this.id_;
  }

  /**
   * This method set the id of the card
   */
  set id(value: number) {
    this.id_ = value;
  }
  
  /**
   * This method return the name of the card
   */
  get name(): string {
    return this.name_;
  }
  
  /**
   * This method set the name of the card
   */
  set name(value: string) {
    this.name_ = value;
  }
  
  /**
   * This method return the mana cost of the card
   */
  get manaCost(): number {
    return this.mana_cost_;
  }
  
  /**
   * This method set the mana cost of the card
   */
  set manaCost(value: number) {
    this.mana_cost_ = value;
  }
  
  /**
   * This method return the color of the card
   */
  get color(): COLOR {
    return this.color_;
  }
  
  /**
   * This method set the color of the card
   */
  set color(value: COLOR) {
    this.color_ = value;
  }
  
  /**
   * This method return the type of the card
   */
  get type(): TYPE {
    return this.type_;
  }
  
  /**
   * This method set the type of the card
   */
  set type(value: TYPE) {
    this.type_ = value;
  }
  
  /**
   * This method return the rarity of the card
   */
  get rarity(): RARITY {
    return this.rarity_;
  }
  
  /**
   * This method set the rarity of the card
   */
  set rarity(value: RARITY) {
    this.rarity_ = value;
  }

  /**
   * This method return the rules text of the card
   */
  get rulesText(): string {
    return this.rules_text_;
  }
  
  /**
   * This method set the rules text of the card
   */
  set rulesText(value: string) {
    this.rules_text_ = value;
  }

  /**
   * This method return the market value of the card
   */
  get marketValue(): number {
    return this.market_value_;
  }

  /**
   * This method set the market value of the card
   */
  set marketValue(value: number) {
    this.market_value_ = value;
  }

  /**
   * This method return the string representation of the card
   */
  toString(): string {
    return `Card: ${chalk.bold.underline.magenta(this.name_)},\nID: ${chalk.yellow(this.id_)},\nMana Cost: ${chalk.yellow(this.mana_cost_)},\nColor: ${chalk.yellow(this.color_)},\nType: ${chalk.yellow(this.type_)},\nRarity: ${chalk.yellow(this.rarity_)},\nRules Text: ${chalk.yellow(this.rules_text_)},\nMarket Value: ${chalk.yellow(this.market_value_)}`;
  }
}