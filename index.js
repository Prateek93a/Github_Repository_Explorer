require('dotenv').config()
const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes');

// setting up express app
const app = express();
app.use('/', express.static(path.join(__dirname, '/static')));

// api for fetching the data
app.use("/api", apiRoutes);

// for serving landing page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/static/index.html'));
});

// start the server
app.listen(process.env.PORT || 5050, () => {
    console.log('Server has started running!');
});
