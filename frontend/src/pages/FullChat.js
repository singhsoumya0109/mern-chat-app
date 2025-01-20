// import React from 'react'
// import ScrollablFeed from 'react-scrollable-feed'
// const FullChat = ({ messages }) => {
//   return (
//     <ScrollablFeed>
//       {messages &&
//         messages.map((m, i) => (
//           <div style={{ display: "flex" }} key={m._id}>
//             <span style={{}}>{m.content}</span>
//           </div>
//         ))}
//     </ScrollablFeed>
//   );
// }

// export default FullChat;
import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { ChatState } from "../context/ChatProvider"; // Ensure this import

const FullChat = ({ messages }) => {
  const { user } = ChatState(); // Get user from ChatState

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div
            style={{
              display: "flex",
              justifyContent:
                m.sender && m.sender._id === user?._id
                  ? "flex-end"
                  : "flex-start",
              padding: "5px",
            }}
            key={m._id || i} // Fallback to index if _id is missing
          >
            <span
              style={{
                backgroundColor:
                  m.sender && m.sender._id === user?._id
                    ? "#DCF8C6"
                    : "#E2E2E2",
                color: "#000",
                borderRadius: "20px",
                padding: "10px 15px",
                maxWidth: "60%",
                wordWrap: "break-word",
                boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.2)",
                fontSize: "14px",
              }}
            >
              {m.content || "Message content unavailable"}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default FullChat;
