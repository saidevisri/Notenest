// frontend/src/components/NoteForm.js
import { useState } from 'react';
import axios from 'axios';

const NoteForm = ({ onAddNote }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/notes', {
                title,
                content,
                tags: tags.split(',').map(tag => tag.trim()),
            });
            onAddNote(res.data);
            setTitle('');
            setContent('');
            setTags('');
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md mb-6">
            <h3 className="text-lg font-bold mb-4">Add a New Note</h3>
            <div className="mb-4">
                <label className="block text-gray-700">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Content</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full p-2 border rounded"
                    rows="4"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Tags (comma-separated)</label>
                <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full p-2 border rounded"
                />
            </div>
            <button
                type="submit"
                className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
                Add Note
            </button>
        </form>
    );
};

export default NoteForm;