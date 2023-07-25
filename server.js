const express = require('express');
const PORT = process.env.PORT || 3001;
const fs = require('fs');
const app = express();
const notes = require('./db/db.json');
const path = require('path');
const uuid = require('./helpers/uuid');

app.use (express.json());
// app.use ('/api/notes', require('./api'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/' , (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});






















app.listen(PORT, () => console.log(`Listening on PORT: PORT`));