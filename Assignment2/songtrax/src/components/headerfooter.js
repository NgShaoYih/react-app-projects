import React from "react";
import '../App.css';
import { Link } from "react-router-dom";

/**
 * This is the Header Component
 * @returns header component
 */
function Header() {
  return (
    <header class="page-header">
            <div class="header-logo">
                <h2>
                    <a href="/" class="header-icon-link">SongTrax</a>
                </h2>
            </div>
            <div class="header-app-description">
                <span>Create & Share Location Based Music Samples!</span>
            </div>
     </header>
  );
}

/**
 * This is the footer component
 * @returns footer component
 */
function Footer() {
  return (
    <footer class="page-footer"></footer>
  );
}

/**
 * Combines both header and footer into one component
 * @param {*} children 
 * @returns HeaderFooter component
 */
function HeaderFooter({ children }) {
  return (
    <div className="app">
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default HeaderFooter;
