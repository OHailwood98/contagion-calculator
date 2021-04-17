import React from "react";

function InlineError({ message }) {
  return <span style={{ color: "#dc3545", fontSize: "14pt" }}>{message}</span>;
}

export default InlineError;
