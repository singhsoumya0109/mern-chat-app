// // import React from 'react'

// // const Homepage = () => {
// //   return (
// //     <div>
// //           <div class="heading-home">
// //               Chatting app
              
// //           </div>
// //     </div>
// //   );
// // }

// // export default Homepage
// import React, { useState } from "react";

// const Homepage = () => {
//   const [showLogin, setShowLogin] = useState(true);

//   const toggleForm = () => {
//     setShowLogin(!showLogin);
//   };

//   return (
//     <div>
//       <div
//         className="heading-home"
//         style={{ textAlign: "center", margin: "20px" }}
//       >
//         <h1>Chatting App</h1>
//       </div>

//       <div
//         style={{
//           maxWidth: "400px",
//           margin: "auto",
//           padding: "20px",
//           border: "1px solid #ccc",
//           borderRadius: "8px",
//         }}
//       >
//         {showLogin ? (
//           <>
//             <h2>Login</h2>
//             <form>
//               <div style={{ marginBottom: "15px" }}>
//                 <label>Name:</label>
//                 <input
//                   type="text"
//                   placeholder="Enter your name"
//                   required
//                   style={{ width: "100%", padding: "8px" }}
//                 />
//               </div>
//               <div style={{ marginBottom: "15px" }}>
//                 <label>Email:</label>
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   required
//                   style={{ width: "100%", padding: "8px" }}
//                 />
//               </div>
//               <div style={{ marginBottom: "15px" }}>
//                 <label>Password:</label>
//                 <input
//                   type="password"
//                   placeholder="Enter your password"
//                   required
//                   style={{ width: "100%", padding: "8px" }}
//                 />
//               </div>
//               <button
//                 type="submit"
//                 style={{
//                   width: "100%",
//                   padding: "10px",
//                   background: "#007BFF",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "5px",
//                 }}
//               >
//                 Login
//               </button>
//             </form>
//             <p style={{ marginTop: "10px", textAlign: "center" }}>
//               Don't have an account?{" "}
//               <span
//                 style={{ color: "#007BFF", cursor: "pointer" }}
//                 onClick={toggleForm}
//               >
//                 Sign up
//               </span>
//             </p>
//           </>
//         ) : (
//           <>
//             <h2>Sign Up</h2>
//             <form>
//               <div style={{ marginBottom: "15px" }}>
//                 <label>Name:</label>
//                 <input
//                   type="text"
//                   placeholder="Enter your name"
//                   required
//                   style={{ width: "100%", padding: "8px" }}
//                 />
//               </div>
//               <div style={{ marginBottom: "15px" }}>
//                 <label>Email:</label>
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   required
//                   style={{ width: "100%", padding: "8px" }}
//                 />
//               </div>
//               <div style={{ marginBottom: "15px" }}>
//                 <label>Password:</label>
//                 <input
//                   type="password"
//                   placeholder="Enter your password"
//                   required
//                   style={{ width: "100%", padding: "8px" }}
//                 />
//               </div>
//               <div style={{ marginBottom: "15px" }}>
//                 <label>Picture:</label>
//                 <input type="file" style={{ width: "100%", padding: "8px" }} />
//               </div>
//               <button
//                 type="submit"
//                 style={{
//                   width: "100%",
//                   padding: "10px",
//                   background: "#28A745",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "5px",
//                 }}
//               >
//                 Sign Up
//               </button>
//             </form>
//             <p style={{ marginTop: "10px", textAlign: "center" }}>
//               Already have an account?{" "}
//               <span
//                 style={{ color: "#007BFF", cursor: "pointer" }}
//                 onClick={toggleForm}
//               >
//                 Login
//               </span>
//             </p>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Homepage;
// import React, { useState,useEffect} from "react";
// import Login from "./Login";
// import Signup from "./Signup";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// const Homepage = () => {
//   const history = useHistory();
//       useEffect(() => {
//         const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//           if (userInfo) {
//               history.push("/");
//           }
//       }, [history]);
//   const [showLogin, setShowLogin] = useState(true);
//   const toggleForm = () => {
//     setShowLogin(!showLogin);
//   };

//   return (
//     <div>
//       <div
//         className="heading-home"
//         style={{ textAlign: "center", margin: "20px" }}
//       >
//         <h1>Chatting App</h1>
//       </div>

//       <div
//         style={{
//           maxWidth: "400px",
//           margin: "auto",
//           padding: "20px",
//           border: "1px solid #ccc",
//           borderRadius: "8px",
//         }}
//       >
//         {showLogin ? (
//           <Login toggleForm={toggleForm} />
//         ) : (
//           <Signup toggleForm={toggleForm} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Homepage;


import React, { useState, useEffect } from "react";
import Login from "./Login";
import Signup from "./Signup";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Homepage = () => {
  const history = useHistory();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      //history.push("/chats");
    }
  }, [history]);

  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div>
      <div
        className="heading-home"
        style={{ textAlign: "center", margin: "20px" }}
      >
        <h1>Chatting App</h1>
      </div>

      <div
        style={{
          maxWidth: "400px",
          margin: "auto",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        {showLogin ? (
          <Login toggleForm={toggleForm} />
        ) : (
          <Signup toggleForm={toggleForm} />
        )}
      </div>
    </div>
  );
};

export default Homepage;
