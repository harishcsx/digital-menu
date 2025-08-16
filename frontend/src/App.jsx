// import React from 'react';
// import './App.css';
// import FeatureCard from '../components/FeatureCard.jsx';
// import { Link, useNavigate } from 'react-router-dom';

// const App = () => {
//   return (
//     <div>

//       {/* Hero Section */}
//       <section className="custom-gradient-dark hero">
//         <h1>Create Your Restaurant’s Digital Menu with QR Code</h1>
//         <p>No printing. No hassle. Digital menus with QR codes – fast and simple.</p>
//         {/* <a href="/signup" className="button">Get Started Free</a> */}
//          <Link to="/create" className='button'>
//             Get Started Free
//           </Link>
//       </section>

//       {/* Features Section */}
//       <section className="features">
//         <div className="container">
//           <h2>Why Choose Us?</h2>
//           <div className="feature-list">

//             <FeatureCard
//               image="https://cdn-icons-png.flaticon.com/512/5628/5628131.png"
//               title="QR Code Generator"
//               description="Generate and download ready-to-print QR codes for your restaurant."
//             />

//             <FeatureCard
//               image="https://cdn-icons-png.flaticon.com/512/6096/6096989.png"
//               title="Live Menu Updates"
//               description="Change prices, images, or add items anytime, without reprinting menus."
//             />

//             <FeatureCard
//               image="https://cdn-icons-png.flaticon.com/512/18147/18147870.png"
//               title="Manage Multiple Stores"
//               description="Easily manage multiple restaurant branches from one account."
//             />

//           </div>
//         </div>
//       </section>

//       {/* Demo Section */}
//       <section className="demo-section">
//         <h2>Try Demo</h2>
//         <p>Scan this QR or visit the demo store</p>
//         <img
//           src="https://cdn-icons-png.flaticon.com/512/14021/14021437.png"
//           alt="Demo QR"
//           style={{ width: '100px', margin: '20px auto' }}
//         />
//         <p><a href="/store/demo" style={{ color: '#4da6ff' }}>Visit Demo Store</a></p>
//       </section>

//       {/* CTA Section */}
//       <section className="cta">
//         <h2>Ready to go digital?</h2>
//         <a href="/signup" className="button">Sign Up Now</a>
//       </section>

//       {/* Footer */}
//       <footer className="footer">
//         &copy; 2025 DigitalMenu | Built by hx
//       </footer>

//     </div>
//   );
// };

// export default App;










import React from 'react';
import { Link } from 'react-router-dom';
import FeatureCard from '../components/FeatureCard.jsx';
import demoQR from './demo-qr.png';
import './App.css';

const App = () => {
  return (
    <div style={pageStyle}>

      {/* Navbar */}
      <header style={nav}>
        <div style={logo}>🍽 DigitalMenu</div>
        <nav>
          <Link to="/create" style={navLink}>Create Store</Link>
          <Link to="/login" style={navLink}>Login</Link>
          <Link to="/signup" style={{ ...navLink, ...navCTA }}>Sign Up</Link>
        </nav>
      </header>

      {/* Hero */}
      <section style={hero}>
        <div>
          <h1 style={heroTitle}>
            Modernize Your Restaurant with <span style={highlight}>Digital Menus</span>
          </h1>
          <p style={heroSub}>
            Generate QR codes, update prices instantly — no costly reprints, no outdated menus.
          </p>
          <Link to="/create" style={primaryBtn}>🚀 Get Started Free</Link>
          <p style={smallNote}>No credit card required</p>
        </div>
      </section>

      {/* Value Proposition */}
      <section style={section}>
        <h2 style={sectionTitle}>A Better Way to Serve Your Customers</h2>
        <p style={textCenter}>
          Traditional paper menus are slow to update and expensive to maintain. 
          Digital menus with QR codes are eco-friendly, easy to update, and give customers a seamless ordering experience.
        </p>
      </section>

      {/* Features */}
      <section style={section}>
        <h2 style={sectionTitle}>Core Features</h2>
        <div style={featureGrid}>
          <FeatureCard
            image="https://cdn-icons-png.flaticon.com/512/5628/5628131.png"
            title="QR Code Generator"
            description="Generate and download printable QR codes for your restaurants."
          />
          <FeatureCard
            image="https://cdn-icons-png.flaticon.com/512/6096/6096989.png"
            title="Live Menu Updates"
            description="Instant menu updates — change prices, add items anytime."
          />
          <FeatureCard
            image="https://cdn-icons-png.flaticon.com/512/18147/18147870.png"
            title="Multi-Store Management"
            description="Easily control menus for multiple branches from one dashboard."
          />
        </div>
      </section>

      {/* How It Works */}
      <section style={altSection}>
        <h2 style={sectionTitle}>How It Works</h2>
        <div style={howGrid}>
          <div style={howCard}>
            <span style={howNum}>1</span>
            <p>Create your store & menu</p>
          </div>
          <div style={howCard}>
            <span style={howNum}>2</span>
            <p>Generate & print your QR code</p>
          </div>
          <div style={howCard}>
            <span style={howNum}>3</span>
            <p>Customers scan & order from their phone</p>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section style={section}>
        <h2 style={sectionTitle}>Try Our Demo</h2>
        <p style={demoSub}>Scan this QR or click to open demo menu</p>
        <img 
          src={demoQR} 
          alt="Demo QR"
          style={qrImg}
        />
        <p><a href="/store/demo" style={demoLink}>Visit Demo Store</a></p>
      </section>

      {/* Social Proof */}
      <section style={section}>
        <h2 style={sectionTitle}>Trusted by Restaurants Everywhere</h2>
        <p style={testimonial}>"Our customer orders increased by 30% after switching to DigitalMenu!" — Bon Appétit Cafe</p>
      </section>

      {/* Final CTA */}
      <section style={ctaSection}>
        <h2 style={ctaTitle}>Level up your restaurant today</h2>
        <Link to="/signup" style={primaryBtn}>Sign Up Now</Link>
      </section>

      {/* Footer */}
      <footer style={footer}>
        &copy; 2025 DigitalMenu | Built by hx
      </footer>

    </div>
  );
};

