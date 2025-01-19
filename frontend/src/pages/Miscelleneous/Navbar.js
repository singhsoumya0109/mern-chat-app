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
// import React, { useState } from "react";
// import { ChatState } from "../../context/ChatProvider"; // Import ChatState to get user details from context
// import axios from "axios";
// const Navbar = () => {
//   const { user } = ChatState(); // Extract user from context
//   const [search, setSearch] = useState("");
//   const [searchResult, setSearchResult] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [loadingChat, setLoadingChat] = useState();
//     const [showDropdown, setShowDropdown] = useState(false); // Dropdown toggle state
//     const handleSearch = async() => {
      
//         if (!search)
//         {
//             return;
//         }
//         try {
//             const config = {
//                 headers:
//                 {
//                     Authorization: `Bearer ${user.token}`,
//                 },
//             };
//             const { data } = await axios.get(`/user/search?search=${search}`, config);
//             //console.log(data);
//             setSearchResult(data);
//         }
//         catch(error) {
//             console.error("Error during search:", error);
//             // Display a user-friendly error message
//             alert("An error occurred while searching. Please try again later.");
//         }
//     //console.log("Searching for:", search);
//     // Add search logic here
//   };

//   const handleLogout = () => {
//       console.log("Logout clicked");
//       localStorage.removeItem("userInfo");
//       window.location.href = "/";
//     // Add logout logic here (e.g., clear user context, redirect to login page)
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
//       <div style={{ position: "relative" }}>
//         <div
//           onClick={() => setShowDropdown(!showDropdown)}
//           style={{
//             display: "flex",
//             alignItems: "center",
//             cursor: "pointer",
//           }}
//         >
//           {user?.pic && (
//             <img
//               src={user.pic}
//               alt="Avatar"
//               style={{
//                 width: "32px",
//                 height: "32px",
//                 borderRadius: "50%",
//                 marginRight: "8px",
//                 border: "1px solid #ccc",
//               }}
//             />
//           )}
//           <span
//             style={{
//               fontSize: "16px",
//               fontWeight: "500",
//               color: "#555",
//             }}
//           >
//             {user?.name || "Guest"}
//           </span>
//         </div>

//         {/* Dropdown Menu */}
//         {showDropdown && (
//           <div
//             style={{
//               position: "absolute",
//               top: "40px",
//               right: "0",
//               backgroundColor: "#fff",
//               border: "1px solid #ccc",
//               borderRadius: "4px",
//               boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
//               zIndex: "1000",
//             }}
//           >
//             <button
//               onClick={handleLogout}
//               style={{
//                 display: "block",
//                 padding: "10px 20px",
//                 backgroundColor: "transparent",
//                 border: "none",
//                 textAlign: "left",
//                 width: "100%",
//                 cursor: "pointer",
//                 fontSize: "16px",
//                 color: "#333",
//               }}
//             >
//               Logout
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;

// import React, { useState } from "react";
// import { ChatState } from "../../context/ChatProvider";
// import axios from "axios";
// import SearchResults from "../SearchResults"; // Import SearchResults component

// const Navbar = () => {
//   const { user } = ChatState();
//   const [search, setSearch] = useState("");
//   const [searchResult, setSearchResult] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);

//   const handleSearch = async () => {
//     if (!search) {
//       return;
//     }
//     setLoading(true);
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       };
//       const { data } = await axios.get(`/user/search?search=${search}`, config);
//       setSearchResult(data);
//     } catch (error) {
//       console.error("Error during search:", error);
//       alert("An error occurred while searching. Please try again later.");
//     }
//     setLoading(false);
//   };

//   const handleLogout = () => {
//     console.log("Logout clicked");
//     localStorage.removeItem("userInfo");
//     window.location.href = "/";
//     };
    
//     const handleInputChange=(e) => {
//         setSearch(e.target.value);
//         handleSearch();
//     }

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         backgroundColor: "#f8f9fa",
//         borderBottom: "1px solid #ccc",
//         padding: "10px 20px",
//       }}
//     >
//       {/* Navbar Top Section */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: "10px",
//         }}
//       >
//         {/* Search Section */}
//         <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
//           <input
//             type="text"
//             placeholder="Search..."
//             value={search}
//             // onChange={(e) => setSearch(e.target.value)}
//             onChange={handleInputChange}
//             style={{
//               padding: "8px 12px",
//               borderRadius: "4px",
//               border: "1px solid #ccc",
//               flex: 1,
//               marginRight: "10px",
//             }}
//           />
//           <button
//             onClick={handleSearch}
//             style={{
//               backgroundColor: "#007bff",
//               color: "#fff",
//               padding: "8px 12px",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//             }}
//           >
//             🔍
//           </button>
//         </div>

