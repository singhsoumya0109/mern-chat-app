// import React, { useState, useEffect } from "react";
// import { ChatState } from "../context/ChatProvider";
// import axios from "axios";
// import { getName } from "../config/ChatLogics";
// const MyChats = ({fetchAgain}) => {
//   const [loggedUser, setLoggedUser] = useState();
//   const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();

//   const fetchChats = async () => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       };

//       const { data } = await axios.get("/chat", config);
//       setChats(data);
//       //console.log(data);
//     } catch (error) {
//       console.error("Error during fetching chat:", error);
//       alert("An error occurred while fetching chat. Please try again later.");
//     }
//   };

//   useEffect(() => {
//     setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
//     fetchChats();
//   }, [fetchAgain]);

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         padding: "10px",
//         backgroundColor: "#f8f9fa",
//         borderRadius: "8px",
//         boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
//       }}
//     >
//       <h2 style={{ marginBottom: "20px", fontWeight: "bold" }}>My Chats</h2>

//       {/* Chat List */}
//       {chats && chats.length > 0 ? (
//         <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
//           {chats.map((chat) => (
//             <div
//               key={chat._id}
//               onClick={() => setSelectedChat(chat)}
//               style={{
//                 padding: "20px",
//                 borderRadius: "6px",
//                 backgroundColor:
//                   selectedChat?._id === chat._id ? "#98fb98" : "#ffffff",
//                 // color: selectedChat?._id === chat._id ? "#ffffff" : "#333333",
//                 border: "1px solid #ddd",
//                 cursor: "pointer",
//                 display: "flex",
//                 flexDirection: "column",
//               }}
//             >
//               <strong>
//                 {chat.isGroup ? chat.chatName : getName(loggedUser, chat.users)}
//               </strong>
//               {/* <span style={{ fontSize: "12px", color: "#777" }}>
//                 {chat.latestMessage
//                   ? `${chat.latestMessage.sender.name}: ${chat.latestMessage.content}`
//                   : "No messages yet"}
//               </span> */}
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No chats found</p>
//       )}
//     </div>
//   );
// };

// export default MyChats;
import React, { useState, useEffect, useCallback } from "react";
import { ChatState } from "../context/ChatProvider";
import axios from "axios";
import debounce from "lodash.debounce";
import { getName } from "../config/ChatLogics";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const [showGroupForm, setShowGroupForm] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/chat", config);
      setChats(data);
    } catch (error) {
      console.error("Error during fetching chat:", error);
      alert("An error occurred while fetching chats. Please try again later.");
    }
  };

  const performSearch = async (query) => {
    if (!query) {
      setSearchResult([]);
      return;
    }
    setLoading(true);
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
    setLoading(false);
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

  const handleAddUser = (user) => {
    if (selectedUsers.find((u) => u._id === user._id)) {
      alert("User already added");
      return;
    }
    setSelectedUsers([...selectedUsers, user]);
  };

  const handleRemoveUser = (user) => {
    setSelectedUsers(selectedUsers.filter((u) => u._id !== user._id));
  };

  const handleCreateGroup = async () => {
    if (!groupName || selectedUsers.length < 2) {
      alert("Please provide a group name and select at least 2 users");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        "/chat/group",
        {
          name: groupName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );

      setChats([data, ...chats]);
      setShowGroupForm(false);
      setGroupName("");
      setSelectedUsers([]);
    } catch (error) {
      console.error("Error during creating group:", error);
      alert("An error occurred while creating the group. Please try again.");
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "10px",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px", fontWeight: "bold" }}>My Chats</h2>
        <button
          onClick={() => setShowGroupForm(!showGroupForm)}
          style={{
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Create Group
        </button>
      </div>

      {showGroupForm && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginBottom: "20px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
        >
          <input
            type="text"
            placeholder="Enter Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              width: "95%",
            }}
          />

          <input
            type="text"
            placeholder="Search Users..."
            value={search}
            onChange={handleInputChange}
            style={{
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              width: "95%",
            }}
          />

          {search && searchResult.length > 0 && (
            <div
              style={{
                maxHeight: "200px",
                overflowY: "auto",
                border: "1px solid #ddd",
                borderRadius: "4px",
                padding: "5px",
              }}
            >
              {searchResult.map((user) => (
                <div
                  key={user._id}
                  onClick={() => handleAddUser(user)}
                  style={{
                    padding: "10px",
                    cursor: "pointer",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  {user.name}
                </div>
              ))}
            </div>
          )}

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {selectedUsers.map((user) => (
              <div
                key={user._id}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  borderRadius: "20px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {user.name}
                <span
                  onClick={() => handleRemoveUser(user)}
                  style={{
                    marginLeft: "10px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  ×
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={handleCreateGroup}
            style={{
              padding: "10px",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Create Group
          </button>
        </div>
      )}

      {/* Chat List */}
      {chats && chats.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {chats.map((chat) => (
            <div
              key={chat._id}
              onClick={() => setSelectedChat(chat)}
              style={{
                padding: "20px",
                borderRadius: "6px",
                backgroundColor:
                  selectedChat?._id === chat._id ? "#98fb98" : "#ffffff",
                border: "1px solid #ddd",
                cursor: "pointer",
              }}
            >
              <strong>
                {chat.isGroup ? chat.chatName : getName(loggedUser, chat.users)}
              </strong>
            </div>
          ))}
        </div>
      ) : (
        <p>No chats found</p>
      )}
    </div>
  );
};

export default MyChats;
