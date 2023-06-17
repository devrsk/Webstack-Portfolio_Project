const express = require('express');
const app = express();
const { SERVER } = require('./constants');
const cors = require('cors');

// middleware

app.use(express.json()) // req.body
app.use(express.urlencoded({ extended: true })) // req.body

// Enable CORS middleware
app.use(cors());

// routes
const routes = require('./routes');
app.use('/api', routes);

const startServer = () => {
    try {
        app.listen(SERVER.SERVER_PORT, () => {
            console.log(`Real Estate server listening on port ${SERVER.SERVER_PORT}`);
        })
    } catch (e) {
        console.error(`Error: ${e}`);
    }
};

startServer();
