import React from "react";

function NotLoggedInPage() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f4f8",
        fontFamily: "'Arial', sans-serif",
      }}
    >
      <div
        style={{
          textAlign: "center",
          padding: "30px",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          maxWidth: "400px",
          width: "90%",
        }}
      >
        <h1
          style={{ color: "#2c3e50", fontSize: "24px", marginBottom: "20px" }}
        >
          You're Not Logged In
        </h1>
        <p style={{ color: "#7f8c8d", fontSize: "16px", marginBottom: "30px" }}>
          Please log in to access the chat. Click the button below to go to the
          login page.
        </p>
        <a
          href="https://chatting-app-m9df.onrender.com/"
          style={{
            display: "inline-block",
            padding: "10px 20px",
            backgroundColor: "#3498db",
            color: "#ffffff",
            textDecoration: "none",
            borderRadius: "5px",
            fontSize: "16px",
            fontWeight: "bold",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#2980b9")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#3498db")}
        >
          Go to Login
        </a>
      </div>
    </div>
  );
}

export default NotLoggedInPage;
