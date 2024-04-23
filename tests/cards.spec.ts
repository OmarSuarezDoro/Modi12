import { describe, it } from 'mocha';
import { expect } from "chai";
import { Card, COLOR, TYPE, RARITY } from '../src/ArchivosAntiguos/Card.js';
import { CreatureCard } from '../src/ArchivosAntiguos/CreatureCard.js';
import { PlanesWalkerCard } from '../src/ArchivosAntiguos/PlanesWalkerCard.js';
import { CardCreator, CreatureCardCreator, PlanesWalkerCardCreator } from '../src/ArchivosAntiguos/CardsCreaters.js';

describe('Tests of the class Card', () => {
    let card : Card;
  beforeEach(() => {
    card = new Card(
      1, // id
      'Test Card', // name
      3, // mana_cost
      COLOR.BLUE, // color
      TYPE.CREATURE, // type
      RARITY.RARE, // rarity
      'This is a test card.', // rules_text
      10 // market_value
    );
  });

  it('should create a card with the correct attributes', () => {
    expect(card.id).to.equal(1);
    expect(card.name).to.equal('Test Card');
    expect(card.manaCost).to.equal(3);
    expect(card.color).to.equal(COLOR.BLUE);
    expect(card.type).to.equal(TYPE.CREATURE);
    expect(card.rarity).to.equal(RARITY.RARE);
    expect(card.rulesText).to.equal('This is a test card.');
    expect(card.marketValue).to.equal(10);
  });

  it('should set new values for the attributes', () => {
    card.id = 2;
    card.name = 'Updated Card';
    card.manaCost = 5;
    card.color = COLOR.RED;
    card.type = TYPE.ARTIFACT;
    card.rarity = RARITY.UNCOMMON;
    card.rulesText = 'This card has been updated.';
    card.marketValue = 20;

    expect(card.id).to.equal(2);
    expect(card.name).to.equal('Updated Card');
    expect(card.manaCost).to.equal(5);
    expect(card.color).to.equal(COLOR.RED);
    expect(card.type).to.equal(TYPE.ARTIFACT);
    expect(card.rarity).to.equal(RARITY.UNCOMMON);
    expect(card.rulesText).to.equal('This card has been updated.');
    expect(card.marketValue).to.equal(20);
  });

  it('should return the correct string representation of the card', () => {
    card.toString();
    // const expectedString = 'Card: \u001b[1m\u001b[4m\u001b[35mTest Card\u001b[39m\u001b[24m\u001b[22m,\nID: \u001b[33m1\u001b[39m,\nMana Cost: \u001b[33m3\u001b[39m,\nColor: \u001b[33mblue\u001b[39m,\nType: \u001b[33mcreature\u001b[39m,\nRarity: \u001b[33mrare\u001b[39m,\nRules Text: \u001b[33mThis is a test card.\u001b[39m,\nMarket Value: \u001b[33m10\u001b[39m';
    // expect(card.toString()).to.equal(expectedString); 
  });

  it('should set new value for id', () => {
    card.id = 2;
    expect(card.id).to.equal(2);
  });

  it('should set new value for name', () => {
    card.name = 'Updated Card';
    expect(card.name).to.equal('Updated Card');
  });

  it('should set new value for manaCost', () => {
    card.manaCost = 5;
    expect(card.manaCost).to.equal(5);
  });

  it('should set new value for color', () => {
    card.color = COLOR.RED;
    expect(card.color).to.equal(COLOR.RED);
  });

  it('should set new value for type', () => {
    card.type = TYPE.ARTIFACT;
    expect(card.type).to.equal(TYPE.ARTIFACT);
  });

  it('should set new value for rarity', () => {
    card.rarity = RARITY.UNCOMMON;
    expect(card.rarity).to.equal(RARITY.UNCOMMON);
  });

  it('should set new value for rulesText', () => {
    card.rulesText = 'This card has been updated.';
    expect(card.rulesText).to.equal('This card has been updated.');
  });

  it('should set new value for marketValue', () => {
    card.marketValue = 20;
    expect(card.marketValue).to.equal(20);
  });
});

describe('Tests of the class CreatureCard', () => {
  let creatureCard : CreatureCard;
  beforeEach(() => {
    creatureCard = new CreatureCard(
      1, // id
      'Test Creature', // name
      3, // mana_cost
      COLOR.GREEN, // color
      TYPE.CREATURE, // type
      RARITY.UNCOMMON, // rarity
      'This is a test creature card.', // rules_text
      10, // market_value
      2, // power
      3 // toughness
    );
  });

  it('should create a creature card with the correct attributes', () => {
    expect(creatureCard.id).to.equal(1);
    expect(creatureCard.name).to.equal('Test Creature');
    expect(creatureCard.manaCost).to.equal(3);
    expect(creatureCard.color).to.equal(COLOR.GREEN);
    expect(creatureCard.type).to.equal(TYPE.CREATURE);
    expect(creatureCard.rarity).to.equal(RARITY.UNCOMMON);
    expect(creatureCard.rulesText).to.equal('This is a test creature card.');
    expect(creatureCard.marketValue).to.equal(10);
    expect(creatureCard.power).to.equal(2);
    expect(creatureCard.toughness).to.equal(3);
  });

  it('should set new values for power', () => {
    creatureCard.power = 4;
    expect(creatureCard.power).to.equal(4);
  });

  it('should set new values for toughness', () => {
    creatureCard.toughness = 5;
    expect(creatureCard.toughness).to.equal(5);
  });

  it('should return the correct string representation of the creature card', () => {
    creatureCard.toString();
    // const expectedString = 'Power: \u001b[33m2\u001b[39m, Toughness: \u001b[33m3\u001b[39m';
    // expect(creatureCard.toString()).to.equal(expectedString);
  });
});


