// import React from "react";
// import { ChatState } from "../context/ChatProvider";
// import { getName } from "../config/ChatLogics";

// const SingleChat = ({ fetchAgain, setFetchAgain }) => {
//   const { user, selectedChat, setSelectedChat } = ChatState();

//   return (
//     <>
//       {selectedChat ? (
//         <>
//           {selectedChat.isGroup ? (
//             <h1>{selectedChat.chatName}</h1>
//           ) : (
//             <h1>{getName(user, selectedChat.users)}</h1>
//           )}
//         </>
//       ) : (
//         <h1>Open a chat</h1>
//       )}
//     </>
//   );
// };

// export default SingleChat;
// import React, { useState } from "react";
// import { ChatState } from "../context/ChatProvider";
// import { getName } from "../config/ChatLogics";

// const SingleChat = ({ fetchAgain, setFetchAgain }) => {
//   const { user, selectedChat, setSelectedChat } = ChatState();
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [newMessages, setNewMessages] = useState();


//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         height: "100%",
//         border: "1px solid #ccc",
//         borderRadius: "8px",
//         overflow: "hidden",
//       }}
//     >
//       {selectedChat ? (
//         <>
//           {/* Chat Header */}
//           <div
//             style={{
//               padding: "10px",
//               borderBottom: "1px solid #ccc",
//               backgroundColor: "#f5f5f5",
//             }}
//           >
//             {selectedChat.isGroup ? (
//               <h1 style={{ margin: 0 }}>{selectedChat.chatName}</h1>
//             ) : (
//               <h1 style={{ margin: 0 }}>{getName(user, selectedChat.users)}</h1>
//             )}
//           </div>

//           {/* Message Box */}
//           <div
//             style={{
//               flex: 1,
//               padding: "10px",
//               backgroundColor: "#fff",
//               overflowY: "auto",
//             }}
//           >
//             {/* Placeholder for messages */}
//             {loading ? (<p>Loading chats</p>)
//               : (
//                 <p>Messages</p>
//             )}
//           </div>
//         </>
//       ) : (
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             height: "100%",
//           }}
//         >
//           <h1>Open a chat</h1>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SingleChat;
import React, { useEffect, useState } from "react";
import { ChatState } from "../context/ChatProvider";
import { getName } from "../config/ChatLogics";
import FullChat from "./FullChat"
import axios from "axios";
import "./style.css";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  // Send Message Function
  const sendMessage = async() => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post("/messages", {
        content: newMessage,
        chatId: selectedChat._id,
      }, config);

      setMessages([...messages, data]);
        setNewMessage("");
      console.log(data);
    }
    catch (error)
    {
      console.error("Error during sending chat:", error);
      alert("An error occurred while sending chat. Please try again later.");
    }
    console.log(newMessage);
  };



  const fetchMessages = async () => {
    if (!selectedChat)
      return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(`/messages/${selectedChat._id}`, config);
      setMessages(data);
      setLoading(false);
      console.log(data);
    }
    catch (error) {
      console.error("Error during fetching messages:", error);
      alert(
        "An error occurred while fetching messages. Please try again later."
      );
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);



  // Handle Enter Key Press
  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        border: "1px solid #ccc",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      {selectedChat ? (
        <>
          {/* Chat Header */}
          <div
            style={{
              padding: "10px",
              borderBottom: "1px solid #ccc",
              backgroundColor: "#f5f5f5",
            }}
          >
            {selectedChat.isGroup ? (
              <h1 style={{ margin: 0 }}>{selectedChat.chatName}</h1>
            ) : (
              <h1 style={{ margin: 0 }}>{getName(user, selectedChat.users)}</h1>
            )}
          </div>

          {/* Message Box */}
          <div
            style={{
              flex: 1,
              padding: "10px",
              backgroundColor: "#fff",
              overflowY: "auto",
            }}
          >
            {loading ? <p>Loading chats...</p> :
              (<div className="messages">
                <FullChat messages={messages}/>
              </div>)}
          </div>

          {/* Input Area */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
              borderTop: "1px solid #ccc",
              backgroundColor: "#f5f5f5",
            }}
          >
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={typingHandler}
              onKeyDown={(e) => {
                if (e.key === "Enter" && newMessage) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              style={{
                flex: 1,
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "20px",
                marginRight: "10px",
                outline: "none",
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "20px",
                cursor: "pointer",
              }}
            >
              Send
            </button>
          </div>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <h1>Open a chat</h1>
        </div>
      )}
    </div>
  );
};

export default SingleChat;
