const express = require('express');
const { dbConnection } = require('./config/config');
const taskRoutes = require('./routes/tasks');
const app = express();
const PORT = 7070;

app.use(express.json());
dbConnection();

app.use('/tasks', taskRoutes);
app.listen(PORT, () => console.log(`This server is running in port ${PORT}`));