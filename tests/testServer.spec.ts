import { describe, it } from 'mocha';
import { expect } from 'chai';
import request from 'request';

describe('Pruebas de las rutas del servidor', () => {
  it('Comprobar la funcionalidad de GET /cards', (done) => {
    request.get('http://localhost:3000/cards?user=Test User', (_: any, response: any) => {
      expect(response.statusCode).to.equal(200);
      expect(JSON.parse(response.body).dataObj.length).to.equal(3);
      done();
    });
  });

  it('Comprobar la funcionalidad de fallo de GET /cards', (done) => {
    request.get('http://localhost:3000/cards?user=Test Usersss', (_: any, response: any) => {
      expect(response.statusCode).to.equal(200);
      expect(JSON.parse(response.body).statusCode).to.equal(-2);
      expect(JSON.parse(response.body).dataObj).to.equal("This user does not exist");
      done();
    });
  });

  it('Comprobar la funcionalidad de POST /cards', (done) => {
    const newCard = {
      type: 'Type',
      id: 2,
      name: 'New Card',
      color: 'Color',
      rarity: 'Rarity',
      rules_text: 'Rules Text',
      market_value: 100
    };

    request.post('http://localhost:3000/cards?user=Test User', { json: newCard }, (_: any, response: any) => {
      expect(response.statusCode).to.equal(200);
      expect(response.body.statusCode).to.equal(201);
      expect(response.body.dataObj).to.equal('The file was saved successfully!');
      done();
    });
  });
  
  it('Comprobar la funcionalidad de fallo POST /cards', (done) => {
    const newCard = {
      type: 'Type',
      id: 3,
      name: 'New Card',
      color: 'Color',
      rarity: 'Rarity',
      rules_text: 'Rules Text',
      market_value: 100
    };

    request.post('http://localhost:3000/cards?user=Test User', { json: newCard }, (_: any, response: any) => {
      expect(response.statusCode).to.equal(200);
      expect(response.body.statusCode).to.equal(-2);
      expect(response.body.dataObj).to.equal('The file already exists!');
      done();
    });
  });

  it('Comprobar la funcionalidad de PATCH /cards', (done) => {
    const updatedCard = {
      name: 'Updated Card',
      color: 'Updated Color',
      rarity: 'Updated Rarity',
      rules_text: 'Updated Rules Text',
      market_value: 200
    };

    request.patch('http://localhost:3000/cards?user=Test User&id=2', { json: updatedCard }, (_: any, response: any) => {
      expect(response.statusCode).to.equal(200);
      expect(response.body.statusCode).to.equal(201);
      expect(response.body.dataObj).to.equal('The file was updated successfully!');
      done();
    });
  });

  it('Comprobar la funcionalidad de fallo PATCH /cards', (done) => {
    const updatedCard = {
      name: 'Updated Card',
      color: 'Updated Color',
      rarity: 'Updated Rarity',
      rules_text: 'Updated Rules Text',
      market_value: 200
    };

    request.patch('http://localhost:3000/cards?user=Test User&id=4', { json: updatedCard }, (_: any, response: any) => {
      expect(response.statusCode).to.equal(200);
      expect(response.body.statusCode).to.equal(-2);
      expect(response.body.dataObj).to.equal('The file does not exist!');
      done();
    });
  });

  it('Comprobar la funcionalidad de DELETE /cards', (done) => {
    request.delete('http://localhost:3000/cards?user=Test User&id=2', (_: any, response: any) => {
      expect(response.statusCode).to.equal(200);
      expect(JSON.parse(response.body).statusCode).to.equal(201);
      expect(JSON.parse(response.body).dataObj).to.equal('The file was deleted successfully!');
      done();
    });
  });


  it('Comprobar la funcionalidad de fallo DELETE /cards', (done) => {
    request.delete('http://localhost:3000/cards?user=Test User&id=4', (_: any, response: any) => {
      expect(response.statusCode).to.equal(200);
      expect(JSON.parse(response.body).statusCode).to.equal(-1);
      expect(JSON.parse(response.body).dataObj).to.equal('The file does not exist!');
      done();
    });
  });
});
