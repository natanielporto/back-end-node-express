// const express = require('express');

// const server = express();

// server.use(express.json());

// const users = ['Me', 'Myself', 'Irene'];

// // global middlewares
// server.use((req, res, next) => {
//   console.time('Requisition time');
//   console.log(`Method: ${req.method}, URL: ${req.url}`);
//   console.timeEnd('Requisition time');
//   return next();
// });

// // local middlewares
// function checkUser(req, res, next) {}

// function findUser(req, res, next) {}

// // get methods
// server.get('/users', (req, res) => res.json(users));

// server.get('/users/:index', (req, res) => {
//   const { index } = req.params;

//   return res.json(users[index]);
// });

// // post method
// server.post('/users', (req, res) => {
//   const { name } = req.body;

//   users.push(name);

//   return res.json(users);
// });

// // put method
// server.put('/users/index', (req, res) => {
//   const { index } = req.params;
//   const { name } = req.body;

//   users[index] = name;

//   return res.json(`User nº ${index} now is ${name}.`);
// });

// // delete method
// server.delete('/users/:index', (req, res) => {
//   const { index } = req.params;

//   users.splice(index, 1);

//   res.send();
// });

// server.listen(6006);
