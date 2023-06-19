const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

//POST Request to create a new reading group
router.post('/create', (req, res) => {
    const { status, region, book_name, team_name, cohort, start_date, end_date, details } = req.body;
    const query = `INSERT INTO groups (status, region, book_name, team_name, cohort, start_date, end_date, details)
                   VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                   RETURNING *`;
    const values = [status, region, book_name, team_name, cohort, start_date, end_date, details];
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