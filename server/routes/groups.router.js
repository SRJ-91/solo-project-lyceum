const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

//POST Request to create a new reading group
router.post('/create', (req, res) => {
    const { badge_id, region, book_name, team_name, cover, logo, cohort, start_date, end_date, details } = req.body;
    const query = `INSERT INTO groups (badge_id, region, book_name, team_name, cover, logo, cohort, start_date, end_date, details)
                   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                   RETURNING *`;
    const values = [badge_id, region, book_name, team_name, cover, logo, cohort, start_date, end_date, details];
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

//GET Request to Map ACTIVE or FALSE groups to your launch and page
router.get('/active', (req, res) => {
    const query = `
    SELECT * FROM groups
    WHERE "status" = false 
    ORDER BY "start_date" DESC`;
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

//Get groups that are marked DONE or TRUE
router.get('/done', (req, res) => {
  const query = `
    SELECT * FROM "groups"
    WHERE "status" = true
    ORDER BY "end_date" DESC
  `;
  pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('Error fetching archived groups:', error);
      res.sendStatus(500);
    });
});

// GET a specific group to map to your details page.
router.get('/:groupId', (req, res) => {
  const groupId = req.params.groupId;

  // Query the database to get the group with the specified groupId
  const queryText = `
    SELECT * FROM groups
    WHERE id = $1;
  `;

  pool.query(queryText, [groupId])
    .then((result) => {
      // Return the group data
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('Error getting group details from database:', error);
      res.sendStatus(500);
    });
});


//ALL PUT REQUEST CODE BEYOND THIS POINT IS USED WITHIN THE DETAILS PAGE SCREEN

// PUT Request to update group details
// PUT Request to update group details
router.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { region, book_name, team_name, cohort, start_date, end_date, cover, logo, details, status } = req.body;
    const query = `UPDATE groups SET region = $1, book_name = $2, team_name = $3, cohort = $4, start_date = $5, end_date = $6,
                   cover = $7, logo = $8, details = $9, status = $10
                   WHERE id = $11`;
    const values = [region, book_name, team_name, cohort, start_date, end_date, cover, logo, details, status, id];
  
    pool.query(query, values)
      .then(() => {
        res.sendStatus(200);
      })
      .catch((error) => {
        console.error('Error updating group:', error);
        res.sendStatus(500);
      });
});








// // PUT Request to update majority of group data found in center center.
// router.put('/update-header/:id', (req, res) => {
//     const { id } = req.params;
//     const { region, book_name, team_name, cohort, start_date, end_date } = req.body;
//     const query = `UPDATE groups SET region = $1, book_name = $2, team_name = $3, cohort = $4, start_date = $5, end_date = $6
//                    WHERE id = $7`;
  
//     pool.query(query, [region, book_name, team_name, cohort, start_date, end_date, id])
//       .then(() => {
//         res.sendStatus(200);
//       })
//       .catch((error) => {
//         console.error('Error updating group details:', error);
//         res.sendStatus(500);
//       });
// });

// // PUT Request to update the cover
// router.put('/update-cover/:id', (req, res) => {
//     const { id } = req.params;
//     const { cover } = req.body;
//     const query = `UPDATE groups SET cover = $1
//                    WHERE id = $2`;
  
//     pool.query(query, [cover, id])
//       .then(() => {
//         res.sendStatus(200);
//       })
//       .catch((error) => {
//         console.error('Error updating group cover:', error);
//         res.sendStatus(500);
//       });
// });

// // PUT Request to update the logo
// router.put('/update-logo/:id', (req, res) => {
//     const { id } = req.params;
//     const { logo } = req.body;
//     const query = `UPDATE groups SET logo = $1
//                    WHERE id = $2`;
  
//     pool.query(query, [logo, id])
//       .then(() => {
//         res.sendStatus(200);
//       })
//       .catch((error) => {
//         console.error('Error updating group logo:', error);
//         res.sendStatus(500);
//       });
// });

// // PUT Request to update the details in the roster control/more info modal
// router.put('/update-details-modal/:id', (req, res) => {
//     const { id } = req.params;
//     const { details } = req.body;
//     const query = `UPDATE groups SET details = $1
//                    WHERE id = $2`;
  
//     pool.query(query, [details, id])
//       .then(() => {
//         res.sendStatus(200);
//       })
//       .catch((error) => {
//         console.error('Error updating group details in modal:', error);
//         res.sendStatus(500);
//       });
// });

// // PUT Request to update the status boolean to false (end group)
// router.put('/end-group/:id', (req, res) => {
//     const { id } = req.params;
//     const query = `UPDATE groups SET status = false
//                    WHERE id = $1`;
  
//     pool.query(query, [id])
//       .then(() => {
//         res.sendStatus(200);
//       })
//       .catch((error) => {
//         console.error('Error ending group:', error);
//         res.sendStatus(500);
//       });
// });


module.exports = router;