import React from "react";
import { ChatState } from "../context/ChatProvider";
import { getName } from "../config/ChatLogics";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();

  return (
    <>
      {selectedChat ? (
        <>
          {selectedChat.isGroup ? (
            <h1>{selectedChat.chatName}</h1>
          ) : (
            <h1>{getName(user, selectedChat.users)}</h1>
          )}
        </>
      ) : (
        <h1>Open a chat</h1>
      )}
    </>
  );
};

export default SingleChat;
