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
  static addFunctionality(dataInput: requestMessage): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      let card: Card = this.parseCard(dataInput.dataObj);
      this.checkFileExistence('./Database/' + dataInput.user.toLowerCase().replace(/\s/g, '_') + '/' + card.id + '.json')
        .then((exists) => {
          if (exists) {
            reject(JSON.stringify({ statusCode: -2, dataObj: 'The file already exists!' }) + '\n');
          }
          fs.promises.writeFile(`./Database/${dataInput.user.toLowerCase().replace(/\s/g, '_')}/${card.id}.json`, JSON.stringify(dataInput.dataObj, null, 2)).then(() => {
            resolve(JSON.stringify({ statusCode: 201, dataObj: 'The file was saved successfully!' }) + '\n');
          }).catch(() => {
            reject(JSON.stringify({ statusCode: -1, dataObj: 'Error while writing the file' }) + '\n');
          })
        });
    });
  }

  /**
   * This method delete a card from the user's database
   * @param dataInput The data that the user sent
   * @param callback The function that will be called when the process is done
   */
  static deleteFunctionality(dataInput: requestMessage): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.checkFileExistence(`./Database/${dataInput.user.toLowerCase().replace(/\s/g, '_')}/${dataInput.dataObj.id_}.json`)
        .then((exists) => {
          if (!exists) {
            reject(JSON.stringify({ statusCode: -1, dataObj: 'The file does not exist!' }) + '\n');
          }
          fs.promises.unlink(`./Database/${dataInput.user.toLowerCase().replace(/\s/g, '_')}/${dataInput.dataObj.id_}.json`).then(() => {
            resolve(JSON.stringify({ statusCode: 201, dataObj: 'The file was deleted successfully!' }) + '\n');
          }).catch(() => {
            reject(JSON.stringify({ statusCode: -3, dataObj: 'Error while deleting the file' }) + '\n');
          })
        });
    });
  }

  /**
   * This function modify the data of a card
   * @param dataInput The data that the user sent
   * @param callback The function that will be called when the process is done
   */
  static updateFunctionality(dataInput: requestMessage): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.checkFileExistence(`./Database/${dataInput.user.toLowerCase().replace(/\s/g, '_')}/${dataInput.path}.json`)
        .then((exists) => {
          if (!exists) {
            reject(JSON.stringify({ statusCode: -2, dataObj: 'The file does not exist!' }) + '\n');
          }
          fs.promises.readFile(`./Database/${dataInput.user.toLowerCase().replace(/\s/g, '_')}/${dataInput.path}.json`, 'utf8').then((data) => {
            let readObj = JSON.parse(data);
            for (let key in dataInput.dataObj) {
              readObj[key] = dataInput.dataObj[key];
            }
            fs.promises.writeFile(`./Database/${dataInput.user.toLowerCase().replace(/\s/g, '_')}/${dataInput.path}.json`, JSON.stringify(readObj, null, 2)).then(() => {
              resolve(JSON.stringify({ statusCode: 201, dataObj: 'The file was updated successfully!' }) + '\n');
            }).catch(() => {
              reject(JSON.stringify({ statusCode: -4, dataObj: 'Error while writing the file' }) + '\n');
            })
          }).catch(() => {
            reject(JSON.stringify({ statusCode: -1, dataObj: 'Error while reading the file' }) + '\n');
          })
        });
    });
  }

  /**
   * This method list a single card from the user's database
   * @param dataInput The data that the user sent
   * @param callback The function that will be called when the process is done
   */
  static listUniqueFunctionality(dataInput: requestMessage): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.checkFileExistence(`./Database/${dataInput.user.toLowerCase().replace(/\s/g, '_')}/${dataInput.dataObj.id}.json`)
        .then((exists) => {
          if (!exists) {
            reject(JSON.stringify({ statusCode: -2, dataObj: 'The file does not exist!' }) + '\n');
          }
          fs.promises.readFile(`./Database/${dataInput.user.toLowerCase().replace(/\s/g, '_')}/${dataInput.dataObj.id}.json`, 'utf8').then((data) => {
            let parsedCard: Card = this.parseCard(JSON.parse(data));
            resolve(JSON.stringify({ statusCode: 200, user: JSON.parse(data).user, type: parsedCard.type, dataObj: parsedCard }) + '\n');
          }).catch(() => {
            reject(JSON.stringify({ statusCode: -1, dataObj: 'Error while reading the file' }) + '\n');
          })
        });
    });
  }

  /**
   * This method list all the cards from the user's database
   * @param dataInput The data that the user sent
   * @param callback The function that will be called when the process is done
   */
  static listFunctionality(dataInput: requestMessage): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      fs.readdir(`./Database/${dataInput.user.toLowerCase().replace(/\s/g, '_')}`, (err, files) => {
        if (err) {
          reject(JSON.stringify({ statusCode: -1, dataObj: 'Error while reading the files' }) + '\n');
        } else {
          let cards: Card[] = [];
          for (const file of files) {
            fs.promises.readFile(`./Database/${dataInput.user.toLowerCase().replace(/\s/g, '_')}/${file}`, 'utf8').then((data) => {
              let parsedCard: Card = this.parseCard(JSON.parse(data));
              cards.push(parsedCard);
              if (cards.length === files.length) {
                resolve(JSON.stringify({ statusCode: 200, dataObj: cards, size: files.length}) + '\n');
              }
            }).catch(() => {
              reject(JSON.stringify({ statusCode: -1, dataObj: 'Error while reading the file' }) + '\n');
            })
          }
        }
      });
    });
  }

  /**
   * This method check if a user exists
   * @param user The user's name
   */
  static checkUser(user: string): Promise<string> {
    return new Promise<string>((_, reject) => {
      fs.promises.stat(`./Database/${user.toLowerCase().replace(/\s/g, '_')}`).catch(() => {
        reject(JSON.stringify({ statusCode: -1, dataObj: 'The user does not exist!' }) + '\n');
      });
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

  /**
   * This method check if a file exists
   * @param path The path of the file
   * @returns True if the file exists, false otherwise
   */
  private static checkFileExistence(path: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      fs.promises.stat(path).then(() => {
        resolve(true);
      }).catch(() => {
        resolve(false);
      })
    });
  }

}