/**
 * Univeridad de La Laguna
 * Asignatura: Desarrollo de Sistemas Informáticos
 * Novena práctica de la asignatura DSI
 * Realizada por: Omar Suárez Doro
 * Correo: alu0101483474@ull.edu.es
 */

import chalk from 'chalk';
import { TYPE, COLOR, RARITY, Card } from './Card.js';

/**
 * This class represents a PlanesWalkerCard
 */
export class PlanesWalkerCard extends Card {
  constructor(id: number, name: string, mana_cost: number, color: COLOR, type: TYPE, rarity: RARITY, rules_text: string, market_value: number, protected loyalty_marks_: number) {
    super(id, name, mana_cost, color, type, rarity, rules_text, market_value);
  }
  /**
   * This method return the loyalty marks of the card
   */
  get loyaltyMarks(): number {
    return this.loyalty_marks_;
  }
  /**
   * This method set the loyalty marks of the card
   */
  set loyaltyMarks(value: number) {
    this.loyalty_marks_ = value;
  }
  /**
   * This method return the string representation of the card
   */
  toString(): string {
    return super.toString() + `\nLoyalty Marks: ${chalk.yellow(this.loyaltyMarks)}`;
  }
}