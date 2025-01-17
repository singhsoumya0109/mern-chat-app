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
import axios from "axios";
import React, { useEffect, useState } from "react";

function ChatPage() {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const { data } = await axios.get("/chat");
        setChats(data); // Update state with fetched data
        console.log("Fetched Chats:", data); // Log fetched data
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats(); // Call fetchChats when the component mounts
  }, []); // Empty dependency array ensures it runs only once

  return (
    <div>
      {chats.length > 0 ? (
        chats.map((chat) => (
          <div key={chat._id}>{chat.chatName}</div> // Use a unique key
        ))
      ) : (
        <div>Loading chats...</div> // Show a loading message if chats are empty
      )}
    </div>
  );
}

export default ChatPage;
