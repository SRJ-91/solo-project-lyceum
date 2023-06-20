const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET Request to fetch user's badges
router.get('/fetch', (req, res) => {
  const query = 'SELECT * FROM user_badges';
  
  pool.query(query)
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((error) => {
      console.error('Error fetching user badges:', error);
      res.sendStatus(500);
    });
});

// POST Request to give a user a badge
router.post('/award', (req, res) => {
  const { user_id, badge_id, tier, date } = req.body;
  const query = 'INSERT INTO users_badges (user_id, badge_id, tier, date) VALUES ($1, $2, $3, $4) RETURNING *';
  console.log(req.body);
  
  pool.query(query, [user_id, badge_id, tier, date])
    .then((result) => {
      res.status(201).send(result.rows[0]);
    })
    .catch((error) => {
      console.error('Error giving user a badge:', error);
      res.sendStatus(500);
    });
});

// PUT Request to update a badge
router.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { tier, date } = req.body;
  const query = 'UPDATE users_badges SET tier = $1, date = $2 WHERE id = $3 RETURNING *';
  
  pool.query(query, [tier, date, id])
    .then((result) => {
      if (result.rows.length === 0) {
        res.sendStatus(404); // No user badge found with the given ID
      } else {
        res.status(200).send(result.rows[0]);
      }
    })
    .catch((error) => {
      console.error('Error updating user badge:', error);
      res.sendStatus(500);
    });
});

// DELETE Request to remove a badge
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM users_badges WHERE id = $1';
  
  pool.query(query, [id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error('Error deleting user badge:', error);
      res.sendStatus(500);
    });
});

module.exports = router;
