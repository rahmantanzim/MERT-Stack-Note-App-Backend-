const express = require('express');
const router = express.Router();

// Sample Notes Data (Temporary, will be replaced with MongoDB later)
let notes = [
    { id: 1, title: "First Note", content: "This is the first note." },
    { id: 2, title: "Second Note", content: "This is the second note." }
];

//Get all notes
router.get('/notes',(req,res)=>{
    res.json(notes); //responds with all notes
});

//Get a single note by ID
router.get('/notes/:id', (req,res)=>{
    const note = notes.find(n=> n.id === parseInt(req.params.id));
    if(!note) return res.status(404).json({message: 'Note not found'});
    res.json(note);
});

//Create a new note
router.post('/notes',(req,res)=>{
    const {title,content} = req.body;
    const newNote = {id:notes.length +1, title, content};
    notes.push(newNote);
    res.status(201).json(newNote);
});

//Update a note
router.put('/notes/:id',(req,res)=>{
    const note = notes.find(n => n.id === parseInt(req.params.id));
    if(!note) return res.status(404).json({message:'Note not found'});
    note.title = req.body.title || note.title;
    note.content = req.body.content || note.content;
    res.json(note);
});

//Delete a note
router.delete('/notes/:id',(req,res)=>{
    notes = notes.filter((note) => note.id !== parseInt(req.params.id));
    res.json({message:'Note deleted successfully'});
})

module.exports = router;