// server.js
const express = require('express');
const app = express();
const PORT = 3000;

// Import routes
const indexRoutes = require('./routes/index');

// Middleware
app.use('/', indexRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
