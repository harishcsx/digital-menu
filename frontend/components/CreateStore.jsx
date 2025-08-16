// import { useEffect, useState } from 'react';
// import { Navbar } from './Navbar';
// import { ProductDesc } from './ProductDesc';
// import "../src/index.css";
// import { useNavigate } from 'react-router-dom';

// export function CreateStore() {
//   const [count, setCount] = useState(0);
//   const [visible, setVisible] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [storeName, setStorename] = useState("");

//   const navigate = useNavigate();

//   function handleProductDone(productData) {
//     setProducts(prev => [...prev, productData]);
//     setVisible(false);
//   }
// // here checking auth 
//   useEffect(() => {
//       async function isAuthenticated() {
//         const res = await fetch("http://localhost:3000/api/isAuthed/", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           credentials: "include"
//         });

        
//         if (!res.ok) navigate("/login");
//         else return;
//       }

//       isAuthenticated();
//     }, []);
  

//   async function handleSubmit() {
//     // const userId = localStorage.getItem('userId');
//     const productsForBackend = products.map(p => ({
//       ...p,
//       price: p.price.toString()
//     }));
//     console.log(products);
//     const body = { storeName, products: productsForBackend };

  
//     try {
//       const response = await fetch("http://localhost:3000/api/service/create/store", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: 'include',
//         body: JSON.stringify(body)
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         console.log(errorData.error)
//         alert(errorData.error || "Failed to create store");
//         return;
//       }

//       alert("Store created successfully!");
//       setProducts([]);
//       setStorename("");
//     } catch {
//       alert("Something went wrong.");
//     }
//   }

//   return (
//     <>
//       <Navbar />
//       <div style={{
//         backgroundColor: '#0e0e1a',
//         minHeight: '100vh',
//         color: '#f0f0f0',
//         padding: '30px 20px'
//       }}>
//         <h1 style={{
//           textAlign: 'center',
//           fontSize: '2rem',
//           marginBottom: '20px'
//         }}>
//           Create your own store!
//         </h1>

//         <div style={{ maxWidth: '500px', margin: '0 auto' }}>
//           <input
//             type="text"
//             placeholder="Store name?"
//             value={storeName}
//             onChange={(e) => setStorename(e.target.value)}
//             style={inputStyle}
//           />

//           <button onClick={() => { setVisible(true); setCount(c => c + 1); }} style={buttonStyle}>
//             + Add Product
//           </button>

//           {visible && (
//             <ProductDesc count={count} onDone={handleProductDone} />
//           )}

//           {products.length > 0 && (
//             <button onClick={handleSubmit} style={{ ...buttonStyle, marginTop: '20px', backgroundColor: '#4caf50' }}>
//               Create Store
//             </button>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// const inputStyle = {
//   display: 'block',
//   width: '100%',
//   padding: '12px',
//   marginBottom: '15px',
//   borderRadius: '6px',
//   border: 'none',
//   backgroundColor: '#1a1a2e',
//   color: '#f0f0f0'
// };

// const buttonStyle = {
//   width: '100%',
//   padding: '12px',
//   backgroundColor: '#8be78b',
//   color: '#1a1a2e',
//   fontWeight: 'bold',
//   fontSize: '1rem',
//   border: 'none',
//   borderRadius: '6px',
//   cursor: 'pointer'
// };



import { useEffect, useState, useCallback } from 'react';
import { Navbar } from './Navbar';
import { ProductDesc } from './ProductDesc';
import "../src/index.css";
import { useNavigate } from 'react-router-dom';

