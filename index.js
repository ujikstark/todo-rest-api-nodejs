require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

let mongoString = process.env.DATABASE_URL;
let port = 3000;


// Check if the NODE_ENV environment variable is set to 'test'
switch (process.env.NODE_ENV) {
    case 'test':
        mongoString = process.env.DATABASE_TEST_URL;
        break;
    // case 'production':
    //     port = 3000;
    //     mongoString = process.env.DATABASE_PROD_URL;
    //     break;
}


console.log(mongoString);
mongoose.connect(mongoString);


const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
});

database.once('connected', () => {
    console.log('Database connected');
})

const app = express();


// Import userRoutes
const userRoutes = require('./routes/userRoutes');

// Import todoRoutes
const todoRoutes = require('./routes/todoRoutes');

// Import loginRoutes
const loginRoutes = require('./routes/loginRoutes');

// set content-type application/json
app.use(express.json());

// Use the loginRoutes for '/' path
app.use('/', loginRoutes);

// Use the userRoutes for '/api' path
app.use('/api', userRoutes);

// Use the todoRoutes for '/api' path
app.use('/api', todoRoutes);


if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => console.log(`Listening on port ${port}`))
}

module.exports = app;