import fs from 'fs';
import { Card, RARITY, TYPE, COLOR } from '../ArchivosAntiguos/Card.js';
import { requestMessage, } from '../ArchivosAntiguos/customTypes.js'
import { CardCreator, CreatureCardCreator, PlanesWalkerCardCreator } from '../ArchivosAntiguos/CardsCreaters.js';

export class ServerFunctionality {
  constructor() { }
  /**
   * This method add a new card to the user's database
   * @param dataInput The data that the user sent
   * @param callback The function that will be called when the process is done
   */
  static addFunctionality(dataInput: requestMessage, callback: (error: string | undefined, data: string | undefined) => void) {
    let card: Card = this.parseCard(dataInput.dataObj);
    fs.stat(`./Database/${dataInput.user.toLowerCase().replace(/\s/g, '_')}/${card.id}.json`, (err) => {
      if (!err) {
        callback(JSON.stringify({ statusCode: -2, dataObj: 'The file already exists!' }) + '\n', undefined);
        return;
      }
      fs.writeFile(`./Database/${dataInput.user.toLowerCase().replace(/\s/g, '_')}/${card.id}.json`, JSON.stringify(dataInput.dataObj, null, 2), (err) => {
        if (err) {
          callback(JSON.stringify({ statusCode: -1, dataObj: 'Error while writing the file' }) + '\n', undefined);
        } else {
          callback(undefined, JSON.stringify({ statusCode: 201, dataObj: 'The file was saved successfully!' }) + '\n');
        }
      });
    });
  }

  /**
   * This method delete a card from the user's database
   * @param dataInput The data that the user sent
   * @param callback The function that will be called when the process is done
   */
  static deleteFunctionality(dataInput: requestMessage, callback: (error: string | undefined, data: string | undefined) => void) {
    fs.stat(`./Database/${dataInput.user.toLowerCase().replace(/\s/g, '_')}/${dataInput.dataObj.id_}.json`, (err) => {
      if (err) {
        callback(JSON.stringify({ statusCode: -1, dataObj: 'The file does not exist!' }) + '\n', undefined);
        return;
      }
      fs.unlink(`./Database/${dataInput.user.toLowerCase().replace(/\s/g, '_')}/${dataInput.dataObj.id_}.json`, (err) => {
        if (err) {
          callback(JSON.stringify({ statusCode: -3, dataObj: 'Error while deleting the file' }) + '\n', undefined);
        } else {
          callback(undefined, JSON.stringify({ statusCode: 201, dataObj: 'The file was deleted successfully!' }) + '\n');
        }
      });
    });
  }
  
  /**
   * This function modify the data of a card
   * @param dataInput The data that the user sent
   * @param callback The function that will be called when the process is done
   */
  static updateFunctionality(dataInput: requestMessage, callback: (error: string | undefined, data: string | undefined) => void) {
    fs.stat(`./Database/${dataInput.user.toLowerCase().replace(/\s/g, '_')}/${dataInput.path}.json`, (err) => {
      if (err) {
        callback(JSON.stringify({ statusCode: -2, dataObj: 'The file does not exist!' }) + '\n', undefined);
        return;
      }
      fs.readFile(`./Database/${dataInput.user.toLowerCase().replace(/\s/g, '_')}/${dataInput.path}.json`, 'utf8', (err, readData) => {
        if (err) {
          callback(JSON.stringify({ statusCode: -1, dataObj: 'Error while reading the file' }) + '\n', undefined);
          return;
        }
        let readObj = JSON.parse(readData);
        for (let key in dataInput.dataObj) {
          readObj[key] = dataInput.dataObj[key];
        }
        // console.log(readObj);
        fs.writeFile(`./Database/${dataInput.user.toLowerCase().replace(/\s/g, '_')}/${dataInput.path}.json`, JSON.stringify(readObj, null, 2), (err) => {
          if (err) {
            callback(JSON.stringify({ statusCode: -4, dataObj: 'Error while writing the file' }) + '\n', undefined);
          } else {
            callback(undefined, JSON.stringify({ statusCode: 201, dataObj: 'The file was updated successfully!' }) + '\n');
          }
        });
      });
    });
  }

