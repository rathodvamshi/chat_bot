import React, { useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Chat from './Chat';
import Inputs from './inputs';
import './App.css'; // Corrected from APP.css to match the actual file name

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  return (
    <div className="App">
      {/* Enhanced Navbar */}
      <nav className="navbar animate-navbar">
        <div className="nav-logo gradient-text">AI Hub</div>
        <button className="nav-toggle" onClick={toggleNav}>
          {isNavOpen ? '✕' : '☰'}
        </button>
        <ul className={`nav-links ${isNavOpen ? 'active' : ''}`}>
          <li><Link to="/" className="nav-link hover-effect" onClick={closeNav}>Home</Link></li>
          <li><a href="#tools" className="nav-link hover-effect" onClick={closeNav}>AI Tools</a></li>
          <li><a href="#chat" className="nav-link hover-effect" onClick={closeNav}>Chat</a></li>
          <li><a href="#about" className="nav-link hover-effect" onClick={closeNav}>About</a></li>
          <li><Link to="/inputs" className="nav-link hover-effect" onClick={closeNav}>Chat-Inputs</Link></li>
        </ul>
      </nav>

      {/* Routes */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              {/* Enhanced Home Section */}
              <header className="header" id="home">
                <div className="hero-content animate-fade-in">
                  <h1 className="header-title gradient-text">Welcome to AI Hub</h1>
                  <p className="header-subtitle">Unleash Creativity with Cutting-Edge AI Technology</p>
                  <button
  style={{
    marginTop:"15px",
    padding: "1rem 2rem",
    fontSize: "1.2rem",
    border: "none",
    borderRadius: "25px",
    background: "linear-gradient(135deg, #ff5e62, #4facfe)",
    color: "white",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 5px 15px rgba(255, 94, 98, 0.4)",
    animation: "pulse 1.5s infinite"
  }}
  onMouseOver={(e) => {
    e.currentTarget.style.transform = "scale(1.05)";
    e.currentTarget.style.boxShadow = "0 8px 20px rgba(255, 94, 98, 0.5)";
    e.currentTarget.style.background = "linear-gradient(135deg, #ff8789, #66c2ff)";
  }}
  onMouseOut={(e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "0 5px 15px rgba(255, 94, 98, 0.4)";
    e.currentTarget.style.background = "linear-gradient(135deg, #ff5e62, #4facfe)";
  }}
>
  Explore Now
</button>
                </div>
                <div className="hero-background">
                  <div className="particle-effect"></div>
                </div>
              </header>

              {/* AI Tools Section */}
              <section className="ai-tools" id="tools">
                <h2 className="section-title animate-slide-up">Our AI Tools</h2>
                <div className="tools-container">
                  <div className="tool-card animate-card">
                    <span className="tool-logo">✍️</span>
                    <h3>Text Generator</h3>
                    <p>Generate creative content, stories, and articles with AI precision</p>
                    <button
  style={{
    marginTop: "1rem",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "20px",
    background: "linear-gradient(135deg, #ff5e62, #4facfe)", // Changed from solid color to gradient
    color: "white",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontSize: "1rem", // Added for consistency
    boxShadow: "0 3px 10px rgba(255, 94, 98, 0.3)", // Adapted from your CSS
    animation: "bounce 1s infinite" // New bounce animation
  }}
  onMouseOver={(e) => {
    e.currentTarget.style.transform = "translateY(-3px)";
    e.currentTarget.style.boxShadow = "0 5px 15px rgba(255, 94, 98, 0.4)";
    e.currentTarget.style.background = "linear-gradient(135deg, #ff8789, #66c2ff)";
  }}
  onMouseOut={(e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 3px 10px rgba(255, 94, 98, 0.3)";
    e.currentTarget.style.background = "linear-gradient(135deg, #ff5e62, #4facfe)";
  }}
>
  Try Now
</button>
                  </div>
                  <div className="tool-card animate-card">
                    <span className="tool-logo">🖼️</span>
                    <h3>Image Analyzer</h3>
                    <p>Extract insights and details from images using advanced AI</p>
                    <button
  style={{
    marginTop: "1rem",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "20px",
    background: "linear-gradient(135deg, #ff5e62, #4facfe)", // Changed from solid color to gradient
    color: "white",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontSize: "1rem", // Added for consistency
    boxShadow: "0 3px 10px rgba(255, 94, 98, 0.3)", // Adapted from your CSS
    animation: "bounce 1s infinite" // New bounce animation
  }}
  onMouseOver={(e) => {
    e.currentTarget.style.transform = "translateY(-3px)";
    e.currentTarget.style.boxShadow = "0 5px 15px rgba(255, 94, 98, 0.4)";
    e.currentTarget.style.background = "linear-gradient(135deg, #ff8789, #66c2ff)";
  }}
  onMouseOut={(e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 3px 10px rgba(255, 94, 98, 0.3)";
    e.currentTarget.style.background = "linear-gradient(135deg, #ff5e62, #4facfe)";
  }}
>
  Try Now
</button>
                  </div>
                  <div className="tool-card animate-card">
                    <span className="tool-logo">💬</span>
                    <h3>Chat Bot</h3>
                    <p>Engage in smart, contextual conversations anytime</p>
                    <button
  style={{
    marginTop: "1rem",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "20px",
    background: "linear-gradient(135deg, #ff5e62, #4facfe)", // Changed from solid color to gradient
    color: "white",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontSize: "1rem", // Added for consistency
    boxShadow: "0 3px 10px rgba(255, 94, 98, 0.3)", // Adapted from your CSS
    animation: "bounce 1s infinite" // New bounce animation
  }}
  onMouseOver={(e) => {
    e.currentTarget.style.transform = "translateY(-3px)";
    e.currentTarget.style.boxShadow = "0 5px 15px rgba(255, 94, 98, 0.4)";
    e.currentTarget.style.background = "linear-gradient(135deg, #ff8789, #66c2ff)";
  }}
  onMouseOut={(e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 3px 10px rgba(255, 94, 98, 0.3)";
    e.currentTarget.style.background = "linear-gradient(135deg, #ff5e62, #4facfe)";
  }}
>
  Try Now
</button>
                  </div>
                </div>
              </section>

              {/* Chat Section */}
              <section className="chat-section" id="chat">
                <h2 className="section-title animate-slide-up">Experience AI Chat</h2>
                <p className="section-subtitle">
                  Interact with our intelligent chatbot - available 24/7!
                </p>
                <div className="chat-preview animate-fade-in">
                  <p>"Ask me anything - I'm powered by advanced AI!"</p>
                </div>
              </section>

              {/* About Section */}
              <section className="about-section" id="about">
                <h2 className="section-title animate-slide-up">About AI Hub</h2>
                <div className="about-content">
                  <p>
                    AI Hub is your gateway to the future, combining state-of-the-art artificial intelligence
                    with user-friendly tools to spark creativity and innovation.
                  </p>
                  <p>
                    Founded in 2025, our mission is to make AI accessible to everyone, from creators to businesses.
                  </p>
                </div>
              </section>

              {/* Enhanced Footer */}
              <footer className="footer">
                <div className="footer-content animate-fade-in">
                  <p>© 2025 AI Hub. All rights reserved.</p>
                  <div className="footer-links">
                    <a href="#privacy" className="footer-link">Privacy</a>
                    <a href="#terms" className="footer-link">Terms</a>
                    <a href="#contact" className="footer-link">Contact</a>
                  </div>
                  <div className="social-icons">
                    <a href="#" className="social-icon">ツ</a>
                    <a href="#" className="social-icon">✆</a>
                    <a href="#" className="social-icon">✉</a>
                  </div>
                </div>
              </footer>
            </>
          }
        />
        <Route path="/inputs" element={<Inputs />} />
      </Routes>

      {/* Constant Chat Widget */}
      <Chat />
    </div>
  );
}

export default App;