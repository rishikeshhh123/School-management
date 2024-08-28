const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const schoolRoutes = require('./routes/schoolRoutes');
const sequelize = require('./config/sequelize');
const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', schoolRoutes);

// Sync Sequelize models with the database
sequelize.sync({ alter: true }).then(() => {
    console.log('All models were synchronized successfully.');

    // Start Server
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to sync models with the database:', err);
});