export function CreateStore() {
  const [products, setProducts] = useState([]);
  const [storeName, setStoreName] = useState("");
  const [addingProduct, setAddingProduct] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  const navigate = useNavigate();

  // ✅ Auth check
  useEffect(() => {
    async function isAuthenticated() {
      try {
        const res = await fetch("https://digital-menu-1-4fpa.onrender.com/api/isAuthed/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        if (!res.ok) {
          navigate("/login");
        } else {
          setAuthChecked(true);
        }
      } catch {
        navigate("/login");
      }
    }
    isAuthenticated();
  }, [navigate]);

  // ✅ Add product
  const handleProductDone = useCallback((productData) => {
    setProducts((prev) => [...prev, productData]);
    setAddingProduct(false);
  }, []);

  // ✅ Remove product
  const handleRemoveProduct = (index) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  };

  // ✅ Validation
  const validate = () => {
    if (!storeName.trim()) {
      alert("Please enter a store name.");
      return false;
    }
    if (products.length === 0) {
      alert("Please add at least one product.");
      return false;
    }
    return true;
  };

  // ✅ Submit store
  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);

    const productsForBackend = products.map((p) => ({
      ...p,
      price: p.price.toString(),
    }));

    const body = { storeName, products: productsForBackend };

    try {
      const response = await fetch("https://digital-menu-1-4fpa.onrender.com/api/service/create/store", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || "Failed to create store");
      } else {
        alert("Store created successfully!");
        setProducts([]);
        setStoreName("");
      }
    } catch {
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (!authChecked) {
    return <div style={{ color: "#fff", padding: "20px" }}>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <main style={mainContainer}>
        <div style={card}>
          <h1 style={heading}>🛍 Create Your Store</h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            aria-label="Create Store Form"
            style={{ width: '100%' }}
          >
            <label htmlFor="storeName" style={labelStyle}>Store Name</label>
            <input
              id="storeName"
              type="text"
              placeholder="e.g. My Trendy Shop"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              style={inputStyle}
              required
            />

            <button
              type="button"
              onClick={() => setAddingProduct(true)}
              style={primaryBtn}
              disabled={addingProduct}
            >
              + Add Product
            </button>

            {addingProduct && (
              <div style={{ marginTop: '20px' }}>
                <ProductDesc onDone={handleProductDone} onCancel={() => setAddingProduct(false)} />
              </div>
            )}

            {products.length > 0 && (
              <div style={{ marginTop: '30px' }}>
                <h2 style={subHeading}>📝 Added Products</h2>
                <div style={productList}>
                  {products.map((product, idx) => (
                    <div style={productCard} key={idx}>
                      <div>
                        <h3 style={productTitle}>{product.title}</h3>
                        <p style={productPrice}>₹ {product.price}</p>
                      </div>
                      <button onClick={() => handleRemoveProduct(idx)} style={removeBtn}>&times;</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              type="submit"
              style={{ ...primaryBtn, backgroundColor: '#4caf50', marginTop: '25px' }}
              disabled={loading || products.length === 0 || !storeName.trim()}
            >
              {loading ? "Creating Store…" : "✅ Create Store"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

//
// 🎨 Styles
//
const mainContainer = {
  backgroundColor: '#0e0e1a',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '40px',
  boxSizing: 'border-box',
};

const card = {
  backgroundColor: '#1a1a2e',
  borderRadius: '12px',
  maxWidth: '500px',
  width: '100%',
  padding: '30px',
  boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
};

const heading = {
  color: '#fff',
  fontSize: '1.8rem',
  marginBottom: '25px',
  textAlign: 'center',
};

const subHeading = {
  color: '#ddd',
  fontSize: '1.2rem',
  marginBottom: '15px',
};

const labelStyle = {
  color: '#ccc',
  fontSize: '0.95rem',
  marginBottom: '8px',
  display: 'block',
};

const inputStyle = {
  width: '100%',
  padding: '12px',
  marginBottom: '20px',
  borderRadius: '8px',
  border: '1px solid #444',
  backgroundColor: '#12122b',
  color: '#fff',
  fontSize: '1rem',
  outline: 'none',
};

const primaryBtn = {
  width: '100%',
  padding: '12px',
  backgroundColor: '#8be78b',
  color: '#000',
  fontWeight: 'bold',
  fontSize: '1rem',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
};

const productList = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
};

const productCard = {
  backgroundColor: '#22223a',
  padding: '15px',
  borderRadius: '8px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
};

const productTitle = {
  margin: 0,
  color: '#fff',
  fontSize: '1rem',
};

const productPrice = {
  margin: 0,
  color: '#8be78b',
  fontWeight: 'bold',
  fontSize: '0.95rem',
};

const removeBtn = {
  backgroundColor: 'transparent',
  border: 'none',
  color: '#ff6b6b',
  cursor: 'pointer',
  fontSize: '1.5rem',
  lineHeight: '1',
};

