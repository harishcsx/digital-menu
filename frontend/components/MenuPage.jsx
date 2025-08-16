import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export function MenuPage() {
  const { storeId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`https://digital-menu-1-4fpa.onrender.com/api/service/store/${storeId}`);
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error('Failed to fetch menu:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [storeId]);

  if (loading) {
    return <p style={{ color: 'white', textAlign: 'center' }}>Loading Menu...</p>;
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #f7e8d3 0%, #fff 80%)',
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        color: '#2D2926',
        padding: 0,
        margin: 0,
        boxSizing: 'border-box'
      }}
    >
      <header style={{
        padding: '20px 16px 12px',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '2.1rem',
          fontWeight: 700,
          color: '#bf1922',
          margin: 0,
          letterSpacing: '.03em'
        }}>
          {storeId ? `${storeId}'s Menu` : 'Menu Preview'}
        </h1>
        <p style={{
          fontSize: '1rem',
          color: '#b17a50',
          marginTop: '9px',
          marginBottom: 0
        }}>
          Explore delicious options!
        </p>
      </header>

      <main style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '18px',
        padding: '8px 12px 90px',
        maxWidth: 420,
        margin: '0 auto'
      }}>
        {products.map(product => (
          <article
            key={product.product_no}
            style={{
              background: '#fff',
              borderRadius: '18px',
              boxShadow: '0 4px 16px rgba(191,25,34,0.08)',
              overflow: 'hidden',
              minHeight: 160,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <img
              src={product.img}
              alt={product.title}
              style={{
                width: '90px',
                height: '90px',
                objectFit: 'contain',
                background: "#f7e8d3",
                borderRadius: '18px',
                marginLeft: '10px'
              }}
              loading="lazy"
              draggable={false}
            />
            <div style={{ padding: '10px 18px', flexGrow: 1 }}>
              <h3 style={{
                margin: '0 0 6px',
                fontWeight: 700,
                fontSize: '1.15rem',
                color: "#2D2926"
              }}>
                {product.title}
              </h3>
              <p style={{
                margin: 0,
                fontWeight: 700,
                color: "#bf1922",
                fontSize: '1.05rem'
              }}>
                ₹ {product.price}
              </p>
            </div>
          </article>
        ))}
      </main>

      <footer style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 62,
        background: '#bf1922',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFF',
        fontSize: '1.05rem',
        boxShadow: '0 -2px 12px rgba(0,0,0,0.06)',
        zIndex: 2
      }}>
        Powered by <Link to="/" style={{
          color: '#facf39',
          fontWeight: 800,
          textDecoration: 'none',
          marginLeft: 6
        }}>DigitalMenu</Link>
      </footer>
    </div>
  );

}
