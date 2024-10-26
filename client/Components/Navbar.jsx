// Navbar.js
import React from "react";

const Navbar = () => {
  return (
    <header
      style={{
        backgroundColor: "rgba(26, 54, 93, 0.9)",
        color: "white",
        padding: "1rem 0",
        position: "fixed",
        width: "100%",
        zIndex: 1000,
        transition: "background-color 0.3s ease",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>JurisVision</h1>
        <nav>
          <ul style={{ display: "flex", gap: "2rem", listStyle: "none" }}>
            {["PatentAnalysis", "ChatBot", "Login", "LawyerSearch"].map(
              (item) => (
                <li key={item}>
                  <a
                    href={`/${item.toLowerCase()}`}
                    style={{
                      color: "white",
                      textDecoration: "none",
                      position: "relative",
                      transition: "color 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "#4299e1";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "white";
                    }}
                  >
                    {item}
                    <span
                      style={{
                        position: "absolute",
                        bottom: "-5px",
                        left: "0",
                        width: "0",
                        height: "2px",
                        backgroundColor: "#4299e1",
                        transition: "width 0.3s ease",
                      }}
                    ></span>
                  </a>
                </li>
              )
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
