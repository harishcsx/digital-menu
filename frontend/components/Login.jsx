import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Auth.css';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleLogin() {
    const res = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: "include",
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Login sucessfull")
      console.log("granted")
      navigate('/create');
    } else {
      alert('Login failed');
      console.log("access failed!")
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h1>Login</h1>
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
        <button onClick={handleLogin}>Login</button>

        <p>
          Don't have an account?{" "}
          <Link to="/signup">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
