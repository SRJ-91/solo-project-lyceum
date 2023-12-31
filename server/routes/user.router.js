const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();



// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// GET all users
router.get('/all', (req, res) => {
  const queryText = 'SELECT * FROM "user";';
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.error('Error fetching users:', error);
      res.sendStatus(500);
    });
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted


// router.post('/register', (req, res, next) => {
//   const username = req.body.username;
//   const password = encryptLib.encryptPassword(req.body.password);

//   const queryText = `INSERT INTO "user" (username, password)
//     VALUES ($1, $2) RETURNING id`;
//   pool
//     .query(queryText, [username, password])
//     .then(() => res.sendStatus(201))
//     .catch((err) => {
//       console.log('User registration failed: ', err);
//       res.sendStatus(500);
//     });
// });

//Modified for my own uses. Template commented out above. 
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const region = req.body.region;
  const avatar = req.body.avatar;
  const role = req.body.role; //is this necessary? Automated?
  const created_at = req.body.created_at;

console.log(req.body);

  const queryText = `INSERT INTO "user" (username, password, region, avatar, created_at)
    VALUES ($1, $2, $3, $4, $5) RETURNING id`;
  pool
    .query(queryText, [username, password, region, avatar, "NOW()"])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});



// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
