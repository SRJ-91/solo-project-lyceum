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
    WHERE user_groups.reading_group_id = $1 AND user_groups.active = TRUE;
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
router.post('/add', async (req, res) => {
  const { user_id, reading_group_id, role } = req.body;
  console.log(req.body);
  let query2 = 'INSERT INTO user_groups (user_id, reading_group_id, role) VALUES ($1, $2, $3) RETURNING *';

  try {
    const query1 = 'SELECT * FROM user_groups WHERE user_id=$1 AND reading_group_id=$2';
    const result1 = await pool.query(query1, [user_id, reading_group_id])
    if (result1.rows.length > 0) {
      // they are already in the group, just need to be activated
      query2 = 'UPDATE user_groups SET active=TRUE, role=$3 WHERE  user_id=$1 AND reading_group_id=$2 RETURNING *';
    }
    const result2 = await pool.query(query2, [user_id, reading_group_id, role])
    res.status(201).send(result2.rows[0]);
  } catch (err) {
    console.error('Error adding a user to group:', error);
    res.sendStatus(500);
  }
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
router.delete('/kick/:memberId/:groupId', async (req, res) => {
  const memberId = Number(req.params.memberId);
  const groupId = Number(req.params.groupId);

  // UPDATE user_groups set active to false for the specific user and group that we're talkinga bout
  const query1 = `UPDATE user_groups SET active = FALSE WHERE user_id=$1 and reading_group_id=$2`;
  // const query2 = 'DELETE FROM user_groups WHERE user_id=$1 AND reading_group_id=$2';

  try {
    // const result1 = await pool.query(query1, [groupId]);
    await pool.query(query1, [memberId, groupId])
    res.sendStatus(200);
  } catch (error) {
    console.error('Error removing user from group:', error);
    res.sendStatus(500);
  };
});

module.exports = router;