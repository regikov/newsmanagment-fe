"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <header className="bg-white border-bottom">
      <div className="scale-container">
        <div className="container d-flex justify-content-between align-items-center">
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
          <nav className="d-flex gap-4 align-items-center">
            {/* Manager Dropdown */}
            <div className="dropdown">
              <button
                className="dropdown-toggle"
                type="button"
                id="managerDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Manager
              </button>
              <ul className="dropdown-menu" aria-labelledby="managerDropdown">
                <li>
                  <Link href="/manage-articles" className="dropdown-item">
                    Article Manager
                  </Link>
                </li>
                <li>
                  <Link href="/manage-topics" className="dropdown-item">
                    Topic Manager
                  </Link>
                </li>
                <li>
                  <Link href="/article-manager" className="dropdown-item">
                    Author Manager
                  </Link>
                </li>
              </ul>
            </div>

            {/* Other Links */}
            <Link href="/analytics" className="nav-link-custom">
              Analytics
            </Link>
            <Link href="/preview" className="nav-link-custom">
              User Preview
            </Link>

            {/* Search Bar */}
            <form className="d-flex" onSubmit={handleSearch}>
              <input
                type="text"
                className="form-control me-2"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </form>
          </nav>
        </div>
      </div>
    </header>
  );
}