//
// Styles
//
const pageStyle = {
  fontFamily: "'Inter', sans-serif",
  backgroundColor: '#0e0e1a',
  color: '#fff'
};

const nav = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '20px 40px',
  alignItems: 'center',
  backgroundColor: '#0e0e1a',
  position: 'sticky',
  top: 0,
  zIndex: 10
};

const logo = { fontWeight: 'bold', fontSize: '1.2rem' };

const navLink = {
  color: '#ccc',
  marginLeft: '25px',
  textDecoration: 'none',
  fontSize: '0.95rem',
};

const navCTA = {
  backgroundColor: '#8be78b',
  color: '#000',
  padding: '8px 16px',
  borderRadius: '6px',
  fontWeight: 'bold'
};

const hero = {
  textAlign: 'center',
  padding: '100px 20px',
  background: 'linear-gradient(135deg, #1a1a2e, #0f3460)',
};

const heroTitle = { fontSize: '2.5rem', marginBottom: '15px' };
const highlight = { color: '#8be78b' };
const heroSub = { color: '#bbb', maxWidth: '600px', margin: '0 auto 30px' };
const primaryBtn = {
  display: 'inline-block',
  backgroundColor: '#8be78b',
  color: '#000',
  padding: '14px 28px',
  borderRadius: '8px',
  fontWeight: 'bold',
  fontSize: '1rem',
  textDecoration: 'none',
};

const smallNote = { fontSize: '0.85rem', color: '#888', marginTop: '8px' };

const section = { padding: '60px 20px', textAlign: 'center', maxWidth: '1100px', margin: '0 auto' };
const sectionTitle = { fontSize: '1.8rem', marginBottom: '20px' };
const textCenter = { maxWidth: '700px', margin: '0 auto', color: '#ccc' };

const featureGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '30px' };

const altSection = { ...section, backgroundColor: '#1a1a2e' };

const howGrid = { display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', marginTop: '30px' };
const howCard = { width: '200px', backgroundColor: '#12122b', padding: '20px', borderRadius: '8px', textAlign: 'center' };
const howNum = { display: 'block', fontSize: '2rem', fontWeight: 'bold', color: '#8be78b', marginBottom: '10px' };

const demoSub = { color: '#bbb', marginBottom: '20px' };
const qrImg = { width: '130px', margin: '20px auto', display: 'block' };
const demoLink = { color: '#4da6ff', fontWeight: 'bold', textDecoration: 'none' };

const testimonial = { color: '#ccc', fontStyle: 'italic', marginTop: '20px' };

const ctaSection = { backgroundColor: '#8be78b', color: '#000', padding: '50px 20px', textAlign: 'center' };
const ctaTitle = { fontSize: '1.8rem', marginBottom: '20px' };

const footer = { textAlign: 'center', padding: '20px', fontSize: '0.85rem', backgroundColor: '#12122b', color: '#888' };

export default App;
