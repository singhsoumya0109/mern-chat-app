import React, { useEffect, useState, useCallback } from "react";
import { ChatState } from "../context/ChatProvider";
import { getName } from "../config/ChatLogics";
import FullChat from "./FullChat";
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

  // Perform search functionality
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

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query) => performSearch(query), 500),
    []
  );

  // Handle search input
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
      setSearch(""); // Reset search input
      setSearchResult([]); // Clear search results
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
              <div>
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
                {showOptions && (
                  <div
                    style={{
                      marginTop: "10px",
                      background: "#f1f1f1",
                      padding: "10px",
                      borderRadius: "8px",
                    }}
                  >
                    {/* Rename Group Section */}
                    <div style={{ marginBottom: "10px" }}>
                      <input
                        type="text"
                        placeholder="Rename group"
                        value={newGroupName}
                        onChange={(e) => setNewGroupName(e.target.value)}
                        style={{
                          padding: "5px",
                          margin: "5px 0",
                          borderRadius: "5px",
                          border: "1px solid #ccc",
                          width: "100%",
                        }}
                      />
                      <button
                        onClick={renameGroup}
                        style={{
                          padding: "5px 10px",
                          backgroundColor: "#007bff",
                          color: "#fff",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                          marginTop: "5px",
                        }}
                      >
                        Rename
                      </button>
                    </div>

                    {/* Add Users Section */}
                    <div>
                      <input
                        type="text"
                        placeholder="Search users to add"
                        value={search}
                        onChange={handleInputChange}
                        style={{
                          padding: "5px",
                          margin: "5px 0",
                          borderRadius: "5px",
                          border: "1px solid #ccc",
                          width: "100%",
                        }}
                      />
                      {loadingSearch ? (
                        <p>Searching...</p>
                      ) : (
                        searchResult.map((result) => (
                          <div
                            key={result._id}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: "5px 0",
                              borderBottom: "1px solid #ddd",
                            }}
                          >
                            <span>{result.name}</span>
                            <button
                              onClick={() => addUserToGroup(result._id)}
                              style={{
                                padding: "5px 10px",
                                backgroundColor: "#007bff",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                              }}
                            >
                              Add
                            </button>
                          </div>
                        ))
                      )}
                    </div>

                    {/* List Group Members */}
                    <div style={{ marginBottom: "10px" }}>
                      <h4 style={{ margin: "0 0 10px" }}>Group Members:</h4>
                      {selectedChat.users
                        .sort((a, b) =>
                          a._id === user._id ? -1 : b._id === user._id ? 1 : 0
                        ) // Sort: current user at top
                        .map((member) => (
                          <div
                            key={member._id}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: "5px 0",
                              borderBottom: "1px solid #ddd",
                            }}
                          >
                            <span>
                              {member.name}{" "}
                              {member._id === selectedChat.groupAdmin._id &&
                                "(Admin)"}
                              {member._id === user._id && " (You)"}
                            </span>
                            {selectedChat.groupAdmin._id === user._id &&
                              member._id !== user._id && (
                                <button
                                  onClick={() =>
                                    removeUserFromGroup(member._id)
                                  }
                                  style={{
                                    padding: "5px 10px",
                                    backgroundColor: "#dc3545",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                  }}
                                >
                                  Remove
                                </button>
                              )}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
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
                <FullChat messages={messages} />
              </div>
            )}
          </div>
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

