/**
 * Univeridad de La Laguna
 * Asignatura: Desarrollo de Sistemas Informáticos
 * Novena práctica de la asignatura DSI
 * Realizada por: Omar Suárez Doro
 * Correo: alu0101483474@ull.edu.es
 */
import { Card, COLOR, RARITY, TYPE } from './Card.js';
import { CreatureCard } from './CreatureCard.js';
import { PlanesWalkerCard } from './PlanesWalkerCard.js';

/**
 * This interface represents a CardCreator
 */
export interface CardCreatorIface {
  createCard(): Card;
}

/**
 * This class represents a CardCreator
 */
export class CardCreator implements CardCreatorIface {
  constructor(protected id_: number, protected name_: string,
    protected mana_cost_: number, protected color_: COLOR,
    protected type_: TYPE, protected rarity_: RARITY,
    protected rules_text_: string, protected market_value_: number) {
  }
  /**
   * The factory method
   * @returns a Card
   */
  public createCard(): Card {
    return new Card(this.id_, this.name_, this.mana_cost_, this.color_, this.type_, this.rarity_, this.rules_text_, this.market_value_);
  }
}

/**
 * This class represents a CreatureCardCreator
 */
export class CreatureCardCreator extends CardCreator {
  constructor(id: number, name: string, mana_cost: number, color: COLOR, type: TYPE, rarity: RARITY, rules_text: string, market_value: number, protected power_: number, protected toughness_: number) {
    super(id, name, mana_cost, color, type, rarity, rules_text, market_value);
  }
  /**
   * The factory method
   * @returns a Card
   */
  public createCard(): Card {
    return new CreatureCard(this.id_, this.name_, this.mana_cost_, this.color_, this.type_, this.rarity_, this.rules_text_, this.market_value_, this.power_, this.toughness_);
  }
}

/**
 * This class represents a PlanesWalkerCardCreator
 */
export class PlanesWalkerCardCreator extends CardCreator {
  constructor(id: number, name: string, mana_cost: number, color: COLOR, type: TYPE, rarity: RARITY, rules_text: string, market_value: number, protected loyalty_marks_: number) {
    super(id, name, mana_cost, color, type, rarity, rules_text, market_value);
  }
  /**
   * The factory method
   * @returns a Card
   */
  public createCard(): Card {
    return new PlanesWalkerCard(this.id_, this.name_, this.mana_cost_, this.color_, this.type_, this.rarity_, this.rules_text_, this.market_value_, this.loyalty_marks_);
  }
}