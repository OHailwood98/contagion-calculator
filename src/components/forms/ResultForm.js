import React from "react";
import Styled from "styled-components";

import Graph from "../graphs/InfectionGraph";
import Colours from "../static/colours";

const BorderDiv = Styled.div`
  display: inline-block;
  width:90%;
  border-style: solid;
  border-width: 3px;
  border-radius: 2px;
  padding: 25px;
  text-align: centre;
  border-color: ${(props) => Colours[props.chance]};
  margin-top: 25px;
`;

const CentreDiv = Styled.div`
  align-items: center;
  justify-content: center;
`;

function ResultsForm({ data }) {
  var rvalue = data.Rvalue.toFixed(3);
  return (
    <BorderDiv chance={data.chance}>
      <h2>The calculated R value for this infection in this population is</h2>
      <h2>{rvalue}.</h2>
      <br />
      <hr />
      <br />
      <CentreDiv>
        <Graph data={data.infectionList} />
      </CentreDiv>
    </BorderDiv>
  );
}

export default ResultsForm;
