// frontend/src/components/NoteCard.js
import { useState } from 'react';
import axios from 'axios';

const NoteCard = ({ note, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);
    const [tags, setTags] = useState(note.tags.join(', '));

    const handleUpdate = async () => {
        try {
            const updatedNote = await axios.put(`http://localhost:5000/api/notes/${note._id}`, {
                title,
                content,
                tags: tags.split(',').map(tag => tag.trim()),
            });
            onUpdate(updatedNote.data);
            setIsEditing(false);
        } catch (err) {
            console.error(err.response.data);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/notes/${note._id}`);
            onDelete(note._id);
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <div className="bg-white p-4 rounded shadow-md mb-4">
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border rounded mb-2"
                    />
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full p-2 border rounded mb-2"
                        rows="3"
                    />
                    <input
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="w-full p-2 border rounded mb-2"
                    />
                    <div className="flex space-x-2">
                        <button
                            onClick={handleUpdate}
                            className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
                        >
                            Cancel
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <h3 className="text-lg font-bold">{note.title}</h3>
                    <p className="text-gray-700">{note.content}</p>
                    <p className="text-sm text-gray-500 mt-2">
                        Tags: {note.tags.join(', ')}
                    </p>
                    <div className="mt-4 flex space-x-2">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-yellow-600 text-white p-2 rounded hover:bg-yellow-700"
                        >
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
                        >
                            Delete
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default NoteCard;