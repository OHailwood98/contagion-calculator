import React from "react";
import Navbar from "react-bootstrap/Navbar";

function Navigation() {
  return (
    <Navbar
      bg="primary"
      variant="dark"
      className="text-center"
      style={{ textAlign: "center" }}
    >
      <div
        style={{
          display: "inline-block",
          textAlign: "center",
          width: "100%",
        }}
      >
        <h1 className="display-3 font-weight-bold">Contagion Calculator</h1>
      </div>
      <br />
    </Navbar>
  );
}

export default Navigation;
