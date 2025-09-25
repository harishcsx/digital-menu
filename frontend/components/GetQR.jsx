import { useParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

export const Getqr = () => {
  
  const { storeName } = useParams();
  const url = `https://scan-digimenu.vercel.app/store/${storeName}`;

  function handleDownload() {
    const canvas = document.getElementById("qr-gen");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${storeName}-qr.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #23243a 0%, #1a1a2e 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#18192b",
          borderRadius: "18px",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          padding: "32px 24px",
          maxWidth: "350px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            color: "#8be78b",
            fontWeight: "bold",
            marginBottom: "18px",
            fontSize: "1.5rem",
            letterSpacing: "1px",
          }}
        >
          QR Code for <span style={{ color: "#fff" }}>{storeName}</span>
        </h2>
        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            display: "inline-block",
            padding: "16px",
            marginBottom: "18px",
          }}
        >
          <QRCodeCanvas id="qr-gen" value={url} size={200} />
        </div>
        <div>
          <button
            onClick={handleDownload}
            style={{
              marginTop: "10px",
              padding: "10px 24px",
              background: "#8be78b",
              color: "#1a1a2e",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1rem",
              transition: "background 0.2s",
              boxShadow: "0 2px 8px rgba(139,231,139,0.08)",
            }}
          >
            Download QR
          </button>
        </div>
        <p
          style={{
            marginTop: "18px",
            color: "#aaa",
            fontSize: "0.95rem",
            wordBreak: "break-all",
            background: "#23243a",
            borderRadius: "6px",
            padding: "8px",
            marginBottom: 0,
          }}
        >
          {url}
        </p>
      </div>
    </div>
  );

};
