// import React, { useState } from "react";

// const Signup = ({ toggleForm }) => {

//     const [name, setName] = useState();
//     const [email, setEmail] = useState();
//     const [password, setPassword] = useState();
//     const [pic, setPic] = useState();
//   return (
//     <div>
//       <h2>Sign Up</h2>
//       <form>
//         <div style={{ marginBottom: "15px", paddingRight: "10px" }}>
//           <label htmlFor="name">Name:</label>
//           <input
//             id="name" // Associate the label with this input
//             type="text"
//             placeholder="Enter your name"
//             required
//             style={{ width: "100%", padding: "8px" }}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>
//         <div style={{ marginBottom: "15px", paddingRight: "10px" }}>
//           <label htmlFor="email">Email:</label>
//           <input
//             id="email"
//             type="email"
//             placeholder="Enter your email"
//             required
//             style={{ width: "100%", padding: "8px" }}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <div style={{ marginBottom: "15px", paddingRight: "10px" }}>
//           <label htmlFor="password">Password:</label>
//           <input
//             id="password"
//             type="password"
//             placeholder="Enter your password"
//             required
//             style={{ width: "100%", padding: "8px" }}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <div style={{ marginBottom: "15px", paddingRight: "10px" }}>
//           <label htmlFor="picture">Picture:</label>
//           <input
//             id="picture"
//             type="file"
//             accept="image/*" // Restricts to image files only
//             style={{ width: "100%", padding: "8px" }}
//             onChange={(e) => setPic(e.target.value)}
//           />
//         </div>

//         <button
//           type="submit"
//           style={{
//             width: "100%",
//             padding: "10px",
//             background: "#28A745",
//             color: "white",
//             border: "none",
//             borderRadius: "5px",
//           }}
//         >
//           Sign Up
//         </button>
//       </form>
//       <p style={{ marginTop: "10px", textAlign: "center" }}>
//         Already have an account?{" "}
//         <span
//           style={{ color: "#007BFF", cursor: "pointer" }}
//           onClick={toggleForm}
//         >
//           Login
//         </span>
//       </p>
//     </div>
//   );
// };

// export default Signup;
import React, { useState } from "react";

const Signup = ({ toggleForm }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form>
        <div style={{ marginBottom: "15px", paddingRight: "10px" }}>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            required
            style={{ width: "100%", padding: "8px" }}
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
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "15px", paddingRight: "10px" }}>
          <label htmlFor="password">Password:</label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              id="password"
              type={showPassword ? "text" : "password"} // Toggle between text and password
              placeholder="Enter your password"
              required
              style={{ width: "calc(100% - 60px)", padding: "8px" }} // Adjust width to fit button
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
        <div style={{ marginBottom: "15px", paddingRight: "10px" }}>
          <label htmlFor="picture">Picture:</label>
          <input
            id="picture"
            type="file"
            accept="image/*"
            style={{ width: "100%", padding: "8px" }}
            onChange={(e) => setPic(e.target.value)}
          />
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
            cursor: "pointer",
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