  /**
   * This method list a single card from the user's database
   * @param dataInput The data that the user sent
   * @param callback The function that will be called when the process is done
   */
  static listUniqueFunctionality(dataInput: requestMessage, callback: (error: string | undefined, data: string | undefined) => void) {
    fs.stat(`./Database/${dataInput.user.toLowerCase().replace(/\s/g, '_')}/${dataInput.dataObj.id}.json`, (err) => {
      if (err) {
        callback(JSON.stringify({ statusCode: -2, dataObj: 'The file does not exist!' }) + '\n', undefined);
        return;
      } else {
        fs.readFile(`./Database/${dataInput.user.toLowerCase().replace(/\s/g, '_')}/${dataInput.dataObj.id}.json`, 'utf8', (err, data) => {
          if (err) {
            callback(JSON.stringify({ statusCode: -1, dataObj: 'Error while reading the file' }) + '\n', undefined);
            return;
          }
          let parsedCard: Card = this.parseCard(JSON.parse(data));
          callback(undefined, JSON.stringify({ statusCode: 200, user: JSON.parse(data).user, type: parsedCard.type, dataObj: parsedCard }) + '\n');
        });
      }
    });
  }

  /**
   * This method list all the cards from the user's database
   * @param dataInput The data that the user sent
   * @param callback The function that will be called when the process is done
   */
  static listFunctionality(dataInput: requestMessage, callback: (error: string | undefined, data: string | undefined) => void) {
    fs.readdir(`./Database/${dataInput.user.toLowerCase().replace(/\s/g, '_')}`, (err, files) => {
      if (err) {
        console.error(err);
      } else {
        for (const file of files) {
          fs.readFile(`./Database/${dataInput.user.toLowerCase().replace(/\s/g, '_')}/${file}`, 'utf8', (err, data) => {
            if (err) {
              console.error(err);
            } else {
              let parsedCard: Card = this.parseCard(JSON.parse(data));
              callback(undefined, JSON.stringify({ statusCode: 200, user: JSON.parse(data).user, type: parsedCard.type, dataObj: parsedCard, size: files.length}) + '\n');
            }
          });
        }
      }
    });
  }


  static checkUser(user: string, callback: (error: string | undefined, data: string | undefined) => void) {
    fs.stat(`./Database/${user.toLowerCase().replace(/\s/g, '_')}`, (err) => {
      if (err) {
        callback(JSON.stringify({ statusCode: -1, dataObj: 'The user does not exist!' }) + '\n', undefined);
        return;
      }
      callback(undefined, JSON.stringify({ statusCode: 200, dataObj: 'The user exists!' }) + '\n');
    });
  }




  /**
   * This method transform the data that the user sent into a card object
   * @param data The object that contains the card's data
   * @returns The card object
   */
  static parseCard(data: any): Card {
    let generator: CardCreator;
    switch (data.type_) {
      case 'creature':
        generator = new CreatureCardCreator(data.id_, data.name_, data.mana_cost_, data.color_ as COLOR, data.type_ as TYPE, data.rarity_ as RARITY,
          data.rules_text_, data.market_value_, data.power_, data.toughness_);
        break;
      case 'planeswalker':
        generator = new PlanesWalkerCardCreator(data.id_, data.name_, data.mana_cost_, data.color_ as COLOR, data.type_ as TYPE, data.rarity_ as RARITY,
          data.rules_text_, data.market_value_, data.loyalty_marks_);
        break;
      default:
        generator = new CardCreator(data.id_, data.name_, data.mana_cost_, data.color_, data.type_, data.rarity_, data.rules_text_, data.market_value_);
    }
    return generator.createCard();
  }
}