
import React, { useRef, useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { FaQrcode } from "react-icons/fa";

export default function ScanQrPage() {
  const [scanResult, setScanResult] = useState("");
  const [error, setError] = useState("");
  const [scanning, setScanning] = useState(false);
  const qrRef = useRef(null);

  const handleScan = (data: string) => {
    if (data) {
      // If it's a link, navigate directly
      if (data.startsWith("http") || data.startsWith("upi://pay")) {
        window.location.href = data;
        return;
      }
      setScanResult(data);
      setScanning(false);
    }
  };

  const handleError = (err: any) => {
    setError("Camera error: " + (err?.message || err));
    setScanning(false);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-blue-100 ">
          <div className="bg-white  rounded-2xl shadow-lg p-2 h-[85vh]  w-full max-w-md flex flex-col items-center">
        <h1 className=" text-2xl font-bold text-pink-700 mb-2 flex items-center gap-2">
          <FaQrcode className="text-3xl" /> Scan QR Code
        </h1>
        <p className="text-gray-500 mb-4 text-center">
          Point your camera at a QR code to scan payment, profile, or any supported link.
        </p>
        {(!scanResult) && (
          <div className="w-full flex flex-col items-center">
            <Scanner
              onScan={(codes) => {
                if (codes && codes.length > 0) {
                  handleScan(codes[0].rawValue);
                }
              }}
              onError={handleError}
              constraints={{ facingMode: 'environment' }}
            />
          </div>
        )}
        {scanResult && (
          <div className="mt-4 w-full bg-green-50 border border-green-300 rounded-lg p-3 text-center">
            <div className="text-green-700 font-semibold mb-2">Scan Result:</div>
            <div className="break-all text-gray-800 text-sm">{scanResult}</div>
            {scanResult.startsWith("http") && (
              <a
                href={scanResult}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-2 text-blue-600 underline"
              >
                Open Link
              </a>
            )}
            {scanResult.startsWith("upi://pay") && (
              <a
                href={scanResult}
                className="block mt-2 text-pink-600 underline font-bold"
              >
                Pay via UPI
              </a>
            )}
            <button
              className="mt-4 bg-pink-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-pink-700 transition"
              onClick={() => {
                setScanResult("");
                setError("");
                setScanning(true);
              }}
            >
              Re-Scan
            </button>
          </div>
        )}
        {error && (
          <div className="mt-4 w-full bg-red-50 border border-red-300 rounded-lg p-3 text-center text-red-700">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
