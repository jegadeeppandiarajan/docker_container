import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [roll, setRoll] = useState('');
  const [editingId, setEditingId] = useState(null);

  const fetchStudents = async () => {
    const response = await fetch('http://localhost:3000/students');
    const data = await response.json();
    // Sort by roll number ascending
    const sortedData = data.sort((a, b) => a.roll.localeCompare(b.roll));
    setStudents(sortedData);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const student = { name, email, roll };

    if (editingId) {
      await fetch(`http://localhost:3000/students/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student)
      });
    } else {
      await fetch('http://localhost:3000/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student)
      });
    }

    setName('');
    setEmail('');
    setRoll('');
    setEditingId(null);
    fetchStudents();
  };

  const handleEdit = (student) => {
    setName(student.name);
    setEmail(student.email);
    setRoll(student.roll);
    setEditingId(student._id);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/students/${id}`, {
      method: 'DELETE'
    });
    fetchStudents();
  };

  return (
    <div className="container">
      <h1>Student Records</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="text" placeholder="Roll No" value={roll} onChange={(e) => setRoll(e.target.value)} required />
        <button type="submit">{editingId ? 'Update Student' : 'Add Student'}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Roll No</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.roll}</td>
              <td>
                <button onClick={() => handleEdit(student)}>Edit</button>
                <button onClick={() => handleDelete(student._id)} style={{ backgroundColor: '#dc3545' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
