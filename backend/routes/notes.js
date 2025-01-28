const express = require("express")
const router = express.Router()
const Note = require("../models/Note")
var fetchuser = require("../middleware/fetchuser")
const {body,validationResult } = require("express-validator")

//Route 1: Get all the notes using GET: "/api/auth/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req,res) => {
  try {
    const notes = await Note.find({user: req.user.id})
    res.json(notes)
  } catch {
    res.status(500).json({ error: 'Server error' })
  }
})
//Route 2: Add the notes using: POST "/api/auth/addnote". Login required
router.post('/addnote', fetchuser, [
  body('title', 'Enter a valid title').isLength({ min: 3 }),
  body('description', 'Description must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  try {
    console.log("Request received:", req.body);
    const { title, description, tag } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation errors:", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const note = new Note({
      title,
      description,
      tag,
      user: req.user.id,
    });
    const savedNote = await note.save();
    console.log("Note saved:", savedNote);
    res.json(savedNote);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: 'Server error' });
  }
});
// Route 3: Update the notes using: PUT "/api/auth/updatenote/:id". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
    // Create a new note object
    const newNote = {};
    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;

    // Find the note by ID
    let note = await Note.findById(req.params.id); // Add 'await' here

    // If the note doesn't exist
    if (!note) {
      return res.status(404).send("Note not found");
    }

    // Ensure the user owns the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    // Update the note
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true } // Return the updated document
    );

    res.json({ note });
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).send("Internal Server Error");
  }
});
// Route 4: Delete the notes using: PUT "/api/auth/deletenote/:id". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
  try {
    // Find the note by ID
    let note = await Note.findById(req.params.id); // Add 'await' here

    // If the note doesn't exist
    if (!note) {
      return res.status(404).send("Note not found");
    }

    // Ensure the user owns the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    // Delete the note
    note = await Note.findByIdAndDelete(
      req.params.id,
      res.json({"Success": "Note has been deleted", note:note})
    );

    res.json({ note });
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router