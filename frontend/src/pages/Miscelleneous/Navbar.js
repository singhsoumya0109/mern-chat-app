// import React from 'react'
// import { useState } from 'react'
// const Navbar = () => {
//     const [search, setSearch] = useState("");
//     const [searchResult, setsearchResult] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [loadingChat, setLoadingChat] = useState();
//   return (
//     <div>
        
//     </div>
//   )
// }

// export default Navbar;


// import React, { useState } from "react";

// const Navbar = ({ user }) => {
//   const [search, setSearch] = useState("");
//   const [searchResult, setsearchResult] = useState([]);
//       const [loading, setLoading] = useState(false);
//       const [loadingChat, setLoadingChat] = useState();
//   const handleSearch = () => {
//     console.log("Searching for:", search);
//     // Add search logic here
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         padding: "10px 20px",
//         backgroundColor: "#f8f9fa",
//         borderBottom: "1px solid #ccc",
//       }}
//     >
//       {/* Search Section */}
//       <div style={{ display: "flex", alignItems: "center" }}>
//         <input
//           type="text"
//           placeholder="Search..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           style={{
//             padding: "5px 10px",
//             borderRadius: "4px",
//             border: "1px solid #ccc",
//             marginRight: "10px",
//           }}
//         />
//         <button
//           onClick={handleSearch}
//           style={{
//             backgroundColor: "#007bff",
//             color: "#fff",
//             padding: "5px 10px",
//             border: "none",
//             borderRadius: "4px",
//             cursor: "pointer",
//           }}
//         >
//           🔍
//         </button>
//       </div>

//       {/* Title Section */}
//       <div>
//         <h2 style={{ margin: "0", fontSize: "24px", fontWeight: "bold" }}>
//           Chatting App
//         </h2>
//       </div>

//       {/* User Section */}
//       <div>
//         <span
//           style={{
//             fontSize: "16px",
//             fontWeight: "500",
//             color: "#555",
//           }}
//         >
//           {user?.name || "Guest"}
//         </span>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
// import React, { useState } from "react";
// import { ChatState } from "../../context/ChatProvider"; // Import ChatState to get user details from context

// const Navbar = () => {
//   const { user } = ChatState(); // Extract user from context
//   const [search, setSearch] = useState("");
//   const [searchResult, setSearchResult] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [loadingChat, setLoadingChat] = useState();

//   const handleSearch = () => {
//     console.log("Searching for:", search);
//     // Add search logic here
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         padding: "10px 20px",
//         backgroundColor: "#f8f9fa",
//         borderBottom: "1px solid #ccc",
//       }}
//     >
//       {/* Search Section */}
//       <div style={{ display: "flex", alignItems: "center" }}>
//         <input
//           type="text"
//           placeholder="Search..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           style={{
//             padding: "5px 10px",
//             borderRadius: "4px",
//             border: "1px solid #ccc",
//             marginRight: "10px",
//           }}
//         />
//         <button
//           onClick={handleSearch}
//           style={{
//             backgroundColor: "#007bff",
//             color: "#fff",
//             padding: "5px 10px",
//             border: "none",
//             borderRadius: "4px",
//             cursor: "pointer",
//           }}
//         >
//           🔍
//         </button>
//       </div>

//       {/* Title Section */}
//       <div>
//         <h2 style={{ margin: "0", fontSize: "24px", fontWeight: "bold" }}>
//           Chatting App
//         </h2>
//       </div>

//       {/* User Section */}
//       <div>
//         <span
//           style={{
//             fontSize: "16px",
//             fontWeight: "500",
//             color: "#555",
//           }}
//         >
//           {user?.name || "Guest"}
//         </span>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
import React, { useState } from "react";
import { ChatState } from "../../context/ChatProvider"; // Import ChatState to get user details from context
import axios from "axios";
const Navbar = () => {
  const { user } = ChatState(); // Extract user from context
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
    const [showDropdown, setShowDropdown] = useState(false); // Dropdown toggle state
    const handleSearch = async() => {
      
        if (!search)
        {
            return;
        }
        try {
            const config = {
                headers:
                {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.get(`/user/search?search=${search}`, config);
            console.log(data);
            setSearchResult(data);
        }
        catch(error) {
            console.error("Error during search:", error);
            // Display a user-friendly error message
            alert("An error occurred while searching. Please try again later.");
        }
    console.log("Searching for:", search);
    // Add search logic here
  };

  const handleLogout = () => {
      console.log("Logout clicked");
      localStorage.removeItem("userInfo");
      window.location.href = "/"; 
    // Add logout logic here (e.g., clear user context, redirect to login page)
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#f8f9fa",
        borderBottom: "1px solid #ccc",
      }}
    >
      {/* Search Section */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "5px 10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "5px 10px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          🔍
        </button>
      </div>

      {/* Title Section */}
      <div>
        <h2 style={{ margin: "0", fontSize: "24px", fontWeight: "bold" }}>
          Chatting App
        </h2>
      </div>

      {/* User Section */}
      <div style={{ position: "relative" }}>
        <div
          onClick={() => setShowDropdown(!showDropdown)}
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          {user?.pic && (
            <img
              src={user.pic}
              alt="Avatar"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                marginRight: "8px",
                border: "1px solid #ccc",
              }}
            />
          )}
          <span
            style={{
              fontSize: "16px",
              fontWeight: "500",
              color: "#555",
            }}
          >
            {user?.name || "Guest"}
          </span>
        </div>

        {/* Dropdown Menu */}
        {showDropdown && (
          <div
            style={{
              position: "absolute",
              top: "40px",
              right: "0",
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              borderRadius: "4px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              zIndex: "1000",
            }}
          >
            <button
              onClick={handleLogout}
              style={{
                display: "block",
                padding: "10px 20px",
                backgroundColor: "transparent",
                border: "none",
                textAlign: "left",
                width: "100%",
                cursor: "pointer",
                fontSize: "16px",
                color: "#333",
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
