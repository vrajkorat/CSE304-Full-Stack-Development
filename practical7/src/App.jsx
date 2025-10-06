import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Close sidebar on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close sidebar on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Navigation items
  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  const goTo = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <div className="container">
      {/* Hamburger Button (only on mobile) */}
      <button className="hamburger" onClick={() => setIsOpen(true)}>
        ☰
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : ""}`} ref={sidebarRef}>
        <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
        <nav>
          {navItems.map((item) => (
            <button key={item.id} onClick={() => goTo(item.id)} className="nav-link">
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <main className="main">
        <section id="home" className="section">
          <h1>Welcome to My Website</h1>
          <p>This is the main content of the webpage.</p>
        </section>

        <section id="about" className="section">
          <h2>About</h2>
          <p>This is the About section content.</p>
        </section>

        <section id="contact" className="section">
          <h2>Contact</h2>
          <p>This is the Contact section content.</p>
        </section>
      </main>
    </div>
  );
}

export default App;
