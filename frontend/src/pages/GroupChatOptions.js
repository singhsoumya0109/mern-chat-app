// import React from "react";

// const GroupChatOptions = ({
//   selectedChat,
//   user,
//   newGroupName,
//   setNewGroupName,
//   renameGroup,
//   search,
//   handleInputChange,
//   searchResult,
//   loadingSearch,
//   addUserToGroup,
//   removeUserFromGroup,
// }) => {
//   return (
//     <div
//       style={{
//         marginTop: "10px",
//         background: "#f1f1f1",
//         padding: "10px",
//         borderRadius: "8px",
//       }}
//     >
//       {/* Rename Group Section */}
//       <div style={{ marginBottom: "10px" }}>
//         <input
//           type="text"
//           placeholder="Rename group"
//           value={newGroupName}
//           onChange={(e) => setNewGroupName(e.target.value)}
//           style={{
//             padding: "5px",
//             margin: "5px 0",
//             borderRadius: "5px",
//             border: "1px solid #ccc",
//             width: "100%",
//           }}
//         />
//         <button
//           onClick={renameGroup}
//           style={{
//             padding: "5px 10px",
//             backgroundColor: "#007bff",
//             color: "#fff",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer",
//             marginTop: "5px",
//           }}
//         >
//           Rename
//         </button>
//       </div>

//       {/* Add Users Section */}
//       {selectedChat.groupAdmin._id === user._id && (
//         <div>
//           <input
//             type="text"
//             placeholder="Search users to add"
//             value={search}
//             onChange={handleInputChange}
//             style={{
//               padding: "5px",
//               margin: "5px 0",
//               borderRadius: "5px",
//               border: "1px solid #ccc",
//               width: "100%",
//             }}
//           />
//           {loadingSearch ? (
//             <p>Searching...</p>
//           ) : (
//             searchResult.map((result) => (
//               <div
//                 key={result._id}
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   padding: "5px 0",
//                   borderBottom: "1px solid #ddd",
//                 }}
//               >
//                 <span>{result.name}</span>
//                 <button
//                   onClick={() => addUserToGroup(result._id)}
//                   style={{
//                     padding: "5px 10px",
//                     backgroundColor: "#007bff",
//                     color: "#fff",
//                     border: "none",
//                     borderRadius: "5px",
//                     cursor: "pointer",
//                   }}
//                 >
//                   Add
//                 </button>
//               </div>
//             ))
//           )}
//         </div>
//       )}

//       {/* List Group Members */}
//       <div style={{ marginBottom: "10px" }}>
//         <h4 style={{ margin: "0 0 10px" }}>Group Members:</h4>
//         {selectedChat.users
//           .sort((a, b) => {
//             // Current user first
//             if (a._id === user._id) return -1;
//             if (b._id === user._id) return 1;

//             // Admin second
//             if (a._id === selectedChat.groupAdmin._id) return -1;
//             if (b._id === selectedChat.groupAdmin._id) return 1;

//             // Rest of the users maintain their original order
//             return 0;
//           }) // Sort: current user at top and then the admin
//           .map((member) => (
//             <div
//               key={member._id}
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 padding: "5px 0",
//                 borderBottom: "1px solid #ddd",
//               }}
//             >
              // <span>
              //   {member.name}{" "}
              //   {member._id === selectedChat.groupAdmin._id && "(Admin)"}
              //   {member._id === user._id && " (You)"}
              // </span>
//               {selectedChat.groupAdmin._id === user._id &&
//                 member._id !== user._id && (
//                   <button
//                     onClick={() => removeUserFromGroup(member._id)}
//                     style={{
//                       padding: "5px 10px",
//                       backgroundColor: "#dc3545",
//                       color: "#fff",
//                       border: "none",
//                       borderRadius: "5px",
//                       cursor: "pointer",
//                     }}
//                   >
//                     Remove
//                   </button>
//                 )}
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default GroupChatOptions;
import React from "react";

const GroupChatOptions = ({
  selectedChat,
  user,
  newGroupName,
  setNewGroupName,
  renameGroup,
  search,
  handleInputChange,
  searchResult,
  loadingSearch,
  addUserToGroup,
  removeUserFromGroup,
  exitFromGroup, // Added for exiting the group
}) => {
  return (
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
      {selectedChat.groupAdmin._id === user._id && (
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
      )}

      {/* List Group Members */}
      <div style={{ marginBottom: "10px" }}>
        <h4 style={{ margin: "0 0 10px" }}>Group Members:</h4>
        {selectedChat.users
          .sort((a, b) => {
            // Current user first
            if (a._id === user._id) return -1;
            if (b._id === user._id) return 1;

            // Admin second
            if (a._id === selectedChat.groupAdmin._id) return -1;
            if (b._id === selectedChat.groupAdmin._id) return 1;

            // Rest of the users maintain their original order
            return 0;
          }) // Sort: current user at top and then the admin
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
                {member._id === selectedChat.groupAdmin._id && "(Admin)"}
                {member._id === user._id && " (You)"}
              </span>
              {selectedChat.groupAdmin._id === user._id &&
                member._id !== user._id && (
                  <button
                    onClick={() => removeUserFromGroup(member._id)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#ff0000",
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

      {/* Exit Group Option */}
      <div style={{ marginTop: "10px" }}>
        <button
          onClick={exitFromGroup}
          style={{
            padding: "5px 10px",
            backgroundColor: "#ff0000",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Exit Group
        </button>
      </div>
    </div>
  );
};

export default GroupChatOptions;
