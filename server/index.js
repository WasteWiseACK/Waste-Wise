///////////////////////////////
// Imports
///////////////////////////////

require('dotenv').config();
const path = require('path');
const express = require('express');

// middleware imports
const handleCookieSessions = require('./middleware/handleCookieSessions');
const logRoutes = require('./middleware/logRoutes');
const checkAuthentication = require('./middleware/checkAuthentication');

// controller imports
const authControllers = require('./controllers/authControllers');
const userControllers = require('./controllers/userControllers');
const postControllers = require('./controllers/postControllers');
const commentControllers = require('./controllers/commentsControllers');


const app = express();

// middleware
app.use(handleCookieSessions); // adds a session property to each request representing the cookie
app.use(logRoutes); // print information about each incoming request
app.use(express.json()); // parse incoming request bodies as JSON
app.use(express.static(path.join(__dirname, '../frontend/dist'))); // Serve static assets from the dist folder of the frontend



///////////////////////////////
// Auth Routes
///////////////////////////////

app.get('/api/me', authControllers.showMe);
app.post('/api/login', authControllers.loginUser);
app.delete('/api/logout', authControllers.logoutUser);



///////////////////////////////
// User Routes
///////////////////////////////

app.post('/api/users', userControllers.createUser);

// These actions require users to be logged in (authentication)
// Express lets us pass a piece of middleware to run for a specific endpoint
app.get('/api/users', checkAuthentication, userControllers.listUsers);
app.get('/api/users/:id', checkAuthentication, userControllers.showUser);
app.patch('/api/users/:id/edit', checkAuthentication, userControllers.updateUser);

///////////////////////////////
// Post Routes
///////////////////////////////

app.get('/api/posts', postControllers.listPosts);


app.get('/api/posts/:id', postControllers.showPost);
app.get('/api/posts/user/:userId', postControllers.findByUserId);
app.post('/api/posts', checkAuthentication, postControllers.createPost);
app.patch('/api/posts/:id', checkAuthentication, postControllers.updatePost);
app.delete('/api/posts/:id', checkAuthentication, postControllers.deletePost);


///////////////////////////////
// Comment Route
///////////////////////////////

app.get('/api/comments', commentControllers.listAllComments);
app.get('/api/comments/posts/:id', commentControllers.listComments);
app.post('/api/comments', commentControllers.createComment);
app.patch('/api/comments/:id', commentControllers.editComment);
app.delete('/api/comments/:id', commentControllers.deleteComment);




///////////////////////////////
// Fallback Route
///////////////////////////////

// Requests meant for the API will be sent along to the router.
// For all other requests, send back the index.html file in the dist folder.
app.get('*', (req, res, next) => {
  if (req.originalUrl.startsWith('/api')) return next();
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});



///////////////////////////////
// Start Listening
///////////////////////////////

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
