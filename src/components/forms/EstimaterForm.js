import React from "react";
import Styled from "styled-components";
import LoadingOverlay from "react-loading-overlay";

import api from "../../api";

import Colours from "../static/colours";
import InfoForm from "./InfoForm";
import ResultForm from "./ResultForm";

const BorderDiv = Styled.div`
  display: inline-block;
  width:95%;
  border-style: solid;
  border-width: 3px;
  border-radius: 2px;
  padding: 25px;
  text-align: centre;
  border-color: ${Colours.border1};
`;

class EstimaterForm extends React.Component {
  constructor() {
    super();
    this.state = {
      calculating: false,
      displayInputForm: true,
      displayResultForm: false,
      result: {},
    };
    this.submit = this.submit.bind(this);
  }

  submit(data, cb, e) {
    this.setState({ ...this.state, calculating: true });
    api.simulation.calculate(
      data,
      (callback) => {
        this.setState({
          ...this.state,
          calculating: false,
          displayResultForm: true,
          result: callback.data,
        });
        cb(callback);
      },
      (err) => {
        this.setState({ ...this.state, calculating: false });
        e(err);
      }
    );
  }

  render() {
    var {
      calculating,
      displayInputForm,
      displayResultForm,
      result,
    } = this.state;
    return (
      <BorderDiv>
        <h2>Enter data to get a Contagion Estimate</h2>
        <br />
        <br />
        {displayInputForm && (
          <LoadingOverlay active={calculating} spinner>
            <InfoForm submit={this.submit} />
          </LoadingOverlay>
        )}
        {displayResultForm && <ResultForm data={result} />}
      </BorderDiv>
    );
  }
}

export default EstimaterForm;
