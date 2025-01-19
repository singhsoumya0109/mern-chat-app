import React from "react";

const SearchResults = ({ results }) => {
  return (
    <div
      style={{
        marginTop: "10px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        backgroundColor: "#fff",
        maxHeight: "200px",
        overflowY: "auto",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        width: "100%",
      }}
    >
      {results.length > 0 ? (
        results.map((result, index) => (
          <div
            key={index}
            style={{
              padding: "10px",
              borderBottom: "1px solid #eee",
              cursor: "pointer",
            }}
          >
            {/* Adjust the below field based on your API data structure */}
            {result.name || "Unnamed"}
          </div>
        ))
      ) : (
        <div style={{ padding: "10px", textAlign: "center", color: "#999" }}>
          No results found.
        </div>
      )}
    </div>
  );
};

export default SearchResults;
