import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Auth.css';

export function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleSignup() {
  const res = await fetch('http://localhost:3000/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();

  if (res.ok) {
    alert('Account created!');
    navigate('/login');
  } else {
    alert(data.msg || 'Signup failed');
  }
}


  return (
    <div className="auth-page">
      <div className="auth-box">
        <h1>Sign Up</h1>
        <input
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSignup}>Sign Up</button>

        <p>
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
