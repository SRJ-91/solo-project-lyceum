const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

//GET Request to map all badges out in the badge view screen
router.get('/fetch', (req, res) => {
    const query = `SELECT * FROM badges ORDER BY "name" DESC`;
    pool.query(query)
    .then((result) => {
      res.status(200).send(result.rows[0]);
      console.log('fetching', result.rows);
    })
    .catch((error) => {
      console.error('Error fetching a group:', error);
      res.sendStatus(500);
    });
});

router.post('/create', (req, res) => {
    const { img, name } = req.body;
    const query = `INSERT INTO badges (img, name)
                   VALUES ($1, $2)
                   RETURNING *`;
    const values = [img, name];
    console.log('sending', req.body);
    pool.query(query, values)
    .then((result) => {
      res.status(201).send(result.rows[0]);
      console.log('result is', result);
    })
    .catch((error) => {
      console.error('Error creating a group:', error);
      res.sendStatus(500);
    });
});




module.exports = router;