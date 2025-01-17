import React from "react";

const Signup = ({ toggleForm }) => {
  return (
    <div>
      <h2>Sign Up</h2>
      <form>
        <div style={{ marginBottom: "15px" }}>
          <label>Name:</label>
          <input
            type="text"
            placeholder="Enter your name"
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Picture:</label>
          <input type="file" style={{ width: "100%", padding: "8px" }} />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            background: "#28A745",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Sign Up
        </button>
      </form>
      <p style={{ marginTop: "10px", textAlign: "center" }}>
        Already have an account?{" "}
        <span
          style={{ color: "#007BFF", cursor: "pointer" }}
          onClick={toggleForm}
        >
          Login
        </span>
      </p>
    </div>
  );
};

export default Signup;
