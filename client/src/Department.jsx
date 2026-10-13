
import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:3000/departments';

function Department() {
    const [departments, setDepartments] = useState([]);
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [message, setMessage] = useState('');

    const fetchDepartments = async () => {
        try {
            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error('Failed to fetch departments');
            }

            const data = await response.json();
            setDepartments(data);
        } catch (error) {
            setMessage('Unable to load departments. Check your backend.');
        }
    };

    useEffect(() => {
        fetchDepartments();
    }, []);

    const resetForm = () => {
        setName('');
        setLocation('');
        setEditingId(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');

        const isEditing = editingId !== null;
        const url = isEditing ? `${API_URL}/${editingId}` : API_URL;

        try {
            const response = await fetch(url, {
                method: isEditing ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, location })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Operation failed');
            }

            setMessage(
                isEditing
                    ? 'Department updated successfully!'
                    : 'Department added successfully!'
            );

            resetForm();
            await fetchDepartments();
        } catch (error) {
            setMessage(error.message);
        }
    };

    const handleEdit = (department) => {
        setEditingId(department.id);
        setName(department.name);
        setLocation(department.location);
        setMessage('');
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            'Are you sure you want to delete this department?'
        );

        if (!confirmed) return;

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Unable to delete department');
            }

            if (editingId === id) {
                resetForm();
            }

            setMessage('Department deleted successfully!');
            await fetchDepartments();
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div style={{ padding: '24px', maxWidth: '800px', margin: 'auto' }}>
            <h1>Department Management</h1>
            <p>Add, edit, and view departments saved in the database.</p>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '12px' }}>
                    <label htmlFor="name">Department Name</label>
                    <br />
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                    />
                </div>

                <div style={{ marginBottom: '12px' }}>
                    <label htmlFor="location">Location</label>
                    <br />
                    <input
                        id="location"
                        type="text"
                        value={location}
                        onChange={(event) => setLocation(event.target.value)}
                        required
                    />
                </div>

                <button type="submit">
                    {editingId !== null ? 'Update Department' : 'Add Department'}
                </button>

                {editingId !== null && (
                    <button type="button" onClick={resetForm}
                        style={{ marginLeft: '8px' }}>
                        Cancel
                    </button>
                )}
            </form>

            {message && <p role="status">{message}</p>}

            <h2>Department List</h2>

            {departments.length === 0 ? (
                <p>No departments found.</p>
            ) : (
                <ul>
                    {departments.map((department) => (
                        <li key={department.id} style={{ marginBottom: '12px' }}>
                            <strong>{department.name}</strong> — {department.location}
                            {' '}
                            <button
                                type="button"
                                onClick={() => handleEdit(department)}
                            >
                                Edit
                            </button>
                            {' '}
                            <button
                                type="button"
                                onClick={() => handleDelete(department.id)}
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

export default Department;
