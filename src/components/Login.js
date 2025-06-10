import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error, token } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(login({ username, password }));
    if (login.fulfilled.match(resultAction)) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit" disabled={status === 'loading'}>Login</button>
        {status === 'failed' && <div style={{color:'red'}}>{error}</div>}
      </form>
    </div>
  );
};

export default Login; 