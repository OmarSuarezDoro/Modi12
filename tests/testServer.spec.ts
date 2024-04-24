import { describe, it } from 'mocha';
import { expect } from 'chai';
import request from 'request';

describe('Pruebas de las rutas del servidor', () => {
  it('Comprobar la funcionalidad de GET /cards', (done) => {
    request.get('http://localhost:3000/cards/osuarezdoro', (_: any, response: any) => {
      expect(response.statusCode).to.equal(200);
      expect(JSON.parse(response.body).length).to.equal(0);
      done();
    });
  });

  it('Comprobar la funcionalidad de fallo de GET /cards', (done) => {
    request.get('http://localhost:3000/cards/Test Usersss', (_: any, response: any) => {
      expect(response.statusCode).to.equal(500);
      expect(JSON.parse(response.body).message).to.equal("User does not exist");
      done();
    });
  });

  it('Comprobar la funcionalidad de POST /cards', (done) => {
    const newCard = {
      "id_": 1,
      "name_": "cartita de testeo",
      "mana_cost_": 3,
      "color_": "nocolor",
      "type_": "creature",
      "rarity_": "common",
      "rules_text_": "Esto hace cosas",
      "market_value_": 10,
      "power_": 2,
      "toughness_": 2
    };

    request.post('http://localhost:3000/cards/osuarezdoro', { json: newCard }, (_: any, response: any) => {
      expect(response.statusCode).to.equal(200);
      expect(response.body.message).to.equal('Card created');
      done();
    });
  });
  
  it('Comprobar la funcionalidad de fallo POST /cards', (done) => {
    const newCard = {
      "id_": 1,
      "name_": "cartita de testeo",
      "mana_cost_": 3,
      "color_": "nocolor",
      "type_": "creature",
      "rarity_": "common",
      "rules_text_": "Esto hace cosas",
      "market_value_": 10,
      "power_": 2,
      "toughness_": 2
    };
    request.post('http://localhost:3000/cards/osuarezdoro', { json: newCard }, (_: any, response: any) => {
      expect(response.statusCode).to.equal(500);
      done();
    });
  });

  it('Comprobar la funcionalidad de PATCH /cards', (done) => {
    const newCard = {
      mana_cost_: -3
    }
    request.patch('http://localhost:3000/cards/osuarezdoro/1', { json: newCard }, (_: any, response: any) => {
      expect(response.statusCode).to.equal(200);
      expect(response.body.mana_cost_).to.equal(-3);
      done();
    });
  });

  it('Comprobar la funcionalidad de fallo PATCH /cards', (done) => {
    const newCard = {
      mana_cost_: -3
    };
    request.patch('http://localhost:3000/cards/osuarezdoro/2', { json: newCard }, (_: any, response: any) => {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });

  it('Comprobar la funcionalidad de DELETE /cards', (done) => {
    request.delete('http://localhost:3000/cards/osuarezdoro/1', (_: any, response: any) => {
      expect(response.statusCode).to.equal(200);
      expect(JSON.parse(response.body).acknowledged).to.equal(true);
      expect(JSON.parse(response.body).deletedCount).to.equal(1);
      done();
    });
  });


  it('Comprobar la funcionalidad de fallo DELETE /cards', (done) => {
    request.delete('http://localhost:3000/cards/osuarezdoro/2', (_: any, response: any) => {
      expect(response.statusCode).to.equal(500);
      expect(JSON.parse(response.body).acknowledged).to.equal(false);
      expect(JSON.parse(response.body).deletedCount).to.equal(0);
      done();
    });
  });
});
