import React from "react";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function IncPeriodForm({ minInc, maxInc, onChange }) {
  return (
    <Row>
      <Col xs={{ span: 5, offset: 0 }}>
        <Form.Control
          type="text"
          id="minInc"
          placeholder="min"
          value={minInc}
          onChange={onChange}
        />
      </Col>
      <Col xs={{ span: 2, offset: 0 }}>
        <Form.Label style={{ display: "inline" }}>to</Form.Label>
      </Col>
      <Col xs={{ span: 5, offset: 0 }}>
        <Form.Control
          type="text"
          id="maxInc"
          placeholder="max"
          value={maxInc}
          onChange={onChange}
        />
      </Col>
    </Row>
  );
}

export default IncPeriodForm;
