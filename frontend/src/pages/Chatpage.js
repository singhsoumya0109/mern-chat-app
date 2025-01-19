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

import React from "react";
import {ChatState} from "../context/ChatProvider"
import Navbar from "./Miscelleneous/Navbar";
import MyChats from "./MyChats";
import ChatBox from "./ChatBox";
function ChatPage() {
  const { user } = ChatState();
  return (
    <div>
      {user && <Navbar />}
      <div>
        {user && <MyChats />}
        {user && <ChatBox />}
      </div>
    </div>
  );
}

export default ChatPage;
