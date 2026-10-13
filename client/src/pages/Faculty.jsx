
import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:3000/faculty';
const DEPARTMENT_URL = 'http://localhost:3000/departments';

function Faculty() {
    const [faculty, setFaculty] = useState([]);
    const [departments, setDepartments] = useState([]);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [salary, setSalary] = useState('');
    const [departmentId, setDepartmentId] = useState('');

    const [editingId, setEditingId] = useState(null);
    const [message, setMessage] = useState('');

    const fetchData = async () => {
        try {
            const [facultyResponse, departmentResponse] = await Promise.all([
                fetch(API_URL),
                fetch(DEPARTMENT_URL)
            ]);

            if (!facultyResponse.ok || !departmentResponse.ok) {
                throw new Error('Unable to load data');
            }

            const facultyData = await facultyResponse.json();
            const departmentData = await departmentResponse.json();

            setFaculty(facultyData);
            setDepartments(departmentData);
        } catch (error) {
            setMessage('Unable to load faculty or departments.');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const resetForm = () => {
        setName('');
        setEmail('');
        setSalary('');
        setDepartmentId('');
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
                        name,
                        email,
                        salary: Number(salary),
                        departmentId: Number(departmentId)
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Unable to save faculty');
            }

            setMessage(
                isEditing
                    ? 'Faculty updated successfully!'
                    : 'Faculty added successfully!'
            );

            resetForm();
            await fetchData();
        } catch (error) {
            setMessage(error.message);
        }
    };

    const handleEdit = (person) => {
        setEditingId(person.id);
        setName(person.name || '');
        setEmail(person.email || '');
        setSalary(person.salary ?? '');
        setDepartmentId(person.departmentId ?? '');
        setMessage('');
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this faculty member?')) return;

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Unable to delete faculty');
            }

            if (editingId === id) resetForm();

            setMessage('Faculty deleted successfully!');
            await fetchData();
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div style={{ padding: '24px', maxWidth: '900px', margin: 'auto' }}>
            <h1>Faculty Management</h1>
            <p>Manage faculty members and their departments.</p>

            <form onSubmit={handleSubmit}>
                <p>
                    <label htmlFor="faculty-name">Faculty Name</label><br />
                    <input
                        id="faculty-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </p>

                <p>
                    <label htmlFor="faculty-email">Email</label><br />
                    <input
                        id="faculty-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </p>

                <p>
                    <label htmlFor="faculty-salary">Salary</label><br />
                    <input
                        id="faculty-salary"
                        type="number"
                        min="0"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        required
                    />
                </p>

                <p>
                    <label htmlFor="faculty-department">Department</label><br />
                    <select
                        id="faculty-department"
                        value={departmentId}
                        onChange={(e) => setDepartmentId(e.target.value)}
                        required
                    >
                        <option value="">Select department</option>
                        {departments.map((department) => (
                            <option key={department.id} value={department.id}>
                                {department.name}
                            </option>
                        ))}
                    </select>
                </p>

                <button type="submit">
                    {editingId !== null ? 'Update Faculty' : 'Add Faculty'}
                </button>

                {editingId !== null && (
                    <button type="button" onClick={resetForm}>
                        Cancel
                    </button>
                )}
            </form>

            {message && <p role="status">{message}</p>}

            <h2>Faculty List</h2>

            {faculty.length === 0 ? (
                <p>No faculty members found.</p>
            ) : (
                <ul>
                    {faculty.map((person) => {
                        const department = departments.find(
                            (item) => item.id === person.departmentId
                        );

                        return (
                            <li key={person.id} style={{ marginBottom: '16px' }}>
                                <strong>{person.name}</strong>
                                {' — '}{person.email}
                                {' — '}Salary: {person.salary}
                                {' — '}Department: {
                                    department?.name || person.departmentId
                                }
                                <br />
                                <button
                                    type="button"
                                    onClick={() => handleEdit(person)}
                                >
                                    Edit
                                </button>
                                {' '}
                                <button
                                    type="button"
                                    onClick={() => handleDelete(person.id)}
                                >
                                    Delete
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}

export default Faculty;
