let dbConnect = require("./dbConnect");

let userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);