
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import Dashboard from './pages/Dashboard';
import Department from './Department';
import Faculty from './pages/Faculty';
import Slots from './pages/Slots';
import Lectures from './pages/Lectures';

function App() {
    return (
        <BrowserRouter>
            <nav style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                padding: '16px'
            }}>
                <Link to="/">Dashboard</Link>
                <Link to="/departments">Departments</Link>
                <Link to="/faculty">Faculty</Link>
                <Link to="/slots">Slots</Link>
                <Link to="/lectures">Lectures</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/departments" element={<Department />} />
                <Route path="/faculty" element={<Faculty />} />
                <Route path="/slots" element={<Slots />} />
                <Route path="/lectures" element={<Lectures />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
