import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    firstName: user?.firstName || '',
    email: user?.email || '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setEditMode(false);
    // In a real app, dispatch an update action here
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <div className="profile-avatar-row">
        <img src={user.image} alt="avatar" className="profile-avatar" />
        <div>
          <div><b>Username:</b> {user.username}</div>
          <div><b>Role:</b> {user.role || 'user'}</div>
        </div>
      </div>
      {editMode ? (
        <form onSubmit={handleSave} className="profile-form">
          <div>
            <label>Name:</label>
            <input name="firstName" value={form.firstName} onChange={handleChange} />
          </div>
          <div>
            <label>Email:</label>
            <input name="email" value={form.email} onChange={handleChange} />
          </div>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
        </form>
      ) : (
        <div className="profile-details">
          <div><b>Name:</b> {user.firstName}</div>
          <div><b>Email:</b> {user.email}</div>
          <button onClick={() => setEditMode(true)}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default Profile; 