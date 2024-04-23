- Autor: **Omar Suárez Doro** 
- Email: **alu0101483474@ull.edu.es**
- Asignatura: **Desarrollo de Sistemas Informáticos**
  
# Índice
- [Índice](#índice)
- [1. 📚 Introducción 📚](#1--introducción-)
- [2. 🧠 Trabajo previo 🧠](#2--trabajo-previo-)
- [3. 🖥️ Desarrollo de la práctica 🖥️](#3-️-desarrollo-de-la-práctica-️)
- [4. Conclusiones](#4-conclusiones)
- [5. Referencias](#5-referencias)

# 1. 📚 Introducción 📚
Este informe tiene como objetivo la redacción de los pasos seguidos durante el desarrollo de la décima primera practica de la asignatura **Desarrollo de Sistemas Informáticos**.

# 2. 🧠 Trabajo previo 🧠

Para la realización de esta práctica, no se ha relaizado realmente mucho trabajo previo. Simplemente con la lectura y compresión de los apuntes de la asignatura, junto a la búsqueda de información en la documentación del framework [Express](https://expressjs.com/es/guide/routing.html)

# 3. 🖥️ Desarrollo de la práctica 🖥️

En esta práctica se propone implementar el servidor con express para poder llevar a cabo la misma funcionalidad de la práctica anterior. Se ha empleado las mismas funciones pertenecientes a la clase `ServerFunctionality`, por lo que solo se comentará los manejadores definidos para los diferentes tipos de peticiones a la ruta `/cards`(aclarar que se ha controlado el acceso a otras rutas).

- Petición `GET`

En primer lugar se va a analizar la parte del servidor. Para empezar, se creó una clase para poder emitir el evento personalizado `request` solicitado por parte del servidor:
```ts
app.get('/cards', (req, res) => {
  // Check if the user is in the query String
  if (!req.query.user) {
    res.send({ statusCode: -1, dataObj: 'User does not exist' });  // Cuidado con el mensaje
    return;
  }
  // Check if the user exists
  ServerFunctionality.checkUser(req.query.user as string, (err, _) => {
    if (err) {
      res.send({
        statusCode: -2,
        dataObj: 'This user does not exist'
      });
    }
  });
  // Build the request message, in order to use the function of the practice 10
  let requestMessage: requestMessage = {
    user: req.query.user as string,
    action: 'list',
    path: '',
    dataObj: {}
  };
  // Check the function that it is going to be used.
  // List a unique card
  if (req.query.id) {
    requestMessage.action = 'list-unique';
    requestMessage.dataObj = { id: req.query.id };
    // console.log('Request message: ', requestMessage);
    ServerFunctionality.listUniqueFunctionality(requestMessage, (err, data) => {
      res.send(err ?? data!);
    })
  } else {
    // List all the cards
    let cards: Card[] = [];
    ServerFunctionality.listFunctionality(requestMessage, (err, data) => {
      if (err) {
        res.send(err);
        return;
      } else {
        let parsedData = JSON.parse(data!);
        if (parsedData.size !== cards.length + 1) {
          cards.push(parsedData.dataObj);
        } else {
          res.send(JSON.stringify({ statusCode: 200, dataObj: cards }));
        }
      }
    });
  }
});
```

  1. Se comprueba si el usuario no se encuentra en la QueryString
  2. Se comprueba que el usuario exista
  3. Si el id está definido en la QueryString, se modifica el mensaje que se le pasará a la funcionalidad de listado
  4. A continuación, si se ha escogido la funcionalidad de listar todas las cartas:
    - Se crea un array de cartas
    - Cada carta emitida por parte de la función, se añade al array
    - Cuando coincide el tamaño del array y el número de archivos de la carpeta del usuario se envía


- Petición `POST`:
```ts
app.post('/cards', (req, res) => {
  // Add a card depend on the card type must have some attributes
  if (!req.query.user || !req.body.type || !req.body.id || !req.body.name || !req.body.color || !req.body.rarity || !req.body.rules_text || !req.body.market_value) {
    res.send({ statusCode: -1, dataObj: 'Query string or Body missing parametters' });
    return;
  }
  // Check if the user exists
  ServerFunctionality.checkUser(req.query.user as string, (err, _) => {
    if (err) {
      res.send({ statusCode: -2, dataObj: 'This user does not exist' });
    }
  });
  // Build the request message, in order to use the function of the practice 10
  let requestMessage: requestMessage = {
    user: req.query.user as string,
    action: 'add',
    path: '',
    dataObj: {}
  };
  // Iterate through the body and add the data to the dataObj
  for (let key in req.body) {
    requestMessage.dataObj[key + '_'] = req.body[key];
  }
  // Add the card
  ServerFunctionality.addFunctionality(requestMessage, (err, data) => {
    res.send(err ?? data!);
  });
});
```
1. Se comprueba que los parámetros necesarios estén en el `body` de la petición.
2. Se comprueba que el usuario exista
3. Se crea el mensaje y se le dan los atributos de la petición
4. Se llama a la funcionalidad de añadir


- Petición `PATCH`:
```ts
app.patch('/cards', (req, res) => {
  // Update a card depend on the card type must have some attributes
  // Check if the user is in the query String
  if (!req.query.user || !req.query.id) {
    res.send({ statusCode: -1, dataObj: 'Query string missing parametters' });  // Cuidado con el mensaje
  }
  // Check if the user exists
  ServerFunctionality.checkUser(req.query.user as string, (err, _) => {
    if (err) {
      res.send({ statusCode: -2, dataObj: 'This user does not exist' });
    }
  });
  // Build the request message, in order to use the function of the practice 10
  let requestMessage: requestMessage = {
    user: req.query.user as string,
    action: 'update',
    path: req.query.id as string,
    dataObj: { id_: req.query.id }
  };
  // Iterate through the body and add the data to the dataObj
  for (let key in req.body) {
    requestMessage.dataObj[key + '_'] = req.body[key];
  }
  // Update the card
  ServerFunctionality.updateFunctionality(requestMessage, (err, data) => {
    res.send(err ?? data!);
  });
});
```
1. Se comprueba que los parámetros necesarios estén en el `body` de la petición.
2. Se comprueba que el usuario exista
3. Se crea el mensaje y se le dan los atributos de la petición, concretamente solo los que se vayan a modificar
4. Se llama a la funcionalidad de actualizar

- Método `DELETE`:
```ts
app.delete('/cards', (req, res) => {
  // Check if the user is in the query String
  if (!req.query.user || !req.query.id) {
    res.send({ statusCode: -1, dataObj: 'Query string missing parametters' });  // Cuidado con el mensaje
    return;
  }
  // Check if the user exists
  ServerFunctionality.checkUser(req.query.user as string, (err, _) => {
    if (err) {
      res.send({ statusCode: -2, dataObj: 'This user does not exist' });
    }
  });
  // Build the request message, in order to use the function of the practice 10
  let requestMessage: requestMessage = {
    user: req.query.user as string,
    action: 'delete',
    path: '',
    dataObj: { id_: req.query.id }
  };
  ServerFunctionality.deleteFunctionality(requestMessage, (err, data) => {
    res.send(err ?? data!);
  });
});
```
1. Se comprueba que los parámetros necesarios estén en el `queryString` de la petición, como el usuario y el id.
2. Se comprueba que el usuario exista
3. Se crea el mensaje.
4. Se llama a la funcionalidad de añadir.


- Control de rutas no implementadas:
```ts
app.use((_, res) => {
  let response = {
    statusCode: 404,
    dataObj: 'OPPS! No endpoint defined.'
  };
  res.send(response);
});
```

- Configuración para hacer que el body de la petición no sea undefined. También se incluye el listen
```ts
const app = express();
app.use(express.json());
# -------------------------
app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
```
# 4. Conclusiones
Tras la realización de la práctica se han aprendida las nociones básicas para el manejo del FrameWork Express.

# 5. Referencias
- [Documentación de Express](https://expressjs.com/es/)
- [Curso de Express para NodeJS](https://www.youtube.com/watch?v=JmJ1WUoUIK4)