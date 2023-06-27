const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET all members of a user group with additional user details
router.get('/:groupId', (req, res) => {
  const groupId = req.params.groupId;
  const queryText = `
    SELECT "user".id, "user".avatar, "user".region, "user".username, user_groups.role, user_groups.id AS user_groups_id
    FROM user_groups
    JOIN "user" ON user_groups.user_id = "user".id
    WHERE user_groups.reading_group_id = $1;
  `;
  const queryValues = [groupId];
  console.log(queryValues);
  
  pool
    .query(queryText, queryValues)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.error('Error fetching members:', error);
      res.sendStatus(500);
    });
});


// POST Request to add a user to a group
router.post('/add', (req, res) => {
  const { user_id, reading_group_id, role } = req.body;
  console.log(req.body);
  const query = 'INSERT INTO user_groups (user_id, reading_group_id, role) VALUES ($1, $2, $3) RETURNING *';
  
  pool.query(query, [user_id, reading_group_id, role])
    .then((result) => {
      res.status(201).send(result.rows[0]);
    })
    .catch((error) => {
      console.error('Error adding a user to group:', error);
      res.sendStatus(500);
    });
});

// PUT Request to update a user's role in a group
router.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  const query = 'UPDATE user_groups SET role = $1 WHERE id = $2 RETURNING *';
  
  pool.query(query, [role, id])
    .then((result) => {
      if (result.rows.length === 0) {
        res.sendStatus(404); // No user group found with the given ID
      } else {
        res.status(200).send(result.rows[0]);
      }
    })
    .catch((error) => {
      console.error('Error updating user group role:', error);
      res.sendStatus(500);
    });
});

// DELETE Request to remove a user from a group
router.delete('/kick/:id', (req, res) => {
  const memberId = Number(req.params.id);
  const query = 'DELETE FROM user_groups WHERE id = $1';
  
  pool.query(query, [memberId])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error('Error removing user from group:', error);
      res.sendStatus(500);
    });
});

module.exports = router;