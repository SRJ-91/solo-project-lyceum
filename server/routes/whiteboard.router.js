const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


//GET Request to pull out the whiteboard data
router.get('/fetch', (req, res) => {
    const query = `SELECT * FROM whiteboard`;
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
    const { notes } = req.body;
    const query = `INSERT INTO whiteboard ( notes )
                   VALUES ($1)
                   RETURNING *`;
    console.log('sending', req.body);
    pool.query(query, [notes])
    .then((result) => {
      res.status(201).send(result.rows[0]);
      // console.log('result is', result);
    })
    .catch((error) => {
      console.error('Error logging the whiteboard:', error);
      res.sendStatus(500);
    });
});





module.exports = router;