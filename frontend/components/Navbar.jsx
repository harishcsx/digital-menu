import { Link } from 'react-router-dom';
import "../src/index.css"

export function Navbar() {
  const navStyle = {
    backgroundColor: '#1a1a2e',
    padding: '15px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '1.1rem'
  };

  const linkStyle = {
    color: '#f0f0f0',
    textDecoration: 'none',
    marginLeft: '20px'
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={{ ...linkStyle, fontWeight: 'bold', fontSize: '1.2rem' }}>
        DigitalMenu
      </Link>
      <div>
        <Link to="/create" style={linkStyle}>Create</Link>
        <Link to="/stores" style={linkStyle}>Stores</Link>
      </div>
    </nav>
  );
}