//         {/* Title Section */}
//         <div
//           style={{
//             textAlign: "center",
//             flex: 2,
//           }}
//         >
//           <h2 style={{ margin: "0", fontSize: "24px", fontWeight: "bold" }}>
//             Chatting App
//           </h2>
//         </div>

//         {/* User Section */}
//         <div
//           style={{
//             position: "relative",
//             display: "flex",
//             justifyContent: "flex-end",
//             alignItems: "center",
//             flex: 1,
//           }}
//         >
//           <div
//             onClick={() => setShowDropdown(!showDropdown)}
//             style={{
//               display: "flex",
//               alignItems: "center",
//               cursor: "pointer",
//             }}
//           >
//             {user?.pic && (
//               <img
//                 src={user.pic}
//                 alt="Avatar"
//                 style={{
//                   width: "36px",
//                   height: "36px",
//                   borderRadius: "50%",
//                   marginRight: "10px",
//                   border: "1px solid #ccc",
//                 }}
//               />
//             )}
//             <span
//               style={{
//                 fontSize: "16px",
//                 fontWeight: "500",
//                 color: "#555",
//               }}
//             >
//               {user?.name || "Guest"}
//             </span>
//           </div>

//           {/* Dropdown Menu */}
//           {showDropdown && (
//             <div
//               style={{
//                 position: "absolute",
//                 top: "50px",
//                 right: "0",
//                 backgroundColor: "#fff",
//                 border: "1px solid #ccc",
//                 borderRadius: "4px",
//                 boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
//                 zIndex: "1000",
//                 width: "150px",
//               }}
//             >
//               <button
//                 onClick={handleLogout}
//                 style={{
//                   display: "block",
//                   padding: "10px 20px",
//                   backgroundColor: "transparent",
//                   border: "none",
//                   textAlign: "left",
//                   width: "100%",
//                   cursor: "pointer",
//                   fontSize: "16px",
//                   color: "#333",
//                 }}
//               >
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Search Results Section */}
//       {search && <SearchResults results={searchResult} />}
//     </div>
//   );
// };

// export default Navbar;
// import React, { useState, useEffect, useCallback } from "react";
// import { ChatState } from "../../context/ChatProvider";
// import axios from "axios";
// import SearchResults from "../SearchResults"; // Import SearchResults component
// import debounce from "lodash.debounce";

// const Navbar = () => {
//   const { user } = ChatState();
//   const [search, setSearch] = useState("");
//   const [searchResult, setSearchResult] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);

//   // Search API call function
//   const performSearch = async (query) => {
//     if (!query) {
//       setSearchResult([]);
//       return;
//     }
//     setLoading(true);
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       };
//       const { data } = await axios.get(`/user/search?search=${query}`, config);
//       setSearchResult(data);
//     } catch (error) {
//       console.error("Error during search:", error);
//       alert("An error occurred while searching. Please try again later.");
//     }
//     setLoading(false);
//   };

//   // Debounced version of performSearch
//   const debouncedSearch = useCallback(
//     debounce((query) => performSearch(query), 500),
//     []
//   );

//   // Handle input change
//   const handleInputChange = (e) => {
//     const query = e.target.value;
//     setSearch(query);
//     debouncedSearch(query);
//   };

//   const handleLogout = () => {
//     console.log("Logout clicked");
//     localStorage.removeItem("userInfo");
//     window.location.href = "/";
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         backgroundColor: "#f8f9fa",
//         borderBottom: "1px solid #ccc",
//         padding: "10px 20px",
//       }}
//     >
//       {/* Navbar Top Section */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: "10px",
//         }}
//       >
//         {/* Search Section */}
//         <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
//           <input
//             type="text"
//             placeholder="Search..."
//             value={search}
//             onChange={handleInputChange}
//             style={{
//               padding: "8px 12px",
//               borderRadius: "4px",
//               border: "1px solid #ccc",
//               flex: 1,
//               marginRight: "10px",
//             }}
//           />
//           <button
//             style={{
//               backgroundColor: "#007bff",
//               color: "#fff",
//               padding: "8px 12px",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//             }}
//           >
//             🔍
//           </button>
//         </div>

//         {/* Title Section */}
//         <div
//           style={{
//             textAlign: "center",
//             flex: 2,
//           }}
//         >
//           <h2 style={{ margin: "0", fontSize: "24px", fontWeight: "bold" }}>
//             Chatting App
//           </h2>
//         </div>

