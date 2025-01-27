"use client";

import Link from "next/link";
import { useEffect } from "react";
import { FaLaptop, FaTabletAlt, FaMobileAlt } from "react-icons/fa";
import "../styles/preview.css";
import "../globals.css";
import Header from "@/components/Header";

export default function ContentDashboardPreview() {
  const devices = [
    {
      name: "Laptop",
      icon: <FaLaptop size={40} color="#4a90e2" />,
      resolution: "1920x1080",
      link: "/content-web",
    },
    {
      name: "Tablet",
      icon: <FaTabletAlt size={40} color="#4a90e2" />,
      resolution: "768x1024",
      link: "/content-tablet",
    },
    {
      name: "Phone",
      icon: <FaMobileAlt size={40} color="#4a90e2" />,
      resolution: "375x667",
      link: "/content-mobile",
    },
  ];

  useEffect(() => {
    document.body.style.transform = "none";
    document.body.style.width = "auto"; 
    document.body.style.height = "auto"; 
  }, []);

  return (
    <div>
      <Header />
      <div className="scale-container">
        <div className="content-dashboard-preview">
          <div className="dashboard-container">
            <h1>User Preview</h1>
            <h2 className="subtitle">Choose a resolution:</h2>
          </div>
          <div className="device-box-container">
            {devices.map((device) => (
              <div key={device.name} className="device-box">
                <div className="icon">{device.icon}</div>
                <h2 className="device-name">{device.name}</h2>
                <p className="resolution">Resolution: {device.resolution}</p>
                <Link href={device.link} className="view-button">
                  View on {device.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
