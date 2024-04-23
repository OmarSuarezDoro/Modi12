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
 * This class represents a creature card
 */
export class CreatureCard extends Card {
  constructor(id: number, name: string, mana_cost: number, color: COLOR, type: TYPE, rarity: RARITY, rules_text: string, market_value: number, protected power_: number, protected toughness_: number) {
    super(id, name, mana_cost, color, type, rarity, rules_text, market_value);
  }
  /**
   * This method return the power of the card
   */
  get power(): number {
    return this.power_;
  }
  /**
   * This method set the power of the card
   */
  set power(value: number) {
    this.power_ = value;
  }
  /**
   * This method return the toughness of the card
   */
  get toughness(): number {
    return this.toughness_;
  }

  /**
   * This method set the toughness of the card
   */
  set toughness(value: number) {
    this.toughness_ = value;
  }

  toString(): string {
    return super.toString() + `\nPower: ${chalk.yellow(this.power_)}, Toughness: ${chalk.yellow(this.toughness_)}`;
  }
}