//         {/* User Section */}
//         <div
//           style={{
//             position: "relative",
//             display: "flex",
//             justifyContent: "flex-end",
//             alignItems: "center",
//             flex: 1,
//           }}
//         >
//           <div
//             onClick={() => setShowDropdown(!showDropdown)}
//             style={{
//               display: "flex",
//               alignItems: "center",
//               cursor: "pointer",
//             }}
//           >
//             {user?.pic && (
//               <img
//                 src={user.pic}
//                 alt="Avatar"
//                 style={{
//                   width: "36px",
//                   height: "36px",
//                   borderRadius: "50%",
//                   marginRight: "10px",
//                   border: "1px solid #ccc",
//                 }}
//               />
//             )}
//             <span
//               style={{
//                 fontSize: "16px",
//                 fontWeight: "500",
//                 color: "#555",
//               }}
//             >
//               {user?.name || "Guest"}
//             </span>
//           </div>

//           {/* Dropdown Menu */}
//           {showDropdown && (
//             <div
//               style={{
//                 position: "absolute",
//                 top: "50px",
//                 right: "0",
//                 backgroundColor: "#fff",
//                 border: "1px solid #ccc",
//                 borderRadius: "4px",
//                 boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
//                 zIndex: "1000",
//                 width: "150px",
//               }}
//             >
//               <button
//                 onClick={handleLogout}
//                 style={{
//                   display: "block",
//                   padding: "10px 20px",
//                   backgroundColor: "transparent",
//                   border: "none",
//                   textAlign: "left",
//                   width: "100%",
//                   cursor: "pointer",
//                   fontSize: "16px",
//                   color: "#333",
//                 }}
//               >
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Search Results Section */}
//       {search && <SearchResults results={searchResult} />}
//     </div>
//   );
// };

// export default Navbar;

//the below code is not using the searchresults/js and the above is using it
import React, { useState, useEffect, useCallback } from "react";
import { ChatState } from "../../context/ChatProvider";
import axios from "axios";
import debounce from "lodash.debounce";

const Navbar = () => {
  const { user, setSelectedChat, chats, setChats } = ChatState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [loadingChat, setLoadingChat] = useState();


  // Function to perform search
  const performSearch = async (query) => {
    if (!query) {
      setSearchResult([]);
      return;
    }
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/user/search?search=${query}`, config);
      setSearchResult(data);
    } catch (error) {
      console.error("Error during search:", error);
      alert("An error occurred while searching. Please try again later.");
    }
    setLoading(false);
  };

    //function to access user
    const accessChat = async (userId) => {
        try {
            setLoadingChat(true);
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };

          const { data } = await axios.post("/chat", { userId }, config);
          if (!chats.find((c) => c._id === data.id)) setChats([data, ...chats]);
            setSelectedChat(data);
            setLoadingChat(false);
        }
        catch (error) {
            console.error("Error during accessing chat:", error);
            alert(
                "An error occurred while accessing chat. Please try again later."
            );
        }
    };
  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query) => performSearch(query), 500),
    []
  );

  // Handle search input change
  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearch(query);
    debouncedSearch(query);
  };

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    window.location.href = "/";
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f8f9fa",
        borderBottom: "1px solid #ccc",
        padding: "10px 20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        {/* Search Bar Section */}
        <div style={{ position: "relative", flex: 1 }}>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleInputChange}
            style={{
              padding: "8px 12px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              width: "100%",
            }}
          />
          {search && searchResult.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: "0",
                width: "100%",
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                borderRadius: "4px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                maxHeight: "200px",
                overflowY: "auto",
                zIndex: 1000,
              }}
            >
              {searchResult.map((result, index) => (
                <div
                  key={index}
                  style={{
                    padding: "10px",
                    borderBottom: "1px solid #f1f1f1",
                    cursor: "pointer",
                  }}
                  onClick={() => accessChat(result._id)} // Customize click behavior
                >
                  {result.name || "Result"} {/* Customize this */}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* App Title Section */}
        <div
          style={{
            textAlign: "center",
            flex: 2,
          }}
        >
          <h2 style={{ margin: "0", fontSize: "24px", fontWeight: "bold" }}>
            Chatting App
          </h2>
        </div>

        {/* User Dropdown Section */}
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            flex: 1,
          }}
        >
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
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  marginRight: "10px",
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

          {showDropdown && (
            <div
              style={{
                position: "absolute",
                top: "50px",
                right: "0",
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                borderRadius: "4px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                zIndex: "1000",
                width: "150px",
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
    </div>
  );
};

export default Navbar;
