const express = require('express');
const router = express.Router();
const Note = require('../models/Note')

// Sample Notes Data (Temporary, will be replaced with MongoDB later)
// let notes = [
//     { id: 1, title: "First Note", content: "This is the first note." },
//     { id: 2, title: "Second Note", content: "This is the second note." }
// ];

//Get all notes
router.get('/notes',async(req,res)=>{
    try{
        const notes = await Note.find(); //.find() is a Mongoose method that retrieves all documents (records) from the database.
        res.json(notes); //responds with all notes
    }
    catch(err){
        res.status(500).json({message:'Server error:', err});
    }

});

//Get a single note by ID
router.get('/notes/:id', async (req,res)=>{
    // const note = notes.find(n=> n.id === parseInt(req.params.id));
    // if(!note) return res.status(404).json({message: 'Note not found'});
    // res.json(note);
    try{
        const note = await Note.findById(req.params.id);
        if(!note) return res.status(404).json({message: 'Note not found'});
        res.json(note);
    }
    catch(err){
        res.status(500).json({ message: 'Server error', error });
    }
});

//Create a new note
router.post('/notes',async (req,res)=>{
    const {title,content} = req.body;
    // const newNote = {id:notes.length +1, title, content};
    // notes.push(newNote);
    // res.status(201).json(newNote);
    try{
        const newNote = new Note({title, content});
        await newNote.save(); //save note to mongo DB
        res.status(201).json(newNote);
    }
    catch(err){
        res.status(500).json({ message: 'Server error', error });
    }
    
});

//Update a note
router.put('/notes/:id',async (req,res)=>{
    // const note = notes.find(n => n.id === parseInt(req.params.id));
    // if(!note) return res.status(404).json({message:'Note not found'});
    // note.title = req.body.title || note.title;
    // note.content = req.body.content || note.content;
    // res.json(note);
    try{
        const {title,content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.body.id,{title,content}, {new:true});
        if(!updatedNote) return res.status(404).json({message: 'Note not found'});
    }
    catch(err){
        res.status(500).json({ message: 'Server error', error });
    }
});

//Delete a note
router.delete('/notes/:id',async (req,res)=>{
    try{
        const deletedNote = await Note.findByIdAndDelete(req.params.id);if (!deletedNote) return res.status(404).json({ message: 'Note not found' });
        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
    // notes = notes.filter((note) => note.id !== parseInt(req.params.id));
    // res.json({message:'Note deleted successfully'});
})

module.exports = router;