const ideasRouter = require('express').Router();

module.exports = ideasRouter;

const { 
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
  } = require('./db');

const checkMillionDollarIdea = require('./checkMillionDollarIdea');

// route parameter for minion id
ideasRouter.param('ideaId', (req, res, next, id) => {
  const idea = getFromDatabaseById('ideas', id);
  if (idea) {
    req.idea = idea;
    next();
  } else {
    res.status(404).send();
  }
});

// get an array of all minions.
ideasRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('ideas'));
});

// create a new minion and save it to the database.
ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
  const newIdea = addToDatabase('ideas', req.body);
   res.status(201).send(newIdea);
});

// get a single minion by id.
ideasRouter.get('/:ideaId', (req, res, next) => {
  res.send(req.idea);
});

// update a single minion by id.
ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
  let updateIdeasInstance = updateInstanceInDatabase('ideas', req.idea);
  res.send(updateIdeasInstance);
})

// delete a single minion by id.
ideasRouter.delete('/:ideaId', (req, res, next) => {
  const deleted = deleteFromDatabasebyId(req.idea);
  if (deleted) {
    res.status(204);
  } else {
    res.status(500);
  }
  res.send();
})
