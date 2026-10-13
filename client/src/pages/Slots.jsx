
import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:3000/slots';

function Slots() {
    const [slots, setSlots] = useState([]);
    const [slotName, setSlotName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const [editingId, setEditingId] = useState(null);
    const [message, setMessage] = useState('');

    const fetchSlots = async () => {
        try {
            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error('Failed to fetch slots');
            }

            setSlots(await response.json());
        } catch (error) {
            setMessage('Unable to load slots. Check your backend.');
        }
    };

    useEffect(() => {
        fetchSlots();
    }, []);

    const resetForm = () => {
        setSlotName('');
        setStartTime('');
        setEndTime('');
        setEditingId(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');

        if (startTime >= endTime) {
            setMessage('End time must be later than start time.');
            return;
        }

        const isEditing = editingId !== null;

        try {
            const response = await fetch(
                isEditing ? `${API_URL}/${editingId}` : API_URL,
                {
                    method: isEditing ? 'PUT' : 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        slotName,
                        startTime,
                        endTime
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Unable to save slot');
            }

            setMessage(
                isEditing
                    ? 'Slot updated successfully!'
                    : 'Slot added successfully!'
            );

            resetForm();
            await fetchSlots();
        } catch (error) {
            setMessage(error.message);
        }
    };

    const handleEdit = (slot) => {
        setEditingId(slot.id);
        setSlotName(slot.slotName || '');
        setStartTime(slot.startTime || '');
        setEndTime(slot.endTime || '');
        setMessage('');
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this time slot?')) return;

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Unable to delete slot');
            }

            if (editingId === id) resetForm();

            setMessage('Slot deleted successfully!');
            await fetchSlots();
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div style={{ padding: '24px', maxWidth: '900px', margin: 'auto' }}>
            <h1>Slot Management</h1>
            <p>Create time slots for the lecture schedule.</p>

            <form onSubmit={handleSubmit}>
                <p>
                    <label htmlFor="slot-name">Slot Name</label><br />
                    <input
                        id="slot-name"
                        value={slotName}
                        onChange={(e) => setSlotName(e.target.value)}
                        placeholder="Lecture 1"
                        required
                    />
                </p>

                <p>
                    <label htmlFor="start-time">Start Time</label><br />
                    <input
                        id="start-time"
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                    />
                </p>

                <p>
                    <label htmlFor="end-time">End Time</label><br />
                    <input
                        id="end-time"
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        required
                    />
                </p>

                <button type="submit">
                    {editingId !== null ? 'Update Slot' : 'Add Slot'}
                </button>

                {editingId !== null && (
                    <button type="button" onClick={resetForm}>
                        Cancel
                    </button>
                )}
            </form>

            {message && <p role="status">{message}</p>}

            <h2>Time Slot List</h2>

            {slots.length === 0 ? (
                <p>No time slots found.</p>
            ) : (
                <ul>
                    {slots.map((slot) => (
                        <li key={slot.id} style={{ marginBottom: '16px' }}>
                            <strong>{slot.slotName}</strong>
                            {' — '}{slot.startTime} to {slot.endTime}
                            <br />
                            <button
                                type="button"
                                onClick={() => handleEdit(slot)}
                            >
                                Edit
                            </button>
                            {' '}
                            <button
                                type="button"
                                onClick={() => handleDelete(slot.id)}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Slots;
