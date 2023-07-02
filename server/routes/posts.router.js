const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET Request to fetch all posts - JOIN "users" AS "u" ON "p"."user_id" = "u"."id"
router.get('/fetch/:groupId', (req, res) => {
  const groupId = req.params.groupId;
 const query = `SELECT p.id AS id, p.title AS title, p.body AS body, p.user_id AS user_id, p.badge_id AS badge_id, p.users_groups_id AS users_groups_id, ug.reading_group_id AS reading_group_id, ug.role AS role FROM "posts" AS "p"
 JOIN "user_groups" AS "ug" on "p"."users_groups_id"="ug"."id"
 
 WHERE "ug"."reading_group_id"=$1
 ORDER by "p"."id";`;
  console.log(req.body);
  
  pool.query(query, [groupId])
    .then((result) => {
      // console.log('result is', result);
      res.status(200).send(result.rows);
    })
    .catch((error) => {
      console.error('Error fetching posts:', error);
      res.sendStatus(500);
    });
});

// POST Request to create a new post
router.post('/create', (req, res) => {

  const { title, body, status, userId, badgeId, userGroupId, created_at } = req.body;
  const query = 'INSERT INTO posts (title, body, status, user_id, badge_id, users_groups_id, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
  const values = [title, body, status, userId, badgeId, userGroupId, created_at];
  console.log('sending', req.body);
  
  pool.query(query, values)
    .then((result) => {
      res.status(201).send(result.rows[0]);
    })
    .catch((error) => {
      console.error('Error creating a new post:', error);
      res.sendStatus(500);
    });
});

// PUT Request to update a post by ID
router.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { title, body, status } = req.body;
  const query = 'UPDATE posts SET title = $1, body = $2, status = $3 WHERE id = $4 RETURNING *';
  
  pool.query(query, [title, body, status, id])
    .then((result) => {
      if (result.rows.length === 0) {
        res.sendStatus(404); // No post found with the given ID
      } else {
        res.status(200).json(result.rows[0]);
      }
    })
    .catch((error) => {
      console.error('Error updating a post:', error);
      res.sendStatus(500);
    });
});

// DELETE Request to delete a post by ID
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM posts WHERE id = $1';
  
  pool.query(query, [id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error('Error deleting a post:', error);
      res.sendStatus(500);
    });
});

module.exports = router;