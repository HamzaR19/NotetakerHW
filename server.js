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

app.get('/notes' , (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
}
);

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
}
);

app.post('/api/notes', (req, res) => {
    req.body.id = uuid();
    notes.push(req.body);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    res.json(notes);
}   
);

app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    notes.splice(noteId, 1);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    res.json(notes);
},
);
























app.listen(PORT, () => console.log(`Listening on PORT: PORT`));