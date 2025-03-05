// frontend/src/pages/Home.js
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NoteForm from '../components/NoteForm';
import NoteCard from '../components/NoteCard';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
    const [notes, setNotes] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else {
            fetchNotes();
        }
    }, [user, navigate]);

    const fetchNotes = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/notes');
            setNotes(res.data);
        } catch (err) {
            console.error(err.response?.data);
        }
    };

    const handleAddNote = (newNote) => {
        setNotes([newNote, ...notes]);
    };

    const handleUpdateNote = (updatedNote) => {
        setNotes(notes.map((note) => (note._id === updatedNote._id ? updatedNote : note)));
    };

    const handleDeleteNote = (noteId) => {
        setNotes(notes.filter((note) => note._id !== noteId));
    };

    return (
        <div className="max-w-7xl mx-auto p-6 bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-100 min-h-screen">
            {/* Beautiful Title */}
            <h1 className="text-4xl font-bold text-center mb-8 text-indigo-800 drop-shadow-md animate-fadeIn">
                Welcome to NoteNest - Your Notes Dashboard
            </h1>

            {/* Notes Section */}
            <div className="bg-white rounded-lg shadow-xl p-6">
                <NoteForm onAddNote={handleAddNote} />
                <div className="mt-6">
                    {notes.length === 0 ? (
                        <p className="text-gray-500 text-center">No notes yet. Add one above!</p>
                    ) : (
                        notes.map((note) => (
                            <NoteCard
                                key={note._id}
                                note={note}
                                onUpdate={handleUpdateNote}
                                onDelete={handleDeleteNote}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

// Add this CSS for the fade-in animation
const styles = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .animate-fadeIn {
        animation: fadeIn 1s ease-in-out;
    }
`;

// Use this if you want to add custom CSS (optional, since Tailwind handles most styling)
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default Home;