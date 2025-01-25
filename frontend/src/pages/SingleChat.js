import React, { useEffect, useState, useCallback } from "react";
import { ChatState } from "../context/ChatProvider";
import FullChat from "./FullChat";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import GroupChatOptions from "./GroupChatOptions";
import axios from "axios";
import io from "socket.io-client";
import debounce from "lodash.debounce";

const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");

  // Search functionality for adding users
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
  }, []);

  const sendMessage = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        "/messages",
        { content: newMessage, chatId: selectedChat._id },
        config
      );

      socket.emit("new message", data);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (error) {
      console.error("Error during sending chat:", error);
      alert(
        "An error occurred while sending the message. Please try again later."
      );
    }
  };

  const fetchMessages = async () => {
    if (!selectedChat) return;

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
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      console.error("Error during fetching messages:", error);
      alert(
        "An error occurred while fetching messages. Please try again later."
      );
    }
  };

  const renameGroup = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        "/chat/rename",
        { chatId: selectedChat._id, chatName: newGroupName },
        config
      );
      alert("Group renamed successfully!");
      setFetchAgain((prev) => !prev);
      setNewGroupName("");
    } catch (error) {
      console.error("Error renaming the group:", error);
      alert("Failed to rename the group.");
    }
  };

  const performSearch = async (query) => {
    if (!query) {
      setSearchResult([]);
      return;
    }
    setLoadingSearch(true);
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
    setLoadingSearch(false);
  };

  const debouncedSearch = useCallback(
    debounce((query) => performSearch(query), 500),
    []
  );

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearch(query);
    debouncedSearch(query);
  };

  const addUserToGroup = async (userId) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        "/chat/groupadd",
        { chatId: selectedChat._id, userId },
        config
      );
      alert("User added successfully!");
      setFetchAgain((prev) => !prev);
      setSearch("");
      setSearchResult([]);
    } catch (error) {
      console.error("Error adding user to group:", error);
      alert("Failed to add user to the group.");
    }
  };

  const removeUserFromGroup = async (userId) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        "/chat/groupremove",
        { chatId: selectedChat._id, userId },
        config
      );

      alert("User removed successfully!");
      setFetchAgain((prev) => !prev);
    } catch (error) {
      console.error("Error removing user from group:", error);
      alert("Failed to remove user from the group.");
    }
  };

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        // Notify
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

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
          <ChatHeader
            selectedChat={selectedChat}
            user={user}
            showOptions={showOptions}
            setShowOptions={setShowOptions}
          />

          {showOptions && selectedChat.isGroup && (
            <GroupChatOptions
              selectedChat={selectedChat}
              user={user}
              newGroupName={newGroupName}
              setNewGroupName={setNewGroupName}
              renameGroup={renameGroup}
              search={search}
              handleInputChange={handleInputChange}
              searchResult={searchResult}
              loadingSearch={loadingSearch}
              addUserToGroup={addUserToGroup}
              removeUserFromGroup={removeUserFromGroup}
            />
          )}

          <div
            style={{
              flex: 1,
              padding: "10px",
              backgroundColor: "#fff",
              overflowY: "auto",
            }}
          >
            {loading ? (
              <p>Loading chats...</p>
            ) : (
              <div className="messages">
                <FullChat
                  messages={messages}
                  isGroupChat={selectedChat.isGroup}
                />
              </div>
            )}
          </div>

          <ChatInput
            newMessage={newMessage}
            typingHandler={typingHandler}
            sendMessage={sendMessage}
          />
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
          <h2>Select a chat to start messaging</h2>
        </div>
      )}
    </div>
  );
};

export default SingleChat;