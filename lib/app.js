const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.post('/', (req, res) => {
  res.send('Hit root route');
});

app.use('/api/v1/mics', require('./controllers/mics'));
app.use('/api/v1/mice', require('./controllers/mice'));
app.use('/api/v1/keyboards', require('./controllers/keyboards'));
// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
