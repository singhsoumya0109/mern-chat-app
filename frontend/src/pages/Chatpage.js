// import axios from "axios";
// import React, { useEffect, useState } from "react";

// function ChatPage() {
//   const [chats, setChats] = useState([]);

//   useEffect(() => {
//     const fetchChats = async () => {
//       try {
//         const { data } = await axios.get("/chat");
//         setChats(data);
//         console.log(data);
//       } catch (error) {
//         console.error("Error fetching chats:", error);
//       }
//     };

//     fetchChats(); // Call fetchChats inside useEffect
//   }, []); // No dependencies needed

//     return (
//     <div>
//             {chats.map((chat) => (
//           <div>{chat.chatName}</div>
//       ))}
//     </div>
//     );
// }

// export default ChatPage;

// import React from "react";
// import {ChatState} from "../context/ChatProvider"
// import Navbar from "./Miscelleneous/Navbar";
// import MyChats from "./MyChats";
// import ChatBox from "./ChatBox";
// function ChatPage() {
//   const { user } = ChatState();
//   return (
//     <div>
//       {user && <Navbar />}
//       <div>
//         {user && <MyChats />}
//         {user && <ChatBox />}
//       </div>
//     </div>
//   );
// }

// export default ChatPage;
import React from "react";
import { ChatState } from "../context/ChatProvider";
import Navbar from "./Miscelleneous/Navbar";
import MyChats from "./MyChats";
import ChatBox from "./ChatBox";
import { useState } from "react";

function ChatPage() {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Navbar */}
      {user && <Navbar />}

      {/* Main Content */}
      <div
        style={{
          display: "flex",
          flex: 1,
          marginTop: "0px",
          padding: "10px",
          gap: "10px",
          height: "90%",
        }}
      >
        {/* MyChats Section */}
        {user && (
          <div
            style={{
              flex: "0 0 30%", // 30% width
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              overflowY: "auto", // Enable scrolling if content overflows
              padding: "10px",
            }}
          >
            <MyChats fetchAgain={fetchAgain} />
          </div>
        )}

        {/* ChatBox Section */}
        {user && (
          <div
            style={{
              flex: "1 1 70%", // 70% width
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              overflowY: "auto", // Enable scrolling if content overflows
              padding: "10px",
            }}
          >
            <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatPage;