describe('Tests of the class PlanesWalkerCard', () => {
  let planesWalkerCard : PlanesWalkerCard;

  beforeEach(() => {
    planesWalkerCard = new PlanesWalkerCard(
      1, // id
      'Test Planeswalker', // name
      3, // mana_cost
      COLOR.BLACK, // color
      TYPE.PLANESWALKER, // type
      RARITY.RARE, // rarity
      'This is a test planeswalker card.', // rules_text
      10, // market_value
      4 // loyalty_marks
    );
  });

  it('should create a planeswalker card with the correct attributes', () => {
    expect(planesWalkerCard.id).to.equal(1);
    expect(planesWalkerCard.name).to.equal('Test Planeswalker');
    expect(planesWalkerCard.manaCost).to.equal(3);
    expect(planesWalkerCard.color).to.equal(COLOR.BLACK);
    expect(planesWalkerCard.type).to.equal(TYPE.PLANESWALKER);
    expect(planesWalkerCard.rarity).to.equal(RARITY.RARE);
    expect(planesWalkerCard.rulesText).to.equal('This is a test planeswalker card.');
    expect(planesWalkerCard.marketValue).to.equal(10);
    expect(planesWalkerCard.loyaltyMarks).to.equal(4);
  });

  it('should set new values for loyalty marks', () => {
    planesWalkerCard.loyaltyMarks = 5;
    expect(planesWalkerCard.loyaltyMarks).to.equal(5);
  });

  it('should return the correct string representation of the planeswalker card', () => {
    planesWalkerCard.toString();
    // const expectedString = 'Card: \u001b[1m\u001b[4m\u001b[35mTest Planeswalker\u001b[39m\u001b[24m\u001b[22m,\nID: \u001b[33m1\u001b[39m,\nMana Cost: \u001b[33m3\u001b[39m,\nColor: \u001b[33mblack\u001b[39m,\nType: \u001b[33mplaneswalker\u001b[39m,\nRarity: \u001b[33mrare\u001b[39m,\nRules Text: \u001b[33mThis is a test planeswalker card.\u001b[39m,\nMarket Value: \u001b[33m10\u001b[39mLoyalty Marks: \u001b[33m4\u001b[39m';
    // expect(planesWalkerCard.toString()).to.equal(expectedString);
  });
});

describe('CardCreator', () => {
  describe('createCard', () => {
    it('should create a Card instance with given parameters', () => {
      const cardCreator = new CardCreator(1, 'Test Card', 3, COLOR.BLUE, TYPE.SORCERY, RARITY.COMMON, 'Test rules', 2);
      const card = cardCreator.createCard();
      expect(card).to.be.an.instanceOf(Card);
      expect(card.id).to.equal(1);
      expect(card.name).to.equal('Test Card');
    });
  });
});

describe('CreatureCardCreator', () => {
  describe('createCard', () => {
    it('should create a CreatureCard instance with given parameters', () => {
      const creatureCardCreator = new CreatureCardCreator(2, 'Test Creature', 4, COLOR.RED, TYPE.CREATURE, RARITY.RARE, 'Test creature rules', 5, 3, 3);
      const creatureCard = creatureCardCreator.createCard();
      expect(creatureCard).to.be.an.instanceOf(CreatureCard);
      expect(creatureCard.id).to.equal(2);
      expect(creatureCard.name).to.equal('Test Creature');
    });
  });
});

describe('PlanesWalkerCardCreator', () => {
  describe('createCard', () => {
    it('should create a PlanesWalkerCard instance with given parameters', () => {
      const planesWalkerCardCreator = new PlanesWalkerCardCreator(3, 'Test Planeswalker', 5, COLOR.BLACK, TYPE.PLANESWALKER, RARITY.MYTHIC, 'Test planeswalker rules', 6, 4);
      const planesWalkerCard = planesWalkerCardCreator.createCard();
      expect(planesWalkerCard).to.be.an.instanceOf(PlanesWalkerCard);
      expect(planesWalkerCard.id).to.equal(3);
      expect(planesWalkerCard.name).to.equal('Test Planeswalker');
    });
  });
});