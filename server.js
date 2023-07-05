const express = require('express');
const fs = require('fs');
const app = express();
const notes = require('./db/db.json');
const path = require('path');

app.use (express.json());
app.use ('/api/notes', require('./api'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Listening on PORT: PORT`));