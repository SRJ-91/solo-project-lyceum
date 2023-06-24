const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

//GET Request to map all badges out in the badge view screen
router.get('/fetch', (req, res) => {
    const query = `SELECT * FROM badges ORDER BY "name" DESC`;
    console.log(req.body);
    pool.query(query)
    .then((result) => {
      res.status(200).send(result.rows);
      console.log('fetching', result.rows);
    })
    .catch((error) => {
      console.error('Error fetching a group:', error);
      res.sendStatus(500);
    });
});

//GET Request to pull the individual badge in the bade details screen
router.get('/:badgeId', (req, res) => {
  const badgeId = req.params.badgeId;
  const queryText = 'SELECT * FROM badges WHERE id = $1;';
  pool.query(queryText, [badgeId])
    .then((result) => {
      if (result.rows.length === 0) {
        res.sendStatus(404); // Badge not found
      } else {
        res.send(result.rows[0]);
      }
    })
    .catch((error) => {
      console.error('Error fetching badge details:', error);
      res.sendStatus(500);
    });
});


//POST Request to add a badge to database
router.post('/create', (req, res) => {
    const { img, name, description } = req.body;
    const query = `INSERT INTO badges (img, name, description)
                   VALUES ($1, $2, $3)
                   RETURNING *`;
    const values = [img, name, description];
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

//PUT Request to edit badges in database
router.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { img, name } = req.body;
    const query = `UPDATE badges SET img = $1, name = $2, description = $3 WHERE id = $4 RETURNING *`;
    
    pool.query(query, [img, name, id])
      .then((result) => {
        if (result.rows.length === 0) {
          res.sendStatus(404); // No badge found with the given ID
        } else {
          res.status(200).send(result.rows[0]);
        }
      })
      .catch((error) => {
        console.error('Error updating a badge:', error);
        res.sendStatus(500);
      });
  });

  // DELETE Request to delete a badge by ID
router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM badges WHERE id = $1`;
    
    pool.query(query, [id])
      .then(() => {
        res.sendStatus(200);
      })
      .catch((error) => {
        console.error('Error deleting a badge:', error);
        res.sendStatus(500);
      });
  });
  


module.exports = router;