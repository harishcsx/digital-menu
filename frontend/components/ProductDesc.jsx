import { useState } from 'react';
import "../src/index.css"

export function ProductDesc({ count, onDone }) {
  const [imgFile, setImgFile] = useState(null);
  const [imgUrl, setImgUrl] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [uploading, setUploading] = useState(false);

  async function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    setImgFile(file);
    setUploading(true);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "productd_images_digimemu");
    data.append("cloud_name", "du2lhyj4o");

    const res = await fetch("https://api.cloudinary.com/v1_1/du2lhyj4o/image/upload", {
      method: "POST",
      body: data
    });

    const uploadImageUrl = await res.json();
    setImgUrl(uploadImageUrl.url);
    setUploading(false);
  }

  function handleDone() {
    if (!title || !price) {
      alert("Please enter product title and price.");
      return;
    }
    onDone({
      product_no: count,
      imageUrl: imgUrl, // send Cloudinary URL
      title,
      price
    });
  }

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>Product {count}</h3>
      <label style={fileInputLabelStyle}>
        Choose Product Image
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />
      </label>
      {/* Image Preview */}
      {imgFile && (
        <img
          src={imgUrl || URL.createObjectURL(imgFile)}
          alt="Product Preview"
          style={{ width: '100%', borderRadius: '8px', margin: '10px 0' }}
        />
      )}
      {uploading && <div style={{ color: "#8be78b" }}>Uploading...</div>}
      <input
        type="text"
        placeholder="Product Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={inputStyle}
      />
      <input
        type="text"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={inputStyle}
      />
      <button onClick={handleDone} style={buttonStyle} disabled={uploading || !imgUrl}>
        Done
      </button>
    </div>
  );
}

// ...styles unchanged...

const containerStyle = {
  backgroundColor: '#1a1a2e',
  padding: '20px',
  borderRadius: '12px',
  maxWidth: '90%',
  margin: '20px auto',
  boxSizing: 'border-box',
  textAlign: 'center'
};

const titleStyle = {
  color: '#8be78b',
  marginBottom: '15px'
};

const inputStyle = {
  display: 'block',
  width: '100%',
  padding: '10px',
  marginBottom: '12px',
  borderRadius: '8px',
  border: 'none',
  backgroundColor: '#2a2a40',
  color: '#f0f0f0',
  boxSizing: 'border-box'
};

const buttonStyle = {
  width: '100%',
  padding: '12px',
  backgroundColor: '#8be78b',
  color: '#1a1a2e',
  fontWeight: 'bold',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer'
};

const fileInputLabelStyle = {
  display: 'block',
  backgroundColor: '#8be78b',
  color: '#1a1a2e',
  fontWeight: 'bold',
  padding: '10px',
  borderRadius: '8px',
  cursor: 'pointer',
  marginBottom: '12px'
};
