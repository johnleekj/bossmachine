const minionsRouter = require('express').Router();

module.exports = minionsRouter;

const { 
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
  } = require('./db');

// route parameter for minion id
minionsRouter.param('minionId', (req, res, next, id) => {
  const minion = getFromDatabaseById('minion', id);
  if (minion) {
    req.minion = minion;
    next();
  } else {
    res.status(404).send();
  }
});

// get an array of all minions.
minionsRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('minions'));
});

// create a new minion and save it to the database.
minionsRouter.post('/', (req, res, next) => {
  const newMinion = addToDatabase('minions', req.body);
   res.status(201).send(newMinion);
});

// get a single minion by id.
minionsRouter.get('/:minionId', (req, res, next) => {
  res.send(req.minion);
});

// update a single minion by id.
minionsRouter.put('/:minionId', (req, res, next) => {
  let updateMinionInstance = updateInstanceInDatabase('minions', req.minion);
  res.send(updateMinionInstance);
})

// delete a single minion by id.
minionsRouter.delete('/:minionId', (req, res, next) => {
  const deleted = deleteFromDatabasebyId(req.minion);
  if (deleted) {
    res.status(204);
  } else {
    res.status(500);
  }
  res.send();
})
