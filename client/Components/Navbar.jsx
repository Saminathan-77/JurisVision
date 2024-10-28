import React from "react";

const Navbar = () => {
  const headerStyle = {
    backgroundColor: "rgba(1,1,1,1)",
    color: "white",
    padding: "1rem 0",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 100,
    transition: "background-color 0.3s ease",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    height: "40px", // Define a fixed height
  };

  const containerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 1rem",
    height: "100%", // Make container fill navbar height
  };

  const titleStyle = {
    fontSize: "2rem",
    fontWeight: "bold",
    margin: 0,
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    position: "relative",
    transition: "color 0.3s ease",
    padding: "0.5rem 0",
  };

  const underlineStyle = {
    position: "absolute",
    bottom: "-5px",
    left: "0",
    width: "0",
    height: "2px",
    backgroundColor: "#4299e1",
    transition: "width 0.3s ease",
  };

  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        <h1 style={titleStyle}>
          <a
            href="/"
            style={{
              ...linkStyle,
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.color = "#4299e1";
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "white";
            }}
          >
            JurisVision
          </a>
        </h1>
        <nav>
          <ul
            style={{
              display: "flex",
              gap: "1rem",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            {[
              "Login",
              "PatentAnalysis",
              "ChatBot",
              "LawyerSearch",
              "AddLawyer",
              "Detect",
            ].map((item) => (
              <li key={item}>
                <a
                  href={`/${item.toLowerCase()}`}
                  style={linkStyle}
                  onMouseEnter={(e) => {
                    e.target.style.color = "#4299e1";
                    e.target.querySelector("span").style.width = "100%";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "white";
                    e.target.querySelector("span").style.width = "0";
                  }}
                >
                  {item}
                  <span style={underlineStyle}></span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
