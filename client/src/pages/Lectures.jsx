
import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:3000/lectures';
const FACULTY_URL = 'http://localhost:3000/faculty';
const SLOT_URL = 'http://localhost:3000/slots';

function Lectures() {
    const [lectures, setLectures] = useState([]);
    const [faculty, setFaculty] = useState([]);
    const [slots, setSlots] = useState([]);

    const [subject, setSubject] = useState('');
    const [lectureDate, setLectureDate] = useState('');
    const [room, setRoom] = useState('');
    const [facultyId, setFacultyId] = useState('');
    const [slotId, setSlotId] = useState('');

    const [editingId, setEditingId] = useState(null);
    const [message, setMessage] = useState('');

    const fetchData = async () => {
        try {
            const [lectureResponse, facultyResponse, slotResponse] =
                await Promise.all([
                    fetch(API_URL),
                    fetch(FACULTY_URL),
                    fetch(SLOT_URL)
                ]);

            if (
                !lectureResponse.ok ||
                !facultyResponse.ok ||
                !slotResponse.ok
            ) {
                throw new Error('Unable to load scheduler data');
            }

            const lectureData = await lectureResponse.json();
            const facultyData = await facultyResponse.json();
            const slotData = await slotResponse.json();

            setLectures(lectureData);
            setFaculty(facultyData);
            setSlots(slotData);
        } catch (error) {
            setMessage('Unable to load lectures, faculty or slots.');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const resetForm = () => {
        setSubject('');
        setLectureDate('');
        setRoom('');
        setFacultyId('');
        setSlotId('');
        setEditingId(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');

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
                        subject,
                        lectureDate,
                        room,
                        facultyId: Number(facultyId),
                        slotId: Number(slotId)
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Unable to save lecture');
            }

            setMessage(
                isEditing
                    ? 'Lecture updated successfully!'
                    : 'Lecture scheduled successfully!'
            );

            resetForm();
            await fetchData();
        } catch (error) {
            setMessage(error.message);
        }
    };

    const handleEdit = (lecture) => {
        setEditingId(lecture.id);
        setSubject(lecture.subject || '');
        setLectureDate(
            lecture.lectureDate
                ? String(lecture.lectureDate).slice(0, 10)
                : ''
        );
        setRoom(lecture.room || '');
        setFacultyId(lecture.facultyId ?? '');
        setSlotId(lecture.slotId ?? '');
        setMessage('');
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this scheduled lecture?')) return;

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Unable to delete lecture');
            }

            if (editingId === id) resetForm();

            setMessage('Lecture deleted successfully!');
            await fetchData();
        } catch (error) {
            setMessage(error.message);
        }
    };

    const getFacultyName = (id) => {
        const person = faculty.find((item) => item.id === id);
        return person ? person.name : `Faculty ID: ${id}`;
    };

    const getSlotName = (id) => {
        const slot = slots.find((item) => item.id === id);

        return slot
            ? `${slot.slotName} (${slot.startTime}–${slot.endTime})`
            : `Slot ID: ${id}`;
    };

    return (
        <div style={{ padding: '24px', maxWidth: '1000px', margin: 'auto' }}>
            <h1>Lecture Management</h1>
            <p>Schedule lectures by assigning faculty members and time slots.</p>

            <form onSubmit={handleSubmit}>
                <p>
                    <label htmlFor="subject">Subject</label><br />
                    <input
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g. Web Development"
                        required
                    />
                </p>

                <p>
                    <label htmlFor="lecture-date">Lecture Date</label><br />
                    <input
                        id="lecture-date"
                        type="date"
                        value={lectureDate}
                        onChange={(e) => setLectureDate(e.target.value)}
                        required
                    />
                </p>

                <p>
                    <label htmlFor="room">Classroom</label><br />
                    <input
                        id="room"
                        value={room}
                        onChange={(e) => setRoom(e.target.value)}
                        placeholder="e.g. Lab 1"
                        required
                    />
                </p>

                <p>
                    <label htmlFor="lecture-faculty">Faculty Member</label><br />
                    <select
                        id="lecture-faculty"
                        value={facultyId}
                        onChange={(e) => setFacultyId(e.target.value)}
                        required
                    >
                        <option value="">Select faculty</option>
                        {faculty.map((person) => (
                            <option key={person.id} value={person.id}>
                                {person.name}
                            </option>
                        ))}
                    </select>
                </p>

                <p>
                    <label htmlFor="lecture-slot">Time Slot</label><br />
                    <select
                        id="lecture-slot"
                        value={slotId}
                        onChange={(e) => setSlotId(e.target.value)}
                        required
                    >
                        <option value="">Select time slot</option>
                        {slots.map((slot) => (
                            <option key={slot.id} value={slot.id}>
                                {slot.slotName} ({slot.startTime}–{slot.endTime})
                            </option>
                        ))}
                    </select>
                </p>

                <button type="submit">
                    {editingId !== null ? 'Update Lecture' : 'Schedule Lecture'}
                </button>

                {editingId !== null && (
                    <button type="button" onClick={resetForm}>
                        Cancel
                    </button>
                )}
            </form>

            {message && <p role="status">{message}</p>}

            <h2>Scheduled Lectures</h2>

            {lectures.length === 0 ? (
                <p>No lectures scheduled yet.</p>
            ) : (
                <ul>
                    {lectures.map((lecture) => (
                        <li key={lecture.id} style={{ marginBottom: '18px' }}>
                            <strong>{lecture.subject}</strong>
                            <br />
                            Date: {String(lecture.lectureDate).slice(0, 10)}
                            <br />
                            Room: {lecture.room}
                            <br />
                            Faculty: {getFacultyName(lecture.facultyId)}
                            <br />
                            Slot: {getSlotName(lecture.slotId)}
                            <br />
                            <button
                                type="button"
                                onClick={() => handleEdit(lecture)}
                            >
                                Edit
                            </button>
                            {' '}
                            <button
                                type="button"
                                onClick={() => handleDelete(lecture.id)}
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

export default Lectures;
