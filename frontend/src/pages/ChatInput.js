import React from "react";

const ChatInput = ({ newMessage, typingHandler, sendMessage }) => {
  return (
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
        placeholder="Enter a message..."
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
          borderRadius: "20px",
          border: "1px solid #ccc",
          outline: "none",
          marginRight: "10px",
        }}
      />
      <button
        onClick={sendMessage}
        style={{
          padding: "10px 15px",
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
  );
};

export default ChatInput;
