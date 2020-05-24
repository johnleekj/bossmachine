const minionsRouter = require('express').Router();

module.exports = minionsRouter;

const { 
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
  } = require('./db');

// get an array of all minions.
minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
})

// create a new minion and save it to the database.

// get a single minion by id.

// update a single minion by id.

// delete a single minion by id.

module.exports = minionsRouter;