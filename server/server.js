const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const groupsRouter = require('./routes/groups.router');
const badgesRouter = require('./routes/badges.router');
const whiteboardRouter = require('./routes/whiteboard.router');
const postsRouter = require('./routes/posts.router');
const users_groupsRouter = require('./routes/users_groups.router');
const users_badgesRouter = require('./routes/users_badges.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/groups', groupsRouter);
app.use('/api/badges', badgesRouter);
app.use('/api/whiteboard', whiteboardRouter);
app.use('/api/posts', postsRouter);
app.use('/api/users_groups', users_groupsRouter);
app.use('/api/users_badges', users_badgesRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
