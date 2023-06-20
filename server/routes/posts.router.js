const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET Request to fetch all posts
router.get('/fetch', (req, res) => {
  const query = 'SELECT * FROM posts ORDER BY id ASC';
  console.log(req.body);
  
  pool.query(query)
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((error) => {
      console.error('Error fetching posts:', error);
      res.sendStatus(500);
    });
});

// POST Request to create a new post
router.post('/create', (req, res) => {

  const { title, body, status, created_at } = req.body;
  const query = 'INSERT INTO posts (title, body, status, created_at) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [title, body, status, created_at];
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