// import React from "react";

// const Login = ({ toggleForm }) => {
//   return (
//     <div>
//       <h2>Login</h2>
//       <form>
//         <div style={{ marginBottom: "15px", paddingRight:"10px"}}>
//           <label>Name:</label>
//           <input
//             type="text"
//             placeholder="Enter your name"
//             required
//             style={{ width: "100%", padding: "8px" }}
//           />
//         </div>
//         <div style={{ marginBottom: "15px",paddingRight:"10px"}}>
//           <label>Email:</label>
//           <input
//             type="email"
//             placeholder="Enter your email"
//             required
//             style={{ width: "100%", padding: "8px" }}
//           />
//         </div>
//         <div style={{ marginBottom: "15px" ,paddingRight:"10px"}}>
//           <label>Password:</label>
//           <input
//             type="password"
//             placeholder="Enter your password"
//             required
//             style={{ width: "100%", padding: "8px" }}
//           />
//         </div>
//         <button
//           type="submit"
//           style={{
//             width: "100%",
//             padding: "10px",
//             background: "#007BFF",
//             color: "white",
//             border: "none",
//             borderRadius: "5px",
//           }}
//         >
//           Login
//         </button>
//       </form>
//       <p style={{ marginTop: "10px", textAlign: "center" }}>
//         Don't have an account?{" "}
//         <span
//           style={{ color: "#007BFF", cursor: "pointer" }}
//           onClick={toggleForm}
//         >
//           Sign up
//         </span>
//       </p>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";

const Login = ({ toggleForm }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log({ name, email, password }); // Handle login logic here
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "15px", paddingRight: "10px" }}>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            required
            style={{ width: "100%", padding: "8px" }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "15px", paddingRight: "10px" }}>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            required
            style={{ width: "100%", padding: "8px" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "15px", paddingRight: "10px" }}>
          <label htmlFor="password">Password:</label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              id="password"
              type={showPassword ? "text" : "password"} // Toggle password visibility
              placeholder="Enter your password"
              required
              style={{ width: "calc(100% - 60px)", padding: "8px" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              style={{
                marginLeft: "10px",
                padding: "8px",
                background: "#007BFF",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            background: "#007BFF",
            color: "white",
            border: "none",
              borderRadius: "5px",
            cursor:"pointer"
          }}
        >
          Login
        </button>
      </form>
      <p style={{ marginTop: "10px", textAlign: "center" }}>
        Don't have an account?{" "}
        <span
          style={{ color: "#007BFF", cursor: "pointer" }}
          onClick={toggleForm}
        >
          Sign up
        </span>
      </p>
    </div>
  );
};

export default Login;
