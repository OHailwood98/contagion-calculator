import React from "react";
import Styled from "styled-components";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import Colours from "../static/colours";
import InlineError from "../error/InlineError";
import IncPeriodForm from "./IncPeriodForm";

const BorderDiv = Styled.div`
  display: inline-block;
  width:90%;
  border-style: solid;
  border-width: 3px;
  border-radius: 2px;
  padding: 25px;
  text-align: centre;
  border-color: ${Colours.border2};
`;

const TextLeftDiv = Styled.div`
  text-align: left;
`;

class InfoForm extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {
        popDensity: "",
        densityUnit: "km",
        population: "",
        type: "bacteria",
        minInc: "",
        maxInc: "",
        time: "day",
        transmission: {
          waterborne: "0",
          airborne: "0",
          bloodborne: "0",
          contact: "0",
        },
      },
      error: {},
    };
    this.onChange = this.onChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.submit = this.submit.bind(this);
    this.onTransChange = this.onTransChange.bind(this);
  }

  handleButtonClick(event) {
    var id = event.target.id;
    if (this.state.data.transmission[id] === "unchecked") {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          transmission: { ...this.state.data.transmission, [id]: "checked" },
        },
      });
    } else {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          transmission: { ...this.state.data.transmission, [id]: "unchecked" },
        },
      });
    }
  }

  onChange(event) {
    const { id, value } = event.target;
    this.setState({
      ...this.state,
      data: { ...this.state.data, [id]: value },
    });
  }

  onTransChange(event) {
    const { id, value } = event.target;
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        transmission: { ...this.state.data.transmission, [id]: value },
      },
    });
  }

  submit() {
    var err = this.validation();
    var data = Object.assign({}, this.state.data);
    this.setState({ ...this.state, error: err });
    if (Object.keys(this.state.error).length === 0) {
      if (this.state.data.time === "week") {
        data.minInc = data.minInc * 7;
        data.maxInc = data.maxInc * 7;
      }
      this.props.submit(
        data,
        (cb) => {
          console.log(cb);
        },
        (e) => {
          console.log(e);
        }
      );
    } else {
      console.log("fail");
    }
  }

  onBlur(e) {
    var { id, value } = e.target;
    var err = this.textValidation(value);
    if (err === "") {
      const error = this.state.error;
      delete error[id];
      this.setState({ ...this.state, error: error });
    } else {
      this.setState({
        ...this.state,
        error: { ...this.state.error, [id]: err },
      });
    }
  }

  textValidation(value) {
    var regex = new RegExp("^[0-9]+$");
    if (value === "") {
      return "";
    }
    if (!regex.test(value)) {
      return "Enter an Integer";
    } else {
      return "";
    }
  }

  validation() {
    var { error, data } = this.state;
    var { waterborne, airborne, bloodborne, contact } = data.transmission;
    var regex = new RegExp("^[0-9]+$");

    delete error.transmission;
    delete error.incubation;

    if (
      waterborne === "0" &&
      airborne === "0" &&
      bloodborne === "0" &&
      contact === "0"
    ) {
      error.transmission = "At least 1 Transmision Method must be Selected";
    }
    if (!data.popDensity) error.popDensity = "Cannot be Empty";
    if (!data.population) error.population = "Cannot be Empty";
    if (!data.minInc || !data.maxInc) error.incubation = "Cannot be Empty";
    if (!regex.test(data.minInc)) error.incubation = "Enter an Integer";
    if (!regex.test(data.maxInc)) error.incubation = "Enter an Integer";
    if (parseInt(data.minInc) >= parseInt(data.maxInc))
      error.incubation = "Min must be smaller than Max";

    return error;
  }

  render() {
    const { error, data } = this.state;
    return (
      <BorderDiv>
        <Form>
          <h5>- Population Data -</h5>
          <TextLeftDiv>
            {error.global && (
              <Alert variant="danger">
                <Alert.Heading>Something Failed! :(</Alert.Heading>
                <p>{error.global}</p>
              </Alert>
            )}
            <Row>
              <Col xs={{ span: 3, offset: 1 }}>
                <Form.Group>
                  <Form.Label>Population Density</Form.Label>
                  <Form.Control
                    type="text"
                    id="popDensity"
                    placeholder="250"
                    value={data.popDensity}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                  />
                  {error.popDensity && (
                    <InlineError message={error.popDensity.toString()} />
                  )}
                </Form.Group>
              </Col>
              <Col xs={{ span: 2, offset: 0 }}>
                <Form.Group>
                  <Form.Label>Unit</Form.Label>
                  <Form.Control
                    as="select"
                    id="densityUnit"
                    value={data.densityUnit}
                    onChange={this.onChange}
                    style={{ textAlign: "center" }}
                  >
                    <option value="km">per sq. KM</option>
                    <option value="mi">per sq. mi.</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col xs={{ span: 4, offset: 1 }}>
                <Form.Group>
                  <Form.Label>Population</Form.Label>
                  <Form.Control
                    type="text"
                    id="population"
                    name="population"
                    placeholder="75000000"
                    value={data.population}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                  />
                  {error.population && (
                    <InlineError message={error.population.toString()} />
                  )}
                </Form.Group>
              </Col>
            </Row>
          </TextLeftDiv>
          <hr />
          <h5>- Infection Data -</h5>
          <Row>
            <Col xs={{ span: 2, offset: 1 }}>
              <Form.Group>
                <Form.Label>Infection Type</Form.Label>
                <Form.Control
                  as="select"
                  id="type"
                  value={data.type}
                  onChange={this.onChange}
                  style={{ textAlign: "center" }}
                >
                  <option value="bacteria">Bacteria</option>
                  <option value="virus">Virus</option>
                  <option value="fungus">Fungus</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xs={{ span: 3, offset: 2 }}>
              <Form.Group>
                <Form.Label>Incubation Period</Form.Label>
                <IncPeriodForm
                  minInc={data.minInc}
                  maxInc={data.maxInc}
                  onChange={this.onChange}
                />
                {error.incubation && (
                  <InlineError message={error.incubation.toString()} />
                )}
              </Form.Group>
            </Col>
            <Col xs={{ span: 2, offset: 1 }}>
              <Form.Group>
                <Form.Label>Time</Form.Label>
                <Form.Control
                  as="select"
                  id="time"
                  value={data.time}
                  onChange={this.onChange}
                  style={{ textAlign: "center" }}
                >
                  <option value="day">Days</option>
                  <option value="week">Weeks</option>
                </Form.Control>
                {error.densityUnit && (
                  <InlineError message={error.densityUnit.toString()} />
                )}
              </Form.Group>
            </Col>
          </Row>
          <hr />
          <h5>- Transmission Methods -</h5>
          <Row>
            <Col xs={{ span: 2, offset: 0 }}>
              <Form.Group>
                <Form.Label>Waterborne</Form.Label>
                <Form.Control
                  as="select"
                  id="waterborne"
                  value={data.transmission.waterborne}
                  onChange={this.onTransChange}
                  style={{ textAlign: "center" }}
                >
                  <option value="0">No</option>
                  <option value="1">Low</option>
                  <option value="2">Mid</option>
                  <option value="3">High</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xs={{ span: 2, offset: 1 }}>
              <Form.Group>
                <Form.Label>Airborne</Form.Label>
                <Form.Control
                  as="select"
                  id="airborne"
                  value={data.transmission.airborne}
                  onChange={this.onTransChange}
                  style={{ textAlign: "center" }}
                >
                  <option value="0">No</option>
                  <option value="1">Low</option>
                  <option value="2">Mid</option>
                  <option value="3">High</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xs={{ span: 2, offset: 2 }}>
              <Form.Group>
                <Form.Label>Bloodborne</Form.Label>
                <Form.Control
                  as="select"
                  id="bloodborne"
                  value={data.transmission.bloodborne}
                  onChange={this.onTransChange}
                  style={{ textAlign: "center" }}
                >
                  <option value="0">No</option>
                  <option value="1">Low</option>
                  <option value="2">Mid</option>
                  <option value="3">High</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xs={{ span: 2, offset: 1 }}>
              <Form.Group>
                <Form.Label>Contact</Form.Label>
                <Form.Control
                  as="select"
                  id="contact"
                  value={data.transmission.contact}
                  onChange={this.onTransChange}
                  style={{ textAlign: "center" }}
                >
                  <option value="0">No</option>
                  <option value="1">Low</option>
                  <option value="2">Mid</option>
                  <option value="3">High</option>
                </Form.Control>
              </Form.Group>
            </Col>
            {error.transmission && (
              <Col xs={{ span: 10, offset: 1 }}>
                <InlineError message={error.transmission.toString()} />
              </Col>
            )}
          </Row>
          <hr />
          <br />
          <Button variant="primary" onClick={this.submit} size="lg" block>
            Calculate
          </Button>
        </Form>
      </BorderDiv>
    );
  }
}

export default InfoForm;
