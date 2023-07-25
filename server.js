const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;
const dbPath = path.join(__dirname, 'db', 'db.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading the notes');
        } else {
            res.json(JSON.parse(data));
        }
    });
});

app.post('/api/notes', (req, res) => {
    const newNote = {
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text
    };

    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading the notes');
        } else {
            const notes = JSON.parse(data);
            notes.push(newNote);
            fs.writeFile(dbPath, JSON.stringify(notes), (err) => {
                if (err) {
                    res.status(500).send('Error writing the note');
                } else {
                    res.json(newNote);
                }
            });
        }
    });
});

app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading the notes');
        } else {
            const notes = JSON.parse(data);
            const noteIndex = notes.findIndex(note => note.id === noteId);

            if (noteIndex !== -1) {
                notes.splice(noteIndex, 1);
                fs.writeFile(dbPath, JSON.stringify(notes), (err) => {
                    if (err) {
                        res.status(500).send('Error writing the note');
                    } else {
                        res.json(notes);
                    }
                });
            } else {
                res.status(404).send('Note not found');
            }
        }
    });
});

app.listen(PORT, () => console.log(`Listening on PORT:${PORT}`));
