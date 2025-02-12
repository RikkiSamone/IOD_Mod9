let dbConnect = require("./dbConnect");

let userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const express = require('express');
const app = express();
const animeRoutes = require('./routes/animeRoutes'); // Import the new routes

// Middleware
app.use(express.json());  

// Use the Anime routes
app.use('/api/anime', animeRoutes);


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});