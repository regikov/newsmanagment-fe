"use client"; 

import "bootstrap/dist/css/bootstrap.min.css"; 
import "./globals.css"; 
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const loadBootstrap = async () => {
      try {
        await import("bootstrap/dist/js/bootstrap.bundle.min.js");
      } catch (err) {
        console.error("Failed to load Bootstrap JS:", err);
      }
    };
    loadBootstrap();
  }, []);

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
