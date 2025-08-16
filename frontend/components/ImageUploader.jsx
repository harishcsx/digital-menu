import { useState } from 'react';

export function ImageUpload({ onUpload }) {
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  async function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'YOUR_UPLOAD_PRESET'); // Replace with your Cloudinary upload preset

    const res = await fetch(`https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload`, {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    onUpload(data.secure_url); // Send image URL back to parent component
    setUploading(false);
  }

  return (
    <div style={{ marginBottom: '20px' }}>
      {preview && <img src={preview} alt="Preview" style={{ width: '200px', borderRadius: '8px' }} />}
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {uploading && <p style={{ color: 'white' }}>Uploading...</p>}
    </div>
  );
}
