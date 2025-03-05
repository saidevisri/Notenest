// routes/notes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

// @route   GET /api/notes
// @desc    Get all notes of the logged-in user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id }).sort({ date: -1 });
        res.json(notes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST /api/notes
// @desc    Create a new note
// @access  Private
router.post(
    '/',
    [
        auth,
        body('title', 'Title is required').not().isEmpty(),
        body('content', 'Content is required').not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, content, tags } = req.body;

        try {
            const newNote = new Note({
                title,
                content,
                tags,
                user: req.user.id,
            });

            const note = await newNote.save();
            res.json(note);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

// @route   PUT /api/notes/:id
// @desc    Update a note
// @access  Private
router.put('/:id', auth, async (req, res) => {
    const { title, content, tags } = req.body;

    const noteFields = {};
    if (title) noteFields.title = title;
    if (content) noteFields.content = content;
    if (tags) noteFields.tags = tags;

    try {
        let note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ msg: 'Note not found' });

        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        note = await Note.findByIdAndUpdate(
            req.params.id,
            { $set: noteFields },
            { new: true }
        );

        res.json(note);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   DELETE /api/notes/:id
// @desc    Delete a note
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ msg: 'Note not found' });

        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await Note.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Note removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;