import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";

export function YourStores() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
      async function isAuthenticated() {
        const res = await fetch(`${backendUrl}/api/isAuthed/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include"
        });

        
        if (!res.ok) navigate("/login");
        else return;
      }

      isAuthenticated();
    }, []);
  

  useEffect(() => {
    async function fetchStores() {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(`${backendUrl}/api/service/show/store`, {
          credentials: 'include'
        });
        const data = await res.json();
        if (res.ok) setStores(data);
        else alert(data.error || "Could not fetch your stores");
      } catch (error) {
        alert("Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    fetchStores();
  }, []);

  return (
    <>
      <Navbar />
      <div style={{
        backgroundColor: '#0e0e1a',
        color: '#f0f0f0',
        minHeight: '100vh',
        padding: '40px 20px'
      }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '30px'
        }}>
          Your Stores
        </h2>

        {loading ? (
          <p style={{ textAlign: "center", color: "#aaa" }}>Loading...</p>
        ) : stores.length === 0 ? (
          <p style={{ textAlign: "center", color: "#aaa" }}>You haven't created any stores yet.</p>
        ) : (
          <ul style={{
            maxWidth: '600px',
            margin: '0 auto',
            listStyle: 'none',
            padding: 0
          }}>
            {stores.map(store => (
  <li key={store.storeId} style={{
    backgroundColor: '#1a1a2e',
    marginBottom: '15px',
    padding: '15px 20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(255,255,255,0.05)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }}>
    <Link to={`/store/${store.storeName}`} style={{
      color: '#8be78b',
      fontSize: '1.1rem',
      textDecoration: 'none'
    }}>
      🛍 {store.storeName}
    </Link>
    <Link to={`/getqr/${store.storeName}`} style={{ marginLeft: '10px' }} title="Get QR code">
      <img
        src="	https://cdn-icons-png.flaticon.com/512/5570/5570608.png"
        alt="QR code"
        style={{ width: "24px", height: "24px", verticalAlign: "middle" }}
      />
    </Link>
  </li>
))}
          </ul>
        )}
      </div>
    </>
  );
}

