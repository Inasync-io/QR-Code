import React, { useState } from "react";
import "./qrCode.css";

const QrCode = () => {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrData, setQrData] = useState("");
  const [qrSize, setQrSize] = useState("");

  async function geberateQR() {
    setLoading(true);
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
      setImg(url);
    } catch (error) {
      console.log("Error generating QR code", error);
    } finally {
      setLoading(false);
    }
  }

  function downloadQR(){
    fetch(img).then((Response) => Response.blob()).then((blob) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "qrcode.png"
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }).catch((error) => {
      console.log("Error downloading QR code", error);
      
    })
  }

  return (
    <div>
      <div className="container">
        <h2>QR CODE GENERATOR</h2>
        {loading && <p>Please wait...</p>}
        {img && <img src={img} alt="" className="qr__code-img" />}
        <div>
          <label htmlFor="dataInput" className="input__label">
            Data for QR code
          </label>
          <input type="text" id="dataInput" value={qrData} placeholder="Enter data for QR code" required onChange={(e) => setQrData(e.target.value)} />

          <label htmlFor="dataInput" className="input__label">
            Image Size (Eg., 150);
          </label>
          <input type="text" id="dataInput" value={qrSize} placeholder="Enter image size" required onChange={(e) => setQrSize(e.target.value)} />

          <button className="generate__btn" disabled = {loading} onClick={geberateQR}>Generate QR Code</button>
          <button className="download__btn" onClick={downloadQR}>Download QR Code</button>
        </div>

        <p className="footer">Designed By <span>Inasync-io</span></p>
      </div>
    </div>
  );
};

export default QrCode;
