import React from "react";
import Styled from "styled-components";

import EstimaterForm from "../forms/EstimaterForm";

const SizingDiv = Styled.div`
  display: inline-block;
  text-align: center;
  width: 85%;
`;

const MainBody = Styled.body`
  text-align: center;
`;

const Disclaimer = Styled.h6`
  color: #949494
`;
function HomePage() {
  return (
    <MainBody>
      <SizingDiv>
        <br />
        <EstimaterForm />
        <br />
        <br />
        <Disclaimer>For Educational Purposes Only</Disclaimer>
      </SizingDiv>
    </MainBody>
  );
}

export default HomePage;
