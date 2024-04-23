import { describe, it } from 'mocha';
import { expect } from 'chai';
import { ServerFunctionality } from '../src/Modificacion/AdaptedServerFunctionality.js';


// export type requestMessage = {
//   user: string,
//   action: string,
//   path: string,
//   dataObj: any,
// }

describe('Pruebas de las rutas del servidor', () => {
  it('Comprobación funcionamiento función add', () => {
    const newCard = {
      type_: 'Type',
      id_: 2,
      name_: 'New Card',
      color_: 'Color',
      rarity_: 'Rarity',
      rules_text_: 'Rules Text',
      market_value_: 100
    };
    ServerFunctionality.addFunctionality({
      user: 'Test User',
      action: 'add',
      path: '',
      dataObj: newCard
    }).then((result) =>  {
      expect(result).to.eq(JSON.stringify({ statusCode: 201, dataObj: 'The file was saved successfully!' }) + '\n');
    })
  });
  
  
  it('Comprobación de fallo función add', () => {
    const newCard = {
      type_: 'Type',
      id_: 2,
      name_: 'New Card',
      color_: 'Color',
      rarity_: 'Rarity',
      rules_text_: 'Rules Text',
      market_value_: 100
    };
     ServerFunctionality.addFunctionality({
      user: 'Test User',
      action: 'add',
      path: '',
      dataObj: newCard
    }).catch((result) =>  {
      expect(result).to.eq(JSON.stringify({ statusCode: -2, dataObj: 'The file already exists!' }) + '\n');
    })
  });

  it('Comprobar la funcionalidad de update', () => {
    const updatedCard = {
      id_: '2',
      name_: 'Updated Card',
      color_: 'Updated Color',
      rarity_: 'Updated Rarity',
      rules_text_: 'Updated Rules Text',
      market_value_: 200
    };
    ServerFunctionality.updateFunctionality({
      user: 'Test User',
      action: 'update',
      path: '2',
      dataObj: updatedCard
    }).then((result) => {
      expect(result).to.eq(JSON.stringify({ statusCode: 201, dataObj: 'The file was updated successfully!' }) + '\n');
    })
  });

  it('Comprobar fallo funcionalidad de update', () => {
    const updatedCard = {
      id_: '52',
      name_: 'Updated Card',
      color_: 'Updated Color',
      rarity_: 'Updated Rarity',
      rules_text_: 'Updated Rules Text',
      market_value_: 200
    };
    ServerFunctionality.updateFunctionality({
      user: 'Test User',
      action: 'update',
      path: '52',
      dataObj: updatedCard
    }).catch((result) => {
      expect(result).to.eq(JSON.stringify({ statusCode: -2, dataObj: 'The file does not exist!' }) + '\n');
    })
  });


  it('Comprobación funcionamiento función delete', () => {
    ServerFunctionality.deleteFunctionality({
      user: 'Test User',
      action: 'delete',
      path: '',
      dataObj: {id_: 2}
    }).then((result) =>  {
      expect(result).to.eq(JSON.stringify({ statusCode: 201, dataObj: 'The file was deleted successfully!' }) + '\n');
    })
  });

  it('Comprobación de fallo función delete', () => {
    ServerFunctionality.deleteFunctionality({
      user: 'Test User',
      action: 'delete',
      path: '',
      dataObj: {id_: 2}
    }).then((result) =>  {
      expect(result).to.eq(JSON.stringify({ statusCode: -1, dataObj: 'The file does not exist!' }) + '\n');
    })
  });

  it('Comprobación funcionamiento función list-unique', () => {
    let data = {
      "id_": 1,
      "name_": "cartita1",
      "mana_cost_": 2,
      "color_": "nocolor",
      "type_": "planeswalker",
      "rarity_": "common",
      "rules_text_": "Esto hace cosas",
      "market_value_": 10,
      "loyalty_marks_": 5
    }
    ServerFunctionality.listUniqueFunctionality({
      user: 'Test User2',
      action: 'list-unique',
      path: '',
      dataObj: {id: 1}
    }).then((result) =>  {
      expect(result).to.eq(JSON.stringify({ statusCode: 200, user: 'Test User2', type: 'planeswalker', dataObj: data }) + '\n');
    })
  });

  it('Comprobación de fallo función list-unique', () => {
    ServerFunctionality.deleteFunctionality({
      user: 'Test User2',
      action: 'list-unique',
      path: '',
      dataObj: {id_: 2}
    }).then((result) =>  {
      expect(result).to.eq(JSON.stringify({ statusCode: -2, dataObj: 'The file does not exist!' }) + '\n');
    })
  });
});