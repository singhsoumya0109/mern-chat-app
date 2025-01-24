import React from "react";
import { getName } from "../config/ChatLogics";

const ChatHeader = ({ selectedChat, user, showOptions, setShowOptions }) => {
  return (
    <div
      style={{
        padding: "10px",
        borderBottom: "1px solid #ccc",
        backgroundColor: "#f5f5f5",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h1 style={{ margin: 0 }}>
        {selectedChat.isGroup
          ? selectedChat.chatName
          : getName(user, selectedChat.users)}
      </h1>
      {selectedChat.isGroup && (
        <button
          style={{
            padding: "5px 10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => setShowOptions(!showOptions)}
        >
          Options
        </button>
      )}
    </div>
  );
};

export default ChatHeader;
