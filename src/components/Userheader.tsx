"use client";
import Link from "next/link";

export default function Userheader() {
  return (
    <header className="bg-white border-bottom">
      <div className="scale-container">
        <div className="container">
          {/* AxelNews logo */}
          <Link href="/">
            <img
              src="/pictures/logo.png"
              alt="AxelNews Logo"
              className="logo"
              style={{ cursor: "pointer" }} 
            />
          </Link>
          {/* Navigation */}
          <nav className="d-flex gap-4">
            {/* Manager Dropdown */}

            {/* Other Links */}
            <Link href="/analytics" className="nav-link-custom">
              LogIn 
            </Link>
            <Link href="/preview" className="nav-link-custom">
              Subscribe
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
